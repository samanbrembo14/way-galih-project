import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f0f4fa] via-[#b0c4de] to-[#2F4C78] px-8 py-4">
            {/* Header */}
            <header className="flex justify-between items-center py-4">
                <h1 className="text-2xl font-bold text-gray-800">Way Galih Maju</h1>
                <nav className="space-x-8">
                    <Link to="/" className="text-gray-800 font-semibold hover:text-gray-600">Home</Link>
                    <Link to="/about" className="text-gray-800 font-semibold hover:text-gray-600">About Us</Link>
                </nav>
            </header>

            {/* Main Content */}
            <div className="flex items-center justify-between min-h-[80vh]">
                <div className="text-left max-w-lg space-y-4">
                    <h2 className="text-4xl font-bold text-gray-800">
                        Halo, Selamat Datang
                    </h2>
                    <p className="text-2xl text-gray-700">
                        Mari Bergabung dengan Komunitas Desa Way Galih
                    </p>
                    <div className="flex space-x-4">
                        <Link to="/register" className="px-6 py-3 bg-[#1B2D48] text-white rounded-lg font-semibold shadow-md hover:bg-opacity-90">
                            Daftar
                        </Link>
                        <Link to="/login" className="px-6 py-3 border-2 border-[#1B2D48] text-[#1B2D48] rounded-lg font-semibold shadow-md hover:bg-[#1B2D48] hover:text-white">
                            Login
                        </Link>
                    </div>
                </div>
                <div className="mt-8">
                    <img src="/Images/Chatting.png" alt="Chat Icon" className="w-65 h-64" />
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
