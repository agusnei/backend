import { Router } from 'express';
const router = Router();

import { getProducts, getProductById, saveProduct, updateProduct, deleteProduct } from '../controllers/products.js';
import { checkAuth } from '../middlewares/middlewares.js';


//----------------ROUTS DE PRODUCTS --------------

// ----Devuelve all products
router.get('/', getProducts);

// ------Devuelve products for id
router.get('/:id', getProductById);

// -----add producto nuevo
router.post('/', checkAuth, saveProduct);

// -------update proiduc for id
router.put('/:id', checkAuth, updateProduct);

//-------- delete for id
router.delete('/:id', checkAuth, deleteProduct);

export default router;