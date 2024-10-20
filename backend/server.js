require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});


// Connect to the database
db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected!');
});

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}
// API endpoint for signup
app.post('/api/signup', async (req, res) => {
    const { name, email, phone, password } = req.body;
    if(!isValidEmail(email)){
        res.json({
            msg:"enter proper email format"
        })
        
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);

    const sql = 'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, phone, hashedPassword], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ status:"true",message: 'User registered successfully!', userId: result.insertId });
    });
});

// API endpoint for login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ?';

    // Retrieve user from the database
    db.query(sql, [email], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length > 0) {
            const user = results[0];

            // Compare hashed password with the password provided
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                const { id, name, email, phone } = user;
                res.json({ message: 'Login successful', userId: user.id, user: { id, name, email, phone}});
            } else {
                res.status(401).json({ message: 'Invalid email or password' });
            }
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    });
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


