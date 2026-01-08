
import "./globals.css";
import "./fonts.css";
import LayoutContainer from "./components/LayoutContainer";
import './styles/swiper.css';
import StructuredData from "./components/StructuredData";
import { getSeoSettings, defaultOgImage } from "../lib/seo";


export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

// Динамические SEO-мета-теги через generateMetadata (данные из Directus)
export async function generateMetadata() {
  const seo = await getSeoSettings();
  return {
    title: seo.default_title,
    description: seo.default_description,
    openGraph: {
      title: seo.default_title,
      description: seo.default_description,
      images: [
        {
          url: seo.og_image_url || defaultOgImage,
          width: seo.og_image_width,
          height: seo.og_image_height,
        },
      ],
      siteName: seo.site_name,
      type: 'website',
      url: seo.site_url,
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.default_title,
      description: seo.default_description,
      images: [seo.og_image_url || defaultOgImage],
    },
    alternates: {
      canonical: seo.site_url,
    },
  };
}
  // eslint-disable-next-line react/function-component-definition
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const seo = await getSeoSettings();
  
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&family=Great+Vibes&display=swap&subset=cyrillic"
          rel="stylesheet"
        />
        <StructuredData seo={seo} />
      </head>
      <body className="antialiased overflow-x-hidden font-montserrat">
        <LayoutContainer>
          {children}
        </LayoutContainer>
      </body>
    </html>
  );
}