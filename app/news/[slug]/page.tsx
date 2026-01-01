// app/news/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import DOMPurify from 'isomorphic-dompurify';
import type { NewsItem } from '../../../lib/news';
import { getNewsData } from '../../../lib/newsData';
import { newsData as fallbackNews } from '../../../lib/news';
import FooterClient from "../../components/FooterClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function NewsPage(props: PageProps) {
  const params = await props.params;
  const slug = params.slug;
  
  console.log('📄 Loading news page for slug:', slug);
  
  // Загружаем все новости на сервере (Directus → Supabase → fallback)
  const allNews = await getNewsData().catch((err) => {
    console.error('❌ Error loading news data:', err);
    return fallbackNews;
  });
  
  console.log('📦 Total news loaded:', allNews.length);
  
  // Находим текущую новость
  const news = allNews.find(n => n.slug === slug) || null;
  
  console.log('📰 Found news:', news ? news.title : 'NOT FOUND');
  
  // Находим следующую новость
  let nextNews: NewsItem | null = null;
  if (news) {
    const currentIndex = allNews.findIndex(n => n.slug === slug);
    nextNews = allNews[currentIndex + 1] || allNews[0] || null; // Циклическая навигация
  }

  if (!news) {
    return (
      <>
        <div className="min-h-screen bg-white">
          <div className="max-w-5xl mx-auto py-20 px-6 text-center">
            <h1 className="text-4xl font-bold mb-6 text-gray-900">Новость не найдена</h1>
            <Link href="/news" className="text-[#619e5a] hover:underline text-lg">
              ← Назад к новостям
            </Link>
          </div>
        </div>
        <FooterClient />
      </>
    );
  }

  const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://smysl-bakery-directus.onrender.com';
  const imageUrl = news.news_photo
    ? `${DIRECTUS_URL}/assets/${news.news_photo.filename_disk}`
    : '/img/placeholder.jpg';

  const cleanContent = DOMPurify.sanitize(news.content || '');

  return (
    <>
      <div className="min-h-screen bg-white">
        <article className="max-w-5xl mx-auto px-6 py-8">
        
        {/* Шапка с хлебными крошками и кнопкой закрытия */}
        <div className="flex items-start justify-between mb-4">
          <nav className="text-sm text-gray-400">
            <Link href="/" className="hover:text-gray-600 transition">
              Главная
            </Link>
            <span className="mx-2">•</span>
            <Link href="/news" className="hover:text-gray-600 transition">
              Новости
            </Link>
          </nav>
          
          <Link 
            href="/news"
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition"
            title="Закрыть"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Link>
        </div>

        {/* Заголовок */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 leading-tight max-w-4xl" style={{ color: '#675b53' }}>
          {news.title}
        </h1>

        {/* Дата */}
        <time className="block mb-8 text-gray-400 text-base">
          {news.date}
        </time>

        {/* Главное изображение */}
        <div className="relative w-full max-w-4xl aspect-[16/9] mb-10 rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={news.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1280px"
            priority
          />
        </div>

        {/* Контент статьи */}
        <div
          className="prose prose-lg max-w-4xl
            prose-headings:font-bold prose-headings:mt-10 prose-headings:mb-5
            prose-h2:text-3xl prose-h3:text-2xl
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-5 prose-p:text-lg
            prose-a:text-[#619e5a] prose-a:no-underline hover:prose-a:underline
            prose-strong:font-semibold
            prose-ul:my-5 prose-ul:text-gray-700
            prose-ol:my-5 prose-ol:text-gray-700
            prose-li:mb-2 prose-li:text-lg
            prose-img:rounded-lg prose-img:my-8"
          style={{ color: '#675b53' }}
          dangerouslySetInnerHTML={{ __html: cleanContent }}
        />

        {/* Разделитель */}
        <div className="border-t border-gray-200 my-16"></div>

        {/* Следующая статья */}
        {nextNews && (
          <div className="mb-12">
            <p className="text-sm text-gray-400 uppercase tracking-wider mb-4">
              Следующая статья
            </p>
            <Link 
              href={`/news/${nextNews.slug}`}
              className="group block"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-[#619e5a] transition leading-snug">
                {nextNews.title}
              </h2>
            </Link>
          </div>
        )}

        {/* Кнопка назад */}
        <Link
          href="/news"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition text-lg"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Все новости
        </Link>

      </article>
      </div>
      <FooterClient />
    </>
  );
}