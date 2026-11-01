// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
	site: "https://damnthesefeelings.com",
	trailingSlash: "always",
	integrations: [mdx(), sitemap({
			// The vault and the sub-blogs behind it are private: keep them out of the sitemap.
			filter: (page) => !["/gate", "/grudges", "/pudo-ser"].some((p) => new URL(page).pathname.startsWith(p)),
		}),],
	adapter: cloudflare({
		platformProxy: {
			enabled: true,
		},
	}),
});
