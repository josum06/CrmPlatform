import express from 'express';
const router = express.Router();

import { createOrder, getAllOrders } from '../controllers/orderController.js';

// Route to get all orders
router.get('/', getAllOrders);
// Route to create a new order
router.post('/', createOrder);

export default router;