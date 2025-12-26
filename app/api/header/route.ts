import { NextResponse } from "next/server";
import { fetchHeaderData } from "@/app/lib/fetch-header";

export async function GET() {
  const header = await fetchHeaderData();
  // Логируем результат на сервере
  // eslint-disable-next-line no-console
  console.log('API /api/header header:', header);
  if (!header) {
    return NextResponse.json({ error: "Header not found" }, { status: 404 });
  }
  return NextResponse.json(header);
}
