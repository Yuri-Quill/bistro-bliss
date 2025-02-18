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
		const data = Array.isArray(req.body) ? req.body : Object.values(req.body);

		if (!Array.isArray(data) || data.length === 0) {
			return res
				.status(400)
				.json({ message: "Request body must be an array of recipes" });
		}

		const recipesWithIds = data.map((recipe, index) => {
			if (!recipe.name || !recipe.ingredients) {
				throw new Error(`Recipe #${index + 1} must have a name and ingredients`);
			}
			return { ...recipe, id: index + 1 }; // Или логику с автоинкрементом
		});

		const savedRecipes = await Recipe.insertMany(recipesWithIds);
		res.status(201).json(savedRecipes);
	} catch (error) {
		res
			.status(400)
			.json({ message: "Error creating recipes", error: error.message });
	}
};
