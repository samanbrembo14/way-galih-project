const express = require('express');
const db = require('../db');
const router = express.Router();

// POST: Tambah diskusi baru
router.post('/', async (req, res) => {
    const { title, description, author } = req.body;

    console.log('Data diskusi baru:', { title, description, author });

    // Validasi input
    if (!title || !description || !author) {
        return res.status(400).json({ error: 'Semua field harus diisi.' });
    }

    try {
        await db.query('INSERT INTO discussions (title, description, author, status) VALUES (?, ?, ?, ?)', [
            title,
            description,
            author,
            'pending', // Status awal adalah pending
        ]);
        res.status(201).json({ message: 'Diskusi berhasil dikirim.' });
    } catch (error) {
        console.error('Error submitting discussion:', error);
        res.status(500).json({ error: 'Terjadi kesalahan saat menyimpan data.' });
    }
});

// GET: Ambil diskusi pending
router.get('/pending', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM discussions WHERE status = "pending" ORDER BY created_at DESC');
        console.log('Diskusi pending:', results);
        res.json(results);
    } catch (error) {
        console.error('Error fetching pending discussions:', error);
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil diskusi.' });
    }
});

// GET: Ambil semua diskusi yang disetujui
router.get('/', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM discussions WHERE status = "approved" ORDER BY created_at DESC');
        console.log('Diskusi approved:', results);
        res.json(results);
    } catch (error) {
        console.error('Error fetching approved discussions:', error);
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil diskusi.' });
    }
});

// GET: Detail diskusi berdasarkan ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    console.log('Memuat detail diskusi dengan ID:', id);

    try {
        const [result] = await db.query('SELECT * FROM discussions WHERE id = ?', [id]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Diskusi tidak ditemukan.' });
        }
        res.json(result[0]);
    } catch (error) {
        console.error('Error fetching discussion by ID:', error);
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil diskusi.' });
    }
});

// PUT: Setujui diskusi
router.put('/approve/:id', async (req, res) => {
    const { id } = req.params;

    console.log('Menyetujui diskusi dengan ID:', id);

    try {
        await db.query('UPDATE discussions SET status = "approved" WHERE id = ?', [id]);
        res.json({ message: 'Diskusi berhasil disetujui.' });
    } catch (error) {
        console.error('Error approving discussion:', error);
        res.status(500).json({ error: 'Terjadi kesalahan saat menyetujui diskusi.' });
    }
});

// DELETE: Tolak diskusi
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    console.log('Menolak diskusi dengan ID:', id);

    try {
        await db.query('DELETE FROM discussions WHERE id = ?', [id]);
        res.json({ message: 'Diskusi berhasil ditolak.' });
    } catch (error) {
        console.error('Error rejecting discussion:', error);
        res.status(500).json({ error: 'Terjadi kesalahan saat menolak diskusi.' });
    }
});

module.exports = router;
