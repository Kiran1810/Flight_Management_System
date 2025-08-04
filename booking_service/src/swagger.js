const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Flight Booking API',
      version: '1.0.0',
      description: 'API documentation for the Flight Booking microservice',
    },
    servers: [
      {
        url: 'http://localhost:4000', // Replace with your server's actual base URL if needed
      },
    ],
  },
  apis: ['./src/routes/v1/*.js'], // Adjust if your routes are in a different location
};

const swaggerSpec = swaggerJsdoc(options);

// ✅ Exporting a function, as expected in index.js
function swaggerDocs(app) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = swaggerDocs;
