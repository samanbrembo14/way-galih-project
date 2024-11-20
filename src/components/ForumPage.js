import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const ForumPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Data contoh untuk diskusi terbaru
    const discussions = [
        {
            id: 1,
            author: 'Andi Prasetyo Wibowo',
            time: '3 Jam',
            title: 'Keterampilan Memasak Sederhana',
            description: 'Resep masakan apa yang bisa kamu coba untuk belajar memasak di rumah, dan apa saja bahan-bahan yang dibutuhkan?',
            comments: 9,
        },
        {
            id: 2,
            author: 'Siti Nurhaliza Rahmawati',
            time: '5 Jam',
            title: 'Membuat Kompos dari Sampah Organik',
            description: 'Bagaimana cara membuat kompos dari sampah organik di rumah, dan apa saja manfaatnya untuk tanaman?',
            comments: 10,
        },
        {
            id: 3,
            author: 'Budi Santoso Hartono',
            time: '9 Jam',
            title: 'Membuat Kerajinan Tangan dari Bahan Daur Ulang',
            description: 'Apa saja kerajinan tangan yang bisa dibuat dari bahan daur ulang yang ada di rumah, dan bagaimana cara membuatnya?',
            comments: 7,
        },
        {
            id: 4,
            author: 'Rina Amelia Putri',
            time: '12 Jam',
            title: 'Menanam Sayuran di Kebun Rumah',
            description: 'Sayuran apa yang paling mudah ditanam di kebun rumah, dan bagaimana cara merawatnya agar dapat tumbuh dengan baik?',
            comments: 5,
        },
    ];

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
                        to="/video"
                        className={`px-4 py-2 rounded-full font-semibold ${
                            location.pathname === '/video' ? 'bg-[#2F4C78] text-white' : 'hover:text-gray-300'
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
                        placeholder="Cari Judul Diskusi disini..."
                        className="border border-gray-300 px-4 py-2 rounded-lg w-1/2 focus:outline-none"
                    />
                </div>

                {/* Diskusi Terbaru */}
                <h3 className="text-xl font-semibold mb-4">Diskusi Terbaru</h3>
                <div className="space-y-4">
                    {discussions.map((discussion) => (
                        <div
                            key={discussion.id}
                            onClick={() => navigate(`/reply-discussion/${discussion.id}`)} // Navigasi ke halaman balas diskusi dengan ID
                            className="bg-white p-4 rounded-lg shadow-md border border-gray-200 cursor-pointer hover:bg-gray-100"
                        >
                            <div className="flex items-center space-x-4 mb-2">
                                <img src="/images/user.png" alt="User" className="w-8 h-8 rounded-full" />
                                <div>
                                    <p className="font-semibold text-gray-800">{discussion.author}</p>
                                    <p className="text-gray-500 text-sm">{discussion.time}</p>
                                </div>
                            </div>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">{discussion.title}</h4>
                            <p className="text-gray-700 mb-2">{discussion.description}</p>
                            <div className="flex items-center text-gray-500 text-sm">
                                <span className="mr-2">&#128172;</span>
                                <span>{discussion.comments} Pembahasan</span>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default ForumPage;
