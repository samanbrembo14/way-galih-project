import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const navigate = useNavigate();

    // Fungsi untuk kembali ke halaman sebelumnya
    const handleBack = () => {
        navigate(-1);
    };

    // Fungsi untuk logout (contoh sederhana)
    const handleLogout = () => {
        // Lakukan logika logout di sini
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#e6f0fa] to-[#ffffff] flex flex-col items-center justify-center p-8">
            {/* Tombol Kembali */}
            <button onClick={handleBack} className="self-start mb-8 text-3xl text-gray-800">
                &#8592;
            </button>

            {/* Judul dan Ikon Profil */}
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Profile Pengguna</h1>
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mb-8">
                <span className="text-5xl text-gray-800">&#9786;</span> {/* Placeholder untuk ikon pengguna */}
            </div>

            {/* Informasi Pengguna */}
            <div className="space-y-6 w-full max-w-md">
                <div>
                    <label className="block text-lg font-bold text-gray-800 mb-1">Nama</label>
                    <div className="w-full px-4 py-2 bg-[#6ba7c6] text-white rounded-full">
                        Alwi Arfan Solin
                    </div>
                </div>
                <div>
                    <label className="block text-lg font-bold text-gray-800 mb-1">Alamat</label>
                    <div className="w-full px-4 py-2 bg-[#6ba7c6] text-white rounded-full">
                        Dusun Semangka
                    </div>
                </div>
                <div>
                    <label className="block text-lg font-bold text-gray-800 mb-1">Nama Pengguna</label>
                    <div className="w-full px-4 py-2 bg-[#6ba7c6] text-white rounded-full">
                        @alwiarf
                    </div>
                </div>
            </div>

            {/* Tombol Logout */}
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
