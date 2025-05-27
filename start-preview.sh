#!/bin/bash

# AmiraBumpOrderV1 Enhanced Preview Launcher
# Docker-like experience for local development

echo "🚀 AmiraBumpOrderV1 Enhanced Preview"
echo "====================================="

# Function to check if port is in use
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        return 0  # Port is in use
    else
        return 1  # Port is free
    fi
}

# Stop any running servers on our ports
echo "🔄 Cleaning up existing servers..."
for port in 3000 3333 8000 9999; do
    if check_port $port; then
        echo "   Stopping server on port $port..."
        lsof -ti:$port | xargs kill -9 2>/dev/null || true
    fi
done

echo ""
echo "🎛️  Available Preview Options:"
echo ""
echo "1. 🟢 Enhanced Node.js Server (Recommended)"
echo "   - Production-like features"
echo "   - Gzip compression"
echo "   - Security headers"
echo "   - Asset caching"
echo "   - Port: 3333"
echo ""
echo "2. 🐳 Docker Preview (Future - requires Docker Desktop)"
echo "   - Nginx container"
echo "   - Production environment"
echo "   - Port: 3000"
echo ""
echo "3. 🐍 Simple Python Server"
echo "   - Basic static serving"
echo "   - Quick start"
echo "   - Port: 8000"
echo ""

read -p "Choose option (1-3): " choice

case $choice in
    1)
        echo ""
        echo "🟢 Starting Enhanced Node.js Preview..."
        echo "   Features: Compression, Security Headers, Caching"
        echo ""
        PORT=3333 npm start
        ;;
    2)
        echo ""
        if command -v docker &> /dev/null; then
            echo "🐳 Starting Docker Preview..."
            docker-compose up --build
        else
            echo "❌ Docker not available. Starting Enhanced Node.js server instead..."
            echo ""
            PORT=3333 npm start
        fi
        ;;
    3)
        echo ""
        echo "🐍 Starting Simple Python Server..."
        echo "🌐 Preview URL: http://localhost:8000"
        echo "⏹️  Press Ctrl+C to stop"
        echo ""
        python3 -m http.server 8000
        ;;
    *)
        echo ""
        echo "❌ Invalid option. Starting Enhanced Node.js server..."
        echo ""
        PORT=3333 npm start
        ;;
esac
