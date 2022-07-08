import {Router} from 'express';
import checkAuthAdmin from '../auth/checkAuthAdmin.js';
import {
    addProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
} from '../controllers/productController.js'

const router = Router();

router.route ('/')
    .get(getProducts)
    .post (checkAuthAdmin, addProduct)

router.route('/:id')
    .get(checkAuthAdmin, getProduct)
    .put(checkAuthAdmin, updateProduct)
    .delete(checkAuthAdmin, deleteProduct);

export default router;