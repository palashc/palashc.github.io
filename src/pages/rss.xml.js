import rss from "@astrojs/rss";
import { SITE, BLOG_ENABLED } from "../config";
import { getPosts } from "../lib/posts";

export async function GET(context) {
  const posts = BLOG_ENABLED ? await getPosts() : [];

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}/`,
    })),
  });
}
