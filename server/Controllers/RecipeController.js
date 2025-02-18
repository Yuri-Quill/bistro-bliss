import Recipe from "../Models/RecipeModel.js";
// Get all recipes
export const getRecipes = async (req, res) => {
	try {
		const recipes = await Recipe.find({});
		res.json(recipes);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error fetching recipes", error: error.message });
	}
};

// Get single recipe by ID
export const getRecipeById = async (req, res) => {
	try {
		const recipe = await Recipe.findOne({ _id: req.params.id });
		if (!recipe) {
			return res.status(404).json({ message: "Recipe not found" });
		}
		res.json(recipe);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error fetching recipe", error: error.message });
	}
};

// Create new recipe
export const createRecipe = async (req, res) => {
	try {
		const recipe = new Recipe({
			...req.body,
		});
		const savedRecipe = await recipe.save();
		res.status(201).json(savedRecipe);
	} catch (error) {
		res
			.status(400)
			.json({ message: "Error creating recipe", error: error.message });
	}
};

// Update recipe
export const updateRecipe = async (req, res) => {
	try {
		const recipe = await Recipe.findOneAndUpdate(
			{ _id: req.params.id },
			req.body,
			{ new: true, runValidators: true }
		);

		if (!recipe) {
			return res.status(404).json({ message: "Recipe not found" });
		}

		res.json(recipe);
	} catch (error) {
		res
			.status(400)
			.json({ message: "Error updating recipe", error: error.message });
	}
};

// Delete recipe
export const deleteRecipe = async (req, res) => {
	try {
		const recipe = await Recipe.findOneAndDelete({ _id: req.params.id });

		if (!recipe) {
			return res.status(404).json({ message: "Recipe not found" });
		}

		res.json({ message: "Recipe deleted successfully" });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error deleting recipe", error: error.message });
	}
};

// Bulk create recipes
export const bulkCreateRecipes = async (req, res) => {
	try {
		// Принудительно конвертируем объект в массив, если он пришел неправильно
		const data = Array.isArray(req.body) ? req.body : Object.values(req.body);

		// console.log("Parsed body:", data);
		// console.log("Is Array (after fix):", Array.isArray(data));

		if (!Array.isArray(data)) {
			return res
				.status(400)
				.json({ message: "Request body must be an array of recipes" });
		}

		// Найти последний ID
		const highestRecipe = await Recipe.findOne().sort({ id: -1 });
		let nextId = highestRecipe ? highestRecipe.id + 1 : 1;

		// Добавить ID к каждому рецепту
		const recipesWithIds = data.map((recipe) => ({
			...recipe,
			id: nextId++,
		}));

		const savedRecipes = await Recipe.insertMany(recipesWithIds);
		res.status(201).json(savedRecipes);
	} catch (error) {
		res
			.status(400)
			.json({ message: "Error creating recipes", error: error.message });
	}
};