import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		// Which realm (ex) this chronicle is filed under. Must match a `tag` in src/consts.ts.
		tag: z.string().default("Joe"),
		// One-line mood, shown on the card and post.
		mood: z.string().optional(),
		// Optional AI-generated image for this one post: a path under /public, e.g. "/chronicles/amour-01.jpg".
		heroImage: z.string().optional(),
		heroAlt: z.string().optional(),
		draft: z.boolean().default(false),
	}),
});

// The Grudge Book: one-page case files. Their own section, separate from the main blog.
const cases = defineCollection({
	loader: glob({ base: "./src/content/cases", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		caseNo: z.string(), // e.g. "DTF-0001"
		title: z.string(),
		defendant: z.string(),
		charges: z.array(z.string()),
		status: z.enum(["Open", "Closed", "Dismissed", "Pending Sentencing"]).default("Open"),
		filed: z.coerce.date(),
		summary: z.string(),
		draft: z.boolean().default(false),
	}),
});

// Pudo Ser ("what could have been"): quiet fragments about lives that never happened.
const dreams = defineCollection({
	loader: glob({ base: "./src/content/dreams", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: z.string(),
		version: z.string(), // the one-line "version where..." shown under the title
		pubDate: z.coerce.date(),
		draft: z.boolean().default(false),
	}),
});

export const collections = { blog, cases, dreams };
