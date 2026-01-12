

export interface HeaderMenuItem {
  label: string;
  href: string;
  order?: number;
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
}


export async function fetchHeaderData(): Promise<HeaderData | null> {
  const url = `${process.env.DIRECTUS_URL}/items/header` +
    `?fields=id,logo.id,logo.filename_disk,` +
    `menu.id,menu.menu_items_id.label,menu.menu_items_id.slug,menu.menu_items_id.order,menu.menu_items_id.visible` +
    `&limit=1`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.DIRECTUS_TOKEN}`,
      },
      cache: 'no-store',
    });
    if (!res.ok) return null;

    const json = await res.json();
    if (json.errors) return null;
    const item = json.data; // header — объект, а не массив
    if (!item || typeof item !== 'object') return null;

    const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055";
    const logo = item.logo?.id && item.logo?.filename_disk
      ? {
          id: item.logo.id,
          filename_disk: item.logo.filename_disk,
          url: `${directusUrl}/assets/${item.logo.id}`,
        }
      : null;

    const menu: HeaderMenuItem[] = Array.isArray(item.menu)
      ? item.menu
          .map((j: any) => j?.menu_items_id)
          .filter((m: any) => m && m.visible)
          .map((m: any) => ({
            label: m.label,
            href: m.slug || '#',
            order: m.order || 0,
          }))
          .sort((a: HeaderMenuItem, b: HeaderMenuItem) => (a.order || 0) - (b.order || 0))
      : [];

    return {
      logo,
      menu,
      phone: item.phone || "",
      email: item.email || "",
    };
  } catch (e) {
    return null;
  }
}