
import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
	register,
	login,
	logout,
	forgotPassword,
	resetPassword,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", protect, logout);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resettoken", resetPassword);

export default router;
