// ! server.js

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import xss from "xss";
import csurf from "csurf";
import rateLimit from "express-rate-limit";

// ! Import routes
import authRoutes from "./src/routes/auth.routes.js";
import profileRoutes from "./src/routes/profile.routes.js";
import recipesRoutes from "./src/routes/recipes.routes.js";
import cartRoutes from "./src/routes/cart.routes.js";
import orderRoutes from "./src/routes/orders.routes.js";
import favoritesRoutes from "./src/routes/favorites.routes.js";
import productsRoutes from './src/routes/product.routes.js'

// ! Import logger configuration
import {
	printAsciiArt,
	logInfo,
	logSuccess,
	logWarning,
	logError,
	setupMorganLogger,
} from "./src/utils/logger.js";

// ! Initialize Express app
const app = express();

// ! Print ASCII art
printAsciiArt();

// ! Log information about server startup
logInfo("🚀 Initializing server...");
logInfo("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

// ! Logger configuration using morgan
app.use(setupMorganLogger(morgan));

// ! Security middleware
logInfo("⚙️  Configuring security middleware...");
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // ! 15 minutes
	max: 100, // ! Limit each IP to 100 requests per windowMs
});

// ! Use middleware
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(
	cors({
		origin: process.env.CLIENT_URL || "http://localhost:3000",
		credentials: true,
	})
);
logSuccess("✓ Security middleware configured");

// ! XSS protection and rate limiting middleware
logInfo("⚙️  Setting up protection layers...");
app.use((req, res, next) => {
	// ! Simple XSS protection for request body
	if (req.body) {
		Object.keys(req.body).forEach((key) => {
			if (typeof req.body[key] === "string") {
				req.body[key] = xss(req.body[key]);
			}
		});
	}
	next();
});
app.use("/api/", limiter);
logSuccess("✓ Protection layers active");

// ! Mount routes
logInfo("⚙️  Mounting API routes...");
app.use("/auth", authRoutes);
app.use("/recipes", recipesRoutes);
app.use("/favorites", favoritesRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);
app.use("/profile", profileRoutes);
app.use("/products", productsRoutes)
logSuccess("✓ API routes mounted");

// ! Error handling middleware
app.use((err, req, res, next) => {
	logError(`Error occurred: ${err.message}`);
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	res.status(statusCode).json({
		success: false,
		message: err.message,
		stack: process.env.NODE_ENV === "production" ? null : err.stack,
	});
});

// ! Handle 404
app.use((req, res) => {
	logWarning(`Route not found: ${req.originalUrl}`);
	res.status(404).json({
		success: false,
		message: "Route not found",
	});
});

// ! MongoDB connection
logInfo("⚙️  Connecting to MongoDB...");
mongoose
	.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce", {
		autoIndex: true,
		serverSelectionTimeoutMS: 5000,
		socketTimeoutMS: 45000,
		family: 4,
	})
	.then(() => {
		logSuccess("✓ MongoDB connected successfully");
		logInfo("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

		const PORT = process.env.PORT || 5000;
		app.listen(PORT, () => {
			logInfo("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
			logSuccess("✓ Server is up and running!");
			logInfo(`📡 Port: ${PORT}`);
			logInfo(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
			logInfo(`🔗 API URL: http://localhost:${PORT}/api`);
			logInfo("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

			// ! Print available routes
			logInfo("📍 Available Routes:");

			logInfo("\n📊 Status Codes:");
			logSuccess("  2XX - Success");
			logInfo("  3XX - Redirection");
			logWarning("  4XX - Client Error");
			logError("  5XX - Server Error");

			logInfo("\n🔐 Auth:");
			logInfo("  POST   /api/auth/register      - Register new user");
			logInfo("  POST   /api/auth/login         - Login user");
			logInfo("  GET    /api/auth/logout        - Logout user");

			logInfo("\n👤 Profile:");
			logInfo("  GET    /api/profile           - Get user profile");
			logInfo("  PUT    /api/profile           - Update profile");
			logInfo("  DELETE /api/profile           - Delete profile");

			logInfo("\n⭐ Favorites:");
			logInfo("  POST   /api/profile/favorites/:productId  - Add to favorites");
			logInfo(
				"  DELETE /api/profile/favorites/:productId  - Remove from favorites"
			);

			logInfo("\n🛒 Cart:");
			logInfo("  POST   /api/profile/cart                  - Add to cart");
			logInfo("  PATCH  /api/profile/cart/:productId      - Update cart item");
			logInfo("  DELETE /api/profile/cart/:productId      - Remove from cart");
			logInfo("  DELETE /api/profile/cart                  - Clear cart");

			logInfo("\n📦 Orders:");
			logInfo("  GET    /api/profile/orders     - Get all orders");
			logInfo("  POST   /api/profile/orders     - Create new order");

			logInfo("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
			logSuccess("🎉 Server is ready to accept requests!");
			logInfo("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
		});
	})
	.catch((err) => {
		logError(`✗ Error connecting to MongoDB: ${err.message}`);
		process.exit(1);
	});
