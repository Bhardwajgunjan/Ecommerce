import express from "express";
import { createProduct,getProduct,getProducts,getByPhone, updateProduct, deleteProduct } from "../controller/productController.js";

//import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createProduct", createProduct);

router.get("/getProduct/:id", getProduct);

router.get("/getByPhone", getByPhone);

router.get("/getProducts", getProducts);

router.put("/updateProduct/:id", updateProduct);

router.delete("/deleteProduct/:id", deleteProduct);

export default router;