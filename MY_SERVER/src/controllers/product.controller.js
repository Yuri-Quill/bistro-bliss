import Product from "../models/product.model.js";
import asyncHandler from "express-async-handler";

//  !Получить все продукты
export const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find();
	res.json(products);
});

//  !Получить один продукт по ID
export const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		res.status(404);
		throw new Error("Продукт не найден");
	}

	res.json(product);
});

//  !Создать новый продукт (только для администраторов)
export const createProduct = asyncHandler(async (req, res) => {
	const { title, description, image, price, category, quantity } = req.body;

	const product = new Product({
		title,
		description,
		image,
		price,
		category,
		quantity,
	});

	const createdProduct = await product.save();
	res.status(201).json(createdProduct);
});

//  !Обновить продукт
export const updateProduct = asyncHandler(async (req, res) => {
	const { title, description, image, price, category, quantity } = req.body;
	const product = await Product.findById(req.params.id);

	if (!product) {
		res.status(404);
		throw new Error("Продукт не найден");
	}

	product.title = title || product.title;
	product.description = description || product.description;
	product.image = image || product.image;
	product.price = price || product.price;
	product.category = category || product.category;
	product.quantity = quantity || product.quantity;

	const updatedProduct = await product.save();
	res.json(updatedProduct);
});

//  !Удалить продукт
export const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		res.status(404);
		throw new Error("Продукт не найден");
	}

	await product.deleteOne();
	res.json({ message: "Продукт удален" });
});
