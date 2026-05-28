import express from 'express';
import { getCartItems, addToCart } from '../controller/cartController.js';

const router = express.Router();

router.get("/getcart/:userId", getCartItems)
router.post("/add", addToCart);


export default router;