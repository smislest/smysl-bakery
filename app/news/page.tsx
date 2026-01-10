import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import type { NewsImage } from '../../lib/news';
import { getNewsData } from '../../lib/newsData';
import FooterClient from "../components/FooterClient";
import { absoluteUrl, buildOpenGraph, buildRobots, buildTwitter, siteName } from "../../lib/seo";
import { getSiteSettings } from "../../lib/siteSettingsData";

export async function generateMetadata(): Promise<Metadata> {
  const pageTitle = `Новости | ${siteName}`;
  const pageDescription = "Последние новости безглютеновой пекарни «СМЫСЛ есть»: анонсы, события, новинки меню.";
  
  return {
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
}

export default async function NewsListPage() {
  const news = await getNewsData();
  const seoData = await getSiteSettings();

  const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://admin.smislest.ru';

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
    <div className="min-h-screen relative" style={{ backgroundColor: '#544a44' }}>
      {/* Декор: радиальный градиент и колосья */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '1100px',
            height: '1100px',
            background: 'radial-gradient(circle at center, rgba(255, 236, 198, 0.25) 0%, rgba(255, 236, 198, 0.12) 40%, transparent 70%)',
            filter: 'blur(0px)',
          }}
        />
        <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-[240px] xl:w-[280px]">
          <img
            src="/img/l_wheat.png"
            alt="Декоративные колосья"
            className="w-full h-auto select-none"
            draggable={false}
            loading="lazy"
          />
        </div>
        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[240px] xl:w-[280px]">
          <img
            src="/img/r_wheat.png"
            alt="Декоративные колосья"
            className="w-full h-auto select-none"
            draggable={false}
            loading="lazy"
          />
        </div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-10">
          <Link href="/" className="inline-flex items-center gap-2 text-[#ffecc6] hover:opacity-80 transition-colors mb-6">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Назад на главную
          </Link>

          <div className="bg-white/10 backdrop-blur-sm border border-white/10 shadow-lg rounded-3xl p-8 md:p-10">
            <h1 className="text-4xl md:text-5xl font-bold text-[#c1dedc] mb-4">Новости</h1>
            <p className="text-lg md:text-xl text-[#ffecc6]">Последние события и обновления нашей пекарни</p>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-16">
          {news.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 shadow-lg rounded-3xl p-10 text-center">
              <p className="text-[#ffecc6] text-lg mb-4">Новости загружаются из Directus...</p>
              <p className="text-white/80 text-sm">Если Directus временно недоступен, новости появятся после восстановления соединения.</p>
              <Link href="/" className="inline-block mt-6 px-6 py-3 bg-[#ffecc6] text-[#544a44] rounded-full hover:opacity-90 transition">
                Вернуться на главную
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item) => (
                <Link
                  key={item.slug}
                  href={`/news/${item.slug}`}
                  className="bg-white/10 backdrop-blur-sm rounded-3xl p-0 border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={getImageUrl(item.news_photo)}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 left-4 px-4 py-1.5 rounded-2xl text-sm font-medium z-10 text-white" style={{ backgroundColor: '#619e5a' }}>
                      {formatDate(item.date)}
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <h2 className="text-lg md:text-xl font-bold leading-tight line-clamp-2 text-[#c1dedc]">
                      {item.title}
                    </h2>
                    <p className="text-sm md:text-base leading-relaxed line-clamp-3 text-[#ffecc6]">
                      {item.excerpt}
                    </p>
                    <div className="text-sm font-medium inline-flex items-center gap-1 text-[#ffecc6]">
                      Читать далее →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <FooterClient seoData={seoData} />
    </div>
  );
}
