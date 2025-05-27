const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3333;

// Enhanced Docker-like development features
const isDevelopment = process.env.NODE_ENV !== 'production';

// Middleware stack (Docker-like)
app.use(compression({
  level: 6,
  threshold: 1024,
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));

app.use(cors({
  origin: isDevelopment ? true : false,
  credentials: true
}));

// Security headers (nginx-like)
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Development headers
  if (isDevelopment) {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
  
  next();
});

// Logging middleware (Docker-like logs)
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const userAgent = req.get('User-Agent') || 'Unknown';
  
  console.log(`[${timestamp}] ${method} ${url} - ${userAgent}`);
  next();
});

// Static file serving with Docker-like caching
app.use(express.static('.', {
  maxAge: isDevelopment ? 0 : '1y',
  etag: true,
  lastModified: true,
  immutable: !isDevelopment,
  setHeaders: (res, filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    
    if (ext === '.html') {
      res.setHeader('Cache-Control', 'no-cache');
    } else if (['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.ico', '.svg', '.webp'].includes(ext)) {
      res.setHeader('Cache-Control', isDevelopment ? 'no-cache' : 'public, max-age=31536000, immutable');
    } else if (['.woff', '.woff2', '.ttf', '.eot'].includes(ext)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000');
    }
  }
}));

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
    error: isDevelopment ? err.message : 'Internal Server Error',
    timestamp: new Date().toISOString()
  });
});

// Start server with Docker-like startup message
const server = app.listen(PORT, () => {
  const divider = '━'.repeat(70);
  console.log(`
${divider}
🎨 AmiraBumpOrderV1 Enhanced Preview Server
${divider}

🌐 URL:           http://localhost:${PORT}
🔧 Mode:          ${isDevelopment ? 'Development' : 'Production'}
📁 Root:          ${__dirname}
🕒 Started:       ${new Date().toLocaleString()}
🔋 Node:          ${process.version}
💾 Memory:        ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB

🚀 Features Active:
   ✅ Gzip compression (level 6)
   ✅ CORS enabled
   ✅ Security headers
   ✅ Smart caching
   ✅ Health monitoring (/health)
   ✅ Request logging
   ${isDevelopment ? '✅ Hot reload ready' : '✅ Production optimized'}

⚡ Ready to serve requests!
${divider}
  `);
});

// File watcher for development (Docker-like auto-reload)
if (isDevelopment) {
  const watchFiles = ['index.html', 'styles/', 'scripts/', 'images/'];
  
  watchFiles.forEach(file => {
    if (fs.existsSync(file)) {
      fs.watch(file, { recursive: true }, (eventType, filename) => {
        console.log(`[WATCHER] ${new Date().toISOString()} - File changed: ${filename} (${eventType})`);
      });
    }
  });
  
  console.log('📁 File watcher active for hot reload');
}

// Graceful shutdown (Docker-like)
const shutdown = (signal) => {
  console.log(`\\n🛑 Received ${signal}. Shutting down gracefully...`);
  
  server.close(() => {
    console.log('📊 Server statistics:');
    console.log(`   Uptime: ${Math.round(process.uptime())}s`);
    console.log(`   Memory: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`);
    console.log('✅ Server closed successfully');
    process.exit(0);
  });
  
  // Force close after 10 seconds
  setTimeout(() => {
    console.log('⚠️  Force closing server...');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

// Unhandled promise rejection handler
process.on('unhandledRejection', (reason, promise) => {
  console.error('🚨 Unhandled Rejection at:', promise, 'reason:', reason);
});

// Uncaught exception handler
process.on('uncaughtException', (error) => {
  console.error('🚨 Uncaught Exception:', error);
  process.exit(1);
});
