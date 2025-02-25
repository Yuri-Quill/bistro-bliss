import Favorite from "../models/favorites.model.js";
import asyncHandler from "express-async-handler";

// ! Получить избранные товары пользователя
export const getFavorites = asyncHandler(async (req, res) => {
	const favorites = await Favorite.findOne({ user: req.user._id }).populate(
		"products"
	);

	// Если избранное отсутствует, просто возвращаем пустой список
	res.json(favorites || { user: req.user._id, products: [] });
});

// ! Добавить товар в избранное
export const addToFavorites = asyncHandler(async (req, res) => {
	const { productId } = req.params;

	if (!productId) {
		res.status(400);
		throw new Error("Product ID is required");
	}

	let favorites = await Favorite.findOne({ user: req.user._id });

	if (!favorites) {
		favorites = await Favorite.create({
			user: req.user._id,
			products: [productId],
		});
	} else if (!favorites.products.includes(productId)) {
		favorites.products.push(productId);
		await favorites.save();
	}

	const populatedFavorites = await Favorite.findById(favorites._id).populate(
		"products"
	);
	res.json(populatedFavorites);
});

// ! Удалить товар из избранного
export const removeFromFavorites = asyncHandler(async (req, res) => {
	const { productId } = req.params;

	if (!productId) {
		res.status(400);
		throw new Error("Product ID is required");
	}

	const favorites = await Favorite.findOneAndUpdate(
		{ user: req.user._id },
		{ $pull: { products: productId } },
		{ new: true }
	).populate("products");

	if (!favorites) {
		res.status(404);
		throw new Error("Favorites not found");
	}

	res.json(favorites);
});

// ! Очистить избранное
export const clearFavorites = asyncHandler(async (req, res) => {
	const favorites = await Favorite.findOneAndUpdate(
		{ user: req.user._id },
		{ $set: { products: [] } },
		{ new: true }
	);

	if (!favorites) {
		res.status(404);
		throw new Error("Favorites not found");
	}

	res.json({ message: "Favorites cleared" });
});
