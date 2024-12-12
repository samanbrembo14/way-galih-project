import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMobileMenuOpen(false);
        }
    };

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMobileMenuOpen]);

    const scrollToAbout = () => {
        document.getElementById('about-us-section').scrollIntoView({
            behavior: 'smooth',
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f0f4fa] via-[#b0c4de] to-[#2F4C78] px-6 py-4">
            {/* Header */}
            <header className="flex justify-between items-center py-4">
                <h1 className="text-2xl font-bold text-gray-800">Way Galih Maju</h1>
                <div className="hidden lg:block">
                    <Link
                        to="/login"
                        className="px-6 py-2 border-2 border-[#1B2D48] text-[#1B2D48] rounded-lg font-semibold hover:bg-[#1B2D48] hover:text-white"
                    >
                        Login
                    </Link>
                </div>
                <div className="lg:hidden">
                    <button
                        onClick={toggleMobileMenu}
                        className="flex flex-col justify-center items-center w-10 h-10 border-2 border-[#1B2D48] rounded-md focus:outline-none hover:bg-[#1B2D48] hover:text-white"
                    >
                        {/* Hamburger Icon */}
                        <motion.div
                            className="w-6 h-1 bg-[#1B2D48] rounded-md mb-1"
                            animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                        <motion.div
                            className="w-6 h-1 bg-[#1B2D48] rounded-md"
                            animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        />
                        <motion.div
                            className="w-6 h-1 bg-[#1B2D48] rounded-md mt-1"
                            animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                    </button>
                </div>
            </header>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <motion.div
                    ref={menuRef}
                    className="lg:hidden absolute top-16 right-6 bg-white shadow-md rounded-lg p-4 z-10"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Link
                        to="/login"
                        className="block text-[#1B2D48] font-semibold py-2 hover:bg-gray-100 rounded-lg"
                        onClick={() => setMobileMenuOpen(false)} // Close menu on link click
                    >
                        Login
                    </Link>
                </motion.div>
            )}

            {/* Main Content */}
            <motion.div
                className="flex flex-col-reverse lg:flex-row-reverse items-center justify-between min-h-[80vh] gap-8"
                initial={{opacity: 0, y: 50}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8}}
            >
                {/* Teks dan Tombol */}
                <div className="text-center lg:text-left max-w-lg space-y-6">
                    <motion.h2
                        className="text-3xl lg:text-4xl font-bold text-gray-800"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.5, duration: 0.8}}
                    >
                        Halo, Selamat Datang
                    </motion.h2>
                    <motion.p
                        className="text-lg lg:text-2xl text-gray-700"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.7, duration: 0.8}}
                    >
                        Mari Bergabung dengan Komunitas Desa Way Galih
                    </motion.p>
                    <motion.button
                        onClick={scrollToAbout}
                        className="mt-4 px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold shadow-md hover:bg-gray-700 text-center"
                        whileHover={{
                            scale: 1.05,
                            boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
                            transition: {duration: 0.3},
                        }}
                        whileTap={{scale: 0.95}}
                    >
                        Target Desa
                    </motion.button>
                </div>

                {/* Gambar */}
                <motion.div
                    className="flex justify-center lg:justify-end mx-auto lg:mx-0"
                    initial={{scale: 0.8, opacity: 0}}
                    animate={{scale: 1, opacity: 1}}
                    transition={{delay: 1, duration: 0.8}}
                >
                    <img
                        src="/Images/komunitas.png"
                        alt="Chat Icon"
                        className="w-80 h-80 lg:w-[500px] lg:h-[500px] object-contain"
                    />
                </motion.div>
            </motion.div>

            {/* About Us Section */}
            <motion.section
                id="about-us-section"
                className="py-16 px-6 text-center relative"
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                transition={{duration: 1}}
            >
                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-white mb-8"
                    initial={{opacity: 0, scale: 0.8}}
                    whileInView={{opacity: 1, scale: 1}}
                    viewport={{once: false, amount: 0.5}}
                    transition={{
                        duration: 0.8,
                        ease: 'easeInOut',
                    }}
                >
                    Target SDG 8: Pekerjaan Layak dan Pertumbuhan Ekonomi
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div
                        className="relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 bg-gradient-to-br from-[#f0f4fa] via-[#b0c4de] to-[#2F4C78] w-full md:w-[90%] lg:w-[80%] mx-auto"
                        initial={{opacity: 0, y: 50}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: false, amount: 0.5}}
                        transition={{duration: 0.8}}
                    >
                        {/* Background Image */}
                        <img
                            src="/Images/pengumuman.png"
                            alt="Informasi dan Pengumuman"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                        {/* Text Content */}
                        <div className="relative p-6 text-white">
                            <h3 className="text-xl font-bold">Informasi dan Pengumuman</h3>
                            <p className="mt-2">
                                Menyediakan pengumuman penting dari admin desa yang mendukung peningkatan keterampilan
                                dan peluang kerja masyarakat.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 bg-gradient-to-br from-[#f0f4fa] via-[#b0c4de] to-[#2F4C78] w-full md:w-[90%] lg:w-[80%] mx-auto"
                        initial={{opacity: 0, y: 50}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: false, amount: 0.5}}
                        transition={{duration: 1}}
                    >
                        {/* Background Image */}
                        <img
                            src="/Images/diskusi.jpg"
                            alt="diskusi"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                        {/* Text Content */}
                        <div className="relative p-6 text-white">
                            <h3 className="text-xl font-bold">Diskusi Komunitas</h3>
                            <p className="mt-2">
                                Ruang untuk berdiskusi dan berbagi solusi inovatif dalam menciptakan peluang ekonomi
                                baru di desa.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 bg-gradient-to-br from-[#f0f4fa] via-[#b0c4de] to-[#2F4C78] w-full md:w-[90%] lg:w-[80%] mx-auto"
                        initial={{opacity: 0, y: 50}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: false, amount: 0.5}}
                        transition={{duration: 1.2}}
                    >
                        {/* Background Image */}
                        <img
                            src="/Images/video.jpg"
                            alt="Video"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                        {/* Text Content */}
                        <div className="relative p-6 text-white">
                            <h3 className="text-xl font-bold">Akses Video Edukasi</h3>
                            <p className="mt-2">
                                Memanfaatkan video edukasi berbasis YouTube untuk meningkatkan keterampilan kerja dan
                                produktivitas usaha masyarakat.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.section>
            {/* Panduan Section */}
            <motion.section
                id="panduan-section"
                className="py-16 px-6 text-center relative"
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                transition={{duration: 1}}
            >
                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-white mb-8"
                    initial={{opacity: 0, scale: 0.8}}
                    whileInView={{opacity: 1, scale: 1}}
                    viewport={{once: false, amount: 0.5}}
                    transition={{
                        duration: 0.8,
                        ease: 'easeInOut',
                    }}
                >
                    Panduan Meningkatkan Kemandirian Ekonomi Desa
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <motion.div
                        className="relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 bg-gradient-to-br from-[#e3f4fa] via-[#b0c4de] to-[#1B2D48] w-full lg:w-[90%] xl:w-[80%] mx-auto"
                        initial={{opacity: 0, y: 50}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: false, amount: 0.5}}
                        transition={{duration: 0.8}}
                    >
                        {/* Background Image */}
                        <img
                            src="/Images/pengumuman2.jpg"
                            alt="pengumuman"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                        {/* Text Content */}
                        <div className="relative p-6 text-white">
                            <h3 className="text-xl font-bold">Pengumuman Penting</h3>
                            <p className="mt-2">
                                Memberikan informasi terbaru tentang pelatihan keterampilan, peluang kerja, dan program
                                pengembangan ekonomi desa.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 bg-gradient-to-br from-[#e3f4fa] via-[#b0c4de] to-[#1B2D48] w-full lg:w-[90%] xl:w-[80%] mx-auto"
                        initial={{opacity: 0, y: 50}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: false, amount: 0.5}}
                        transition={{duration: 1}}
                    >
                        {/* Background Image */}
                        <img
                            src="/Images/forum.jpg"
                            alt="forum"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                        {/* Text Content */}
                        <div className="relative p-6 text-white">
                            <h3 className="text-xl font-bold">Kolaborasi Masyarakat</h3>
                            <p className="mt-2">
                                Mengadakan ruang diskusi untuk berbagi ide dan pengalaman dalam menciptakan usaha
                                mandiri yang mendukung pertumbuhan ekonomi lokal.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 bg-gradient-to-br from-[#e3f4fa] via-[#b0c4de] to-[#1B2D48] w-full lg:w-[90%] xl:w-[80%] mx-auto"
                        initial={{opacity: 0, y: 50}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: false, amount: 0.5}}
                        transition={{duration: 1.2}}
                    >
                        {/* Background Image */}
                        <img
                            src="/Images/video2.jpg"
                            alt="video akses"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                        {/* Text Content */}
                        <div className="relative p-6 text-white">
                            <h3 className="text-xl font-bold">Akses Edukasi Online</h3>
                            <p className="mt-2">
                                Menyediakan video pelatihan keterampilan seperti pengelolaan hasil tani, kerajinan
                                tangan, atau bisnis kecil melalui YouTube.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Footer */}
            <motion.footer
                className="bg-gray-800 text-white py-8 mt-8"
                initial={{opacity: 0, y: 50}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 1}}
                style={{position: "relative", left: "0", right: "0", width: "100%"}}
            >
                {/* Footer Content */}
                <div className="px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-2 text-left">
                            <h3 className="text-xl font-bold">Other Information</h3>
                            <p className="flex items-center">
                                <img src="/Images/marker.svg" alt="Location" className="w-5 h-5 mr-2"/>
                                <a
                                    href="https://maps.app.goo.gl/i7KYHQ2bzBYetYhc7"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:underline"
                                >
                                    Way Galih, Lampung Selatan
                                </a>
                            </p>
                            <p className="flex items-center">
                                <img src="/Images/envelope.svg" alt="Email" className="w-5 h-5 mr-2"/>
                                <a
                                    href="mailto:waygalih_12@gmail.com"
                                    className="text-blue-400 hover:underline"
                                >
                                    waygalih_12@gmail.com
                                </a>
                            </p>
                            <p className="flex items-center">
                                <img src="/Images/phone-call.svg" alt="Phone" className="w-5 h-5 mr-2"/>
                                <a
                                    href="tel:+6285856912088"
                                    className="text-blue-400 hover:underline"
                                >
                                    +62 858-5691-2088
                                </a>
                            </p>
                        </div>
                        <div className="space-y-2 text-left">
                            <h3 className="text-xl font-bold">Other Website</h3>
                            <p className="flex items-center">
                                <img src="/Images/globe.svg" alt="Website" className="w-5 h-5 mr-2"/>
                                <a
                                    href="https://webdesa.example.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:underline"
                                >
                                    Web Desa
                                </a>
                            </p>
                        </div>
                        <div className="space-y-2 text-left">
                            <h3 className="text-xl font-bold">Our Social Media</h3>
                            <p className="flex items-center">
                                <img src="/Images/facebook.svg" alt="Facebook" className="w-5 h-5 mr-2"/>
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:underline"
                                >
                                    Facebook
                                </a>
                            </p>
                            <p className="flex items-center">
                                <img src="/Images/instagram.svg" alt="Instagram" className="w-5 h-5 mr-2"/>
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:underline"
                                >
                                    Instagram
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="text-center mt-4 text-gray-500">
                        &copy; Copyright 2024 Way Galih Maju
                    </div>
                </div>
            </motion.footer>
        </div>
    );
};

export default LandingPage;
