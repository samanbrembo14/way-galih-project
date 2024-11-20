import React, { useState } from 'react';

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('laporan'); // Tab moderasi aktif
    const [mainContent, setMainContent] = useState('home'); // Konten utama yang ditampilkan

    // Fungsi untuk mengganti konten utama
    const handleContentChange = (content) => {
        setMainContent(content);
    };

    return (
        <div className="min-h-screen bg-[#e6f0fa]">
            {/* Header */}
            <header className="flex justify-between items-center bg-[#5a90b6] px-8 py-4 text-white">
                <div className="flex items-center space-x-4">
                    <img src="/images/logo.png" alt="Logo" className="w-10 h-10" />
                    <h1 className="text-2xl font-bold">Way Galih Maju - Admin</h1>
                </div>
                <nav className="space-x-8">
                    <button
                        onClick={() => handleContentChange('home')}
                        className={`px-4 py-2 rounded-full font-semibold ${
                            mainContent === 'home' ? 'bg-[#2F4C78] text-white' : 'hover:text-gray-300'
                        }`}
                    >
                        Home
                    </button>
                    <button
                        onClick={() => handleContentChange('forum')}
                        className={`px-4 py-2 rounded-full font-semibold ${
                            mainContent === 'forum' ? 'bg-[#2F4C78] text-white' : 'hover:text-gray-300'
                        }`}
                    >
                        Forum Diskusi
                    </button>
                    <button
                        onClick={() => handleContentChange('video')}
                        className={`px-4 py-2 rounded-full font-semibold ${
                            mainContent === 'videos' ? 'bg-[#2F4C78] text-white' : 'hover:text-gray-300'
                        }`}
                    >
                        Video Belajar
                    </button>
                    <button
                        onClick={() => handleContentChange('moderasi')}
                        className={`px-4 py-2 rounded-full font-semibold ${
                            mainContent === 'moderasi' ? 'bg-[#2F4C78] text-white' : 'hover:text-gray-300'
                        }`}
                    >
                        Moderasi
                    </button>
                </nav>
                <div className="flex items-center">
                    <div className="bg-white p-2 rounded-full flex items-center justify-center">
                        <img src="/Images/user.png" alt="Admin Icon" className="w-5 h-5 rounded-full" />
                    </div>
                    <span className="text-white ml-2 font-semibold">Admin</span>
                </div>
            </header>

            {/* Tab Moderasi */}
            {mainContent === 'moderasi' && (
                <div className="flex justify-center bg-[#2F4C78] text-white">
                    <button
                        onClick={() => setActiveTab('laporan')}
                        className={`px-6 py-2 ${activeTab === 'laporan' ? 'bg-white text-[#2F4C78]' : ''}`}
                    >
                        Laporan Postingan
                    </button>
                    <button
                        onClick={() => setActiveTab('persetujuan')}
                        className={`px-6 py-2 ${activeTab === 'persetujuan' ? 'bg-white text-[#2F4C78]' : ''}`}
                    >
                        Persetujuan Postingan
                    </button>
                    <button
                        onClick={() => setActiveTab('pengumuman')}
                        className={`px-6 py-2 ${activeTab === 'pengumuman' ? 'bg-white text-[#2F4C78]' : ''}`}
                    >
                        Pengumuman
                    </button>
                </div>
            )}

            {/* Konten Utama */}
            <main className="p-8">
                {mainContent === 'home' && (
                    <div>
                        <h2 className="text-3xl font-bold mb-6 text-center">Halaman Home (Admin)</h2>
                        <p>Selamat datang di halaman informasi sebagai admin.</p>
                        {/* Tambahkan konten khusus untuk Home Page */}
                    </div>
                )}
                {mainContent === 'forum' && (
                    <div>
                        <h2 className="text-3xl font-bold mb-6 text-center">Forum Diskusi (Admin)</h2>
                        <p>Selamat datang di halaman forum diskusi sebagai admin.</p>
                        {/* Tambahkan konten khusus untuk Forum Diskusi */}
                    </div>
                )}
                {mainContent === 'video' && (
                    <div>
                        <h2 className="text-3xl font-bold mb-6 text-center">Video Belajar (Admin)</h2>
                        <p>Selamat datang di halaman video belajar sebagai admin.</p>
                        {/* Tambahkan konten khusus untuk Video Belajar */}
                    </div>
                )}
                {mainContent === 'moderasi' && (
                    <div>
                        <h2 className="text-3xl font-bold mb-6 text-center">Moderasi (Admin)</h2>
                        {activeTab === 'laporan' && <p>Ini adalah bagian laporan postingan.</p>}
                        {activeTab === 'persetujuan' && <p>Ini adalah bagian persetujuan postingan.</p>}
                        {activeTab === 'pengumuman' && <p>Ini adalah bagian pengumuman.</p>}
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminPage;
