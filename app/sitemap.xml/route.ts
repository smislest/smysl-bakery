import { absoluteUrl, siteUrl } from "../../lib/seo";
import { getNewsData } from "../../lib/newsData";
import { newsData as fallbackNews } from "../../lib/news";

type UrlEntry = {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
};

async function loadNews() {
  try {
    const data = await getNewsData();
    if (Array.isArray(data) && data.length > 0) return data;
    return fallbackNews;
  } catch {
    return fallbackNews;
  }
}

function buildUrlset(urls: UrlEntry[]) {
  const items = urls
    .map(({ loc, lastmod, changefreq, priority }) => {
      const lastmodTag = lastmod ? `<lastmod>${lastmod}</lastmod>` : '';
      const changefreqTag = changefreq ? `<changefreq>${changefreq}</changefreq>` : '';
      const priorityTag = priority ? `<priority>${priority}</priority>` : '';
      return `<url><loc>${loc}</loc>${lastmodTag}${changefreqTag}${priorityTag}</url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</urlset>`;
}

export async function GET() {
  const news = await loadNews();

  const staticUrls: UrlEntry[] = [
    {
      loc: siteUrl,
      changefreq: 'weekly',
      priority: '1.0',
    },
    {
      loc: absoluteUrl('/news'),
      changefreq: 'weekly',
      priority: '0.7',
    },
    {
      loc: absoluteUrl('/contacts'),
      changefreq: 'monthly',
      priority: '0.8',
        {
          loc: absoluteUrl('/faq'),
          changefreq: 'monthly',
          priority: '0.7',
        },
        {
          loc: absoluteUrl('/why-gluten-free'),
          changefreq: 'monthly',
          priority: '0.7',
        },
        {
          loc: absoluteUrl('/blog'),
          changefreq: 'weekly',
          priority: '0.6',
        },
    },
    {
      loc: absoluteUrl('/privacy'),
      changefreq: 'yearly',
      priority: '0.4',
    },
  ];

  const newsUrls: UrlEntry[] = news.map((item) => {
    const parsedDate = item.date ? new Date(item.date) : null;
    const hasValidDate = parsedDate && !Number.isNaN(parsedDate.getTime());

    return {
      loc: absoluteUrl(`/news/${item.slug}`),
      lastmod: hasValidDate ? parsedDate.toISOString().split('T')[0] : undefined,
      changefreq: 'monthly',
      priority: '0.6',
    };
  });

  const body = buildUrlset([...staticUrls, ...newsUrls]);

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=600, stale-while-revalidate=86400',
    },
  });
}