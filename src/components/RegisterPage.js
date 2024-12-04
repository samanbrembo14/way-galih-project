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
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-[40px] bg-transparent text-gray-800 focus:border-[#1B2D48] focus:outline-none"
                                placeholder="Masukkan nama"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-bold text-gray-800 mb-1">Alamat</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-[40px] bg-transparent text-gray-800 focus:border-[#1B2D48] focus:outline-none"
                                placeholder="Masukkan alamat"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-bold text-gray-800 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-[40px] bg-transparent text-gray-800 focus:border-[#1B2D48] focus:outline-none"
                                placeholder="Masukkan email"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-bold text-gray-800 mb-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-[40px] bg-transparent text-gray-800 focus:border-[#1B2D48] focus:outline-none"
                                placeholder="Masukkan password"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        {success && <p className="text-green-500 text-sm">{success}</p>}
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
