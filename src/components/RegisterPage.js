import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
    const navigate = useNavigate();

    // State untuk menangani input form dan pesan error/sukses
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Fungsi untuk menangani perubahan input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Fungsi untuk menangani submit form
    const handleRegister = async (event) => {
        event.preventDefault();

        // Validasi sederhana
        if (!formData.name || !formData.address || !formData.email || !formData.password) {
            setError('Semua field harus diisi.');
            return;
        }

        // Validasi email hanya boleh @gmail.com
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!emailRegex.test(formData.email)) {
            setError('Hanya email dengan domain @gmail.com yang diperbolehkan.');
            return;
        }

        try {
            // Kirim data ke backend
            const response = await axios.post('http://localhost:5000/api/auth/register', formData);

            // Tampilkan pesan sukses dan redirect ke halaman login
            setSuccess(response.data.message);
            setError('');
            setTimeout(() => {
                navigate('/login'); // Redirect ke login setelah 2 detik
            }, 2000);
        } catch (err) {
            // Tampilkan error dari backend
            setError(err.response?.data?.error || 'Terjadi kesalahan saat registrasi.');
            setSuccess('');
        }
    };

    return (
        <div
            className="relative min-h-screen flex items-center justify-center bg-cover bg-center px-8"
            style={{
                backgroundImage: `url('/Images/desa2.jpg')`, // Ganti dengan path gambar Anda
            }}
        >
            {/* Tombol Kembali */}
            <button
                onClick={() => {
                    if (window.history.length > 1) {
                        navigate(-1);
                    } else {
                        navigate('/');
                    }
                }}
                className="absolute top-6 left-4 sm:top-8 sm:left-8 flex items-center text-gray-700 bg-white bg-opacity-70 rounded-full p-2 hover:bg-opacity-90 shadow-md z-50"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            {/* Form Pendaftaran */}
            <div className="w-full max-w-md bg-white bg-opacity-30 backdrop-blur-sm md:backdrop-blur-md rounded-[40px] shadow-md p-8 mt-16 sm:mt-20">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Daftar Akun</h2>
                <form className="space-y-6" onSubmit={handleRegister}>
                    {/* Field Input */}
                    <div>
                        <label className="block text-lg font-bold text-gray-800 mb-1" htmlFor="name">
                            Nama
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-[40px] text-gray-800 focus:border-[#1B2D48] focus:outline-none"
                            placeholder="Masukkan nama"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-bold text-gray-800 mb-1" htmlFor="address">
                            Alamat
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-[40px] text-gray-800 focus:border-[#1B2D48] focus:outline-none"
                            placeholder="Masukkan alamat"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-bold text-gray-800 mb-1" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-[40px] text-gray-800 focus:border-[#1B2D48] focus:outline-none"
                            placeholder="Masukkan email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-bold text-gray-800 mb-1" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-[40px] text-gray-800 focus:border-[#1B2D48] focus:outline-none"
                            placeholder="Masukkan password"
                            required
                        />
                    </div>
                    {error && (
                        <p className="text-red-500 text-sm text-center">
                            {error}
                        </p>
                    )}
                    {success && (
                        <p className="text-green-500 text-sm text-center">
                            {success}
                        </p>
                    )}
                    <button
                        type="submit"
                        className="w-full py-3 bg-[#1B2D48] text-white font-semibold rounded-full hover:bg-opacity-90">
                        Daftar
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-black-600">
                    Sudah punya akun?{' '}
                    <a href="/login" className="text-blue-600 underline">
                        Masuk di sini
                    </a>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
