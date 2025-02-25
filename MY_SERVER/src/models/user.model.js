import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import autoIncrementPlugin from "../utils/autoIncrementPlugin.js";

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
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
		resetPasswordToken: String,
		resetPasswordExpire: Date,
		resetPasswordChange: Date,
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

userSchema.plugin(autoIncrementPlugin);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next();
	}

	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		this.lastPasswordChanged = Date.now();
		next();
	} catch (error) {
		next(error);
	}
});

userSchema.methods.matchPassword = async function (password) {
	try {
		return await bcrypt.compare(password, this.password);
	} catch (error) {
		throw new Error(error.message);
	}
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
	if (this.lastPasswordChanged) {
		const changedTimestamp = parseInt(
			this.lastPasswordChanged.getTime() / 1000,
			10
		);
		return JWTTimestamp < changedTimestamp;
	}
	return false;
};

userSchema.methods.getResetPasswordToken = function () {
	const resetToken = crypto.randomBytes(20).toString("hex");
	this.resetPasswordToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");
	this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // Токен будет действителен 10 минут
	return resetToken;
};

const User = mongoose.model("User", userSchema);

export default User;
