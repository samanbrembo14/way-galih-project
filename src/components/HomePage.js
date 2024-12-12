import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from './NavigationBar';
import { useSwipeable } from 'react-swipeable';

const HomePage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [carouselData, setCarouselData] = useState([]);
    const navigate = useNavigate();
    const autoSlideInterval = 2000;

    useEffect(() => {
        // Fetch data dari API
        axios.get('http://localhost:5000/api/announcements')
            .then((response) => {
                const sortedData = response.data.sort(
                    (a, b) => new Date(b.date) - new Date(a.date)
                );
                setCarouselData(sortedData);
            })
            .catch((error) => console.error('Error fetching announcements:', error));
    }, []);

    // Bungkus handleNextSlide dengan useCallback
    const handleNextSlide = useCallback(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselData.length);
    }, [carouselData.length]);

    const handlePrevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + carouselData.length) % carouselData.length);
    };

    const handleInfoClick = (id) => {
        navigate(`/info-detail/${id}`);
    };

    // Auto-slide dengan interval
    useEffect(() => {
        const interval = setInterval(handleNextSlide, autoSlideInterval);
        return () => clearInterval(interval);
    }, [handleNextSlide]); // Tambahkan handleNextSlide sebagai dependensi

    const handlers = useSwipeable({
        onSwipedLeft: handleNextSlide,
        onSwipedRight: handlePrevSlide,
    });

    return (
        <div className="min-h-screen bg-[#e6f0fa]">
            {/* Header */}
            <NavigationBar />

            {/* Konten Utama */}
            <main className="p-8">
                {/* Carousel */}
                <div className="relative flex items-center justify-center mb-8 group" {...handlers}>
                    <button
                        onClick={handlePrevSlide}
                        className="absolute left-4 z-10 text-white bg-black bg-opacity-50 p-3 rounded-full focus:outline-none hidden group-hover:flex"
                    >
                        &#10094;
                    </button>

                    {carouselData.length > 0 && (
                        <div
                            onClick={() => handleInfoClick(carouselData[currentSlide]?.id)}
                            className="relative w-full max-w-4xl overflow-hidden cursor-pointer rounded-lg shadow-lg"
                        >
                            <div className="aspect-[16/9] w-full relative">
                                <img
                                    src={`http://localhost:5000${carouselData[currentSlide]?.image}`}
                                    alt={carouselData[currentSlide]?.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div
                                className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-4 sm:p-6">
                                <h2 className="text-lg sm:text-2xl font-bold text-white mb-2">
                                    {carouselData[currentSlide]?.title}
                                </h2>
                                <p className="text-xs sm:text-sm text-white">
                                    {carouselData[currentSlide]?.description.length > 100
                                        ? `${carouselData[currentSlide]?.description.slice(0, 100)}...`
                                        : carouselData[currentSlide]?.description}
                                </p>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={handleNextSlide}
                        className="absolute right-4 z-10 text-white bg-black bg-opacity-50 p-3 rounded-full focus:outline-none hidden group-hover:flex"
                    >
                        &#10095;
                    </button>

                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                        {carouselData.map((_, index) => (
                            <span
                                key={index}
                                className={`w-3 h-3 rounded-full ${
                                    index === currentSlide ? 'bg-white' : 'bg-gray-400'
                                }`}
                            ></span>
                        ))}
                    </div>
                </div>

                <section>
                    <h3 className="text-2xl font-bold mb-4">Informasi Terbaru</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {carouselData.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => handleInfoClick(item.id)}
                                className="relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105 hover:shadow-lg"
                            >
                                <img
                                    src={`http://localhost:5000${item.image}`}
                                    alt={item.title}
                                    className="w-full h-40 object-cover"
                                />
                                <div className="absolute bottom-0 bg-[#5291B0] text-white text-center w-full py-2">
                                    <h4 className="text-lg font-semibold">{item.title}</h4>
                                    <p className="text-sm">{item.date}</p>
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
