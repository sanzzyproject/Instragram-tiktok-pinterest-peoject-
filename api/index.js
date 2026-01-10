const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Mengizinkan akses dari mana saja (CORS Enabled)
app.use(cors());
app.use(express.json());

// Helper function untuk fetch data
const fetchData = async (url, res) => {
    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Gagal mengambil data dari server pusat.",
            error_detail: error.message
        });
    }
};

// Endpoint 1: TikTok Stalker
app.get('/api/tiktok', (req, res) => {
    const user = req.query.user;
    if (!user) return res.status(400).json({ error: "Parameter 'user' wajib diisi" });
    
    fetchData(`https://api.lipz.site/api/discovery/st-tiktok?user=${user}`, res);
});

// Endpoint 2: Instagram Stalker
app.get('/api/instagram', (req, res) => {
    const user = req.query.user;
    if (!user) return res.status(400).json({ error: "Parameter 'user' wajib diisi" });

    fetchData(`https://api.lipz.site/api/discovery/st-instagram?user=${user}`, res);
});

// Endpoint 3: Pinterest Search
app.get('/api/pinterest', (req, res) => {
    const query = req.query.query;
    const limit = req.query.limit || 5;
    
    if (!query) return res.status(400).json({ error: "Parameter 'query' wajib diisi" });

    fetchData(`https://api.lipz.site/api/discovery/pinterest?query=${query}&limit=${limit}`, res);
});

// Default route
app.get('/', (req, res) => {
    res.send('SANN404 Backend Server is Running.');
});

// Export untuk Vercel Serverless
module.exports = app;

// Jalankan server lokal jika file dijalankan langsung
if (require.main === module) {
    app.listen(3000, () => console.log('Server berjalan di port 3000'));
}
