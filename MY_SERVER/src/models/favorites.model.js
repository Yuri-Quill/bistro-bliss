import mongoose from "mongoose";
import autoIncrementPlugin from "../utils/autoIncrementPlugin.js";

const favoriteSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
			unique: true,
		},
		favorites: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
			},
		],
	},
	{
		timestamps: true,
	}
);

favoriteSchema.plugin(autoIncrementPlugin);

const Favorite = mongoose.model("Favorite", favoriteSchema);

export default Favorite;
