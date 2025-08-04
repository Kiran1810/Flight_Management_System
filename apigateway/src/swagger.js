const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Flight Booking Service API Gateway',
      version: '1.0.0',
      description: 'API documentation for the Flight Booking Microservices System',
    },
    servers: [
      {
        url: 'http://localhost:3006', // correct base path as per API Gateway
        description: 'Main API Gateway',
      },
    ],
  },
  apis: [path.join(__dirname, './routes/**/*.js')], // 🔍 Correct path relative to this file
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
