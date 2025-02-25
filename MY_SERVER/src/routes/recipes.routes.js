
import express from "express";
import {
	getRecipes,
	getRecipeById,
	updateRecipe,
	deleteRecipe,
	addRecipe,
	bulkUploadRecipes,
} from "../controllers/recipe.controller.js";

const router = express.Router();

// ! Получение всех рецептов с пагинацией
router.get("/", getRecipes);

// ! Получение одного рецепта
router.get("/:id", getRecipeById);

// ! Обновление одного рецепта
router.put("/:id", updateRecipe);

// ! Удаление одного рецепта
router.delete("/:id", deleteRecipe);

// ! Bulk загрузка рецептов
router.post("/bulk-upload", bulkUploadRecipes);

// ! Добавление одного рецепта
router.post("/", addRecipe);

export default router;
