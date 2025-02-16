import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../Models/UserModel.js";
import { sendResetPasswordEmail } from "../Utils/sendEmail.js";

// Генерация refresh токена
const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    );
};

// Генерация access токена
const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

// * Регистрация пользователя
export const registerUser = async (req, res, next) => { 
	try {
		const { firstName, lastName, email, password } = req.body; 

		// Проверяем наличие всех обязательных полей
		if (!firstName || !lastName || !email || !password) {
			return res.status(400).json({ 
				message: "Все поля обязательны для заполнения" 
			});
		}

		// Проверяем, существует ли уже пользователь с таким email
		const userExists = await User.findOne({ email }); 
		if (userExists) { 
			return res.status(400).json({ 
				message: "Пользователь с таким email уже существует" 
			}); 
		}

		// Хешируем пароль
		const hashedPassword = await bcrypt.hash(password, 10);

		// Генерируем токен для подтверждения email
		const emailVerificationToken = crypto.randomBytes(32).toString('hex');

		// Создаем нового пользователя
		const newUser = new User({
			firstName,
			lastName,
			email,
			password: hashedPassword,
			emailVerificationToken,
		});

		// Сохраняем пользователя
		await newUser.save();

		// Генерируем токены
		const accessToken = generateAccessToken(newUser);
		const refreshToken = generateRefreshToken(newUser);

		// Обновляем пользователя с refresh токеном
		newUser.refreshToken = refreshToken;
		await newUser.save();

		// Отправляем токены в куки
		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: 3600000, // 1 час
			sameSite: 'lax'
		});

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
			sameSite: 'lax'
		});

		// Возвращаем информацию о пользователе
		res.status(201).json({
			message: "Регистрация прошла успешно",
			user: {
				id: newUser._id,
				firstName: newUser.firstName,
				lastName: newUser.lastName,
				email: newUser.email,
				isEmailVerified: newUser.isEmailVerified
			}
		});

	} catch (error) {
		console.error('Registration Error:', error);
		next(error);
	}
};

// * Логин пользователя
export const loginUser = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		// Проверяем, существует ли пользователь
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ message: "Неверный email или пароль" });
		}

		// Проверяем пароль
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			// Увеличиваем счетчик неудачных попыток
			user.loginAttempts += 1;
			
			// Блокируем аккаунт после 5 неудачных попыток
			if (user.loginAttempts >= 5) {
				user.lockUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 минут
			}
			
			await user.save();
			return res.status(401).json({ message: "Неверный email или пароль" });
		}

		// Сбрасываем счетчик неудачных попыток
		user.loginAttempts = 0;
		user.lastLogin = new Date();
		user.lockUntil = null;

		// Генерируем токены
		const accessToken = generateAccessToken(user);
		const refreshToken = generateRefreshToken(user);

		// Обновляем refresh токен пользователя
		user.refreshToken = refreshToken;
		await user.save();

		// Отправляем токены в куки
		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: 3600000, // 1 час
			sameSite: 'lax'
		});

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
			sameSite: 'lax'
		});

		// Возвращаем информацию о пользователе
		res.json({
			message: "Вход выполнен успешно",
			user: {
				id: user._id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				isEmailVerified: user.isEmailVerified
			}
		});

	} catch (error) {
		console.error('Login Error:', error);
		next(error);
	}
};

// * Обновление токена
export const refreshTokenController = async (req, res, next) => {
	try {
		const { refreshToken } = req.cookies;

		// Проверяем наличие refresh токена
		if (!refreshToken) {
			return res.status(401).json({ message: "Требуется авторизация" });
		}

		// Верифицируем refresh токен
		const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

		// Находим пользователя
		const user = await User.findOne({ 
			_id: decoded.id, 
			refreshToken: refreshToken 
		});

		if (!user) {
			return res.status(401).json({ message: "Недействительный токен" });
		}

		// Генерируем новые токены
		const newAccessToken = generateAccessToken(user);
		const newRefreshToken = generateRefreshToken(user);

		// Обновляем refresh токен пользователя
		user.refreshToken = newRefreshToken;
		await user.save();

		// Отправляем новые токены в куки
		res.cookie("accessToken", newAccessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: 3600000, // 1 час
			sameSite: 'lax'
		});

		res.cookie("refreshToken", newRefreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
			sameSite: 'lax'
		});

		res.json({ message: "Токены обновлены успешно" });

	} catch (error) {
		console.error('Refresh Token Error:', error);
		next(error);
	}
};

