import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavigationBar = () => {
    const location = useLocation();

    return (
        <header className="flex flex-wrap justify-between items-center bg-[#5a90b6] px-4 md:px-8 py-4 text-white">
            {/* Logo dan Judul */}
            <div className="flex items-center space-x-4">
                <img src="/images/logo.png" alt="Logo" className="w-8 h-8 md:w-10 md:h-10" />
                <h1 className="text-lg md:text-xl font-bold">Way Galih Maju</h1>
            </div>

            {/* Navigasi */}
            <nav className="flex flex-wrap justify-end space-x-2 md:space-x-4 text-sm md:text-base">
                <Link
                    to="/home"
                    className={`px-3 py-2 rounded-lg font-medium ${
                        location.pathname === '/home' ? 'bg-[#2F4C78] text-white' : 'hover:text-gray-300'
                    }`}
                >
                    Home
                </Link>
                <Link
                    to="/forum"
                    className={`px-3 py-2 rounded-lg font-medium ${
                        location.pathname === '/forum' ? 'bg-[#2F4C78] text-white' : 'hover:text-gray-300'
                    }`}
                >
                    Forum Diskusi
                </Link>
                <Link
                    to="/videos"
                    className={`px-3 py-2 rounded-lg font-medium ${
                        location.pathname === '/videos' ? 'bg-[#2F4C78] text-white' : 'hover:text-gray-300'
                    }`}
                >
                    Video Belajar
                </Link>
            </nav>

            {/* Profil */}
            <div className="absolute top-4 right-4">
                <Link
                    to="/profile"
                    className="bg-white p-1 rounded-full hover:bg-gray-200 flex items-center justify-center shadow-md"
                >
                    <img src="/images/user.png" alt="Account Icon" className="w-4 h-4 md:w-5 md:h-5 rounded-full" />
                </Link>
            </div>
        </header>
    );
};

export default NavigationBar;
