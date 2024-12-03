const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const router = express.Router();
const db = require('../db'); // Impor koneksi database dari db.js

// Middleware untuk autentikasi token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token tidak ditemukan.' });
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user; // Simpan informasi pengguna di request
        next();
    } catch (err) {
        console.error('Token tidak valid:', err);
        res.status(403).json({ error: 'Token tidak valid.' });
    }
};

// Middleware untuk proteksi role admin
const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Akses ditolak. Hanya admin yang diizinkan.' });
    }
    next();
};

// Konfigurasi transporter Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL, // Email server
        pass: process.env.EMAIL_PASSWORD, // App password
    },
});

// Verifikasi koneksi SMTP
transporter.verify((error, success) => {
    if (error) {
        console.error('SMTP Connection Error:', error);
    } else {
        console.log('SMTP Server is ready to send emails.');
    }
});

// Endpoint untuk mengambil data pengguna berdasarkan token
router.get('/me', authenticateToken, async (req, res) => {
    try {
        const [user] = await db.query('SELECT id, name, email, role FROM users WHERE id = ?', [
            req.user.id,
        ]);

        if (user.length === 0) {
            return res.status(404).json({ error: 'Pengguna tidak ditemukan.' });
        }

        res.json(user[0]);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Gagal memuat data pengguna.' });
    }
});

// Endpoint registrasi
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Semua field harus diisi.' });
    }

    try {
        const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'Email sudah terdaftar.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [
            name,
            email,
            hashedPassword,
            'user',
        ]);

        res.status(201).json({ message: 'Registrasi berhasil.' });
    } catch (error) {
        console.error('Error saat registrasi:', error);
        res.status(500).json({ error: 'Terjadi kesalahan server.' });
    }
});

// Endpoint login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email dan password harus diisi.' });
    }

    try {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = rows[0];
        if (!user) {
            return res.status(400).json({ error: 'Email atau password salah.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Email atau password salah.' });
        }

        const token = jwt.sign(
            { id: user.id, name: user.name, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ message: 'Login berhasil.', token, role: user.role });
    } catch (error) {
        console.error('Error saat login:', error);
        res.status(500).json({ error: 'Terjadi kesalahan server.' });
    }
});

// Endpoint untuk mengirim email reset password
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email harus diisi.' });
    }

    try {
        const [rows] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Email tidak ditemukan.' });
        }

        const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET, { expiresIn: '15m' });
        const resetLink = `http://localhost:3000/reset-password/${token}`;

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: 'Reset Password',
            html: `<p>Klik link berikut untuk mereset password Anda:</p>
                   <a href="${resetLink}">${resetLink}</a>
                   <p>Link berlaku selama 15 menit.</p>`,
        });

        res.json({ message: 'Email reset password telah dikirim.' });
    } catch (error) {
        console.error('Error sending reset email:', error);
        res.status(500).json({ error: 'Terjadi kesalahan saat mengirim email.' });
    }
});

// Endpoint untuk reset password
router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!newPassword) {
        return res.status(400).json({ error: 'Password baru harus diisi.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, decoded.id]);

        res.json({ message: 'Password berhasil diperbarui.' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ error: 'Token tidak valid atau telah kedaluwarsa.' });
    }
});

module.exports = router;
