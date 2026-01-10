export async function GET() {
  const res = await fetch(
    "https://admin.smislest.ru/items/products",
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await res.json();

  return Response.json({
    status: res.status,
    data,
  });
}
