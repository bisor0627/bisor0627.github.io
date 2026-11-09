import rss from "@astrojs/rss";
import { getPosts } from "@utils/posts";
import type { APIContext } from "astro";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";
import { site } from "@/config";

const parser = new MarkdownIt();

function stripInvalidXmlChars(str: string): string {
	return str.replace(
		// biome-ignore lint/suspicious/noControlCharactersInRegex: https://www.w3.org/TR/xml/#charsets
		/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F\uFDD0-\uFDEF\uFFFE\uFFFF]/g,
		"",
	);
}

export async function GET(context: APIContext) {
	const posts = await getPosts();

	return rss({
		title: site.title,
		description: site.description,
		site: context.site ?? "https://bisor0627.github.io/",
		items: posts.map((post) => {
			const content = stripInvalidXmlChars(String(post.body ?? ""));
			return {
				title: post.data.title,
				pubDate: post.data.published,
				description: post.data.description || "",
				link: `/posts/${post.slug}/`,
				content: sanitizeHtml(parser.render(content), {
					allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
				}),
			};
		}),
		customData: `<language>${site.lang}</language>`,
	});
}
