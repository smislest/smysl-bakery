import { getNewsById, getNews } from "@/lib/news";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

interface NewsPageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  const news = await getNews();
  return news.map(item => ({ id: item.id }));
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { id } = await params;
  const news = await getNewsById(id);
  if (!news) {
    return {
      title: "Новость не найдена | СМЫСЛ есть",
      description: "Страница не найдена."
    };
  }
  return {
    title: `${news.title} | СМЫСЛ есть`,
    description: news.excerpt,
    openGraph: {
      title: news.title,
      description: news.excerpt,
      images: [{ url: news.image }],
      type: "article",
      url: `/news/${news.id}`,
    },
    alternates: {
      canonical: `/news/${news.id}`,
    },
  };
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { id } = await params;
  const news = await getNewsById(id);
  if (!news) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center bg-white">
        <h1 className="text-3xl font-bold mb-4">Новость не найдена</h1>
        <Link href="/news" className="text-primary underline">Назад к новостям</Link>
      </div>
    );
  }
  return (
    <article className="max-w-2xl mx-auto py-12 px-4 bg-white">
      <nav className="mb-6 text-sm text-brown/70">
        <Link href="/news" className="hover:underline">Новости</Link> / <span>{news.title}</span>
      </nav>
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-brown">{news.title}</h1>
      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-6">
        <Image src={news.image} alt={news.title} fill className="object-cover" />
      </div>
      <time className="block mb-4 text-brown/60 text-sm">{news.date}</time>
      <div className="text-lg text-brown/90 leading-relaxed mb-8">
        {news.fullContent}
      </div>
      <Link href="/news" className="inline-block px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/80 transition">Назад к новостям</Link>
      {/* Schema.org Article structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: news.title,
        image: [news.image],
        datePublished: news.date,
        description: news.excerpt,
        articleBody: news.fullContent,
        author: { '@type': 'Organization', name: 'СМЫСЛ есть' },
        publisher: { '@type': 'Organization', name: 'СМЫСЛ есть' },
        mainEntityOfPage: `/news/${news.id}`
      }) }} />
    </article>
  );
}
