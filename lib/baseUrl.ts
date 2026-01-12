export function getBaseUrl(): string {
  const publicOrigin = process.env.NEXT_PUBLIC_SITE_URL;
  if (publicOrigin && /^https?:\/\//.test(publicOrigin)) {
    return publicOrigin.replace(/\/$/, '');
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  const port = process.env.PORT || '3000';
  return `http://localhost:${port}`;
}
