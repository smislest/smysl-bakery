
import Link from "next/link";
import Image from "next/image";
import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { newsData } from '../../lib/news';

export const metadata = {
  title: "Новости | СМЫСЛ есть",
  description: "Все новости и события пекарни 'СМЫСЛ есть'. Актуальные анонсы, победы, открытия и новинки!"
};

interface NewsImage {
  id?: string;
  filename_disk?: string;
}

interface NewsItem {
  id: number | string;
  slug: string;
  title: string;
  excerpt: string;
  news_photo: NewsImage | null;
  date: string;
  content: string;
}

async function getNewsList() {
  try {
    return await directus.request(
      readItems('news', {
        fields: [
          'id',
          'slug',
          'title',
          'excerpt',
          { news_photo: ['id', 'filename_disk'] },
          'date',
          'content',
        ],
        sort: ['-date'],
      })
    ) as NewsItem[];
  } catch (e) {
    return newsData;
  }
}

export default async function NewsListPage() {
  const news = await getNewsList();

  const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055";
  const getImageUrl = (img: NewsImage | null) => {
    if (!img || !img.filename_disk) return "/img/placeholder.jpg";
    return `${DIRECTUS_URL}/assets/${img.filename_disk}`;
  };

  return (
    <section className="max-w-4xl mx-auto py-12 px-4 bg-white">
      <nav className="mb-6 text-sm text-brown/70">
        <Link href="/" className="hover:underline">Главная</Link> / <span>Новости</span>
      </nav>
      <h1 className="text-3xl md:text-5xl font-bold mb-10 text-brown">Новости</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {news.map(item => (
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
