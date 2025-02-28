// server.js
const express = require('express');
const { ttdl, ytmp3, ytmp4, igdl, fbdl, ytsearch } = require('ruhend-scraper');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Configuración básica de seguridad
app.use(cors());
app.use(express.static('public'));

// Limitar solicitudes (100 por 15 minutos)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// Endpoints de la API
app.get('/api/ttdl', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: 'Falta el parámetro URL' });
    const data = await ttdl(url);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/ytmp3', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: 'Falta el parámetro URL' });
    const data = await ytmp3(url);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/ytmp4', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: 'Falta el parámetro URL' });
    const data = await ytmp4(url);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/igdl', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: 'Falta el parámetro URL' });
    const result = await igdl(url);
    res.json(result.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/fbdl', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: 'Falta el parámetro URL' });
    const result = await fbdl(url);
    res.json(result.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/ytsearch', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: 'Falta el parámetro query' });
    const result = await ytsearch(query);
    res.json({ videos: result.video, channels: result.channel });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Servir documentación
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
