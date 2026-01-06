export function GET() {
  const noindex = process.env.NEXT_PUBLIC_NOINDEX === '1';

  if (noindex) {
    return new Response(
      `User-agent: *
Disallow: /
`,
      {
        status: 200,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
        },
      }
    );
  }

  const sitemapUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`
    : 'https://smysl-bakery-8e13.vercel.app/sitemap.xml';

  return new Response(
    `User-agent: *
Disallow:
Sitemap: ${sitemapUrl}
`,
    {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    }
  );
}