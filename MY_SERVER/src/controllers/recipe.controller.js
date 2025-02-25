import Recipe from "../models/recipes.model.js";
import asyncHandler from "express-async-handler";

// ! Получение списка рецептов с пагинацией
export const getRecipes = asyncHandler(async (req, res) => {
	// ! Получаем номер страницы и лимит из параметров запроса, если они не указаны — ставим значения по умолчанию
	const page = parseInt(req.query.page) || 1; // ! По умолчанию первая страница
	const limit = parseInt(req.query.limit) || 10; // ! По умолчанию 10 рецептов на странице

	// ! Вычисляем количество пропущенных рецептов для пагинации
	const skip = (page - 1) * limit;

	try {
		// ! Получаем общее количество рецептов
		const totalRecipes = await Recipe.countDocuments();

		// ! Получаем рецепты с учетом пагинации
		const recipes = await Recipe.find()
			.skip(skip) // ! Пропускаем нужное количество
			.limit(limit); // ! Ограничиваем количество элементов на странице

		// ! Отправляем ответ с данными и информацией о пагинации
		res.status(200).json({
			success: true,
			data: recipes,
			pagination: {
				currentPage: page,
				totalPages: Math.ceil(totalRecipes / limit), // ! Общее количество страниц
				totalItems: totalRecipes, // ! Общее количество рецептов
			},
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Error fetching recipes",
			error: error.message,
		});
	}
});

// ! Получение одного рецепта по его ID
export const getRecipeById = asyncHandler(async (req, res) => {
	const { id } = req.params; // ! Получаем ID из параметров запроса

	try {
		const recipe = await Recipe.findById(id); // ! Ищем рецепт по ID

		if (!recipe) {
			return res.status(404).json({
				success: false,
				message: "Recipe not found",
			});
		}

		res.status(200).json({
			success: true,
			data: recipe,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Error fetching recipe",
			error: error.message,
		});
	}
});

// ! Изменение рецепта
export const updateRecipe = asyncHandler(async (req, res) => {
	const { id } = req.params; // ! Получаем ID рецепта
	const updateData = req.body; // ! Данные, которые будем обновлять

	try {
		const updatedRecipe = await Recipe.findByIdAndUpdate(id, updateData, {
			new: true, // ! Возвращаем обновленный документ
			runValidators: true, // ! Проверка на валидаторы
		});

		if (!updatedRecipe) {
			return res.status(404).json({
				success: false,
				message: "Recipe not found",
			});
		}

		res.status(200).json({
			success: true,
			data: updatedRecipe,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Error updating recipe",
			error: error.message,
		});
	}
});

// ! Удаление рецепта
export const deleteRecipe = asyncHandler(async (req, res) => {
	const { id } = req.params; // ! Получаем ID рецепта

	try {
		const deletedRecipe = await Recipe.findByIdAndDelete(id); // ! Удаляем рецепт по ID

		if (!deletedRecipe) {
			return res.status(404).json({
				success: false,
				message: "Recipe not found",
			});
		}

		res.status(200).json({
			success: true,
			message: "Recipe deleted successfully",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Error deleting recipe",
			error: error.message,
		});
	}
});

// ! Добавление одного рецепта
export const addRecipe = asyncHandler(async (req, res) => {
	const {
		title,
		description,
		article,
		image,
		prepTime,
		cookTime,
		servings,
		ingredients,
		instructions,
	} = req.body;

	// Проверка на обязательные поля
	if (
		!title ||
		!description ||
		!article ||
		!image ||
		!prepTime ||
		!cookTime ||
		!servings ||
		!ingredients ||
		!instructions
	) {
		return res.status(400).json({
			success: false,
			message: "Please provide all required fields",
		});
	}

	try {
		const newRecipe = new Recipe({
			title,
			description,
			article,
			image,
			prepTime,
			cookTime,
			servings,
			ingredients,
			instructions,
		});

		const savedRecipe = await newRecipe.save(); // Сохраняем новый рецепт в базе данных

		res.status(201).json({
			success: true,
			data: savedRecipe,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Error adding recipe",
			error: error.message,
		});
	}
});

// ! Bulk-загрузка рецептов
export const bulkUploadRecipes = asyncHandler(async (req, res) => {
	const recipes = req.body; // ! Массив рецептов из запроса

	if (!Array.isArray(recipes) || recipes.length === 0) {
		return res.status(400).json({
			success: false,
			message: "Invalid data, expected an array of recipes",
		});
	}

	try {
		const result = await Recipe.insertMany(recipes); // ! Вставляем несколько рецептов

		res.status(201).json({
			success: true,
			message: `${result.length} recipes uploaded successfully`,
			data: result,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Error uploading recipes",
			error: error.message,
		});
	}
});
