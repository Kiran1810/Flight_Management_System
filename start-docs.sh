#!/bin/bash

# Simple startup script for local development

echo "🚀 Starting Flight Booking API Documentation..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo ""
echo "📚 Starting documentation server..."
echo "🌐 Local URL: http://localhost:3001/api-docs"
echo "💡 Press Ctrl+C to stop"
echo ""

npm start