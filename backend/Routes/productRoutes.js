import express from "express";
import {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
  getProductsByCategory,
  getSimilarProducts,
} from "../Controllers/productController.js";
import { authenticateToken } from "../JWT_Utils/jwt.js";

// Create an Express router
const router = express.Router();

// Get all products
router.get("/getAllProducts", authenticateToken, getAllProducts);

// Get product by ID
router.get("/getProduct/:id", authenticateToken, getProduct);

// Create a new product
router.post("/createProduct", authenticateToken, createProduct);

// Update a product by ID
router.patch("/updateProduct/:id", updateProduct);

// Delete product by ID
router.delete("/deleteProduct/:id", deleteProduct);

// Define a route for searching products by name
router.get("/searchProduct", authenticateToken, searchProduct);

router.get(
  "/getProductsByCategory/:categoryId",
  authenticateToken,
  getProductsByCategory
);

router.get(
  "/similar-products/:productId",
  authenticateToken,
  getSimilarProducts
);

// Export the router
export default router;
