import dynamic from "next/dynamic";
import HeroSection from "./components/HeroSection";
import ScrollingIcons from "./components/ScrollingIcons";
import FooterClient from "./components/FooterClient";
import { getNewsData } from "../lib/newsData";
import { getProductsData } from "../lib/productsData";
import { getHeroData } from "../lib/heroData";

// Динамический импорт для тяжелых компонентов с SSR
const ProductsSection = dynamic(() => import("./components/ProductsSection").then(m => m.default), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
  ssr: true,
});

const AboutSectionClient = dynamic(() => import("./components/AboutSectionClient"), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
  ssr: true,
});

const NewsSection = dynamic(() => import("./components/NewsSection"), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
  ssr: true,
});

const HeartSection = dynamic(() => import("./components/HeartSection"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
  ssr: true,
});

// ISR: обновлять статические страницы каждую минуту
// На Vercel это работает без проблем с HTTPS
export const revalidate = 60;

export default async function Home() {
  // SSR/ISR: Загружаем данные на сервере
  const [newsData, productsData, heroData] = await Promise.all([
    getNewsData().catch(() => []),
    getProductsData().catch(() => []),
    getHeroData().catch(() => null),
  ]);

  return (
    <>
      <main>
        <HeroSection initialData={heroData} />
        <ScrollingIcons />
        <ProductsSection initialProducts={productsData} />
        <AboutSectionClient />
        <NewsSection initialNews={newsData} />
        <HeartSection />
      </main>
      <FooterClient showMapOnMobile={true} />
    </>
  );
}
