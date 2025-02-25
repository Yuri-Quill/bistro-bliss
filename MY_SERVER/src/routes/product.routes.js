
import express from "express";
import { protect, authorize } from "../middlewares/auth.middleware.js";
import {
	getProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

// Получить все товары
router.get("/", getProducts);

// Получить товар по ID
router.get("/:id", getProductById);

// Создать товар (только админ)
router.post("/", createProduct);
// router.post("/", protect, authorize("admin"), createProduct);
// Обновить товар (только админ)
router.put("/:id", protect, authorize("admin"), updateProduct);

// Удалить товар (только админ)
router.delete("/:id", protect, authorize("admin"), deleteProduct);

export default router;
