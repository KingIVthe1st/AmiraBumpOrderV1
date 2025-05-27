const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan'); // For logging HTTP requests

const app = express();
const PORT = process.env.PORT || 3333;

// Enable CORS for all routes
app.use(cors());

// Compress all responses
app.use(compression());

// Middleware for logging HTTP requests
app.use(morgan('dev'));

// Security Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  // Set Cache-Control for HTML files to no-cache
  if (req.path.endsWith('.html')) {
    res.setHeader('Cache-Control', 'no-cache');
  } 
  next();
});

// Serve static files from the project directory
app.use(express.static(__dirname, {
  etag: true, // Enable ETag generation
  lastModified: true, // Enable Last-Modified header
  setHeaders(res, filePath) {
    // For HTML files, Cache-Control is already set to no-cache by previous middleware
    // For other static assets, set a long cache duration
    if (!filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }
}));

// Serve simple.html for testing
app.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname, 'simple.html'));
});

// Default route now serves index.html again
// Test route still available at /test

// Health check endpoint (Docker-like)
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: require('./package.json').version
  });
});

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${new Date().toISOString()}`, err);
  res.status(500).json({
    error: 'Internal Server Error',
    timestamp: new Date().toISOString()
  });
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  const { address, port } = server.address();
  console.log(`\n🎨 AmiraBumpOrderV1 Server`);
  console.log(`🌐 URL: http://${address === '::' ? 'localhost' : address}:${port}`);
  console.log(`📁 Root: ${__dirname}`);
  console.log(`🕒 Started: ${new Date().toLocaleString()}\n`);
});

// Graceful shutdown
const shutdown = (signal) => {
  console.log(`\n🛑 Received ${signal}. Shutting down...`);
  server.close(() => {
    console.log('Server closed. Goodbye! 👋');
    process.exit(0);
  });
  
  // Force shutdown after 5 seconds
  setTimeout(() => {
    console.error('Forcing shutdown after timeout');
    process.exit(1);
  }, 5000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

// Error handlers
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});
