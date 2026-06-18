import express from 'express';
import { getCartItems, addToCart, deleteItem } from '../controller/cartController.js';

const router = express.Router();

router.get("/getcart/:userId", getCartItems)
router.post("/add", addToCart);
router.delete("/delete/:id", deleteItem)

export default router;
