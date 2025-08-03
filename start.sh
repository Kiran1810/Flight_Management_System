#!/bin/bash

echo "🚀 Starting Simple API Documentation..."

# Install if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo ""
echo "⚡ Starting simple docs server..."
echo "📚 Will be available at: http://localhost:3001/docs"
echo ""
echo "⚠️  Make sure your services are running:"
echo "   - API Gateway: port 3006"
echo "   - Flight Service: port 5000"  
echo "   - Booking Service: port 4000"
echo "   - Notification Service: port 3002"
echo ""

node simple-docs.js