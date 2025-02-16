import mongoose from "mongoose";

/*  
- Функция connectDB подключается к MongoDB,
- используя URI из переменной окружения MONGO_URI.
- Если подключение не удалось, выводится сообщение об ошибке
- и процесс завершается.
*/

const connectDB = async () => {
	try {
		// Подключение к MongoDB
		await mongoose.connect(process.env.MONGO_URI);
		console.log("✅ MongoDB подключена");
	} catch (error) {
		// Если ошибка, выводится сообщение об ошибке
		console.error("❌ Ошибка подключения к MongoDB:", error);
		// Завершаем процесс, если подключение не удалось
		process.exit(1);
	}
};

export default connectDB;
