import directus from "@/app/lib/directus";
import { readItems } from "@directus/sdk";

export interface HeaderMenuItem {
  label: string;
  href: string;
}


export interface HeaderLogo {
  id: string;
  filename_disk: string;
  url: string;
}

export interface HeaderData {
  logo: HeaderLogo | null;
  menu: HeaderMenuItem[];
  phone: string;
  email: string;
  social_instagram_icon?: any;
  social_vk_icon?: any;
  social_telegram_icon?: any;
}

export async function fetchHeaderData(): Promise<HeaderData | null> {
  const data = await directus.request(
    readItems("header", {
      fields: [
        "logo.id",
        "logo.filename_disk",
        "menu.label",
        "menu.href",
        "phone",
        "email",
        "social_instagram_icon",
        "social_vk_icon",
        "social_telegram_icon",
      ],
      limit: 1,
    })
  );

  // Получаем первую запись
  const item = data?.[0];
  if (!item) return null;

  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055";

  // Логотип
  const logo = item.logo?.id && item.logo?.filename_disk
    ? {
        id: item.logo.id,
        filename_disk: item.logo.filename_disk,
        url: `${directusUrl}/assets/${item.logo.id}`,
      }
    : null;

  // Обновлённое статичное меню
  const menu = [
    { label: "Наша выпечка и десерты", href: "#products" },
    { label: "О нас", href: "#about" },
    { label: "Новости", href: "#news" },
    { label: "Контакты", href: "#contacts" },
  ];

  return {
    logo,
    menu,
    phone: item.phone || "",
    email: item.email || "",
    social_instagram_icon: item.social_instagram_icon,
    social_vk_icon: item.social_vk_icon,
    social_telegram_icon: item.social_telegram_icon,
  };
}
