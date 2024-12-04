import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from './NavigationBar'; // Impor komponen NavigationBar

const HomePage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [carouselData, setCarouselData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/api/announcements')
            .then((response) => {
                const sortedData = response.data.sort(
                    (a, b) => new Date(b.date) - new Date(a.date)
                );
                setCarouselData(sortedData);
            })
            .catch((error) => console.error('Error fetching announcements:', error));
    }, []);

    const handleNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselData.length);
    };

    const handlePrevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + carouselData.length) % carouselData.length);
    };

    const handleInfoClick = (id) => {
        navigate(`/info-detail/${id}`);
    };

    return (
        <div className="min-h-screen bg-[#e6f0fa]">
            {/* Header */}
            <NavigationBar /> {/* Gunakan NavigationBar */}

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
                    {carouselData.length > 0 && (
                        <div
                            onClick={() => handleInfoClick(carouselData[currentSlide]?.id)}
                            className="bg-white p-6 rounded-lg shadow-md max-w-3xl w-full flex flex-col justify-between text-center overflow-hidden cursor-pointer"
                        >
                            <h2 className="text-2xl font-bold mb-4">{carouselData[currentSlide]?.title}</h2>
                            <p className="text-gray-700 mb-4">
                                {carouselData[currentSlide]?.description.length > 100
                                    ? `${carouselData[currentSlide]?.description.slice(0, 100)}...`
                                    : carouselData[currentSlide]?.description}
                            </p>
                            <img
                                src={`http://localhost:5000${carouselData[currentSlide]?.image}`}
                                alt={carouselData[currentSlide]?.title}
                                className="rounded-lg w-full h-auto sm:h-[400px] aspect-[4/3] object-cover"
                            />
                        </div>
                    )}
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
                                onClick={() => handleInfoClick(item.id)}
                                className="relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                            >
                                <img src={`http://localhost:5000${item.image}`} alt={item.title} className="w-full h-40 object-cover" />
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
