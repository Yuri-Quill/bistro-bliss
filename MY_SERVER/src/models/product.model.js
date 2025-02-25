// product.model.js
import mongoose from "mongoose";
import autoIncrementPlugin from "../utils/autoIncrementPlugin.js";

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
});

productSchema.plugin(autoIncrementPlugin);

const Product = mongoose.model("Product", productSchema);

export default Product;