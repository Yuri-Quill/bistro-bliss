import express from "express"; // Импортируем библиотеку Express для создания сервера
import dotenv from "dotenv"; // Импортируем dotenv для загрузки переменных окружения из .env
import cors from "cors"; // Импортируем middleware для настройки CORS (кросс-доменные запросы)
import helmet from "helmet"; // Импортируем Helmet для повышения безопасности HTTP заголовков
import cookieParser from "cookie-parser"; // Импортируем cookie-parser для работы с cookies
import morgan from "morgan"; // Импортируем morgan для логирования HTTP запросов
import compression from "compression"; // Импортируем compression для сжатия ответов
import rateLimit from "express-rate-limit"; // Импортируем middleware для ограничения запросов (Rate Limiting)

import { sanitizeInput } from "./Middleware/sanitizeMiddleware.js"; // Импортируем кастомный middleware для очистки входных данных
import { logger } from "./Middleware/winstonMiddleware.js"; // Импортируем Winston для логирования ошибок
import connectDB from "./Config/db.js"; // Импортируем конфиг для подключения к БД

import UserRoutes from "./Routes/UserRoutes.js"; // Импортируем маршруты пользователя
import RecipeRoutes from "./Routes/RecipeRoutes.js";

// Настройка ограничения запросов
const limit = rateLimit({
	windowMs: 15 * 60 * 1000, // Окно времени в 15 минут
	max: 100, // Максимум 100 запросов за 15 минут с одного IP
	message: "Слишком много запросов с этого IP, попробуйте позже", // Сообщение об ошибке, если лимит превышен
});

// Загружаем переменные окружения из файла .env
dotenv.config();

// Инициализация приложения Express
const app = express();

// Настройка middleware
app.use(
	cors({
		origin: ["http://localhost:5137", "http://localhost:5173"],
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE"], // укажите нужные методы
	})
);

app.use(helmet()); // Подключаем Helmet для защиты от различных типов атак через HTTP заголовки
app.use(cookieParser()); // Для работы с cookies в запросах
app.use(express.json({ limit: '50mb' })); // Для парсинга JSON в теле запросов
app.use(express.urlencoded({ limit: '50mb', extended: true })); // Для парсинга URL-кодированных данных в запросах (например, формы)
app.use(morgan("dev")); // Логирование HTTP запросов в консоль в режиме "dev"
app.use(compression()); // Включаем сжатие ответов для экономии пропускной способности
app.use(limit); // Применяем middleware для ограничения запросов
app.use(sanitizeInput); // Применяем кастомный middleware для санитизации входных данных (предотвращение XSS атак)

// Обработка ошибок
app.use((err, req, res, next) => {
	console.error('Detailed Server Error:', err);
	logger.error(err.message); // Логируем ошибки с помощью Winston
    
    // Определяем статус ошибки
    const statusCode = err.status || 500;
    
	res.status(statusCode).json({
		message: "Произошла ошибка на сервере",
		error: process.env.NODE_ENV === 'development' ? err.message : null,
		stack: process.env.NODE_ENV === 'development' ? err.stack : null
	}); // Отправляем ответ с ошибкой, если возникла ошибка на сервере
});

// Подключение к MongoDB
connectDB(); // Подключаемся к MongoDB

// Регистрация маршрутов

app.use("/api/users", UserRoutes);
app.use("/api/recipes", RecipeRoutes);

// Запуск сервера
const PORT = process.env.PORT || 5000; // Устанавливаем порт, либо берем его из .env (если есть), либо используем 5000 по умолчанию
app.listen(PORT, () => {
	console.log(
		`🔥 Сервер запущен на порту ${PORT} (${process.env.NODE_ENV} mode)` // Запускаем сервер и выводим сообщение о старте
	);
});

/* 

Объяснение основных действий:

    Загрузка переменных окружения:
        Файл .env загружается через dotenv.config(), и все переменные, такие как MONGO_URI, JWT_SECRET, и FRONTEND_URL, становятся доступными для использования в коде.

    Инициализация сервера Express:
        Создается приложение Express через const app = express().

    Настройка middleware:
        CORS — Для того чтобы разрешить запросы с другого домена (например, с фронтенда).
        Helmet — Защищает от различных уязвимостей, устанавливая безопасные HTTP заголовки.
        Cookie-parser — Позволяет работать с cookies в запросах.
        Morgan — Логирует HTTP запросы, что помогает в отладке.
        Compression — Сжимает ответы сервера для улучшения производительности.
        Rate Limit — Ограничивает количество запросов с одного IP, чтобы предотвратить злоупотребления.
        SanitizeInput — Кастомный middleware, который очищает входные данные от вредоносных скриптов (XSS атаки).

    Подключение к MongoDB:
        Используем mongoose.connect() для подключения к базе данных MongoDB. URI для подключения берется из .env.

    Главная страница:
        Устанавливается обработчик маршрута "/", который возвращает сообщение о том, что API работает.

    Запуск сервера:
        С помощью app.listen(PORT) сервер запускается на порту, который также берется из .env, либо на порту 5000 по умолчанию.

*/
