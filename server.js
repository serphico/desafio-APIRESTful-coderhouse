const express = require('express');
const multer = require('multer');
const app = express();

const routeApp = require('./routes/routes-app')

app.use(express.static('view'))

app.use('/api', routeApp);



const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`servidor http escuchando en el puerto ${server.address().port} `);
});

server.on('error', error => console.log(`Error en servidor ${error}`));

