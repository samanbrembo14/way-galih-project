import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DiscussionEmbed } from 'disqus-react';

const ReplyDiscussionPage = () => {
    const { id } = useParams(); // ID diskusi dari URL
    const navigate = useNavigate(); // Untuk navigasi tombol kembali
    const [discussion, setDiscussion] = useState(null);
    const [loading, setLoading] = useState(true); // Status loading
    const [error, setError] = useState(''); // Pesan error

    // Fetch detail diskusi
    useEffect(() => {
        const fetchDiscussion = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/forum/${id}`);
                if (response.data) {
                    setDiscussion(response.data);
                    setError('');
                } else {
                    setError('Diskusi tidak ditemukan. Silakan coba lagi.');
                }
            } catch (err) {
                console.error('Error fetching discussion:', err);
                setError(err.response?.data?.error || 'Gagal memuat diskusi. Silakan coba lagi.');
            } finally {
                setLoading(false);
            }
        };

        fetchDiscussion();
    }, [id]);

    // Jika sedang memuat
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#e6f0fa] to-[#ffffff]">
                <p className="text-gray-500">Memuat diskusi...</p>
            </div>
        );
    }

    // Jika terjadi error
    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#e6f0fa] to-[#ffffff]">
                <p className="text-red-500 text-lg">{error}</p>
                <button
                    onClick={() => navigate(-1)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-4 shadow hover:bg-blue-600"
                >
                    Kembali
                </button>
            </div>
        );
    }

    // Konfigurasi Disqus
    const disqusShortname = "waygalih"; // Ganti dengan Shortname Disqus Anda
    const disqusConfig = {
        url: `http://localhost:3000/reply-discussion/${id}`, // URL halaman ini
        identifier: id.toString(), // ID unik diskusi
        title: discussion.title, // Judul diskusi
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#e6f0fa] to-[#ffffff]">
            {/* Header */}
            <header className="bg-gradient-to-r from-[#2F4C78] to-[#5a90b6] text-white p-6 shadow-lg rounded-b-lg">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-extrabold tracking-wide mb-2">{discussion.title}</h1>
                    <p className="text-sm">
                        <span className="font-semibold">Oleh: </span>{discussion.author || 'Anonim'}
                    </p>
                    <p className="text-xs text-gray-300 mt-1">
                        {discussion.time ? new Date(discussion.time).toLocaleString() : 'Waktu tidak tersedia'}
                    </p>
                </div>
            </header>

            {/* Tombol Kembali */}
            <div className="max-w-4xl mx-auto mt-4">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow"
                >
                    &larr; Kembali
                </button>
            </div>

            {/* Konten */}
            <main className="max-w-4xl mx-auto p-6 bg-white mt-6 rounded-lg shadow-md border border-gray-200">
                {/* Isi Forum */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Isi Forum</h2>
                    <p className="text-lg text-gray-700 leading-relaxed bg-gray-100 p-4 rounded-lg shadow-sm">
                        {discussion.description}
                    </p>
                </section>

                {/* Pemisah */}
                <div className="my-6 flex items-center">
                    <hr className="flex-grow border-gray-300" />
                    <span className="px-4 text-gray-500 font-semibold">Komentar</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                {/* Komentar Disqus */}
                <section className="mt-8">
                    <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                        <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ReplyDiscussionPage;
