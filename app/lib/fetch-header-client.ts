export async function fetchHeaderDataClient() {
  const res = await fetch('/api/header', {
    next: { revalidate: 3600 }, // ISR: обновлять данные каждый час
  });
  if (!res.ok) {
    return null;
  }
  const json = await res.json();
  return json;
}
