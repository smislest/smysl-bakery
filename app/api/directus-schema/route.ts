import { DIRECTUS_URL, DIRECTUS_TOKEN } from '@/lib/directus';

export async function GET() {
	try {
		const headers: Record<string, string> = {
			'Content-Type': 'application/json',
		};
		
		if (DIRECTUS_TOKEN) {
			headers['Authorization'] = `Bearer ${DIRECTUS_TOKEN}`;
		}

		// Получаем коллекции
		const collectionsRes = await fetch(`${DIRECTUS_URL}/api/schema/collections`, {
			headers,
			cache: 'no-store',
		});

		if (!collectionsRes.ok) {
			throw new Error(`Collections fetch failed: ${collectionsRes.status}`);
		}

		const collectionsData = await collectionsRes.json();

		// Получаем поля
		const fieldsRes = await fetch(`${DIRECTUS_URL}/api/schema/fields`, {
			headers,
			cache: 'no-store',
		});

		if (!fieldsRes.ok) {
			throw new Error(`Fields fetch failed: ${fieldsRes.status}`);
		}

		const fieldsData = await fieldsRes.json();

		// Группируем поля по коллекциям
		const grouped: Record<string, any[]> = {};
		
		fieldsData.data.forEach((field: any) => {
			if (!grouped[field.collection]) {
				grouped[field.collection] = [];
			}
			grouped[field.collection].push({
				field: field.field,
				type: field.type,
				required: field.required || false,
				readonly: field.readonly || false,
			});
		});

		return new Response(
			JSON.stringify({
				collections: collectionsData.data,
				fields: grouped,
				total_collections: collectionsData.data.length,
				total_fields: fieldsData.data.length,
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	} catch (error) {
		console.error('Error in /api/directus-schema:', error);
		return new Response(
			JSON.stringify({ 
				error: error instanceof Error ? error.message : 'Failed to fetch schema',
				collections: [],
				fields: {}
			}),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	}
}
