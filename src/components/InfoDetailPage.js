import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const InfoDetailPage = () => {
    const { id } = useParams(); // Mengambil parameter ID dari URL
    const navigate = useNavigate();

    // Data informasi (bisa juga diimpor dari file terpisah jika data besar)
    const infoData = [
        {
            id: 2,
            title: 'Informasi Kegiatan Gotong Royong',
            description: 'Deskripsi lengkap untuk kegiatan gotong royong...',
            image: '/images/gotong.jpg',
        },
        {
            id: 1,
            title: 'Jadwal Poskamling',
            description: 'Deskripsi lengkap untuk jadwal poskamling...',
            image: '/images/poskamling.jpg',
        },
        {
            id: 3,
            title: 'Musyawarah Desa',
            description: 'Deskripsi lengkap untuk musyawarah desa...',
            image: '/images/musdes.jpg',
        },
    ];

    // Cari informasi berdasarkan ID dari URL
    const info = infoData.find((item) => item.id === parseInt(id));

    if (!info) {
        return <p>Informasi tidak ditemukan.</p>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#e6f0fa] to-[#ffffff] p-8">
            {/* Tombol Kembali */}
            <button onClick={() => navigate(-1)} className="text-3xl text-gray-800 mb-8">
                &#8592;
            </button>

            {/* Konten Informasi */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Informasi Terbaru</h1>
            </div>

            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-[#2F4C78]">{info.title}</h2>
                <div className="flex flex-col md:flex-row">
                    <img src={info.image} alt={info.title} className="rounded-lg w-full md:w-1/3 h-auto mb-4 md:mr-6 object-cover" />
                    <p className="text-gray-700 text-lg">
                        {info.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default InfoDetailPage;
