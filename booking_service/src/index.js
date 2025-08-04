const express = require('express');
const swaggerDocs = require('./swagger');
const { ServerConfig, queue } = require('./config');
const apiRoutes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

swaggerDocs(app);

async function startServer() {
  try {
    await queue.connectQueue(); 
    app.listen(ServerConfig.PORT, () => {
      console.log(`✅ Server running on PORT: ${ServerConfig.PORT}`);
      console.log(`📚Swagger docs available at http://localhost:${ServerConfig.PORT}/docs`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to RabbitMQ:", err);
    process.exit(1); // stop app if connection fails
  }
}

startServer();
