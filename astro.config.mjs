import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import node from "@astrojs/node";
import { execSync } from "child_process";
const appVersion = execSync("git rev-parse HEAD").toString().trim();

// https://astro.build/config
export default defineConfig({
	output: "hybrid",
	integrations: [svelte()],
	adapter: node({
		mode: "standalone",
	}),
	vite: {
		define: {
			__COMMIT_HASH__: JSON.stringify(appVersion),
		},
	},
});
