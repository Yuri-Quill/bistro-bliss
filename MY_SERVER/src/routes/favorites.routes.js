
import express from "express";
import { protect } from "../middlewares/auth.middleware.js";

import {
	getFavorites,
	addToFavorites,
	removeFromFavorites,
	clearFavorites,
} from "../controllers/favorites.controller.js";

const router = express.Router();

//  !Получить избранные товары пользователя
router.get("/", protect, getFavorites);

//  !Добавить товар в избранное
router.post("/:productId", protect, addToFavorites);

//  !Удалить товар из избранного
router.delete("/:productId", protect, removeFromFavorites);

//  !Очистить избранное
router.delete("/", protect, clearFavorites);

export default router;
