/* eslint-disable @typescript-eslint/no-explicit-any */
// Тип для меню (примерная структура, скорректируй под свою коллекцию)
export interface Menu {
	label: string;
	href: string;
}
// Типы коллекций Directus, сгенерированы по directus-collections-import.json

export interface Site {
	seo_title: string;
	seo_description: string;
	seo_keywords: string;
}

export interface Header {
	logo: string | null; // file id
	menu: any; // json
	phone: string;
	address: string;
}

export interface Hero {
	title: string;
	subtitle: string;
	backgroundImage: string | null; // file id
	button_h: string;
}

export interface Products {
	title: string;
	subtitle: string;
	description: string;
	ingredients: string;
	weight: string;
	product_photo: string | null; // file id
	seo_title: string;
	seo_description: string;
	seo_keywords: string;
}

export interface About {
	title: string;
	text_r: string;
	text_c: string;
	text_r2: string;
	image_l: string | null;
	image_c: string | null;
	image_r: string | null;
	image_l2: string | null;
	image_c2: string | null;
}

export interface News {
	id: number;
	date: string;
	title: string;
	excerpt: string;
	image: string | null;
	fullContent: string;
	gallery: any;
	seo_title: string;
	seo_description: string;
	seo_keywords: string;
}

export interface Mission {
	title: string;
	text: string;
	image: string | null;
}

export interface Footer {
	logo: string | null;
	social_links: any;
	phone: string;
	email: string;
	address: string;
	address_details: string;
	buyers_links: any;
	map_iframe: string;
	copyright: string;
}
