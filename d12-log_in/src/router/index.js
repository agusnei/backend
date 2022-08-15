import { Router } from "express";
import { productsTest } from "../controller/testController.js";
import { getAllProductsController,getOneProductController } from "../controller/productsController.js";
import { loginController } from "../controller/loginController.js";
import { loggedSuccesController } from "../controller/loggedSuccesController.js";
import { logginMiddleware } from "../middleware/logginMiddleware.js";
import { logOutController } from "../controller/logoutController.js";

const router = Router()

router.get('/login', loginController)
router.get('/loginSucces', loggedSuccesController )
router.get('/logout', logginMiddleware, logOutController)

router.get('/products-test',productsTest)
router.get('/products/all', logginMiddleware, getAllProductsController)
router.get('/products/:id', logginMiddleware, getOneProductController )

export default router