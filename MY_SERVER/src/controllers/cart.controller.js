import Cart from "../models/cart.model.js";
import asyncHandler from "express-async-handler";

// ! Получить корзину пользователя
export const getCart = asyncHandler(async (req, res) => {
	const cart = await Cart.findOne({ user: req.user._id }).populate(
		"items.product"
	);

	if (!cart) {
		return res.json({ items: [] });
	}

	res.json(cart);
});

// ! Добавить товар в корзину
export const addToCart = asyncHandler(async (req, res) => {
	const { productId, quantity } = req.body;

	if (!quantity || quantity < 1) {
		res.status(400);
		throw new Error("Quantity must be at least 1");
	}

	let cart = await Cart.findOne({ user: req.user._id });

	if (!cart) {
		cart = await Cart.create({
			user: req.user._id,
			items: [{ product: productId, quantity }],
		});
	} else {
		const existingItem = cart.items.find((item) =>
			item.product.equals(productId)
		);

		if (existingItem) {
			existingItem.quantity += quantity;
		} else {
			cart.items.push({ product: productId, quantity });
		}

		await cart.save();
	}

	const populatedCart = await Cart.findById(cart._id).populate("items.product");
	res.status(201).json(populatedCart);
});

// ! Обновить количество товара в корзине
export const updateCartItem = asyncHandler(async (req, res) => {
	const { quantity } = req.body;
	const productId = req.params.productId;

	if (!quantity || quantity < 1) {
		res.status(400);
		throw new Error("Quantity must be at least 1");
	}

	const cart = await Cart.findOne({ user: req.user._id });

	if (!cart) {
		res.status(404);
		throw new Error("Cart not found");
	}

	const item = cart.items.find((item) => item.product.equals(productId));

	if (!item) {
		res.status(404);
		throw new Error("Item not found in cart");
	}

	item.quantity = quantity;
	await cart.save();

	const populatedCart = await Cart.findById(cart._id).populate("items.product");
	res.json(populatedCart);
});

// ! Удалить товар из корзины
export const removeFromCart = asyncHandler(async (req, res) => {
	const productId = req.params.productId;

	const cart = await Cart.findOneAndUpdate(
		{ user: req.user._id },
		{ $pull: { items: { product: productId } } },
		{ new: true }
	).populate("items.product");

	if (!cart) {
		res.status(404);
		throw new Error("Cart not found");
	}

	res.json(cart);
});

// ! Очистить корзину
export const clearCart = asyncHandler(async (req, res) => {
	const cart = await Cart.findOneAndUpdate(
		{ user: req.user._id },
		{ $set: { items: [] } },
		{ new: true }
	);

	if (!cart) {
		res.status(404);
		throw new Error("Cart not found");
	}

	res.json({ message: "Cart cleared" });
});
