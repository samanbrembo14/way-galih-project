import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ForumPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [discussions, setDiscussions] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredDiscussions, setFilteredDiscussions] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch discussions from the backend
    useEffect(() => {
        const fetchDiscussions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/forum'); // Hanya ambil yang approved
                console.log('Approved Discussions fetched:', response.data);
                setDiscussions(response.data);
                setFilteredDiscussions(response.data); // Awalnya semua diskusi ditampilkan
            } catch (error) {
                console.error('Error fetching discussions:', error);
                setErrorMessage('Gagal memuat diskusi.');
            }
        };

        fetchDiscussions();
    }, []);

    // Filter discussions setiap kali searchQuery berubah
    useEffect(() => {
        const result = discussions.filter((discussion) =>
            discussion.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredDiscussions(result);
    }, [searchQuery, discussions]);

    return (
        <div className="min-h-screen bg-[#e6f0fa]">
            {/* Header */}
            <header className="flex justify-between items-center bg-[#5a90b6] px-8 py-4 text-white">
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
            <main className="mt-8 max-w-4xl mx-auto p-8">
                <h2 className="text-3xl font-bold text-center mb-8">Selamat Datang di Forum Diskusi</h2>

                {/* Tombol Buat Diskusi Baru dan Pencarian */}
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={() => navigate('/new-discussion')}
                        className="bg-[#5291B0] text-white font-semibold px-6 py-3 rounded-lg"
                    >
                        Buat Diskusi Baru
                    </button>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari Judul Diskusi disini..."
                        className="border border-gray-300 px-4 py-2 rounded-lg w-1/2 focus:outline-none"
                    />
                </div>

                {/* Diskusi Terbaru */}
                <h3 className="text-xl font-semibold mb-4">Diskusi Terbaru</h3>
                {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
                {filteredDiscussions.length > 0 ? (
                    <div className="space-y-4">
                        {filteredDiscussions.map((discussion) => (
                            <div
                                key={discussion.id}
                                onClick={() => navigate(`/reply-discussion/${discussion.id}`)}
                                className="bg-white p-4 rounded-lg shadow-md border border-gray-200 cursor-pointer hover:bg-gray-100"
                            >
                                <div className="flex items-center space-x-4 mb-2">
                                    <img src="/images/user.png" alt="User" className="w-8 h-8 rounded-full" />
                                    <div>
                                        <p className="font-semibold text-gray-800">{discussion.author}</p>
                                        <p className="text-gray-500 text-sm">{new Date(discussion.created_at).toLocaleString()}</p>
                                    </div>
                                </div>
                                <h4 className="text-lg font-bold text-gray-900 mb-2">{discussion.title}</h4>
                                <p className="text-gray-700 mb-2">{discussion.description}</p>
                                <div className="flex items-center text-gray-500 text-sm">
                                    <span className="mr-2">&#128172;</span>
                                    <span>{discussion.comments?.length || 0} Pembahasan</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Tidak ditemukan diskusi dengan judul tersebut.</p>
                )}
            </main>
        </div>
    );
};

export default ForumPage;
