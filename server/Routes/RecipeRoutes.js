import express from "express";
import {
    getRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    bulkCreateRecipes
} from "../Controllers/RecipeController.js";

const router = express.Router();

// Get all recipes
router.get("/", getRecipes);

// Get single recipe
router.get("/:id", getRecipeById);

// Create new recipe
router.post("/", createRecipe);

// Bulk create recipes
router.post("/bulk", bulkCreateRecipes);

// Update recipe
router.put("/:id", updateRecipe);

// Delete recipe
router.delete("/:id", deleteRecipe);

export default router;
