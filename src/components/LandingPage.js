import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f0f4fa] via-[#b0c4de] to-[#2F4C78] px-6 py-4">
            {/* Header */}
            <header className="flex flex-wrap justify-between items-center py-4">
                <h1 className="text-2xl font-bold text-gray-800">Way Galih Maju</h1>
                <nav className="flex space-x-4">
                    <Link to="/" className="text-gray-800 font-semibold hover:text-gray-600">
                        Home
                    </Link>
                    <Link to="/about" className="text-gray-800 font-semibold hover:text-gray-600">
                        About Us
                    </Link>
                </nav>
            </header>

            {/* Main Content */}
            <div className="flex flex-col-reverse lg:flex-row items-center justify-between min-h-[80vh] gap-8">
                <div className="text-center lg:text-left max-w-lg space-y-4">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
                        Halo, Selamat Datang
                    </h2>
                    <p className="text-lg lg:text-2xl text-gray-700">
                        Mari Bergabung dengan Komunitas Desa Way Galih
                    </p>
                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 items-center lg:items-start">
                        <Link
                            to="/register"
                            className="w-full lg:w-auto px-6 py-3 bg-[#1B2D48] text-white rounded-lg font-semibold shadow-md hover:bg-opacity-90 text-center"
                        >
                            Daftar
                        </Link>
                        <Link
                            to="/login"
                            className="w-full lg:w-auto px-6 py-3 border-2 border-[#1B2D48] text-[#1B2D48] rounded-lg font-semibold shadow-md hover:bg-[#1B2D48] hover:text-white text-center"
                        >
                            Login
                        </Link>
                    </div>
                </div>
                <div className="flex justify-center">
                    <img
                        src="/Images/Chatting.png"
                        alt="Chat Icon"
                        className="w-48 h-48 lg:w-64 lg:h-64 object-contain"
                    />
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
