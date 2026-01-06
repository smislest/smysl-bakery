import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import type { NewsImage } from '../../lib/news';
import { getNewsData } from '../../lib/newsData';
import FooterClient from "../components/FooterClient";
import { absoluteUrl, buildOpenGraph, buildRobots, buildTwitter, siteName } from "../../lib/seo";

const pageTitle = `Новости | ${siteName}`;
const pageDescription = "Последние новости безглютеновой пекарни «СМЫСЛ есть»: анонсы, события, новинки меню.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: '/news',
  },
  openGraph: buildOpenGraph({
    title: pageTitle,
    description: pageDescription,
    url: absoluteUrl('/news'),
  }),
  twitter: buildTwitter({
    title: pageTitle,
    description: pageDescription,
  }),
  robots: buildRobots(),
};

export default async function NewsListPage() {
  const news = await getNewsData();

  const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://smysl-bakery-directus.onrender.com';

  const formatDate = (value?: string) => {
    if (!value) return '';
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return value;
    return parsed.toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const getImageUrl = (img: NewsImage | null) => {
    if (!img || !img.filename_disk) return "/img/placeholder.jpg";
    return `${DIRECTUS_URL}/assets/${img.filename_disk}`;
  };

  return (
    <>
      <section className="max-w-6xl mx-auto py-12 px-6 bg-white">
      <nav className="mb-6 text-sm text-gray-400">
        <Link href="/" className="hover:text-gray-600 transition">Главная</Link>
        <span className="mx-2">•</span>
        <span>Новости</span>
      </nav>
      <h1 className="text-4xl md:text-5xl font-bold mb-12" style={{ color: '#675b53' }}>Новости</h1>
      
      {news.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-600 text-lg mb-4">Новости загружаются из Directus...</p>
          <p className="text-gray-400 text-sm">Если Directus временно недоступен, новости появятся после восстановления соединения.</p>
          <Link href="/" className="inline-block mt-6 px-6 py-3 bg-[#619e5a] text-white rounded-full hover:bg-[#619e5a]/80 transition">
            Вернуться на главную
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {news.map(item => (
            <Link 
              key={item.slug} 
              href={`/news/${item.slug}`} 
              className="rounded-3xl overflow-hidden hover:shadow-2xl transition-all hover:scale-[1.02] cursor-pointer"
              style={{ backgroundColor: '#f5f5f0' }}
            >
              <div className="relative aspect-[4/3]">
                <Image 
                  src={getImageUrl(item.news_photo)} 
                  alt={item.title} 
                  fill 
                  className="object-cover" 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full text-sm font-normal z-10 text-white" style={{ backgroundColor: '#619e5a' }}>
                  {formatDate(item.date)}
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h2 className="text-lg md:text-xl font-bold leading-tight line-clamp-2" style={{ color: '#675b53' }}>
                  {item.title}
                </h2>
                <p className="text-sm md:text-base leading-relaxed line-clamp-3" style={{ color: '#8b7f77' }}>
                  {item.excerpt}
                </p>
                <div className="text-sm font-normal hover:opacity-70 transition-opacity inline-flex items-center gap-1 pt-2" style={{ color: '#b0a8a0' }}>
                  Читать далее →
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      </section>
      <FooterClient />
    </>
  );
}
