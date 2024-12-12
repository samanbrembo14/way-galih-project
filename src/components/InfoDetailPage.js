import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const InfoDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [infoDetail, setInfoDetail] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return (
            <div className="min-h-screen bg-[#e6f0fa] flex items-center justify-center animate-fadeIn">
                <p className="text-gray-500 text-lg font-semibold">Memuat detail informasi...</p>
            </div>
        );
    }

    if (errorMessage) {
        return (
            <div className="min-h-screen bg-[#e6f0fa] flex flex-col items-center justify-center animate-fadeIn">
                <p className="text-red-500 text-lg font-semibold">{errorMessage}</p>
                <button
                    onClick={() => navigate(-1)}
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg transition-all duration-300"
                >
                    Kembali
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#e6f0fa] animate-fadeIn">
            <header className="bg-[#5a90b6] px-8 py-4 text-white shadow-md">
                <h1 className="text-2xl md:text-3xl font-bold tracking-wide">Detail Informasi</h1>
            </header>

            <main className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
                <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">{infoDetail.title}</h2>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">{infoDetail.description}</p>
                <p className="text-gray-500 text-sm mb-6">
                    Dipublikasikan pada: {new Date(infoDetail.date).toLocaleDateString()}
                </p>
                {infoDetail.image && (
                    <div className="flex justify-center mb-6">
                        <img
                            src={`http://localhost:5000${infoDetail.image}`}
                            alt={infoDetail.title}
                            className="w-full max-w-md md:max-w-lg h-auto rounded-lg shadow-xl object-cover"
                        />
                    </div>
                )}
                <button
                    onClick={() => navigate(-1)}
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 md:px-8 md:py-3 rounded-lg shadow-lg transition-all duration-300"
                >
                    Kembali
                </button>
            </main>
        </div>
    );
};

export default InfoDetailPage;