// * Логаут пользователя
export const logoutUser = (req, res) => {
	try {
		res.clearCookie("accessToken", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
		});
		res.clearCookie("refreshToken", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
		});
		res.status(200).json({ message: "Вы успешно вышли" });
	} catch (error) {
		res.status(500).json({ message: "Ошибка при выходе", error: error.message });
	}
};

// * Получение информации о текущем пользователе

export const getUserProfile = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.user.email }).select("-password"); // Не возвращаем пароль
		if (!user) {
			return res.status(404).json({ message: "Пользователь не найден" });
		}
		res.status(200).json(user);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Ошибка при получении профиля", error: error.message });
	}
};

// * Обновление информации о пользователе

export const updateUserProfile = async (req, res, next) => {
	try {
		const { firstName, lastName, email, password } = req.body;

		// Находим пользователя
		const user = await User.findOne({ email: req.user.email });
		if (!user) {
			return res.status(404).json({ message: "Пользователь не найден" });
		}

		// Обновляем базовую информацию
		if (firstName) user.firstName = firstName;
		if (lastName) user.lastName = lastName;
		if (email) user.email = email;

		// Если передан новый пароль, хешируем его
		if (password) {
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);
			user.password = hashedPassword;
		}

		// Сохраняем изменения
		await user.save();

		// Возвращаем обновленную информацию о пользователе
		res.json({
			message: "Профиль успешно обновлен",
			user: {
				id: user._id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email
			}
		});

	} catch (error) {
		console.error('Update Profile Error:', error);
		next(error);
	}
};

// * Удаление пользователя
export const deleteUser = async (req, res) => {
	try {
		// Находим и удаляем пользователя
		const user = await User.findOneAndDelete({ email: req.user.email });
		if (!user) {
			return res.status(404).json({ message: "Пользователь не найден" });
		}

		res.status(200).json({ message: "Пользователь удален" });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Ошибка при удалении пользователя", error: error.message });
	}
};

// * Запрос на сброс пароля
export const requestPasswordReset = async (req, res) => {
	try {
		const { email } = req.body;

		// Проверяем, существует ли пользователь с данным email
		const user = await User.findOne({ email });
		if (!user) {
			return res
				.status(400)
				.json({ message: "Пользователь с таким email не найден" });
		}

		// Генерация токена для сброса пароля
		const resetToken = crypto.randomBytes(32).toString("hex");

		// Сохраняем токен и время его истечения в базе данных
		user.resetPasswordToken = resetToken;
		user.resetPasswordExpires = Date.now() + 3600000; // токен будет действителен 1 час
		await user.save();

		try {
			// Отправляем письмо с токеном для сброса пароля
			await sendResetPasswordEmail(email, resetToken);

			res
				.status(200)
				.json({ message: "Ссылка для сброса пароля отправлена на email" });
		} catch (emailError) {
			// Если не удалось отправить письмо, очищаем токен сброса
			user.resetPasswordToken = undefined;
			user.resetPasswordExpires = undefined;
			await user.save();

			console.error('Email sending error:', emailError);
			res
				.status(500)
				.json({ 
					message: "Не удалось отправить письмо для сброса пароля", 
					error: emailError.message 
				});
		}
	} catch (error) {
		console.error('Password reset request error:', error);
		res
			.status(500)
			.json({ message: "Ошибка запроса на сброс пароля", error: error.message });
	}
};

// * Сброс пароля
export const resetPassword = async (req, res, next) => {
	try {
		const { token, newPassword } = req.body;

		// Находим пользователя с действительным токеном сброса
		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordExpires: { $gt: Date.now() }
		});

		// Проверяем, найден ли пользователь
		if (!user) {
			return res.status(400).json({ message: "Недействительный или просроченный токен" });
		}

		// Хешируем новый пароль
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(newPassword, salt);

		// Обновляем пароль пользователя и очищаем токен сброса
		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpires = undefined;

		// Сохраняем изменения
		await user.save();

		// Отправляем ответ об успешном сбросе пароля
		res.json({ message: "Пароль успешно обновлен" });

	} catch (error) {
		console.error('Reset Password Error:', error);
		next(error);
	}
};
