import type { Metadata } from 'next';
import { buildOpenGraph, buildTwitter } from '../../lib/seo';
import FAQSection from '../components/FAQSection';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Частые вопросы о безглютеновой выпечке',
  description: 'Ответы на популярные вопросы о безглютеновой выпечке, целиакии, составе продуктов и доставке. Узнайте больше о пекарне СМЫСЛ есть.',
  alternates: {
    canonical: '/faq',
  },
  openGraph: buildOpenGraph({
    title: 'Частые вопросы | СМЫСЛ есть',
    description: 'Ответы на популярные вопросы о безглютеновой выпечке, целиакии, составе продуктов и доставке.',
    url: '/faq',
  }),
  twitter: buildTwitter({
    title: 'Частые вопросы | СМЫСЛ есть',
    description: 'Ответы на популярные вопросы о безглютеновой выпечке, целиакии, составе продуктов и доставке.',
  }),
};

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-10">
        <Link href="/" className="inline-flex items-center gap-2 text-[#2D5F3F] hover:text-[#234d32] transition-colors mb-6">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Назад на главную
        </Link>

        <div className="bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg rounded-3xl p-8 md:p-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1f3b2a]">
            Частые вопросы
          </h1>
          <p className="text-lg md:text-xl text-[#2d5f3f] mt-3">
            Ответы на популярные вопросы о безглютеновой выпечке, составе и доставке
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <FAQSection />
      </div>
    </div>
  );
}
