import { Router } from 'express';
const router = Router();

import { newCart, deleteCart, getProductsCart, saveProductsCart, deleteProductCart } from '../controllers/cart.js';

//----------------ROUTS DE CARTS--------------

//----crea carrito devuelve id
router.post('/', newCart);

//----delete carrito por id
router.delete('/:id', deleteCart);

//---- muestra los productos del cart
router.get('/:id/productos', getProductsCart);

//----add nuevo producto al carrito
router.post('/:id/productos', saveProductsCart);

//----delete producto de un carrito determinado
router.delete('/:id/productos/:id_prod', deleteProductCart);


export default router;