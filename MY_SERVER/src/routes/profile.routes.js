
import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
	getProfile,
	updateProfile,
	deleteProfile,
	getOrders,
} from "../controllers/profile.controller.js";

const router = express.Router();

// Получить данные профиля
router.get("/", protect, getProfile);

// Обновить профиль
router.put("/", protect, updateProfile);

// Удалить профиль
router.delete("/", protect, deleteProfile);

// Получить заказы пользователя
router.get("/orders", protect, getOrders);

export default router;
