import { ProductDao as productos } from '../daos/index.js';

/************** FUNCIONES ***************/
// Devuelve todos los productos
const getProducts = async (req, res) => {
    try {
        const resultado = await productos.getAll();
        res.json(resultado);
    } catch (e) { 
        res.status(500).json({ error: e });
    }
}

// Devuelve un producto según su id
const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const producto = await productos.getById(id);

        if (!producto) throw 'producto no encontrado';
        res.status(200).json(producto);

    } catch (e) { 
        res.status(500).json({ error: e });
    }
}

// Recibe y agrega un producto, deuvelve el id asignado
const saveProduct = async (req, res) => {
    try {
        const { title, description, thumbnail, price, stock, code } = req.body;       
        const producto = { title: title, description: description, thumbnail: thumbnail, price: Number(price), stock: Number(stock), code: code };

        const id = await productos.save(producto);
        res.status(201).json(id);
    } catch (e) { 
        res.status(500).json({ error: e });
    }
}

// Recibe y actualiza un producto segun su id
const updateProduct = async (req, res) => {
    try {
        const { title, description, thumbnail, price, stock, code } = req.body;
        const id = req.params.id;
        const producto = await productos.getById(id);

        if (!producto) throw 'producto no encontrado';

        const productoModif = { title: title, description: description, thumbnail: thumbnail, price: Number(price), stock: Number(stock), code: code };
        await productos.updateById(id, productoModif);

        res.status(200).json('Producto modificado');

    } catch (e) {
        res.status(500).json({ error: e });
    }
}

// Elimina un producto según su id
const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const producto = await productos.getById(id);

        if (!producto) throw 'producto no encontrado';
        
        await productos.deleteById(id);
        res.status(200).json('Producto eliminado');

    } catch (e) {
        res.status(500).json({ error: e });
    }
}

export { getProducts, getProductById, saveProduct, updateProduct, deleteProduct }