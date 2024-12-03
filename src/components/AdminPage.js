import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('persetujuan');
    const [announcements, setAnnouncements] = useState([]);
    const [formData, setFormData] = useState({ title: '', description: '', date: '' });
    const [file, setFile] = useState(null);
    const [editId, setEditId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [pendingDiscussions, setPendingDiscussions] = useState([]);
    const navigate = useNavigate();

    // Fetch data dari backend
    useEffect(() => {
        if (activeTab === 'pengumuman') fetchAnnouncements();
        if (activeTab === 'persetujuan') fetchPendingDiscussions();
    }, [activeTab]);

    // Fetch pengumuman
    const fetchAnnouncements = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/announcements');
            setAnnouncements(response.data);
        } catch (error) {
            console.error('Error fetching announcements:', error);
            setErrorMessage('Gagal memuat pengumuman.');
        }
    };

    // Fetch diskusi pending
    const fetchPendingDiscussions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/forum/pending');
            setPendingDiscussions(response.data);
        } catch (error) {
            console.error('Error fetching discussions:', error);
            setErrorMessage('Gagal memuat diskusi pending.');
        }
    };

    const validateFile = (file) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        return allowedTypes.includes(file.type);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && !validateFile(selectedFile)) {
            setErrorMessage('Format file tidak valid. Hanya diperbolehkan JPEG, PNG, atau GIF.');
            setFile(null);
        } else {
            setErrorMessage('');
            setFile(selectedFile);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.description || !formData.date) {
            setErrorMessage('Semua field harus diisi.');
            return;
        }

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('date', formData.date);
        if (file) data.append('image', file);

        try {
            if (editId) {
                await axios.put(`http://localhost:5000/api/announcements/${editId}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                setAnnouncements((prev) =>
                    prev.map((a) => (a.id === editId ? { ...a, ...formData } : a))
                );
                setSuccessMessage('Pengumuman berhasil diperbarui.');
            } else {
                const response = await axios.post('http://localhost:5000/api/announcements', data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                setAnnouncements((prev) => [...prev, response.data]);
                setSuccessMessage('Pengumuman berhasil ditambahkan.');
            }
            resetForm();
        } catch (error) {
            console.error('Error submitting announcement:', error);
            setErrorMessage(error.response?.data?.error || 'Terjadi kesalahan saat menyimpan data.');
        }

        setTimeout(() => {
            setErrorMessage('');
            setSuccessMessage('');
        }, 3000);
    };

    const resetForm = () => {
        setFormData({ title: '', description: '', date: '' });
        setFile(null);
        setEditId(null);
    };

    const handleEdit = (announcement) => {
        setFormData({
            title: announcement.title,
            description: announcement.description,
            date: announcement.date,
        });
        setEditId(announcement.id);
        setSuccessMessage('');
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/announcements/${id}`);
            setAnnouncements((prev) => prev.filter((a) => a.id !== id));
            setSuccessMessage('Pengumuman berhasil dihapus.');
        } catch (error) {
            console.error('Error deleting announcement:', error);
            setErrorMessage('Terjadi kesalahan saat menghapus data.');
        }

        setTimeout(() => {
            setErrorMessage('');
            setSuccessMessage('');
        }, 3000);
    };

    const handleApproveDiscussion = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/forum/approve/${id}`);
            setPendingDiscussions((prev) => prev.filter((d) => d.id !== id));
            setSuccessMessage('Diskusi berhasil disetujui.');
        } catch (error) {
            console.error('Error approving discussion:', error);
            setErrorMessage('Gagal menyetujui diskusi.');
        }

        setTimeout(() => {
            setErrorMessage('');
            setSuccessMessage('');
        }, 3000);
    };

    const handleRejectDiscussion = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/forum/${id}`);
            setPendingDiscussions((prev) => prev.filter((d) => d.id !== id));
            setSuccessMessage('Diskusi berhasil ditolak.');
        } catch (error) {
            console.error('Error rejecting discussion:', error);
            setErrorMessage('Gagal menolak diskusi.');
        }

        setTimeout(() => {
            setErrorMessage('');
            setSuccessMessage('');
        }, 3000);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-[#e6f0fa]">
            <header className="flex justify-between items-center bg-[#5a90b6] px-8 py-4 text-white">
                <h1 className="text-2xl font-bold">Way Galih Maju - Admin</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </header>

            <div className="flex justify-center bg-[#2F4C78] text-white">
                <button
                    onClick={() => setActiveTab('persetujuan')}
                    className={`px-6 py-2 ${activeTab === 'persetujuan' ? 'bg-white text-[#2F4C78]' : ''}`}
                >
                    Persetujuan
                </button>
                <button
                    onClick={() => setActiveTab('pengumuman')}
                    className={`px-6 py-2 ${activeTab === 'pengumuman' ? 'bg-white text-[#2F4C78]' : ''}`}
                >
                    Pengumuman
                </button>
            </div>

            <main className="p-8">
                {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
                {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

                {activeTab === 'persetujuan' && (
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Persetujuan Postingan</h2>
                        {pendingDiscussions.length > 0 ? (
                            pendingDiscussions.map((discussion) => (
                                <div key={discussion.id} className="border p-4 rounded bg-white mb-4">
                                    <h3 className="font-bold">{discussion.title}</h3>
                                    <p>{discussion.description}</p>
                                    <p>{'   '}</p>
                                    <div className="flex space-x-4">
                                        <button
                                            onClick={() => handleApproveDiscussion(discussion.id)}
                                            className="bg-green-500 px-4 py-2 text-white rounded"
                                        >
                                            Setujui
                                        </button>
                                        <button
                                            onClick={() => handleRejectDiscussion(discussion.id)}
                                            className="bg-red-500 px-4 py-2 text-white rounded"
                                        >
                                            Tolak
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">Tidak ada diskusi pending.</p>
                        )}
                    </div>
                )}

                {activeTab === 'pengumuman' && (
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Kelola Pengumuman</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Judul"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="border p-2 w-full"
                            />
                            <textarea
                                placeholder="Deskripsi"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="border p-2 w-full"
                            />
                            <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="border p-2 w-full"
                            />
                            <input type="file" onChange={handleFileChange} className="border p-2 w-full" />
                            <button type="submit" className="bg-blue-500 px-4 py-2 text-white">
                                {editId ? 'Update' : 'Tambah'} Pengumuman
                            </button>
                        </form>
                        {announcements.map((announcement) => (
                            <div key={announcement.id} className="border p-4 rounded mb-4">
                                <h3 className="font-bold">{announcement.title}</h3>
                                <p>{announcement.description}</p>
                                <p className="text-sm">{announcement.date}</p>
                                <div className="flex space-x-4">
                                    <button
                                        onClick={() => handleEdit(announcement)}
                                        className="bg-yellow-500 px-4 py-2 text-white rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(announcement.id)}
                                        className="bg-red-500 px-4 py-2 text-white rounded"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminPage;
