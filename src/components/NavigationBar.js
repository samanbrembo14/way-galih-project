import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavigationBar = () => {
    const location = useLocation();

    return (
        <nav className="space-x-8">
            <Link
                to="/"
                className={`px-4 py-2 rounded-full font-semibold ${
                    location.pathname === '/' ? 'bg-[#2F4C78] text-white' : 'hover:text-gray-300'
                }`}
            >
                Home
            </Link>
            <Link
                to="/forum"
                className={`px-4 py-2 rounded-full font-semibold ${
                    location.pathname === '/forum' ? 'bg-[#2F4C78] text-white' : 'hover:text-gray-300'
                }`}
            >
                Forum Diskusi
            </Link>
            <Link
                to="/videos"
                className={`px-4 py-2 rounded-full font-semibold ${
                    location.pathname === '/videos' ? 'bg-[#2F4C78] text-white' : 'hover:text-gray-300'
                }`}
            >
                Video Belajar
            </Link>
            <Link
                to="/admin"
                className={`px-4 py-2 rounded-full font-semibold ${
                    location.pathname === '/admin' ? 'bg-[#2F4C78] text-white' : 'hover:text-gray-300'
                }`}
            >
                Moderasi
            </Link>
        </nav>
    );
};

export default NavigationBar;
