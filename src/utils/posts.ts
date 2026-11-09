import { type CollectionEntry, getCollection } from "astro:content";

export type Post = CollectionEntry<"posts">;

// Published posts, newest first. Drafts show up only in `astro dev`.
export async function getPosts(): Promise<Post[]> {
	const posts = await getCollection("posts", ({ data }) =>
		import.meta.env.PROD ? data.draft !== true : true,
	);
	return posts.sort(
		(a, b) => b.data.published.valueOf() - a.data.published.valueOf(),
	);
}

// 2025-09-08 → "25-09-08", in KST so the date matches what was written in the frontmatter.
export function shortDate(date: Date): string {
	return formatDate(date).slice(2);
}

export function formatDate(date: Date): string {
	return date.toLocaleDateString("sv-SE", { timeZone: "Asia/Seoul" });
}
