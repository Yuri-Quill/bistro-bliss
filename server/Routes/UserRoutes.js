import express from "express";
import {
	registerUser,
	loginUser,
	logoutUser,
	requestPasswordReset,
	resetPassword,
	getUserProfile,
	updateUserProfile,
	deleteUser,
} from "../Controllers/UserController.js";

import { protect } from "../Middleware/authMiddleware.js";

const router = express.Router();

// * Регистрация пользователя

router.post("/register", registerUser);

// * Логин пользователя

router.post("/login", loginUser);

// * Логаут пользователя

router.post("/logout", logoutUser);

// * Запрос на сброс пароля

router.post("/request-password-reset", requestPasswordReset);

// * Сброс пароля

router.post("/reset-password", resetPassword);

// * Получение информации о текущем пользователе

router.get("/profile", protect, getUserProfile);

// * Обновление информации о текущем пользователе

router.put("/profile",  protect, updateUserProfile);

// * Удаление пользователя

router.delete("/profile", protect, deleteUser);

export default router;
