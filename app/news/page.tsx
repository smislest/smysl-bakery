
import Link from "next/link";
import Image from "next/image";
import type { News } from '@/lib/directus/types';

export const metadata = {
  title: "Новости | СМЫСЛ есть",
  description: "Все новости и события пекарни 'СМЫСЛ есть'. Актуальные анонсы, победы, открытия и новинки!"
};

export const revalidate = 60; // ISR: обновлять раз в минуту

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055";
const getImageUrl = (img: any) => {
  if (!img || !img.filename_disk) return "/img/placeholder.jpg";
  return `${DIRECTUS_URL}/assets/${img.filename_disk}`;
};

export default async function NewsListPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ''}/api/news`, { cache: 'no-store' });
  const news: News[] = await res.json();
  return (
    <section className="max-w-4xl mx-auto py-12 px-4 bg-white">
      <nav className="mb-6 text-sm text-brown/70">
        <Link href="/" className="hover:underline">Главная</Link> / <span>Новости</span>
      </nav>
      <h1 className="text-3xl md:text-5xl font-bold mb-10 text-brown">Новости</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {news.map((item: News) => (
          <Link key={item.slug} href={`/news/${item.slug}`} className="block bg-[#fdebc1] rounded-3xl overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative aspect-[16/9]">
              <Image src={getImageUrl(item.news_photo)} alt={item.title} fill className="object-cover rounded-t-3xl" />
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-2xl text-sm font-medium text-white bg-[#619e5a]">
                {item.date}
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-brown mb-2 line-clamp-2">{item.title}</h2>
              <p className="text-brown/70 text-base leading-relaxed line-clamp-3">{item.excerpt}</p>
              <span className="inline-block mt-4 text-primary font-medium">Читать далее →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
