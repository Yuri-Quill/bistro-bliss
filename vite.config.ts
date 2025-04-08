import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "node:path";
import mkcert from "vite-plugin-mkcert"; // Прямой импорт

export default defineConfig({
	plugins: [react(), mkcert()], // Добавляем mkcert
	server: {
		host: "localhost", // Хост
		port: 5173, // Порт
		 // Включаем HTTPS (опционально, но полезно для явности)
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
          @use "sass:color";
          @use "@/helpers/variables" as *;
          @use "@/helpers/mixins" as *;
        `,
			},
		},
	},
	resolve: {
		alias: {
			"@": path.resolve("src"),
		},
	},
});
