require('dotenv').config(); // Pastikan ini ada di paling atas file
const express = require('express');
const cors = require('cors');
const path = require('path');

// Import routers
const announcementsRouter = require('./routes/announcements');
const forumRouter = require('./routes/forum');
const videosRoutes = require('./routes/videos');
const authRouter = require('./routes/auth');

const app = express();
const PORT = 5000;

// Middleware untuk CORS dan JSON parsing
app.use(cors());
app.use(express.json());

// Route untuk autentikasi
app.use('/api/auth', authRouter);
console.log('Auth routes tersedia di /api/auth');

// Middleware untuk menyajikan file di folder uploads
app.use('/uploads', express.static('uploads'));
console.log('Static uploads tersedia di /uploads');

// Route untuk pengumuman
app.use('/api/announcements', announcementsRouter);
console.log('Announcements routes tersedia di /api/announcements');

// Route untuk forum diskusi
app.use('/api/forum', forumRouter);
console.log('Forum routes tersedia di /api/forum');

// Route untuk video
app.use('/api/videos', videosRoutes);
console.log('Video routes tersedia di /api/videos');

// Endpoint untuk tes kesehatan server
app.get('/', (req, res) => {
    res.send('Server berjalan');
});

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
