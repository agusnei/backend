import express from 'express';
import dotenv from 'dotenv';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';

//------------------------------------Config
const app = express();
const port = process.env.PORT || 8080;
dotenv.config();

//------------------------------------Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//----------------------------------Routing Config
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

// not found
app.use((req, res) => {
    res.status(404).json({error: -2, descripcion: `Ruta '${req.path}' Método '${req.method}' - No Implementada`});
})

//--------------------------------------------Server listen/errors
app.listen(port, (e) => {
    if (!e) {console.log(`Server run on port ${port}`);}
    else {console.log(`Error starting the server on port ${port}. Error ${e}`);}
})