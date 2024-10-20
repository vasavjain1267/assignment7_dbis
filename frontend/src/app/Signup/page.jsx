'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
const Signup = () => {
    const router = useRouter();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prev => !prev);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        const formData = {
            name: e.target.name.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            password: e.target.password.value,
        };

        // Send a POST request to the backend API
        const response = await fetch('http://localhost:5001/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (data.status) {
            // Store user data in local storage
            localStorage.setItem('user', JSON.stringify(formData));
            // Redirect to welcome page on success
            router.push('/Welcome');
        } else {
            alert('Sign up failed');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center text-black">
                <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                <p className="text-gray-600 mb-6">Create an account to get started</p>
                <form onSubmit={handleSignUp}>
                    {/* Input Fields */}
                    <label className="block text-left font-semibold mb-2">Name</label>
                    <input type="text" name="name" placeholder="Enter Your Name" className="w-full p-3 border border-gray-300 rounded mb-4" required />

                    <label className="block text-left font-semibold mb-2">Email</label>
                    <input type="email" name="email" placeholder="Enter Your Email" className="w-full p-3 border border-gray-300 rounded mb-4" required />

                    <label className="block text-left font-semibold mb-2">Phone Number</label>
                    <input type="tel" name="phone" placeholder="Enter Your Phone Number" className="w-full p-3 border border-gray-300 rounded mb-4" required minLength={10} maxLength={10} />

                    <label className="block text-left font-semibold mb-2">Password</label>
                    <div className="relative mb-4">
                        <input type={isPasswordVisible ? "text" : "password"} name="password" placeholder="Enter Your Password" className="w-full p-3 border border-gray-300 rounded" required />
                        <span onClick={togglePasswordVisibility} className="absolute right-3 top-3 cursor-pointer text-gray-500">
                            {isPasswordVisible ? (
                                <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
                            ) : (
                                <EyeIcon className="h-5 w-5" aria-hidden="true" />
                            )}
                        </span>
                    </div>

                    <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105">Sign Up</button>
                </form>
                <div className="mt-4 text-gray-600">Already Have an Account?</div>
                <a href="/" className="text-blue-600 hover:underline">Sign In</a>
            </div>
        </div>
    );
};

export default Signup;
