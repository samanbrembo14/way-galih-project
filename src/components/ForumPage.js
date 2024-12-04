import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from './NavigationBar'; // Impor komponen NavigationBar

const ForumPage = () => {
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
            <NavigationBar /> {/* Gunakan NavigationBar */}

            {/* Konten Utama */}
            <main className="mt-8 max-w-4xl mx-auto p-8">
                <h2 className="text-3xl font-bold text-center mb-8">Selamat Datang di Forum Diskusi</h2>

                {/* Tombol Buat Diskusi Baru dan Pencarian */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
                    <button
                        onClick={() => navigate('/new-discussion')}
                        className="bg-[#5291B0] text-white font-semibold px-4 py-2 text-sm rounded-lg w-full sm:w-auto"
                    >
                        Buat Diskusi Baru
                    </button>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari Judul Diskusi disini..."
                        className="border border-gray-300 px-4 py-2 rounded-lg w-full sm:w-1/2 focus:outline-none"
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
