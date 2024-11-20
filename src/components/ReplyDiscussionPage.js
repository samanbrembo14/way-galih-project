import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ReplyDiscussionPage = () => {
    const navigate = useNavigate();

    // Data contoh untuk topik diskusi
    const discussion = {
        author: 'Andi Prasetyo Wibowo',
        time: '3 Jam',
        title: 'Keterampilan Memasak Sederhana',
        description: 'Resep masakan apa yang bisa kamu coba untuk belajar memasak di rumah, dan apa saja bahan-bahan yang dibutuhkan?',
        commentsCount: 2,
    };

    // Data contoh untuk komentar terbaru
    const comments = [
        {
            id: 1,
            author: 'Rina Melati Sari',
            time: '32 menit yang lalu',
            content: 'Menurut saya, resep yang paling gampang untuk pemula itu Nasi Goreng. Bahan-bahannya simpel, seperti nasi, telur, dan bumbu-bumbu. Selain cepat dibuat, kita juga bisa tambahin sayuran atau protein sesuai selera. Enak dan praktis!',
        },
        {
            id: 2,
            author: 'Budi Santoso Prabowo',
            time: '42 menit yang lalu',
            content: 'Menurut saya, Salad Sayuran itu lebih mudah dan sehat. Cukup campur sayuran segar kayak selada, tomat, dan timun, nggak perlu masak-masak. Jadi, buat yang baru belajar masak, salad bisa jadi pilihan yang cepat dan tetap enak.',
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
                        className="px-4 py-2 rounded-full font-semibold hover:bg-[#2F4C78] hover:text-white"
                    >
                        Home
                    </Link>
                    <Link
                        to="/forum"
                        className="px-4 py-2 rounded-full font-semibold bg-[#2F4C78] text-white"
                    >
                        Forum Diskusi
                    </Link>
                    <Link
                        to="/video"
                        className="px-4 py-2 rounded-full font-semibold hover:bg-[#2F4C78] hover:text-white"
                    >
                        Video Belajar
                    </Link>
                </nav>
                <div className="flex items-center">
                    <Link
                        to="/profile"
                        className="bg-white p-2 rounded-full flex items-center justify-center hover:bg-gray-200"
                    >
                        <img src="/images/user.png" alt="Account Icon" className="w-5 h-5 rounded-full" />
                    </Link>
                </div>
            </header>

            {/* Tombol Kembali */}
            <div className="flex items-center mt-6 mb-4">
                <button onClick={() => navigate(-1)} className="text-2xl text-gray-700 mr-2">
                    &#8592;
                </button>
                <span className="text-lg font-semibold">Forum Diskusi</span>
            </div>

            {/* Detail Diskusi */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <div className="flex items-center space-x-4 mb-4">
                    <img src="/images/user.png" alt="User" className="w-8 h-8 rounded-full" />
                    <div>
                        <p className="font-semibold text-gray-800">{discussion.author}</p>
                        <p className="text-gray-500 text-sm">{discussion.time}</p>
                    </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{discussion.title}</h2>
                <p className="text-gray-700 mb-4">{discussion.description}</p>
                <div className="flex items-center text-gray-500 text-sm">
                    <span className="mr-2">&#128172;</span>
                    <span>{discussion.commentsCount} Pembahasan</span>
                </div>
            </div>

            {/* Form Komentar */}
            <div className="flex items-center mb-8">
                <img src="/images/user.png" alt="User" className="w-8 h-8 rounded-full mr-4" />
                <input
                    type="text"
                    placeholder="Tulis komentar anda disini..."
                    className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none"
                />
                <button className="ml-4 bg-[#5291B0] text-white font-semibold px-6 py-2 rounded-lg">
                    Balas
                </button>
            </div>

            {/* Komentar Terbaru */}
            <section>
                <h3 className="text-xl font-semibold mb-4">Komentar Terbaru</h3>
                <div className="space-y-4">
                    {comments.map((comment) => (
                        <div key={comment.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                            <div className="flex items-center space-x-4 mb-2">
                                <img src="/images/user.png" alt="User" className="w-8 h-8 rounded-full" />
                                <div>
                                    <p className="font-semibold text-gray-800">{comment.author}</p>
                                    <p className="text-gray-500 text-sm">{comment.time}</p>
                                </div>
                            </div>
                            <p className="text-gray-700 mb-2">{comment.content}</p>
                            <button className="text-sm font-semibold text-gray-500 hover:text-gray-700">Balas</button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ReplyDiscussionPage;
