const { Router } = require('express');
const router = Router();
//IMPORT DE CLASES/CONTENEDOR Y PROD
const { Contenedor, Producto } = require('../objects/contenedor');
const productos = new Contenedor('./productos.txt');

// MOSTRAR TODOS LOS PRODUCTOS---------------------------------
router.get('/', async (req, res) => {
    try {
        const productLista = await productos.getAll();
        let hasAny = false;
        if (productLista.length > 0) {
            hasAny = true;
        }
        res.render('productos', { productLista, hasAny });
    } catch (e) { 
        console.log('Error en get, ', e);
        res.sendStatus(500);
    }
})

// RECIBIR MEDIANTE POST PARA AGREGAR NUEVO PRODUCTO E INGRESARLE SU NUEVO ID
router.post('/', async (req, res) => {
    try {
        const { title, price, thumbnail } = req.body;
        const producto = new Producto( title, Number(price), thumbnail );
        let sv = await productos.save(producto);

        res.redirect('/');
    } catch (e) { 
        console.log('Error al guardar el producto, ', e);
        res.sendStatus(500);
    }
})


// DEVOLVER PRODUCTO SEGUN UN ID
router.get('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const producto = await productos.getById(id);

        if (!producto) throw 'producto no encontrado';
        res.status(200).json(producto);
    } catch (e) { 
        res.status(500).json({ error: e });
    }
})

// RECIBIR UN ID Y DEVOLVER PRODUCTO CON ESE ID BUSCADO
router.put('/:id', async (req, res) => {
    try {
        const { title, price, thumbnail } = req.body;
        const id = Number(req.params.id);
        const producto = await productos.getById(id);

        if (!producto) throw 'producto no encontrado';

        productoModif = new Producto( title, Number(price), thumbnail );
        await productos.updateById(id, productoModif);
        res.status(200).json('Producto modificado');

    } catch (e) {
        res.status(500).json({ error: e });
    }
})

// ELIMINAR EL PRODUCTO CON UN ID EN PARTICULAR
router.delete('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const producto = await productos.getById(id);

        if (!producto) throw 'producto no encontrado';
        
        await productos.deleteById(id);
        res.status(200).json('Producto eliminado');

    } catch (e) {
        res.status(500).json({ error: e });
    }
})

module.exports = router;