const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

// Fungsi Fetch dengan Penyamaran Browser (User-Agent)
const fetchData = async (url, res) => {
    try {
        const response = await axios.get(url, {
            headers: {
                // Header ini PENTING agar tidak dibaca sebagai bot/spam
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Gagal terhubung ke server data.",
            debug: error.message
        });
    }
};

app.get('/api/tiktok', (req, res) => {
    const user = req.query.user;
    if (!user) return res.status(400).json({ error: "Username kosong" });
    fetchData(`https://api.lipz.site/api/discovery/st-tiktok?user=${user}`, res);
});

app.get('/api/instagram', (req, res) => {
    const user = req.query.user;
    if (!user) return res.status(400).json({ error: "Username kosong" });
    fetchData(`https://api.lipz.site/api/discovery/st-instagram?user=${user}`, res);
});

app.get('/api/pinterest', (req, res) => {
    const query = req.query.query;
    // Default limit agak banyak agar grid gambar terlihat bagus
    const limit = req.query.limit || 6; 
    
    if (!query) return res.status(400).json({ error: "Query kosong" });
    fetchData(`https://api.lipz.site/api/discovery/pinterest?query=${query}&limit=${limit}`, res);
});

app.get('/', (req, res) => {
    res.send('SANN404 SERVER RUNNING...');
});

module.exports = app;
