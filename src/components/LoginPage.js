import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            const { token, role } = response.data;

            // Simpan token ke localStorage
            localStorage.setItem('token', token);

            // Redirect berdasarkan role
            if (role === 'admin') {
                navigate('/admin'); // Halaman admin
            } else if (role === 'user') {
                navigate('/home'); // Halaman user
            }
        } catch (err) {
            console.error('Error saat login:', err);
            setError(err.response?.data?.error || 'Login gagal. Silakan coba lagi.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#f0f4fa] via-[#b0c4de] to-[#2F4C78] px-4">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Login</h2>
                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label className="block text-lg font-bold text-gray-800 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:border-[#1B2D48] focus:outline-none"
                            placeholder="Masukkan email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-bold text-gray-800 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:border-[#1B2D48] focus:outline-none"
                            placeholder="Masukkan password"
                            required
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
                    Lupa password?{' '}
                    <a href="/forgot-password" className="text-blue-600 underline">
                        Reset di sini
                    </a>
                </p>

                <p className="text-center mt-4 text-gray-600">
                    Tidak Punya Akun?{' '}
                    <a href="/register" className="text-blue-600 underline">
                        Daftar disini
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
