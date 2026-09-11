const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const apiRouter = require('./backend/routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (req.path.startsWith('/api')) {
      console.log(`[API] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
    }
  });
  next();
});

// REST API
app.use('/api', apiRouter);

// Static assets & files
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname)));

// Specific view routes
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Website.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log('========================================================');
  console.log(`  StyleNest Full-Stack Server Running on Port ${PORT}`);
  console.log(`  Storefront:     http://localhost:${PORT}/`);
  console.log(`  Admin Portal:   http://localhost:${PORT}/admin`);
  console.log(`  REST API Health:http://localhost:${PORT}/api/health`);
  console.log('========================================================');
});

module.exports = app;
