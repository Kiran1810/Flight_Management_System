const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3001;

// Environment variables for deployed service URLs
const API_GATEWAY_URL = process.env.API_GATEWAY_URL || 'http://localhost:3006';
const FLIGHT_SERVICE_URL = process.env.FLIGHT_SERVICE_URL || 'http://localhost:5000/api/v1';
const BOOKING_SERVICE_URL = process.env.BOOKING_SERVICE_URL || 'http://localhost:4000';
const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3002/api';

// Extract base URLs for proxying
const API_GATEWAY_BASE = process.env.API_GATEWAY_URL || 'http://localhost:3006';
const FLIGHT_SERVICE_BASE = process.env.FLIGHT_SERVICE_URL?.replace('/api/v1', '') || 'http://localhost:5000';
const BOOKING_SERVICE_BASE = process.env.BOOKING_SERVICE_URL || 'http://localhost:4000';
const NOTIFICATION_SERVICE_BASE = process.env.NOTIFICATION_SERVICE_URL?.replace('/api', '') || 'http://localhost:3002';

// Load and update swagger document with proxy URLs
function getSwaggerDocument() {
  const swaggerDocument = YAML.load(path.join(__dirname, 'combined-swagger.yaml'));
  
  // Use this docs server as proxy to avoid CORS issues
  const docsBaseUrl = process.env.NODE_ENV === 'production' 
    ? `https://${process.env.RENDER_EXTERNAL_HOSTNAME || 'your-docs.onrender.com'}`
    : `http://localhost:${PORT}`;
  
  // Update server URLs to use proxy endpoints
  swaggerDocument.servers = [
    {
      url: `${docsBaseUrl}/proxy/api-gateway`,
      description: 'API Gateway (via proxy)'
    },
    {
      url: `${docsBaseUrl}/proxy/flight-service`,
      description: 'Flight Service (via proxy)'
    },
    {
      url: `${docsBaseUrl}/proxy/booking-service`,
      description: 'Booking Service (via proxy)'
    },
    {
      url: `${docsBaseUrl}/proxy/notification-service`,
      description: 'Notification Service (via proxy)'
    }
  ];
  
  return swaggerDocument;
}

// Middleware
app.use(express.json());

// CORS middleware to allow requests from anywhere
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-idempotency-key');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Proxy middleware for each service to avoid CORS issues
app.use('/proxy/api-gateway', createProxyMiddleware({
  target: API_GATEWAY_BASE,
  changeOrigin: true,
  pathRewrite: {
    '^/proxy/api-gateway': ''
  },
  onError: (err, req, res) => {
    console.error('API Gateway proxy error:', err.message);
    res.status(502).json({ error: 'Service unavailable', service: 'API Gateway' });
  }
}));

app.use('/proxy/flight-service', createProxyMiddleware({
  target: FLIGHT_SERVICE_BASE,
  changeOrigin: true,
  pathRewrite: {
    '^/proxy/flight-service': ''
  },
  onError: (err, req, res) => {
    console.error('Flight Service proxy error:', err.message);
    res.status(502).json({ error: 'Service unavailable', service: 'Flight Service' });
  }
}));

app.use('/proxy/booking-service', createProxyMiddleware({
  target: BOOKING_SERVICE_BASE,
  changeOrigin: true,
  pathRewrite: {
    '^/proxy/booking-service': ''
  },
  onError: (err, req, res) => {
    console.error('Booking Service proxy error:', err.message);
    res.status(502).json({ error: 'Service unavailable', service: 'Booking Service' });
  }
}));

app.use('/proxy/notification-service', createProxyMiddleware({
  target: NOTIFICATION_SERVICE_BASE,
  changeOrigin: true,
  pathRewrite: {
    '^/proxy/notification-service': ''
  },
  onError: (err, req, res) => {
    console.error('Notification Service proxy error:', err.message);
    res.status(502).json({ error: 'Service unavailable', service: 'Notification Service' });
  }
}));

// Basic info endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Flight Booking System - Combined API Documentation',
    documentation: '/api-docs',
    services: {
      'API Gateway': API_GATEWAY_URL,
      'Flight Service': FLIGHT_SERVICE_URL,
      'Booking Service': BOOKING_SERVICE_URL,
      'Notification Service': NOTIFICATION_SERVICE_URL
    },
    version: '1.0.0',
    deployment: process.env.NODE_ENV || 'development'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    proxy_enabled: true,
    services: {
      'API Gateway': {
        target: API_GATEWAY_BASE,
        proxy: `/proxy/api-gateway`
      },
      'Flight Service': {
        target: FLIGHT_SERVICE_BASE,
        proxy: `/proxy/flight-service`
      },
      'Booking Service': {
        target: BOOKING_SERVICE_BASE,
        proxy: `/proxy/booking-service`
      },
      'Notification Service': {
        target: NOTIFICATION_SERVICE_BASE,
        proxy: `/proxy/notification-service`
      }
    }
  });
});

// Simple swagger documentation endpoint (same style as your individual services)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(getSwaggerDocument()));

// Export the swagger document for programmatic access
app.get('/swagger.json', (req, res) => {
  res.json(getSwaggerDocument());
});

// Export the YAML for download
app.get('/swagger.yaml', (req, res) => {
  res.set('Content-Type', 'application/x-yaml');
  res.set('Content-Disposition', 'attachment; filename="flight-booking-api.yaml"');
  const fs = require('fs');
  const yamlContent = fs.readFileSync(path.join(__dirname, 'combined-swagger.yaml'), 'utf8');
  res.send(yamlContent);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`
  });
});

// Start server only if this file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(` Combined Swagger Documentation Server running on port ${PORT}`);
    console.log(` Documentation available at: http://localhost:${PORT}/api-docs`);
    console.log(` API Overview at: http://localhost:${PORT}/`);
    console.log(`  Health check at: http://localhost:${PORT}/health`);
    console.log('');
    console.log(' Proxy Configuration:');
    console.log(`  API Gateway: ${API_GATEWAY_BASE} -> /proxy/api-gateway`);
    console.log(`  Flight Service: ${FLIGHT_SERVICE_BASE} -> /proxy/flight-service`);
    console.log(`  Booking Service: ${BOOKING_SERVICE_BASE} -> /proxy/booking-service`);
    console.log(`  Notification Service: ${NOTIFICATION_SERVICE_BASE} -> /proxy/notification-service`);
    console.log('');
    console.log(' CORS enabled - API calls should work now!');
  });
}

// Simple export for use in other applications (same style as your individual services)
function setupSwagger(expressApp) {
  expressApp.use('/api-docs', swaggerUi.serve, swaggerUi.setup(getSwaggerDocument()));
  return expressApp;
}

module.exports = setupSwagger;