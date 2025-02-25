import asyncHandler from "express-async-handler";
import Profile from "../models/profile.model.js";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import Favorite from "../models/favorites.model.js";

// ! Получение профиля пользователя

export const getProfile = asyncHandler(async (req, res) => {
	const profile = await Profile.findOne({ user: req.user.id })
		.populate("user", "email firstName lastName")
		.populate("favorites")
		.populate("cart.items.product")
		.populate("orders");

	if (!profile) {
		res.status(404);
		throw new Error("Profile not found");
	}

	res.status(200).json({
		success: true,
		data: profile,
	});
});

// !  Create/Update user profile

export const updateProfile = asyncHandler(async (req, res) => {
	const { avatar, phoneNumber, address, dateOfBirth, bio, preferences } =
		req.body;

	let profile = await Profile.findOne({ user: req.user.id });

	if (!profile) {
		profile = await Profile.create({
			user: req.user.id,
			avatar,
			phoneNumber,
			address,
			dateOfBirth,
			bio,
			preferences,
		});
	} else {
		profile = await Profile.findOneAndUpdate(
			{ user: req.user.id },
			{
				avatar,
				phoneNumber,
				address,
				dateOfBirth,
				bio,
				preferences,
			},
			{ new: true, runValidators: true }
		);
	}

	res.status(200).json({
		success: true,
		data: profile,
	});
});

// ! Delete user profile

export const deleteProfile = asyncHandler(async (req, res) => {
	const profile = await Profile.findOne({ user: req.user.id });

	if (!profile) {
		res.status(404);
		throw new Error("Profile not found");
	}

	await profile.remove();
	await User.findByIdAndDelete(req.user.id);

	res.status(200).json({
		success: true,
		data: {},
	});
});

// ! Add product to favorites

export const addToFavorites = asyncHandler(async (req, res) => {
	const profile = await Profile.findOne({ user: req.user.id });

	if (!profile) {
		res.status(404);
		throw new Error("Profile not found");
	}

	if (!profile.favorites.includes(req.params.productId)) {
		profile.favorites.push(req.params.productId);
		await profile.save();
	}

	res.status(200).json({
		success: true,
		data: profile.favorites,
	});
});

// ! Remove product from favorites

export const removeFromFavorites = asyncHandler(async (req, res) => {
	const profile = await Profile.findOne({ user: req.user.id });

	if (!profile) {
		res.status(404);
		throw new Error("Profile not found");
	}

	profile.favorites = profile.favorites.filter(
		(id) => id.toString() !== req.params.productId
	);
	await profile.save();

	res.status(200).json({
		success: true,
		data: profile.favorites,
	});
});

// ! Add item to cart

export const addToCart = asyncHandler(async (req, res) => {
	const { productId, quantity } = req.body;

	const profile = await Profile.findOne({ user: req.user.id });

	if (!profile) {
		res.status(404);
		throw new Error("Profile not found");
	}

	const existingItem = profile.cart.items.find(
		(item) => item.product.toString() === productId
	);

	if (existingItem) {
		existingItem.quantity += quantity || 1;
	} else {
		profile.cart.items.push({
			product: productId,
			quantity: quantity || 1,
		});
	}

	await profile.save();
	await profile.populate("cart.items.product");

	res.status(200).json({
		success: true,
		data: profile.cart,
	});
});

// ! Update cart item

export const updateCartItem = asyncHandler(async (req, res) => {
	const { quantity } = req.body;

	const profile = await Profile.findOne({ user: req.user.id });

	if (!profile) {
		res.status(404);
		throw new Error("Profile not found");
	}

	const cartItem = profile.cart.items.find(
		(item) => item.product.toString() === req.params.productId
	);

	if (!cartItem) {
		res.status(404);
		throw new Error("Cart item not found");
	}

	cartItem.quantity = quantity;
	await profile.save();
	await profile.populate("cart.items.product");

	res.status(200).json({
		success: true,
		data: profile.cart,
	});
});

// ! Remove item from cart

export const removeFromCart = asyncHandler(async (req, res) => {
	const profile = await Profile.findOne({ user: req.user.id });

	if (!profile) {
		res.status(404);
		throw new Error("Profile not found");
	}

	profile.cart.items = profile.cart.items.filter(
		(item) => item.product.toString() !== req.params.productId
	);
	await profile.save();

	res.status(200).json({
		success: true,
		data: profile.cart,
	});
});

// ! Clear cart

export const clearCart = asyncHandler(async (req, res) => {
	const profile = await Profile.findOne({ user: req.user.id });

	if (!profile) {
		res.status(404);
		throw new Error("Profile not found");
	}

	profile.cart.items = [];
	await profile.save();

	res.status(200).json({
		success: true,
		data: profile.cart,
	});
});

// ! Create Order from cart

export const createOrder = asyncHandler(async (req, res) => {
	const profile = await Profile.findOne({ user: req.user.id }).populate(
		"cart.items.product"
	);

	if (!profile || profile.cart.items.length === 0) {
		res.status(400);
		throw new Error("Cart is empty");
	}

	const { shippingAddress, paymentMethod } = req.body;

	// Create order items from cart
	const orderItems = profile.cart.items.map((item) => ({
		product: item.product._id,
		quantity: item.quantity,
		price: item.product.price,
	}));

	// Create new order
	const order = await Order.create({
		user: req.user.id,
		items: orderItems,
		shippingAddress: shippingAddress || profile.address,
		paymentMethod,
		totalPrice: profile.cart.totalAmount,
	});

	// Add order to profile
	profile.orders.push(order._id);

	// Clear cart
	profile.cart.items = [];
	profile.cart.totalAmount = 0;

	await profile.save();

	const populatedOrder = await Order.findById(order._id).populate(
		"items.product"
	);

	res.status(201).json(populatedOrder);
});

// ! Get user orders

export const getOrders = asyncHandler(async (req, res) => {
	const profile = await Profile.findOne({ user: req.user.id }).populate({
		path: "orders",
		populate: {
			path: "items.product",
		},
	});

	if (!profile) {
		res.status(404);
		throw new Error("Profile not found");
	}

	res.json(profile.orders);
});
