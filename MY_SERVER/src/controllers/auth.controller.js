import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";

// ! Кастомный класс ошибки
class AppError extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
		this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
		this.isOperational = true;
		Error.captureStackTrace(this, this.constructor);
	}
}

// ! Create JWT token
const createToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

// ! Configure nodemailer
let transporter;

const initializeTransporter = () => {
	if (
		!process.env.EMAIL_SERVICE ||
		!process.env.EMAIL_USERNAME ||
		!process.env.EMAIL_PASSWORD
	) {
		console.error(
			"Email configuration is missing. Email features will not work."
		);
		return false;
	}

	transporter = nodemailer.createTransport({
		service: process.env.EMAIL_SERVICE,
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	return true;
};

// ! Initialize transporter on module load
initializeTransporter();

// ! Register user
export const register = asyncHandler(async (req, res) => {
	const { email, password, firstName, lastName } = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new AppError("User already exists", 400);
	}

	const user = await User.create({
		email,
		password,
		firstName,
		lastName,
	});

	// ! Create profile for the new user
	await Profile.create({
		user: user._id,
	});

	const token = createToken(user._id);

	// ! Set cookie
	res.cookie("token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		maxAge: 7 * 24 * 60 * 60 * 1000, // ! 7 days
		sameSite: "Strict",
	});

	res.status(201).json({
		success: true,
		user: {
			id: user.id || user._id,
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
		},
	});
});

// ! Login user
export const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email }).select("+password");

	if (!user || !(await user.matchPassword(password))) {
		res.status(401);
		throw new AppError("Invalid email or password", 401);
	}

	// ! Update last active in profile
	const profile = await Profile.findOne({ user: user._id });
	if (profile) {
		profile.lastActive = Date.now();
		await profile.save();
	}

	const token = createToken(user._id);

	// ! Set cookie
	res.cookie("token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		maxAge: 7 * 24 * 60 * 60 * 1000, // ! 7 days
		sameSite: "Strict",
	});

	res.json({
		success: true,
		user: {
			id: user._id,
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
		},
	});
});

// ! Logout user
export const logout = asyncHandler(async (req, res) => {
	res.cookie("token", "none", {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "Strict",
	});

	res.json({
		success: true,
		message: "User logged out successfully",
	});
});

// ! Forgot password
export const forgotPassword = asyncHandler(async (req, res) => {
	// Check if email service is configured
	if (!transporter) {
		res.status(500);
		throw new AppError("Email service is not configured", 500);
	}

	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		res.status(404);
		throw new AppError("User not found", 404);
	}

	const resetToken = user.getResetPasswordToken();
	await user.save();

	const resetUrl = `${process.env.CLIENT_URL}/resetpassword/${resetToken}`;

	const message = `
    <h1 style="font-family: sans-serif; font-size: 20px; color: #333; margin: 0 0 10px;">Password Reset Request</h1>
    <p style="font-family: sans-serif; font-size: 16px; color: #666; line-height: 24px; margin: 0 0 20px;">Hello ${user.firstName},</p>
    <p style="font-family: sans-serif; font-size: 16px; color: #666; line-height: 24px; margin: 0 0 20px;">You are receiving this email because you (or someone else) has requested to reset your password.</p>
    <p style="font-family: sans-serif; font-size: 16px; color: #666; line-height: 24px; margin: 0 0 20px;">Please click on the following link to reset your password:</p>
    <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; font-family: sans-serif; font-size: 16px;">Reset Password</a>
    <p style="font-family: sans-serif; font-size: 16px; color: #666; line-height: 24px; margin: 20px 0 0;">If you did not request this, please ignore this email and your password will remain unchanged.</p>
    <p style="font-family: sans-serif; font-size: 16px; color: #666; line-height: 24px; margin: 20px 0 0;">This link will expire in 1 hour.</p>
    <br>
    <p style="font-family: sans-serif; font-size: 16px; color: #666; line-height: 24px; margin: 20px 0 0;">Best regards,</p>
    <p style="font-family: sans-serif; font-size: 16px; color: #666; line-height: 24px; margin: 0;">Your Quill Team</p>
`;

	try {
		await transporter.sendMail({
			from: `"Quill Support" <${process.env.EMAIL_FROM}>`,
			to: user.email,
			subject: "Password Reset Request",
			html: message,
			text: message.replace(/<[^>]*>/g, ""), // Strip HTML for plain text version
		});

		res.json({
			success: true,
			message: "Password reset email sent successfully",
		});
	} catch (error) {
		console.error("Email sending error:", error);
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;
		await user.save();

		res.status(500);
		throw new AppError(
			"Could not send password reset email. Please try again later.",
			500
		);
	}
});

// ! Reset password
export const resetPassword = asyncHandler(async (req, res) => {
	const resetPasswordToken = crypto
		.createHash("sha256")
		.update(req.params.resettoken)
		.digest("hex");

	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() },
	});

	if (!user) {
		res.status(400);
		throw new AppError("Invalid reset token", 400);
	}

	user.password = req.body.password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;
	await user.save();

	const token = createToken(user._id);

	res.cookie("token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
		sameSite: "Strict",
	});

	res.json({
		success: true,
		message: "Password reset successful",
	});
});
