import config from '~/config.json';
import { getServices } from '~/services-data';
import { getPosts } from './articles_._index/posts.server';

export async function loader() {
  const posts = await getPosts();
  const urls = [
    { path: '' },
    { path: '/services' },
    ...getServices().map(service => ({ path: `/services/${service.slug}` })),
    { path: '/articles' },
    ...posts.map(post => ({ path: `/articles/${post.slug}`, lastmod: post.frontmatter.date })),
    { path: '/contact' },
  ];

  const body = urls
    .map(({ path, lastmod }) => {
      const date = lastmod ? `<lastmod>${new Date(lastmod).toISOString().slice(0, 10)}</lastmod>` : '';
      return `  <url><loc>${config.url}${path}</loc>${date}</url>`;
    })
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } }
  );
}
