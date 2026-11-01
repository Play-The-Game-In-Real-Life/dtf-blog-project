import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** Published (non-draft) posts, newest first. Use this everywhere, never call getCollection('blog') directly. */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export const postUrl = (post: Post) => `/chronicles/${post.id}/`;

export const formatDate = (date: Date) => date.toISOString().split('T')[0];

export const tagSlug = (tag: string) =>
  tag.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export const tagUrl = (tag: string) => `/realms/${tagSlug(tag)}/`;

export interface TagInfo {
  tag: string;
  slug: string;
  count: number;
}

export function getTags(posts: Post[]): TagInfo[] {
  const counts = new Map<string, number>();
  for (const post of posts) {
    counts.set(post.data.tag, (counts.get(post.data.tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, slug: tagSlug(tag), count }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
}
