
import express from "express";
import { protect } from "../middlewares/auth.middleware.js";

import {
	getCart,
	addToCart,
	updateCartItem,
	removeFromCart,
	clearCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.put("/update/:productId", protect, updateCartItem);
router.delete("/remove/:productId", protect, removeFromCart);
router.delete("/clear", protect, clearCart);

export default router;
