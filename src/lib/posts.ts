import { getCollection, type CollectionEntry } from "astro:content";
import { SERIES, type SeriesMeta } from "../config";

export type Post = CollectionEntry<"blog">;

export type Series = SeriesMeta & {
  slug: string;
  posts: Post[];
};

/** The series slug a post belongs to (its folder), or null if standalone. */
export function seriesSlugOf(post: Post): string | null {
  const idx = post.id.indexOf("/");
  return idx === -1 ? null : post.id.slice(0, idx);
}

export function postUrl(post: Post): string {
  return `/blog/${post.id}/`;
}

/** All published posts, newest first. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Order within a series: by `order` first, then oldest-to-newest. */
export function sortBySeriesOrder(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => {
    const ao = a.data.order ?? Number.POSITIVE_INFINITY;
    const bo = b.data.order ?? Number.POSITIVE_INFINITY;
    if (ao !== bo) return ao - bo;
    return a.data.date.valueOf() - b.data.date.valueOf();
  });
}

/** Defined series that have at least one published post, with posts attached. */
export async function getSeriesList(): Promise<Series[]> {
  const posts = await getPosts();
  return Object.entries(SERIES)
    .map(([slug, meta]) => ({
      slug,
      ...meta,
      posts: sortBySeriesOrder(posts.filter((p) => seriesSlugOf(p) === slug)),
    }))
    .filter((s) => s.posts.length > 0);
}

/** Posts that are not part of any series. */
export async function getStandalonePosts(): Promise<Post[]> {
  const posts = await getPosts();
  return posts.filter((p) => seriesSlugOf(p) === null);
}

/** Series context for a single post: its series + previous/next within it. */
export async function getSeriesContext(post: Post) {
  const slug = seriesSlugOf(post);
  if (!slug || !SERIES[slug]) return null;
  const posts = await getPosts();
  const ordered = sortBySeriesOrder(
    posts.filter((p) => seriesSlugOf(p) === slug)
  );
  const index = ordered.findIndex((p) => p.id === post.id);
  return {
    slug,
    meta: SERIES[slug],
    index,
    total: ordered.length,
    prev: index > 0 ? ordered[index - 1] : null,
    next: index < ordered.length - 1 ? ordered[index + 1] : null,
  };
}
