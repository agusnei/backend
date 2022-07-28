import { CarritoDao as carts} from '../daos/index.js';
import { ProductDao as productos} from '../daos/index.js';

/**************** FUNCIONES ******************************/

//----crea carrito devuelve id
const newCart = async (req, res) => {
    try {
        const newCart = { timestamp: new Date(Date.now()), productos: [] };
        let id = await carts.save(newCart);
        res.status(201).json(id);
    } catch (e) { 
        res.status(500).json({ error: e });
    }
}

//----delete carrito por id
const deleteCart = async (req, res) => {
    try {
        const id = req.params.id;
        const cart = await carts.getById(id);

        if (!cart) throw 'Carrito no encontrado';
        
        await carts.deleteById(id);
        res.status(200).json('Carrito eliminado');
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

//---- muestra los productos del cart segun id
const getProductsCart = async (req, res) => {
    try {
        const id = req.params.id;
        const cart = await carts.getById(id);

        if (!cart) throw 'Carrito no encontrado';

        res.status(200).json(cart.productos);
    } catch (e) { 
        res.status(500).json({ error: e });
    }
}

//----add nuevo producto al carrito
const saveProductsCart = async (req, res) => {
    try {
        const { id } = req.body;
        const id_cart = req.params.id;

        const cart = await carts.getById(id_cart);
        if (!cart) throw 'Carrito no encontrado';

        const producto = await productos.getById(id);
        if (!producto) throw 'Producto no encontrado';

        if (producto.stock == 0) throw 'No hay stock del producto';
        carts.addProduct(cart, producto);

        res.status(200).json('Producto agregado');

    } catch (e) {
        res.status(500).json({ error: e });
    }
}

//----delete producto de un carrito determinado
const deleteProductCart = async (req, res) => {
    try {
        const id_cart = req.params.id;
        const cart = await carts.getById(id_cart);

        if (!cart) throw 'Carrito no encontrado';
               
        const id = req.params.id_prod;
        const producto = await carts.getProductById(cart, id);

        if (!producto) throw 'Producto no se encuentra en el carrito';

        carts.removeProduct(cart, producto);

        res.status(200).json('Producto eliminado');

    } catch (e) {
        res.status(500).json({ error: e });
    }
}

export { newCart, deleteCart, getProductsCart, saveProductsCart, deleteProductCart } 