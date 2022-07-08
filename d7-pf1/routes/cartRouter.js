import {Router} from 'express';
import checkAuthAdmin from '../auth/checkAuthAdmin.js';
import{
    createCart,
    getCarts,
    deleteCart,
    getCartProducts,
    addProductInCart,
    deleteProductInCart
} from '../controllers/cartController.js'

const router = Router();

router.route ('/')
    .post(checkAuthAdmin, createCart)
    .get(checkAuthAdmin, getCarts)

router.delete('/:id', checkAuthAdmin, deleteCart)

router.route('/:id/products')
    .get(checkAuthAdmin, getCartProducts)

router.route('/:id/products/:id_prod')
    .post(checkAuthAdmin, addProductInCart)
    .delete (checkAuthAdmin, deleteProductInCart)

export default router;