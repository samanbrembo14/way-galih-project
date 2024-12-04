import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VideoPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredVideos, setFilteredVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false); // Error state diubah menjadi boolean untuk kesederhanaan

    // Fungsi untuk mencari video
    const handleSearch = async (query) => {
        if (!query) {
            setFilteredVideos([]);
            return;
        }

        setLoading(true);
        setError(false); // Reset error sebelum memulai

        try {
            const response = await axios.get(`http://localhost:5000/api/videos/search?query=${encodeURIComponent(query)}`);
            setFilteredVideos(response.data);
        } catch (err) {
            console.error('Error fetching videos:', err); // Logging untuk debugging
            setError(true); // Set error ke true jika terjadi kesalahan
        } finally {
            setLoading(false);
        }
    };

    // Default videos saat pertama kali render
    useEffect(() => {
        handleSearch('tutorial DIY'); // Pencarian default
    }, []);

    // Jika error, tampilkan halaman khusus error
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#e6f0fa] text-center px-4">
                <h1 className="text-4xl font-bold text-red-500 mb-4">Ups, sepertinya ada yang salah</h1>
                <p className="text-lg text-gray-700 mb-6">Kami mengalami masalah saat memuat data. Silakan coba lagi nanti.</p>
                <button
                    onClick={() => navigate(-1)} // Navigasi ke halaman sebelumnya
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                    Kembali
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#e6f0fa]">
            {/* Header */}
            <header className="flex flex-wrap justify-between items-center bg-[#5a90b6] px-4 md:px-8 py-4 text-white">
                <div className="flex items-center space-x-4">
                    <img src="/images/logo.png" alt="Logo" className="w-10 h-10" />
                    <h1 className="text-xl md:text-2xl font-bold">Way Galih Maju</h1>
                </div>
                <nav className="space-x-4 md:space-x-8">
                    <Link
                        to="/home"
                        className={`px-3 py-2 rounded-full font-semibold ${
                            location.pathname === '/home' ? 'bg-[#2F4C78] text-white' : 'hover:text-gray-300'
                        }`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/forum"
                        className={`px-3 py-2 rounded-full font-semibold ${
                            location.pathname === '/forum' ? 'bg-[#2F4C78] text-white' : 'hover:text-gray-300'
                        }`}
                    >
                        Forum Diskusi
                    </Link>
                    <Link
                        to="/videos"
                        className={`px-3 py-2 rounded-full font-semibold ${
                            location.pathname === '/videos' ? 'bg-[#2F4C78] text-white' : 'hover:text-gray-300'
                        }`}
                    >
                        Video Belajar
                    </Link>
                </nav>
                <div className="flex items-center mt-4 md:mt-0">
                    <Link to="/profile" className="bg-white p-2 rounded-full hover:bg-gray-200 flex items-center justify-center">
                        <img src="/images/user.png" alt="Account Icon" className="w-5 h-5 rounded-full" />
                    </Link>
                </div>
            </header>

            {/* Konten Utama */}
            <main className="px-4 md:px-8 py-8">
                {/* Selamat Datang Text */}
                <div className="mb-8 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold">Selamat Datang di Video Edukasi</h2>
                </div>

                {/* Search Bar */}
                <div className="mb-8">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            handleSearch(e.target.value);
                        }}
                        placeholder="Cari judul video di sini..."
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4B7C95]"
                    />
                </div>

                {/* Rekomendasi Video */}
                <section>
                    <h3 className="text-xl md:text-2xl font-bold mb-4">Rekomendasi Video</h3>

                    {loading && (
                        <p className="text-center text-gray-500">Sedang memuat video...</p>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredVideos.length > 0 ? (
                            filteredVideos.map((video) => (
                                <div
                                    key={video.id}
                                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                                >
                                    {/* Klik pada gambar untuk menuju ke video YouTube */}
                                    <a
                                        href={`https://www.youtube.com/watch?v=${video.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            src={video.thumbnail}
                                            alt={video.title}
                                            className="w-full h-40 object-cover"
                                        />
                                    </a>
                                    <div className="p-4">
                                        {/* Klik pada judul untuk menuju ke video YouTube */}
                                        <a
                                            href={`https://www.youtube.com/watch?v=${video.id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-lg font-semibold text-gray-800 hover:text-blue-500"
                                        >
                                            {video.title}
                                        </a>
                                    </div>
                                </div>
                            ))
                        ) : (
                            !loading && (
                                <p className="text-center text-gray-500 col-span-full">
                                    Tidak ada video yang sesuai dengan pencarian.
                                </p>
                            )
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default VideoPage;
