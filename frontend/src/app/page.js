'use client';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

export default function SignIn() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [error, setError] = useState(""); // For handling error messages

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prev => !prev);
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        const credentials = {
            email,
            password,
        };
        const response = await fetch('http://localhost:5001/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        const data = await response.json();
        if (response.ok) {
            const userData = { name: data.user.name, email: data.user.email, phone: data.user.phone };
            localStorage.setItem('user', JSON.stringify(userData));
            router.push('/Welcome');
        } else {
            setError(data.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center text-black">
                <h2 className="text-2xl font-bold mb-4 text-black">Sign In</h2>
                <p className="text-gray-600 mb-6">Enter your email and password to access your account</p>

                {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message */}

                <form onSubmit={handleSignIn}>
                    <label className="block text-left font-semibold mb-2 text-black">Email</label>
                    <div className="relative mb-4">
                        <input
                            type="email"
                            placeholder="Enter Your Email"
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <label className="block text-left font-semibold mb-2 text-black">Password</label>
                    <div className="relative mb-4">
                        <input
                            type={isPasswordVisible ? "text" : "password"}
                            placeholder="Enter Your Password"
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                       <span onClick={togglePasswordVisibility} className="absolute right-3 top-3 cursor-pointer text-gray-500">
  {isPasswordVisible ? (
    <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
  ) : (
    <EyeIcon className="h-5 w-5" aria-hidden="true" />
  )}
</span>

                    </div>

                    <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105">
                        Sign In
                    </button>
                </form>

                <div className="mt-4 text-gray-600">
                    Don't Have an Account?
                </div>
                <a href="/Signup" className="text-blue-600 hover:underline">Sign Up</a>
            </div>
        </div>
    );
}
