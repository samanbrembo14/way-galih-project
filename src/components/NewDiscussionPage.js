import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from './NavigationBar'; // Impor komponen NavigationBar

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

    const handleBack = () => {
        if (window.history.length > 2) {
            navigate(-1); // Kembali ke halaman sebelumnya jika ada
        } else {
            navigate('/forum'); // Fallback ke halaman forum jika tidak ada history sebelumnya
        }
    };

    return (
        <div className="min-h-screen bg-[#e6f0fa]">
            {/* Header */}
            <NavigationBar /> {/* Gunakan NavigationBar */}

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
                            onClick={handleBack} // Menggunakan fungsi handleBack
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
