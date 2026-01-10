import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles, getArticleBySlug } from '../../../lib/blogData';
import FooterClient from "../../components/FooterClient";
import BlogContent from "../../components/BlogContent";
import { absoluteUrl, buildOpenGraph, buildRobots, buildTwitter, siteName } from "../../../lib/seo";
import { getSiteSettings } from "../../../lib/siteSettingsData";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  const title = article
    ? `${article.title} | Блог — ${siteName}`
    : `Статья не найдена | ${siteName}`;
  const description = article?.excerpt || 'Полезные статьи о безглютеновом питании от пекарни СМЫСЛ есть';
  const imageUrl = article?.image || absoluteUrl('/img/logo.png');
  const pageUrl = absoluteUrl(`/blog/${slug}`);

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${slug}`,
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
          alt: article?.title || 'Статья блога СМЫСЛ есть',
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

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  const seoData = await getSiteSettings();

  // Получаем все статьи для навигации
  const allArticles = getAllArticles();
  const currentIndex = allArticles.findIndex(a => a.slug === slug);
  const nextArticle = currentIndex >= 0 && currentIndex < allArticles.length - 1
    ? allArticles[currentIndex + 1]
    : allArticles[0]; // Циклическая навигация

  if (!article) {
    return (
      <>
        <div className="min-h-screen relative" style={{ backgroundColor: '#544a44' }}>
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
          </div>

          <div className="relative z-10 container mx-auto px-4 py-20 text-center">
            <h1 className="text-4xl font-bold mb-6 text-[#c1dedc]">Статья не найдена</h1>
            <Link href="/blog" className="inline-flex items-center gap-2 text-[#ffecc6] hover:opacity-80 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Вернуться к статьям
            </Link>
          </div>
        </div>
        <FooterClient seoData={seoData} />
      </>
    );
  }

  const formatDate = (value?: string) => {
    if (!value) return '';
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return value;
    return parsed.toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  return (
    <>
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
          {/* Кнопка назад */}
          <div className="container mx-auto px-4 py-8">
            <Link href="/blog" className="inline-flex items-center gap-2 text-[#ffecc6] hover:opacity-80 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              К статьям
            </Link>
          </div>

          {/* Заголовок статьи */}
          <div className="container mx-auto px-4 mb-12">
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10 shadow-lg">
              <div className="text-sm text-[#ffecc6]/80 mb-4">
                <time>{formatDate(article.date)}</time>
                <span className="mx-2">•</span>
                <span className="font-semibold">{article.category}</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#c1dedc] mb-4 leading-tight">
                {article.title}
              </h1>
              <p className="text-base md:text-lg text-[#ffecc6]">
                {article.excerpt}
              </p>
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm text-[#ffecc6]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Контент статьи */}
          <div className="container mx-auto px-4 mb-12">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10 shadow-lg">
              <BlogContent content={article.content} />
            </div>
          </div>

          {/* Навигация к следующей статье */}
          {nextArticle && (
            <div className="container mx-auto px-4 mb-12">
              <Link href={`/blog/${nextArticle.slug}`} className="block group">
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10 shadow-lg hover:border-white/20 transition-all">
                  <p className="text-sm text-[#ffecc6]/70 mb-3">Следующая статья</p>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#c1dedc] mb-3 group-hover:text-[#ffecc6] transition">
                    {nextArticle.title}
                  </h3>
                  <p className="text-[#ffecc6]/90 mb-4">
                    {nextArticle.excerpt}
                  </p>
                  <div className="inline-flex items-center gap-2 text-[#ffecc6] font-semibold group-hover:gap-4 transition-all">
                    Читать далее
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
      <FooterClient seoData={seoData} />
    </>
  );
}
