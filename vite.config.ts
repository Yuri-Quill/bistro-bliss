import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "node:path";

export default defineConfig({
	plugins: [react()], // Только React-плагин, mkcert не нужен для продакшена
	base: "/", // Базовый путь для Vercel
	resolve: {
		alias: {
			"@": path.resolve("src"), // Алиас для src
		},
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
	build: {
		outDir: "dist", // Папка сборки
		sourcemap: true, // Опционально для дебаггинга
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ['react', 'react-dom', 'react-router-dom'],
				},
			},
		},
	},
});
