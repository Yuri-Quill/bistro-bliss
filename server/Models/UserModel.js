import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},

		// Токены для аутентификации и безопасности
		refreshToken: {
			type: String,
			default: null
		},
		resetPasswordToken: {
			type: String,
			default: null
		},
		resetPasswordExpires: {
			type: Date,
			default: null
		},
		emailVerificationToken: {
			type: String,
			default: null
		},
		isEmailVerified: {
			type: Boolean,
			default: false
		},

		favorites: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
			},
		],

		cart: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
				},
				quantity: {
					type: Number,
					default: 1,
				},
			},
		],

		orders: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Order",
			},
		],

		role: {
			type: String,
			enum: ['user', 'admin'],
			default: 'user'
		},

		isActive: {
			type: Boolean,
			default: true
		},

		// Метаданные безопасности
		lastLogin: {
			type: Date,
			default: null
		},
		loginAttempts: {
			type: Number,
			default: 0
		},
		lockUntil: {
			type: Date,
			default: null
		}
	},
	{
		timestamps: true
	}
);

// Виртуальное свойство для проверки блокировки аккаунта
userSchema.virtual('isLocked').get(function() {
	return !!(this.lockUntil && this.lockUntil > Date.now());
});

const User = mongoose.model("User", userSchema);

export default User;
