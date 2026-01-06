import type { Metadata } from 'next';
import { buildOpenGraph, buildTwitter } from '../../lib/seo';
import Link from 'next/link';
import { getAllArticles } from '../../lib/blogData';

export const metadata: Metadata = {
  title: 'Статьи о безглютеновом питании и здоровье',
  description: 'Полезные статьи о безглютеновом питании, рецепты, советы по здоровому образу жизни. Блог пекарни СМЫСЛ есть.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: buildOpenGraph({
    title: 'Статьи и блог | СМЫСЛ есть',
    description: 'Полезные статьи о безглютеновом питании, рецепты, советы по здоровому образу жизни.',
    url: '/blog',
  }),
  twitter: buildTwitter({
    title: 'Статьи и блог | СМЫСЛ есть',
    description: 'Полезные статьи о безглютеновом питании, рецепты, советы по здоровому образу жизни.',
  }),
};

export default function BlogPage() {
  const articles = getAllArticles();

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
            <h1 className="text-4xl md:text-5xl font-bold text-[#c1dedc] mb-4">
              Статьи и блог
            </h1>
            <p className="text-lg md:text-xl text-[#ffecc6]">
              Полезная информация о безглютеновом питании и здоровом образе жизни
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-16">
          <div className="grid gap-6 md:gap-8 md:grid-cols-2">
            {articles.map((article) => (
              <article
                key={article.slug}
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/10 hover:-translate-y-1 transition-transform duration-200"
              >
                <div className="mb-3">
                  <span className="text-xs font-semibold text-[#ffecc6]/80 uppercase tracking-wide">{article.category}</span>
                </div>
                <h2 className="text-2xl font-bold text-[#c1dedc] mb-3 leading-snug">
                  {article.title}
                </h2>
                <p className="text-[#ffecc6] mb-4 leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="flex flex-wrap gap-2 mb-4 text-sm text-[#ffecc6]">
                  {article.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-white/10 rounded-full border border-white/20">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-[#ffecc6]/80">
                  <span>{article.date}</span>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-2 text-[#ffecc6] hover:text-[#c1dedc] font-semibold"
                  >
                    Читать
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
