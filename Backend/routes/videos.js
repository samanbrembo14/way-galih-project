const express = require('express');
const axios = require('axios');
const router = express.Router();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY; // API Key dari .env

// GET: Pencarian video YouTube
router.get('/search', async (req, res) => {
    const { query } = req.query;

    // Validasi query
    if (!query) {
        return res.status(400).json({ error: 'Query pencarian harus diberikan' });
    }

    // Tambahkan pengecekan API Key
    if (!YOUTUBE_API_KEY) {
        console.error('YOUTUBE_API_KEY tidak terdefinisi');
        return res.status(500).json({
            error: 'YouTube API Key tidak terkonfigurasi',
            details: 'Periksa environment variable YOUTUBE_API_KEY'
        });
    }

    try {
        console.log('Query dari frontend:', query);
        console.log('Menggunakan API Key:', YOUTUBE_API_KEY.substring(0, 5) + '...'); // Log sebagian API Key

        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                part: 'snippet',
                q: query,
                type: 'video',
                maxResults: 10,
                key: YOUTUBE_API_KEY,
            },
        });

        console.log('Respons YouTube API:', JSON.stringify(response.data, null, 2));

        const videos = (response.data.items || []).map((video) => ({
            id: video.id?.videoId || null,
            title: video.snippet?.title || 'No Title',
            description: video.snippet?.description || 'No Description',
            thumbnail: video.snippet?.thumbnails?.medium?.url || '',
        }));

        res.json(videos);
    } catch (error) {
        // Log error yang lebih detail
        console.error('Error fetching videos from YouTube:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            headers: error.response?.headers
        });

        // Kirim pesan error yang lebih spesifik
        res.status(500).json({
            error: 'Gagal mendapatkan data dari YouTube',
            details: error.response?.data || error.message
        });
    }
});

module.exports = router;
