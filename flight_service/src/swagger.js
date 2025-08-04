const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Flights Microservice API',
      version: '1.0.0',
      description: 'API documentation for Flights Service (includes Airplanes, Airports, Cities, Flights)',
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1', // Your Flights service base URL
      },
    ],
  },
  apis: ['./src/routes/v1/*.js'], // Swagger annotations live here
};

const swaggerSpec = swaggerJsdoc(options);

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
