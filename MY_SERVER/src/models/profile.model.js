import mongoose from "mongoose";
import autoIncrementPlugin from "../utils/autoIncrementPlugin.js";

const profileSchema = new mongoose.Schema({
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
	cart: {
		items: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
				},
				quantity: {
					type: Number,
					default: 1,
					min: 1,
				},
				totalAmount: {
					type: Number,
					default: 0,
				},
			},
		],
		default: { items: [] }, // дефолтное значение для корзины
	},
	orders: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Order",
		},
	],
	lastActive: {
		type: Date,
		default: Date.now,
	},

	avatar: {
		type: String,
		default: "",
	},
	phoneNumber: {
		type: String,
		default: "",
	},
	address: {
		street: {
			type: String,
			default: "",
		},
		city: {
			type: String,
			default: "",
		},
		state: {
			type: String,
			default: "",
		},
		country: {
			type: String,
			default: "",
		},
		zipCode: {
			type: String,
			default: "",
		},
	},
	dateOfBirth: {
		type: Date,
		default: null,
	},
	gender: {
		type: String,
		enum: ["male", "female", "other"],
		default: "other",
	},
	aboutMe: {
		type: String,
		default: "",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

profileSchema.plugin(autoIncrementPlugin);

// Метод для расчета общей суммы в корзине
profileSchema.methods.calculateCartTotal = async function () {
	let total = 0;
	const Product = mongoose.model("Product");

	// Получаем все продукты из корзины по их ID
	const products = await Product.find({
		_id: { $in: this.cart.items.map((item) => item.product) },
	});

	// Создаем карту продуктов для быстрого доступа по ID
	const productMap = products.reduce((map, product) => {
		map[product._id.toString()] = product;
		return map;
	}, {});

	// Перебираем товары в корзине и вычисляем сумму
	this.cart.items.forEach((item) => {
		const product = productMap[item.product.toString()];
		if (product) {
			total += product.price * item.quantity;
		}
	});

	this.cart.totalAmount = total;
	return total;
};

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
