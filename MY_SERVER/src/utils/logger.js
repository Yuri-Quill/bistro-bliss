
import winston from "winston";
import chalk from "chalk";

// ! Функция для вывода ASCII-арт
export const printAsciiArt = () => {
	console.log(
		chalk.cyan(`
    ███████╗███████╗██████╗ ██╗   ██╗███████╗██████╗ 
    ██╔════╝██╔════╝██╔══██╗██║   ██║██╔════╝██╔══██╗
    ███████╗█████╗  ██████╔╝██║   ██║█████╗  ██████╔╝
    ╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██╔══╝  ██╔══██╗
    ███████║███████╗██║  ██║ ╚████╔╝ ███████╗██║  ██║
    ╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝
    `)
	);
};

// ! Функции для вывода разных уровней логов
export const logInfo = (message) => {
	console.log(chalk.cyan.bold(message));
};

export const logSuccess = (message) => {
	console.log(chalk.green.bold(message));
};

export const logWarning = (message) => {
	console.log(chalk.yellow(message));
};

export const logError = (message) => {
	console.error(chalk.red("❌ Error: "), message);
};

export const logDebug = (message) => {
	console.log(chalk.gray(message));
};

// ! Конфигурация winston логгера
export const logger = winston.createLogger({
	level: "info",
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.json()
	),
	transports: [
		new winston.transports.File({ filename: "../logs/error.log", level: "error" }),
		new winston.transports.File({ filename: "../logs/combined.log" }),
	],
});

if (process.env.NODE_ENV !== "production") {
	logger.add(
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.simple()
			),
		})
	);
}

// ! morgan logger setup
export const setupMorganLogger = (morgan) => {
	morgan.token("statusColor", (req, res) => {
		const status = res.statusCode;
		if (status >= 500) return chalk.red(status);
		if (status >= 400) return chalk.yellow(status);
		if (status >= 300) return chalk.cyan(status);
		return chalk.green(status);
	});

	return morgan((tokens, req, res) => {
		return [
			chalk.cyan(tokens.method(req, res)),
			tokens.statusColor(req, res),
			chalk.white(tokens.url(req, res)),
			chalk.yellow(tokens["response-time"](req, res) + " ms"),
		].join(" ");
	});
};
