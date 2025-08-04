const express = require('express');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const rateLimit = require('express-rate-limit')
const { createProxyMiddleware } = require('http-proxy-middleware');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 15 minutes
	max: 10
  , // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	
})

// Apply the rate limiting middleware to all requests
app.use(limiter)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/flight-booking', createProxyMiddleware({ target:ServerConfig.BOOKING_SERVICE, changeOrigin: true ,  pathRewrite: {
    '^/flight-booking': '/', 
  },}));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
   console.log(`📚Swagger docs available at http://localhost:${ServerConfig.PORT}/api-docs`);

  
})
