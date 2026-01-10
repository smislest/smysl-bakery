// app/news/[slug]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { NewsItem } from '../../../lib/news';
import { getNewsData } from '../../../lib/newsData';
import { newsData as fallbackNews } from '../../../lib/news';
import FooterClient from "../../components/FooterClient";
import SafeContent from "../../components/SafeContent";
import { absoluteUrl, buildOpenGraph, buildRobots, buildTwitter, siteName } from "../../../lib/seo";
import { getSiteSettings } from '../../../lib/siteSettingsData';

interface PageProps {
  params: { slug: string };
}

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://admin.smislest.ru';

async function loadNews(): Promise<NewsItem[]> {
  try {
    console.log('🔍 [loadNews] Вызов getNewsData()...');
    const data = await getNewsData();
    console.log('📦 [loadNews] getNewsData вернула:', data?.length || 0, 'новостей');
    if (Array.isArray(data) && data.length > 0) {
      console.log('✅ [loadNews] Возвращаю данные из getNewsData:', data.map(n => n.slug).join(', '));
      return data;
    }
    console.log('⚠️ [loadNews] getNewsData вернула пустой массив, используюПерейти на fallback');
    return fallbackNews;
  } catch (error) {
    console.log('❌ [loadNews] Ошибка при загрузке:', error instanceof Error ? error.message : error);
    return fallbackNews;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const allNews = await loadNews();
  const current = allNews.find((n) => n.slug === slug) || null;

  const title = current
    ? `${current.title} | Новости — ${siteName}`
    : `Новость не найдена | ${siteName}`;
  const description = current?.excerpt || current?.content || 'Новости пекарни «СМЫСЛ есть»';
  const imageUrl = current?.news_photo?.filename_disk
    ? `${DIRECTUS_URL}/assets/${current.news_photo.filename_disk}`
    : absoluteUrl('/img/placeholder.jpg');
  const pageUrl = absoluteUrl(`/news/${slug}`);

  return {
    title,
    description,
    alternates: {
      canonical: `/news/${slug}`,
    },
    openGraph: buildOpenGraph({
      title,
      description,
      url: pageUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: current?.title || 'Новость «СМЫСЛ есть»',
        },
      ],
    }),
    twitter: buildTwitter({
      title,
      description,
      images: [imageUrl],
    }),
    robots: buildRobots(),
  };
}

export default async function NewsPage({ params }: PageProps) {
  const { slug } = await params;
  console.log('📄 [NewsPage] Параметр slug:', slug);

  // Загружаем все новости на сервере (Directus → Supabase → fallback)
  const allNews = await loadNews();
  console.log('📋 [NewsPage] Всего новостей загружено:', allNews.length);
  console.log('📋 [NewsPage] Доступные slugs:', allNews.map(n => n.slug).join(', '));
  
  // Загружаем SEO данные для Footer
  const seoData = await getSiteSettings();
  
  // Находим текущую новость
  const news = allNews.find(n => n.slug === slug) || null;
  console.log('🔎 [NewsPage] Поиск по slug:', slug, '-> результат:', news ? '✅ найдена' : '❌ не найдена');
  
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
        <FooterClient seoData={seoData} />
      </>
    );
  }

  const imageUrl = news.news_photo
    ? `${DIRECTUS_URL}/assets/${news.news_photo.filename_disk}`
    : '/img/placeholder.jpg';

  const formatDate = (value?: string) => {
    if (!value) return '';
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return value;
    return parsed.toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' });
  };

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

        {/* Дата + источник */}
        <div className="flex items-center gap-3 mb-8 text-gray-400 text-base flex-wrap">
          <time>
            {formatDate(news.date)}
          </time>
        </div>

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
        <SafeContent
          content={news.content || ''}
          className="max-w-4xl"
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
      <FooterClient seoData={seoData} />
    </>
  );
}