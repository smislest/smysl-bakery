// Импорт больше не нужен, используем fetch из Directus

import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import directus from "@/app/lib/directus";
import { readItems } from "@directus/sdk";



interface NewsPageProps {
  params: { id: string };
  };


// Тип для новости
interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  news_photo?: { filename_disk?: string } | null;
  date: string;
  content: string;
}

// Получение всех id для SSG
export async function generateStaticParams() {
  const items = await directus.request(
    readItems('news', { fields: ['id'] })
  ) as NewsItem[];
  return (items || []).map((item) => ({ id: String(item.id) }));
}


// Метаданные для страницы новости
export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { id } = await params;
  const data = await directus.request(
    readItems('news', {
      fields: [
        'id',
        'title',
        'excerpt',
        { news_photo: ['*'] },
        'date',
        'content',
      ],
      filter: { id: { _eq: id } },
      limit: 1,
    })
  );
  const news = data && data[0];
  if (!news) {
    return {
      title: "Новость не найдена | СМЫСЛ есть",
      description: "Страница не найдена."
    };
  }
  const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055";
  return {
    title: `${news.title} | СМЫСЛ есть`,
    description: news.excerpt,
    openGraph: {
      title: news.title,
      description: news.excerpt,
      images: news.news_photo && news.news_photo.filename_disk ? [{ url: `${DIRECTUS_URL}/assets/${news.news_photo.filename_disk}` }] : [],
      type: "article",
      url: `/news/${news.id}`,
    },
    alternates: {
      canonical: `/news/${news.id}`,
    },
  };
}


// Основная страница новости
export default async function NewsPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = await directus.request(
    readItems('news', {
      fields: [
        'id',
        'title',
        'excerpt',
        { news_photo: ['filename_disk'] },
        'date',
        'content',
      ],
      filter: { id: { _eq: id } },
      limit: 1,
    })
  ) as NewsItem[];
  const news = data && data[0];
  if (!news) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center bg-white">
        <h1 className="text-3xl font-bold mb-4">Новость не найдена</h1>
        <Link href="/news" className="text-primary underline">Назад к новостям</Link>
      </div>
    );
  }
  const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055";
  const getImageUrl = (file: { filename_disk?: string } | null | undefined) => {
    if (!file || !file.filename_disk) return "/img/placeholder.jpg";
    return `${DIRECTUS_URL}/assets/${file.filename_disk}`;
  };
  return (
    <article className="max-w-2xl mx-auto py-12 px-4 bg-white">
      <nav className="mb-6 text-sm text-brown/70">
        <Link href="/news" className="hover:underline">Новости</Link> / <span>{news.title}</span>
      </nav>
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-brown">{news.title}</h1>
      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-6">
        {/* DEBUG: news_photo и getImageUrl(news.news_photo) */}
        <div style={{background:'#fee',color:'#a00',padding:'8px',fontSize:'12px',marginBottom:'8px',wordBreak:'break-all'}}>
          <div><b>news_photo:</b> {JSON.stringify(news.news_photo)}</div>
          <div><b>src:</b> {getImageUrl(news.news_photo)}</div>
        </div>
        <Image src={getImageUrl(news.news_photo)} alt={news.title} fill className="object-cover" />
      </div>
      <time className="block mb-4 text-brown/60 text-sm">{news.date}</time>
      <div className="text-lg text-brown/90 leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: news.content }} />
      <Link href="/news" className="inline-block px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/80 transition">Назад к новостям</Link>
      {/* Schema.org Article structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: news.title,
        image: [getImageUrl(news.news_photo)],
        datePublished: news.date,
        description: news.excerpt,
        articleBody: news.content,
        author: { '@type': 'Organization', name: 'СМЫСЛ есть' },
        publisher: { '@type': 'Organization', name: 'СМЫСЛ есть' },
        mainEntityOfPage: `/news/${news.id}`
      }) }} />
    </article>
  );
}
