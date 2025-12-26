import type { Metadata } from "next";
// import { Montserrat } from "next/font/google";
import "./globals.css";
import "./fonts.css";
import LayoutContainer from "./components/LayoutContainer";
import './styles/swiper.css';


// const montserrat = Montserrat({ 
//   subsets: ["latin", "cyrillic"],
//   variable: "--font-montserrat",
//   weight: ["300", "400", "500", "600", "700", "800", "900"],
// });

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
      <body className={`antialiased overflow-x-hidden`}>
        <LayoutContainer>
          {children}
        </LayoutContainer>
      </body>
    </html>
  );
}