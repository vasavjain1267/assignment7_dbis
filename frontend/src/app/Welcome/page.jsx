'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const WelcomePage = () => {
    const router = useRouter();
    const [showProfile, setShowProfile] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Retrieve user data from local storage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const toggleProfile = () => {
        setShowProfile(prev => !prev);
    };
    const handleLogout = () => {
        localStorage.removeItem('user');
        router.push('/');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
                <h2 className="text-2xl font-bold mb-4">Welcome!</h2>
                <p className="text-gray-600 mb-6">You have successfully signed up!</p>
                {user && (
                    <div className="relative inline-block">
                        <button onClick={toggleProfile} className="text-blue-600 hover:underline">
                            Profile
                        </button>
                        {showProfile && (
                            <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg p-4 w-48">
                                <p className="font-bold">{user.name}</p>
                                <p>{user.phone}</p>
                                <p>{user.email}</p>
                                <button onClick={handleLogout} className="mt-2 text-red-600 hover:underline">
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}
                {/* <a href="/" className="text-blue-600 hover:underline mt-4 block">
                    Go to Login
                </a> */}
            </div>
        </div>
    );
};

export default WelcomePage;
