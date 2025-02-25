import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";

//  !Извлекаем токен из запроса
const getTokenFromRequest = (req) => {
	//  !Проверяем куки
	if (req.cookies?.token) {
		return req.cookies.token;
	}
	//  !Проверяем заголовок Authorization
	if (req.headers.authorization?.startsWith("Bearer")) {
		return req.headers.authorization.split(" ")[1];
	}
	return null;
};

//  ! !Защита маршрутов (требуется аутентификация)
export const protect = asyncHandler(async (req, res, next) => {
	const token = getTokenFromRequest(req);

	if (!token) {
		res.status(401);
		throw new Error("Please login to access this resource");
	}

	try {
		//  ! !Верифицируем токен
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		//  !Получаем пользователя из базы без пароля
		const user = await User.findById(decoded.id).select("-password");

		if (!user) {
			res.status(401);
			throw new Error("User no longer exists");
		}

		//  !Проверяем, менял ли пользователь пароль после выдачи токена
		if (user.changedPasswordAfter(decoded.iat * 1000)) {
			res.status(401);
			throw new Error("User recently changed password. Please login again");
		}

		//  !Добавляем пользователя в запрос
		req.user = user;
		next();
	} catch (error) {
		if (error.name === "JsonWebTokenError") {
			res.status(401);
			throw new Error("Invalid token. Please login again");
		}
		if (error.name === "TokenExpiredError") {
			res.status(401);
			throw new Error("Your token has expired. Please login again");
		}
		throw error;
	}
});

//  !Ограничение доступа по ролям
export const authorize = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			res.status(403);
			throw new Error(
				`User role ${req.user.role} is not authorized to access this resource`
			);
		}
		next();
	};
};

//  !Проверка, активен ли аккаунт
export const isActive = asyncHandler(async (req, res, next) => {
	if (!req.user.isActive) {
		res.status(403);
		throw new Error("Your account is not active. Please contact support");
	}
	next();
});
