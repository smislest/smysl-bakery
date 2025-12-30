import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./fonts.css";
import LayoutContainer from "./components/LayoutContainer";
import './styles/swiper.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

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
    <html lang="ru">
      <head>
        {/* Альтернатива: подключаем шрифт через link */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased overflow-x-hidden font-montserrat">
        <LayoutContainer>
          {children}
        </LayoutContainer>
      </body>
    </html>
  );
}