
import express from "express";
import { protect, authorize } from "../middlewares/auth.middleware.js";

import {
	createOrder,
	getOrderById,
	getMyOrders,
	updateOrderStatus,
	updateOrderToPaid,
} from "../controllers/order.controller.js";

const router = express.Router();

//  !Создать новый заказ
router.post("/", protect, createOrder);

//  !Получить заказ по ID
router.get("/:id", protect, getOrderById);

//  !Получить заказы текущего пользователя
router.get("/", protect, getMyOrders);

//  !Обновить статус заказа (только для админов)
router.put("/:id/status", protect, authorize("admin"), updateOrderStatus);

//  !Обновить заказ как оплаченный
router.put("/:id/pay", protect, updateOrderToPaid);

export default router;
