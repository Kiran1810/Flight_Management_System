const express = require('express');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const setupSwagger = require('./swagger');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api', apiRoutes);
setupSwagger(app);

app.listen(ServerConfig.PORT,() => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    console.log(`📚 Swagger Docs available at: http://localhost:${ServerConfig.PORT}/api-docs`);

});
 
