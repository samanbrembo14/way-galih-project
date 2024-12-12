const mysql = require('mysql2/promise');

// Konfigurasi koneksi database
const db = mysql.createPool({
    host: process.env.DB_HOST || '',
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || '',
});

// Tes koneksi database
(async () => {
    try {
        const connection = await db.getConnection();
        console.log('Koneksi ke database berhasil!');
        connection.release();
    } catch (error) {
        console.error('Koneksi ke database gagal:', error);
        process.exit(1);
    }
})();

module.exports = db;
