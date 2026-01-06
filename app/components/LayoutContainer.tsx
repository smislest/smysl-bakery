"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Header from "./Header";

export default function LayoutContainer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isNewsPage = pathname?.startsWith('/news');
  const isPrivacyPage = pathname?.startsWith('/privacy');
  const isContactsPage = pathname?.startsWith('/contacts');
  const isWhyGlutenFreePage = pathname?.startsWith('/why-gluten-free');
  const isBlogPage = pathname?.startsWith('/blog');
  const hasWhiteBackground = isNewsPage || isPrivacyPage;

  const backgroundClass = hasWhiteBackground
    ? 'bg-white'
    : (isContactsPage || isWhyGlutenFreePage || isBlogPage)
      ? ''
      : 'bg-gradient-to-b from-[#9BC381] via-[#7BA862] to-[#5F8A48]';

  // Обработка якоря при загрузке страницы
  useEffect(() => {
    // Получаем якорь из URL (например, из "/#products" или "?anchor=products")
    const hash = window.location.hash;
    const anchor = hash ? hash.substring(1) : null;

    if (anchor) {
      // Небольшая задержка, чтобы DOM полностью загрузился
      setTimeout(() => {
        const element = document.getElementById(anchor);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [pathname]);

  return (
    <div
      className={`min-h-screen overflow-x-hidden ${backgroundClass}`}
      style={(isContactsPage || isWhyGlutenFreePage || isBlogPage) ? { backgroundColor: '#544a44' } : undefined}
    >
      <Header />
      <main
        className="w-full mx-auto"
        style={{
          paddingTop: 'clamp(80px, 10vw, 140px)',
          paddingInline: 0,
          maxWidth: 'var(--page-max-width, 100%)',
        }}
      >
        {children}
      </main>
    </div>
  );
}