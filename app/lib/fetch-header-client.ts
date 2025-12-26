export async function fetchHeaderDataClient() {
  const res = await fetch('/api/header', {
    next: { revalidate: 3600 }, // ISR: обновлять данные каждый час
  });
  if (!res.ok) {
    console.error('Failed to fetch header data');
    return null;
  }
  const json = await res.json();
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line no-console
    console.log('CLIENT fetchHeaderDataClient:', json);
  }
  return json;
}
