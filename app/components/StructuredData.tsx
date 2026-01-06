export default function StructuredData() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "name": "СМЫСЛ есть",
    "description": "Безглютеновая пекарня в Москве. Свежая выпечка, хлеб и десерты из натуральных ингредиентов.",
    "url": "https://smislest.ru",
    "telephone": "+7-495-123-45-67",
    "email": "info@smislest.ru",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "ул. Примерная, д. 1, стр. 1",
      "addressLocality": "Москва",
      "addressCountry": "RU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "55.751244",
      "longitude": "37.618423"
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
    "menu": "https://smislest.ru/#products",
    "image": "https://smislest.ru/img/logo.png",
    "logo": "https://smislest.ru/img/logo.png",
    "sameAs": [
      "https://t.me/smyslest",
      "https://instagram.com/smyslest"
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "СМЫСЛ есть",
    "legalName": "ИП Иванов Иван Иванович",
    "url": "https://smislest.ru",
    "logo": "https://smislest.ru/img/logo.png",
    "description": "Безглютеновая пекарня в Москве",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "ул. Примерная, д. 1, стр. 1",
      "addressLocality": "Москва",
      "addressCountry": "RU"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+7-495-123-45-67",
      "contactType": "customer service",
      "email": "info@smislest.ru",
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
        "item": "https://smislest.ru"
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
