import express from 'express';
const router = express.Router();
import { createCustomer, getAllCustomers } from '../controllers/customerController.js';



// Route to get all customers
router.get('/', getAllCustomers);
// Route to create a new customer
router.post('/', createCustomer);

export default router;