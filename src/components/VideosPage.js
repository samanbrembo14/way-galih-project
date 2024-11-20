import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const VideoPage = () => {
    const location = useLocation();

    const videoData = [
        {
            id: 1,
            title: 'DIY: Cara Membuat Rak Dinding Sederhana dari Kayu Palet',
            image: '/images/rak_dinding.jpg'
        },
        {
            id: 2,
            title: 'Membuat Sabun Alami di Rumah: Panduan Langkah demi Langkah',
            image: '/images/sabun_alami.jpg'
        },
        {
            id: 3,
            title: 'DIY: Cara Membuat Tempat Pensil Unik dari Botol Plastik',
            image: '/images/tempat_pensil.jpg'
        },
        {
            id: 4,
            title: 'Membuat Lilin Aromaterapi Sendiri: Tips dan Trik',
            image: '/images/lilin_aromaterapi.jpg'
        },
        {
            id: 5,
            title: 'Membuat Kebun Hidroponik Sederhana di Rumah: Panduan Lengkap',
            image: '/images/kebun_hidroponik.jpg'
        },
        {
            id: 6,
            title: 'DIY: Membuat Kompos dari Sampah Dapur untuk Tanaman Sehat',
            image: '/images/kompos.jpg'
        },
    ];

    return (
        <div className="min-h-screen bg-[#e6f0fa]">
            {/* Header */}
            <header className="flex justify-between items-center bg-[#5a90b6] px-8 py-4 text-white mb-8">
                <div className="flex items-center space-x-4">
                    <img src="/images/logo.png" alt="Logo" className="w-10 h-10" />
                    <h1 className="text-2xl font-bold">Way Galih Maju</h1>
                </div>
                <nav className="space-x-8">
                    <Link
                        to="/home"
                        className={`px-4 py-2 rounded-full font-semibold ${
                            location.pathname === '/home' ? 'bg-[#2F4C78] text-white' : 'hover:text-gray-300'
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
                </nav>
                <div className="flex items-center">
                    <Link to="/profile" className="bg-white p-2 rounded-full hover:bg-gray-200 flex items-center justify-center">
                        <img src="/images/user.png" alt="Account Icon" className="w-5 h-5 rounded-full" />
                    </Link>
                </div>
            </header>

            {/* Konten Utama */}
            <main>
                {/* Selamat Datang Text */}
                <div className="mb-8 ml-16">
                    <h2 className="text-2xl font-bold">Selamat datang di Video Edukasi</h2>
                </div>

                {/* Search Bar */}
                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Cari judul video disini..."
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4B7C95]"
                    />
                </div>

                {/* Rekomendasi Video */}
                <section>
                    <h3 className="text-2xl font-bold mb-4">Rekomendasi Video</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {videoData.map((video) => (
                            <div
                                key={video.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
                            >
                                <img src={video.image} alt={video.title} className="w-full h-40 object-cover" />
                                <div className="p-4">
                                    <h4 className="text-lg font-semibold text-gray-800">{video.title}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default VideoPage;
