import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const InfoDetailPage = () => {
    const { id } = useParams(); // Ambil ID dari URL
    const navigate = useNavigate();
    const [infoDetail, setInfoDetail] = useState(null); // State untuk detail informasi
    const [errorMessage, setErrorMessage] = useState(''); // Pesan error
    const [loading, setLoading] = useState(true); // Status loading

    // Fetch detail informasi dari backend
    useEffect(() => {
        const fetchInfoDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/announcements/${id}`);
                setInfoDetail(response.data);
                setErrorMessage('');
            } catch (error) {
                console.error('Error fetching info detail:', error);
                setErrorMessage(
                    error.response?.data?.error || 'Gagal memuat detail informasi.'
                );
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchInfoDetail();
        } else {
            setErrorMessage('ID tidak valid.');
            setLoading(false);
        }
    }, [id]);

    // Jika sedang memuat
    if (loading) {
        return (
            <div className="min-h-screen bg-[#e6f0fa] flex items-center justify-center">
                <p className="text-gray-500">Memuat detail informasi...</p>
            </div>
        );
    }

    // Jika terjadi error
    if (errorMessage) {
        return (
            <div className="min-h-screen bg-[#e6f0fa] flex flex-col items-center justify-center">
                <p className="text-red-500">{errorMessage}</p>
                <button
                    onClick={() => navigate(-1)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                >
                    Kembali
                </button>
            </div>
        );
    }

    // Jika data berhasil dimuat
    return (
        <div className="min-h-screen bg-[#e6f0fa]">
            <header className="bg-[#5a90b6] px-8 py-4 text-white">
                <h1 className="text-2xl font-bold">Detail Informasi</h1>
            </header>

            <main className="max-w-4xl mx-auto p-8 bg-white rounded shadow-md mt-8">
                <h2 className="text-3xl font-bold mb-4">{infoDetail.title}</h2>
                <p className="text-gray-700 mb-6">{infoDetail.description}</p>
                <p className="text-gray-500 text-sm mb-4">
                    Dipublikasikan pada: {new Date(infoDetail.date).toLocaleDateString()}
                </p>
                {infoDetail.image && (
                    <div className="flex justify-center mb-6">
                        <img
                            src={`http://localhost:5000${infoDetail.image}`}
                            alt={infoDetail.title}
                            className="w-full max-w-md h-auto rounded-lg shadow-lg object-cover"
                        />
                    </div>
                )}
                <button
                    onClick={() => navigate(-1)}
                    className="bg-blue-500 text-white px-6 py-3 rounded"
                >
                    Kembali
                </button>
            </main>
        </div>
    );
};

export default InfoDetailPage;
