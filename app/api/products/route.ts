import { DIRECTUS_URL, DIRECTUS_TOKEN } from '@/lib/directus';

export const revalidate = 3600; // ISR: кэшировать на 1 час

export async function GET() {
	try {
		// Запрашиваем только доступные поля: id, title, subtitle, description, ingredients, weight, product_photo (с вложенными полями)
		const url = `${DIRECTUS_URL}/items/products?fields=id,title,subtitle,description,ingredients,weight,product_photo.id,product_photo.filename_disk&limit=-1&sort=title`;
		
		const headers: Record<string, string> = {
			'Content-Type': 'application/json',
		};
		
		if (DIRECTUS_TOKEN) {
			headers['Authorization'] = `Bearer ${DIRECTUS_TOKEN}`;
		}

		const res = await fetch(url, {
			headers,
			cache: 'no-store',
		});

		if (!res.ok) {
			console.error(`Failed to fetch products: ${res.status}`);
			return new Response(
				JSON.stringify({ data: [], error: 'Failed to fetch products' }),
				{
					status: 200,
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}

		const json = await res.json();
		const products = json.data || [];

		// Добавляем URL для изображений
		const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://admin.smislest.ru';
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const processedProducts = products.map((item: Record<string, any>) => ({
			...item,
			// Переименовываем product_photo в image для совместимости с фронтендом
			image: item.product_photo
				? {
						...item.product_photo,
						url: `${directusUrl}/assets/${item.product_photo.id}`,
					}
				: null,
			// Удаляем старое поле product_photo
			product_photo: undefined,
		}));

		return new Response(JSON.stringify(processedProducts), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error('Error in /api/products:', error);
		return new Response(
			JSON.stringify({ data: [], error: 'Internal server error' }),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	}
}
