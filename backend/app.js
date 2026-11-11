const express = require('express');
const cors = require('cors');
const path = require('path');

const productsRouter = require('./routes/products');
const inquiryRouter = require('./routes/inquiry');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve catalog media locally in Express; on Vercel, /media/* is served from Static CDN (frontend/dist/media)
if (!process.env.VERCEL) {
  const mediaPath = path.join(__dirname, 'public', 'media');
  app.use('/media', express.static(mediaPath));
}

// API Routes
app.use('/api/products', productsRouter);
app.use('/api/inquire', inquiryRouter);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'uk-fashion-monolith',
    brand: 'UK Fashion',
    designer: 'Khan Jee Collection (@kj_.collection)',
    timestamp: new Date().toISOString()
  });
});

// Return JSON 404 for unknown API routes before SPA fallback
app.use('/api', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API route not found: ${req.method} ${req.originalUrl}`
  });
});

module.exports = app;

