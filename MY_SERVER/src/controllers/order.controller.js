import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";
import asyncHandler from "express-async-handler"; // ✅ Добавлен импорт

// ! Создать новый заказ
export const createOrder = asyncHandler(async (req, res) => {
	const { shippingAddress, paymentMethod } = req.body;

	if (!shippingAddress || !paymentMethod) {
		res.status(400);
		throw new Error("Shipping address and payment method are required");
	}

	const cart = await Cart.findOne({ user: req.user._id }).populate(
		"items.product"
	);

	if (!cart || cart.items.length === 0) {
		res.status(400);
		throw new Error("No items in cart");
	}

	const orderItems = cart.items.map((item) => ({
		product: item.product._id,
		quantity: item.quantity,
		price: item.product.price,
	}));

	const totalPrice = orderItems.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	);

	const order = await Order.create({
		user: req.user._id,
		items: orderItems,
		shippingAddress,
		paymentMethod,
		totalPrice,
	});

	// Очистка корзины после создания заказа
	await Cart.findOneAndUpdate({ user: req.user._id }, { $set: { items: [] } });

	const populatedOrder = await Order.findById(order._id).populate(
		"items.product"
	);

	res.status(201).json(populatedOrder);
});

// ! Получить заказ по ID
export const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id)
		.populate("user", "name email")
		.populate("items.product");

	if (!order) {
		res.status(404);
		throw new Error("Order not found");
	}

	// Проверка владельца заказа
	if (order.user._id.equals(req.user._id) === false) {
		res.status(401);
		throw new Error("Not authorized");
	}

	res.json(order);
});

// ! Получить все заказы пользователя
export const getMyOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.user._id }).populate(
		"items.product"
	);
	res.json(orders);
});

// ! Обновить статус заказа
export const updateOrderStatus = asyncHandler(async (req, res) => {
	const { status } = req.body;

	if (!status) {
		res.status(400);
		throw new Error("Order status is required");
	}

	const order = await Order.findById(req.params.id);

	if (!order) {
		res.status(404);
		throw new Error("Order not found");
	}

	order.status = status;
	const updatedOrder = await order.save();

	res.json(updatedOrder);
});

// ! Обновить заказ как оплаченный
export const updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (!order) {
		res.status(404);
		throw new Error("Order not found");
	}

	if (order.paymentResult) {
		res.status(400);
		throw new Error("Order is already paid");
	}

	order.paymentResult = {
		id: req.body.id,
		status: req.body.status,
		update_time: req.body.update_time,
		email_address: req.body.email_address,
	};

	const updatedOrder = await order.save();
	res.json(updatedOrder);
});
