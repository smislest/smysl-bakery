import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Если включён запрет индексации, выставляем заголовок X-Robots-Tag
  if (process.env.NEXT_PUBLIC_NOINDEX === '1') {
    const response = new Response(null, {
      status: 200,
      headers: {
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
      },
    });
    return response;
  }
  return undefined;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};