import mongoose from "mongoose";
import autoIncrementPlugin from "../utils/autoIncrementPlugin.js";

const recipeSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		article: { type: String, required: true },
		image: { type: String, required: true },
		prepTime: { type: String, required: true },
		cookTime: { type: String, required: true },
		servings: { type: Number, required: true },
		ingredients: [{ type: String, required: true }],
		instructions: [{ type: String, required: true }],
	},
	{
		timestamps: true,
	}
);

recipeSchema.plugin(autoIncrementPlugin);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
