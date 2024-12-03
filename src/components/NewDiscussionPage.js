import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewDiscussionPage = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        author: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate(); // Untuk navigasi kembali

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validasi input form
        if (!formData.title || !formData.description || !formData.author) {
            setError('Semua field harus diisi.');
            setSuccess(false);
            return;
        }

        // Kirim data diskusi baru ke backend
        axios.post('http://localhost:5000/api/forum', formData)
            .then((response) => {
                console.log('Diskusi baru dibuat:', response.data); // Debugging
                setSuccess(true);
                alert('Diskusi baru telah dibuat dan menunggu persetujuan admin.');
                setFormData({ title: '', description: '', author: '' }); // Reset form
                setError(''); // Reset error
                navigate('/forum'); // Redirect ke halaman forum setelah sukses
            })
            .catch((error) => {
                console.error('Error saat mengirim data:', error);
                setError('Terjadi kesalahan saat mengirim data. Silakan coba lagi.');
                setSuccess(false);
            });
    };

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
                        to="/videos"
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

            {/* Form Buat Diskusi Baru */}
            <main className="mt-8 max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md border border-gray-200">
                <h2 className="text-2xl font-bold mb-6">Buat Diskusi Baru</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="title">
                            Judul Pertanyaan
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Masukan judul pertanyaan anda disini..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="description">
                            Uraian Pertanyaan
                        </label>
                        <textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Masukan uraian pertanyaan anda disini..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none h-40"
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="author">
                            Nama Penulis
                        </label>
                        <input
                            id="author"
                            type="text"
                            value={formData.author}
                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                            placeholder="Masukan nama penulis anda..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                        />
                    </div>

                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    {success && <p className="text-green-500 mb-4">Diskusi berhasil dibuat!</p>}

                    <div className="flex justify-between items-center">
                        <button
                            type="button"
                            onClick={() => navigate(-1)} // Navigasi kembali ke halaman sebelumnya
                            className="bg-gray-300 text-gray-700 font-semibold px-6 py-2 rounded-lg"
                        >
                            Kembali
                        </button>
                        <button
                            type="submit"
                            className="bg-[#5291B0] text-white font-semibold px-6 py-2 rounded-lg"
                        >
                            Buat Diskusi
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default NewDiscussionPage;
