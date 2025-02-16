import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
		unique: true,
	},
	title: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		required: true,
	},
	article: {
		type: String,
		required: true,
	},
	prepTime: {
		type: String,
		required: true,
	},
	cookTime: {
		type: String,
		required: true,
	},
	servings: {
		type: Number,
		required: true,
		min: 1,
	},
	ingredients: [
		{
			type: String,
			required: true,
			trim: true,
		},
	],
	instructions: [
		{
			type: String,
			required: true,
			trim: true,
		},
	],
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

// Update timestamp on save
recipeSchema.pre("save", function (next) {
	this.updatedAt = Date.now();
	next();
});

// Create indexes for better search performance
recipeSchema.index({ title: "text", description: "text" });

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
