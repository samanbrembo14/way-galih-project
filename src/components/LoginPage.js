import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();

        if (email === 'admin@example.com' && password === 'adminpass') {
            // Arahkan ke halaman Admin jika login sebagai admin
            navigate('/admin');
        } else if (email === 'user@example.com' && password === 'password123') {
            // Arahkan ke halaman Home jika login sebagai user biasa
            navigate('/home');
        } else {
            setError('Email atau password salah');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#f0f4fa] via-[#b0c4de] to-[#2F4C78] px-8">
            <div className="flex w-full max-w-2xl">
                <div className="w-1/2 flex items-center justify-center">
                    <img src="/Images/Businessman%20waiving%20hand.png" alt="Avatar" className="w-300 h-400" />
                </div>

                <div className="w-1/2 p-8">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Login</h2>
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label className="block text-lg font-bold text-gray-800 mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-transparent text-gray-800 focus:border-[#1B2D48] focus:outline-none"
                                placeholder="Masukkan email"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-bold text-gray-800 mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-transparent text-gray-800 focus:border-[#1B2D48] focus:outline-none"
                                placeholder="Masukkan password"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button
                            type="submit"
                            className="w-full py-3 bg-[#1B2D48] text-white rounded-full font-semibold hover:bg-opacity-90">
                            Login
                        </button>
                    </form>
                    <p className="text-center mt-4 text-gray-600">
                        Tidak Punya Akun? <a href="/register" className="text-blue-600 underline">Daftar disini</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
