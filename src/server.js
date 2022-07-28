// Configuración
import express from 'express';
const app = express();

const puerto = process.env.PORT || 8080;

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import routes from './routes/index.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', express.static(path.join(__dirname + '../public')));


app.use('/api', routes);
app.use('/*', (req, res) => {
    res.status(404).send(`Ruta ${req.url} y método ${req.method} no implementados`);
});

//---listen PORT
app.listen(puerto, (error) => {
    if (!error) {
        console.log(`El servidor se inicio en el puerto ${puerto}`);
    } else {
        console.log(`Error al iniciar el servidor en el puerto ${puerto}. Error ${error}`);
    }
})