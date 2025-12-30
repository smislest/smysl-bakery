// app/news/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import DOMPurify from 'isomorphic-dompurify';
import { fetchNewsBySlug } from "@/lib/fetch-news";

interface NewsPageProps {
  params: { slug: string };
}

export const dynamic = "force-dynamic";

export async function generateMetadata(props: NewsPageProps): Promise<Metadata> {
  const params = typeof props.params?.then === 'function' ? await props.params : props.params;
  const news = await fetchNewsBySlug(params.slug);

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055';

  if (!news) {
    return {
      title: "Новость не найдена | СМЫСЛ есть",
      description: "Страница не найдена.",
    };
  }

  const imageUrl = news.news_photo
    ? `${DIRECTUS_URL}/assets/${news.news_photo.filename_disk}`
    : null;

  return {
    title: `${news.title} | СМЫСЛ есть`,
    description: news.excerpt,
    openGraph: {
      title: news.title,
      description: news.excerpt,
      images: imageUrl ? [{ url: imageUrl }] : [],
      type: "article",
      url: `${SITE_URL}/news/${news.slug}`,
    },
    alternates: {
      canonical: `${SITE_URL}/news/${news.slug}`,
    },
  };
}

export default async function NewsPage(props: NewsPageProps) {
  const params = typeof props.params?.then === 'function' ? await props.params : props.params;
  const news = await fetchNewsBySlug(params.slug);
  const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055';

  if (!news) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center bg-white">
        <h1 className="text-3xl font-bold mb-4">Новость не найдена</h1>
        <Link href="/news" className="text-primary underline">
          Назад к новостям
        </Link>
      </div>
    );
  }

  const imageUrl = news.news_photo
    ? `${DIRECTUS_URL}/assets/${news.news_photo.filename_disk}`
    : '/img/placeholder.jpg';

  const cleanContent = DOMPurify.sanitize(news.content);

  const isDev = process.env.NODE_ENV === 'development';

  return (
    <article className="max-w-2xl mx-auto py-12 px-4 bg-white">

      <nav className="mb-6 text-sm text-brown/70">
        <Link href="/news" className="hover:underline">
          Новости
        </Link>{" "}
        / <span>{news.title}</span>
      </nav>

      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-brown">
        {news.title}
      </h1>

      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-6">
        <Image
          src={imageUrl}
          alt={news.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 700px"
        />
      </div>

      <time className="block mb-4 text-brown/60 text-sm">{news.date}</time>

      <div
        className="text-lg text-brown/90 leading-relaxed mb-8"
        dangerouslySetInnerHTML={{ __html: cleanContent }}
      />

      <Link
        href="/news"
        className="inline-block px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/80 transition"
      >
        Назад к новостям
      </Link>
    </article>
  );
}