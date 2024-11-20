import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();

    const carouselData = [
        {
            id: 1,  // Tambahkan ID untuk setiap item agar mudah diidentifikasi
            title: 'Jadwal Poskamling',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In bibendum augue ut mauris facilisis malesuada.',
            image: '/images/poskamling.jpg'
        },
        {
            id: 2,
            title: 'Kegiatan Gotong Royong',
            description: 'Kegiatan gotong royong yang dilaksanakan di desa untuk menjaga kebersihan dan kerukunan warga.',
            image: '/images/gotong.jpg'
        },
        {
            id: 3,
            title: 'Musyawarah Desa',
            description: 'Diskusi dan musyawarah warga desa untuk membahas kepentingan bersama dan pengembangan desa.',
            image: '/images/musdes.jpg'
        },
    ];

    const handleNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselData.length);
    };

    const handlePrevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + carouselData.length) % carouselData.length);
    };

    const handleInfoClick = (id) => {
        navigate(`/info-detail/${id}`);  // Mengarahkan ke halaman detail sesuai ID item
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
            <main className="p-8">
                {/* Carousel */}
                <div className="flex items-center justify-center space-x-4 mb-8">
                    <button
                        onClick={handlePrevSlide}
                        className="text-3xl text-white bg-[#4B7C95] p-3 rounded-full focus:outline-none"
                    >
                        &#10094;
                    </button>
                    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl w-full h-[400px] flex flex-col justify-between text-center">
                        <h2 className="text-2xl font-bold mb-4">{carouselData[currentSlide].title}</h2>
                        <p className="text-gray-700 mb-4">
                            {carouselData[currentSlide].description}
                        </p>
                        <img src={carouselData[currentSlide].image} alt={carouselData[currentSlide].title} className="rounded-lg w-full h-52 object-cover" />
                    </div>
                    <button
                        onClick={handleNextSlide}
                        className="text-3xl text-white bg-[#4B7C95] p-3 rounded-full focus:outline-none"
                    >
                        &#10095;
                    </button>
                </div>

                {/* Informasi Terbaru */}
                <section>
                    <h3 className="text-2xl font-bold mb-4">Informasi Terbaru</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {carouselData.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => handleInfoClick(item.id)} // Navigasi ke halaman detail sesuai ID
                                className="relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                            >
                                <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
                                <div className="absolute bottom-0 bg-[#5291B0] text-white text-center w-full py-2">
                                    <h4 className="text-lg font-semibold">{item.title}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default HomePage;
