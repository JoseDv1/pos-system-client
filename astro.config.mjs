import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
	output: "hybrid",
	integrations: [svelte()],
	adapter: node({
		mode: "standalone",
	}),
});
