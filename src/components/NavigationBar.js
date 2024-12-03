import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavigationBar = () => {
    const location = useLocation();

    return (
        <header className="flex flex-wrap justify-between items-center bg-[#5a90b6] px-4 md:px-8 py-4 text-white">
            <div className="flex items-center space-x-4">
                <img src="/images/logo.png" alt="Logo" className="w-10 h-10" />
                <h1 className="text-xl md:text-2xl font-bold">Way Galih Maju</h1>
            </div>
            <nav className="space-x-4 md:space-x-8">
                <Link
                    to="/home"
                    className={`px-3 py-2 rounded-full font-semibold ${
                        location.pathname === '/home' ? 'bg-[#2F4C78] text-white' : 'hover:text-gray-300'
                    }`}
                >
                    Home
                </Link>
                <Link
                    to="/forum"
                    className={`px-3 py-2 rounded-full font-semibold ${
                        location.pathname === '/forum' ? 'bg-[#2F4C78] text-white' : 'hover:text-gray-300'
                    }`}
                >
                    Forum Diskusi
                </Link>
                <Link
                    to="/videos"
                    className={`px-3 py-2 rounded-full font-semibold ${
                        location.pathname === '/videos' ? 'bg-[#2F4C78] text-white' : 'hover:text-gray-300'
                    }`}
                >
                    Video Belajar
                </Link>
            </nav>
            <div className="flex items-center mt-4 md:mt-0">
                <Link to="/profile" className="bg-white p-2 rounded-full hover:bg-gray-200 flex items-center justify-center">
                    <img src="/images/user.png" alt="Account Icon" className="w-5 h-5 rounded-full" />
                </Link>
            </div>
        </header>
    );
};

export default NavigationBar;
