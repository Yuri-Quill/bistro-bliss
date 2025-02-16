import jwt from "jsonwebtoken";

// Middleware для защиты маршрутов
export const protect = (req, res, next) => {
	const token = req.cookies.token;

	if (!token) {
		return res.status(401).json({ message: "Необходима авторизация" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (error) {
		res.status(401).json({ message: "Токен недействителен" });
	}
};
