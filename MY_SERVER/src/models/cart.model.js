import mongoose from "mongoose";
import autoIncrementPlugin from "../utils/autoIncrementPlugin.js";

const cartSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		items: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: "Product",
				},
				quantity: {
					type: Number,
					required: true,
					min: [1, "Quantity must be at least 1"],
				},
			},
		],
		totalPrice: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

// Пример вычисления totalPrice на основе items
cartSchema.virtual("calculatedTotalPrice").get(function () {
	return this.items.reduce(
		(total, item) => total + item.quantity * item.product.price,
		0
	);
});

// Apply auto-increment plugin
cartSchema.plugin(autoIncrementPlugin);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
