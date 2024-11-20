import React from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate();

    const handleRegister = (event) => {
        event.preventDefault();
        // Logika registrasi atau validasi data bisa ditambahkan di sini
        // Jika registrasi berhasil, arahkan pengguna ke halaman login
        navigate('/login');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#f0f4fa] via-[#b0c4de] to-[#2F4C78] px-8">
            <div className="flex w-full max-w-2xl">
                {/* Gambar di sisi kiri */}
                <div className="w-1/2 flex items-center justify-center">
                    <img src="/Images/Sign%20Up%20form.png" alt="Signup Illustration" className="w-72 h-72" />
                </div>

                {/* Form Register */}
                <div className="w-1/2 p-8">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Daftar Akun</h2>
                    <form className="space-y-6" onSubmit={handleRegister}>
                        <div>
                            <label className="block text-lg font-bold text-gray-800 mb-1">Nama</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-[40px] bg-transparent text-gray-800 focus:border-[#1B2D48] focus:outline-none"
                                placeholder="Masukkan nama"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-bold text-gray-800 mb-1">Alamat</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-[40px] bg-transparent text-gray-800 focus:border-[#1B2D48] focus:outline-none"
                                placeholder="Masukkan alamat"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-bold text-gray-800 mb-1">Email</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 border border-black-300 rounded-[40px] bg-transparent text-gray-800 focus:border-[#1B2D48] focus:outline-none"
                                placeholder="Masukkan email"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-bold text-gray-800 mb-1">Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-[40px] bg-transparent text-gray-800 focus:border-[#1B2D48] focus:outline-none"
                                placeholder="Masukkan password"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-[#1B2D48] text-white rounded-full font-semibold hover:bg-opacity-90">
                            Daftar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
