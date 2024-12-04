import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);

    // Fungsi logout
    const handleLogout = useCallback(() => {
        localStorage.removeItem('token');
        navigate('/login');
    }, [navigate]);

    // Fetch data pengguna dari backend
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token tidak ditemukan. Harap login kembali.');
                }

                console.log('Menggunakan token:', token); // Debug token
                const response = await axios.get('http://localhost:5000/api/auth/me', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log('Data pengguna:', response.data); // Debug data pengguna
                setUserData(response.data);
                setErrorMessage('');
            } catch (error) {
                console.error('Error fetching user data:', error);
                setErrorMessage(error.response?.data?.error || 'Gagal memuat data pengguna.');
                if (error.response?.status === 401 || error.response?.status === 403) {
                    handleLogout(); // Logout otomatis jika token tidak valid
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [handleLogout]);

    const handleBack = () => {
        navigate(-1); // Navigasi ke halaman sebelumnya
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Memuat data pengguna...</p>
            </div>
        );
    }

    if (errorMessage) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <p className="text-red-500">{errorMessage}</p>
                <button
                    onClick={handleLogout}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                >
                    Login Ulang
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#e6f0fa] to-[#ffffff] flex flex-col items-center justify-center p-8">
            {/* Tombol Kembali */}
            <button
                onClick={handleBack}
                className="absolute top-4 left-4 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow"
            >
                &#8592; Kembali
            </button>

            <h1 className="text-3xl font-bold mb-6 text-gray-800">Profile Pengguna</h1>
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mb-8">
                <span className="text-5xl text-gray-800">&#9786;</span>
            </div>

            <div className="space-y-6 w-full max-w-md">
                <div>
                    <label className="block text-lg font-bold text-gray-800 mb-1">Nama</label>
                    <div className="w-full px-4 py-2 bg-[#6ba7c6] text-white rounded-full">
                        {userData.name}
                    </div>
                </div>
                <div>
                    <label className="block text-lg font-bold text-gray-800 mb-1">Email</label>
                    <div className="w-full px-4 py-2 bg-[#6ba7c6] text-white rounded-full">
                        {userData.email}
                    </div>
                </div>
                <div>
                    <label className="block text-lg font-bold text-gray-800 mb-1">Role</label>
                    <div className="w-full px-4 py-2 bg-[#6ba7c6] text-white rounded-full">
                        {userData.role}
                    </div>
                </div>
            </div>

            <button
                onClick={handleLogout}
                className="mt-10 px-8 py-3 bg-[#1B2D48] text-white rounded-full font-semibold hover:bg-opacity-90"
            >
                Logout
            </button>
        </div>
    );
};

export default ProfilePage;
