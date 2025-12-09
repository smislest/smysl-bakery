import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import "./fonts.css";
import DesktopOnly from "./components/DesktopOnly";
// SmoothScroll отключен

const montserrat = Montserrat({ 
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "СМЫСЛ есть — Безглютеновая пекарня в Москве",
  description: "Создаём счастливый и добрый мир, наполненный тёплыми моментами и любимыми вкусами",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${montserrat.variable}`}>
      <head>
        <style>{`
          /* МГНОВЕННЫЕ стили для мобильных */
          @media (max-width: 768px) {
            .mobile-only { display: block !important; }
            .desktop-only { display: none !important; }
          }
          /* Десктоп - но загрузится позже */
          @media (min-width: 769px) {
            .mobile-only { display: none !important; }
            .desktop-only { display: block !important; }
          }
        `}</style>
      </head>
      <body className={`${montserrat.className} antialiased`}>
        {/* DesktopOnly оставлен для будущего использования */}
        {children}
      </body>
    </html>
  );
}