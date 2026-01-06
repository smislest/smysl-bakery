import type { Metadata } from 'next';
import { buildOpenGraph, buildTwitter } from '../../lib/seo';
import WhyGlutenFreeSection from '../components/WhyGlutenFreeSection';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Почему безглютеновая выпечка | Польза и преимущества',
  description: 'Узнайте о пользе безглютенового питания, кому оно подходит и почему безглютеновая выпечка может быть вкусной и полезной. Натуральные ингредиенты.',
  alternates: {
    canonical: '/why-gluten-free',
  },
  openGraph: buildOpenGraph({
    title: 'Почему безглютеновая выпечка | СМЫСЛ есть',
    description: 'Узнайте о пользе безглютенового питания, кому оно подходит и почему безглютеновая выпечка может быть вкусной и полезной.',
    url: '/why-gluten-free',
  }),
  twitter: buildTwitter({
    title: 'Почему безглютеновая выпечка | СМЫСЛ есть',
    description: 'Узнайте о пользе безглютенового питания, кому оно подходит и почему безглютеновая выпечка может быть вкусной и полезной.',
  }),
};

export default function WhyGlutenFreePage() {
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
              Почему безглютеновая выпечка?
            </h1>
            <p className="text-lg md:text-xl text-[#ffecc6] max-w-3xl">
              Всё о пользе безглютенового питания и натуральных ингредиентах
            </p>
          </div>
        </div>

        <div className="pb-12">
          <WhyGlutenFreeSection />
        </div>
      </div>
    </div>
  );
}
