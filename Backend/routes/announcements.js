const express = require('express');
const multer = require('multer');
const db = require('../db'); // Koneksi database
const router = express.Router();

// Konfigurasi multer untuk upload file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Maksimal 5MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Tipe file tidak valid. Hanya JPEG, PNG, atau GIF yang diperbolehkan.'));
        }
    },
});

// Tambahkan pengumuman
router.post('/', upload.single('image'), async (req, res) => {
    const { title, description, date } = req.body;

    console.log('Data yang diterima dari frontend:', { title, description, date });

    // Validasi input
    if (!title || !description || !date) {
        return res.status(400).json({ error: 'Semua field harus diisi.' });
    }

    try {
        const image = req.file ? `/uploads/${req.file.filename}` : null;
        console.log('Gambar yang diterima:', image);

        await db.query('INSERT INTO announcements (title, description, image, date) VALUES (?, ?, ?, ?)', [
            title,
            description,
            image,
            date,
        ]);
        res.status(201).json({ message: 'Pengumuman berhasil ditambahkan.' });
    } catch (error) {
        console.error('Error adding announcement:', error);
        res.status(500).json({ error: 'Terjadi kesalahan saat menyimpan data.' });
    }
});

// Ambil semua pengumuman
router.get('/', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM announcements ORDER BY date DESC');
        res.json(results);
    } catch (error) {
        console.error('Error fetching announcements:', error);
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil pengumuman.' });
    }
});

// Ambil detail pengumuman berdasarkan ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [results] = await db.query('SELECT * FROM announcements WHERE id = ?', [id]);

        if (results.length === 0) {
            return res.status(404).json({ error: 'Informasi tidak ditemukan.' });
        }

        res.json(results[0]); // Kirim data detail
    } catch (error) {
        console.error('Error fetching announcement detail:', error);
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil detail informasi.' });
    }
});

// Hapus pengumuman
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await db.query('DELETE FROM announcements WHERE id = ?', [id]);
        res.json({ message: 'Pengumuman berhasil dihapus.' });
    } catch (error) {
        console.error('Error deleting announcement:', error);
        res.status(500).json({ error: 'Terjadi kesalahan saat menghapus pengumuman.' });
    }
});

// Edit pengumuman
router.put('/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { title, description, date } = req.body;

    console.log('Data update:', { title, description, date });

    // Validasi input
    if (!title || !description || !date) {
        return res.status(400).json({ error: 'Semua field harus diisi.' });
    }

    try {
        const image = req.file ? `/uploads/${req.file.filename}` : null;
        const updateQuery = image
            ? 'UPDATE announcements SET title = ?, description = ?, image = ?, date = ? WHERE id = ?'
            : 'UPDATE announcements SET title = ?, description = ?, date = ? WHERE id = ?';
        const queryParams = image
            ? [title, description, image, date, id]
            : [title, description, date, id];

        await db.query(updateQuery, queryParams);
        res.json({ message: 'Pengumuman berhasil diperbarui.' });
    } catch (error) {
        console.error('Error updating announcement:', error);
        res.status(500).json({ error: 'Terjadi kesalahan saat memperbarui data.' });
    }
});

module.exports = router;
