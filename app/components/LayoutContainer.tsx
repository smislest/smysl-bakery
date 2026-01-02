"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function LayoutContainer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isNewsPage = pathname?.startsWith('/news');

  return (
    <div className={`min-h-screen overflow-x-hidden ${!isNewsPage ? 'bg-gradient-to-b from-[#9BC381] via-[#7BA862] to-[#5F8A48]' : 'bg-white'}`}>
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