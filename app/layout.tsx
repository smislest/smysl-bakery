import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./fonts.css";
import LayoutContainer from "./components/LayoutContainer";
import './styles/swiper.css';
import { buildOpenGraph, buildRobots, buildTwitter, defaultDescription, defaultTitle, siteName, siteUrl } from "../lib/seo";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  alternates: {
    canonical: '/',
  },
  openGraph: buildOpenGraph({
    title: defaultTitle,
    description: defaultDescription,
  }),
  twitter: buildTwitter({
    title: defaultTitle,
    description: defaultDescription,
  }),
  robots: buildRobots(),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&family=Great+Vibes&display=swap&subset=cyrillic"
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