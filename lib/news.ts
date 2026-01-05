

export interface NewsImage {
  id?: string;
  filename_disk?: string;
}

export type NewsItem = {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  slug: string;
  news_photo: NewsImage | null;
  content: string;
  gallery?: NewsImage[];
  // Источник данных: directus | supabase | local
  source?: 'directus' | 'supabase' | 'local';
  rawContent?: string;
};

export const newsData: NewsItem[] = [
  {
    id: "1",
    date: "2025-11-11",
    title: 'Победа в номинации «Хлеб года 2026» на международном фестивале хлеба в штате Нью-Джерси!',
    excerpt: "Победа в номинации «Хлеб года 2026» на международном фестивале хлеба в штате Нью-Джерси!",
    slug: "khleb-goda-2026",
    news_photo: { id: "img1", filename_disk: "news1.jpg" },
    content: 'Победа в номинации «Хлеб года 2026» на международном фестивале хлеба в штате Нью-Джерси! Мы невероятно гордимся этим достижением и благодарны всем, кто поддержал нас в этом пути. Наш безглютеновый хлеб завоевал сердца экспертов своим неповторимым вкусом и качеством. Это признание мотивирует нас продолжать совершенствовать наш ремесло и радовать вас ещё более вкусными продуктами!',
    gallery: [],
  },
  {
    id: "2",
    date: "2026-10-10",
    title: "Мы открыли новую хлебную лавку в центре Москвы",
    excerpt: "Мы открыли новую хлебную лавку в центре Москвы. В ассортименте не только хлеб! Но и кое-что ещё...",
    slug: "novaya-lavka-moskva",
    news_photo: { id: "img2", filename_disk: "news2.jpg" },
    content: "",
    gallery: [],
  },
  {
    id: "3",
    date: "2026-08-01",
    title: "Встречайте новинку!",
    excerpt: "Встречайте новинку! Мы приготовили безглютеновый хлеб с добавлением чёрной каракатицы!",
    slug: "novinka-chernaya-karakatica",
    news_photo: { id: "img3", filename_disk: "news3.jpg" },
    content: "",
    gallery: [],
  },
  {
    id: "4",
    date: "2026-06-15",
    title: "Запуск программы мастер-классов по безглютеновой выпечке",
    excerpt: "Приглашаем всех желающих на наши мастер-классы! Научитесь печь безглютеновый хлеб дома.",
    slug: "master-klassy-bezglyuten",
    news_photo: { id: "img1", filename_disk: "news1.jpg" },
    content: "",
    gallery: [],
  },
  {
    id: "5",
    date: "2026-05-20",
    title: "Сотрудничество с фермерскими хозяйствами",
    excerpt: "Мы начали сотрудничество с локальными фермами для использования органических ингредиентов.",
    slug: "fermerskie-khozyaystva",
    news_photo: { id: "img2", filename_disk: "news2.jpg" },
    content: "Мы рады объявить о партнёрстве с местными фермерскими хозяйствами! Теперь в нашей выпечке используются только органические ингредиенты: мука из экологически чистого зерна, свежие яйца от кур свободного выгула, и натуральное масло. Это позволяет нам гарантировать максимальное качество и пользу наших продуктов. Поддерживая нас, вы поддерживаете местных производителей!",
    gallery: [],
  },
  {
    id: "6",
    date: "2026-04-05",
    title: "Новая линейка сладкой безглютеновой выпечки",
    excerpt: "Представляем новую коллекцию безглютеновых десертов: кексы, печенье и торты!",
    slug: "novaya-sladkaya-vypechka",
    news_photo: { id: "img3", filename_disk: "news3.jpg" },
    content: "Мы расширили наш ассортимент! Теперь доступна целая линейка безглютеновых десертов: воздушные кексы с ягодами, хрустящее печенье с шоколадом, и нежные торты для особых случаев. Все десерты готовятся из натуральных ингредиентов без добавления искусственных красителей и консервантов. Попробуйте наши новинки уже сегодня!",
    gallery: [],
  },
];


export async function getNews(): Promise<NewsItem[]> {
  return newsData;
}


export async function getNewsById(id: string): Promise<NewsItem | null> {
  return newsData.find((item) => item.id === id) || null;
}


export async function getNewsSlugs(): Promise<string[]> {
  return newsData.map((item) => item.id);
}
