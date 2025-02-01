import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "node:path"; 

export default defineConfig({
	plugins: [react()],
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
