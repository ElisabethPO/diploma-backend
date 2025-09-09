import Router from "express";
import ProductController from "./productController.js";
import UserController from './userController.js';
import OrderController from './orderController.js';
import { authMiddleware, adminMiddleware} from "./auth.js";

const router = new Router()

router.get('/products/filter', ProductController.filter)

router.post('/products/many', ProductController.createMany)
router.post('/products/create/one', ProductController.createOne)
router.get('/products', ProductController.getAll)
router.get('/products/related-products', ProductController.getRandomProducts)
router.get('/products/:id', ProductController.getOne)
router.put('/products', ProductController.update)
router.put('/products/:id', ProductController.updateProduct)
router.delete('/products/:id', ProductController.delete)

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/user', authMiddleware, UserController.getUser);

router.post('/orders', OrderController.createOrder);
router.get('/orders', OrderController.getAllOrders);
router.get('/orders/:id', OrderController.getOrderById);
router.put('/orders/:id/status', OrderController.updateOrderStatus);
router.delete('/orders/:id', OrderController.deleteOrder);

export default router;
