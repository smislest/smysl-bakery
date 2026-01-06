export default function StructuredData() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "name": "СМЫСЛ есть",
    "description": "Безглютеновая пекарня в Москве. Свежая выпечка, хлеб и десерты из натуральных ингредиентов.",
    "url": "https://smysl-bakery-8e13.vercel.app",
    "telephone": "+7-999-123-45-67",
    "email": "info@smysl-est.ru",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "111675, Россия, г. Москва, ул. Святоозерская, дом 8",
      "addressLocality": "Москва",
      "postalCode": "111675",
      "addressCountry": "RU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "55.735878",
      "longitude": "37.838814"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday", "Sunday"],
        "opens": "10:00",
        "closes": "18:00"
      }
    ],
    "priceRange": "₽₽",
    "servesCuisine": "Безглютеновая выпечка",
    "menu": "https://smysl-bakery-8e13.vercel.app/#products",
    "image": "https://smysl-bakery-8e13.vercel.app/img/logo.png",
    "logo": "https://smysl-bakery-8e13.vercel.app/img/logo.png",
    "sameAs": [
      "https://t.me/smyslest",
      "https://instagram.com/smyslest"
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "СМЫСЛ есть",
    "legalName": "СМЫСЛ есть",
    "url": "https://smysl-bakery-8e13.vercel.app",
    "logo": "https://smysl-bakery-8e13.vercel.app/img/logo.png",
    "description": "Безглютеновая пекарня в Москве",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "111675, Россия, г. Москва, ул. Святоозерская, дом 8",
      "addressLocality": "Москва",
      "postalCode": "111675",
      "addressCountry": "RU"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+7-999-123-45-67",
      "contactType": "customer service",
      "email": "info@smysl-est.ru",
      "availableLanguage": "Russian"
    },
    "sameAs": [
      "https://t.me/smyslest",
      "https://instagram.com/smyslest"
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Главная",
        "item": "https://smysl-bakery-8e13.vercel.app"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
