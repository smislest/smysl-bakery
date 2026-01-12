import { fetchHeaderData } from '@/lib/fetch-header';

export const revalidate = 3600; // ISR: кэшировать на 1 час

export async function GET(request: Request) {
	try {
		const headerData = await fetchHeaderData();
		
		if (!headerData) {
			return new Response(
				JSON.stringify({ 
					error: 'Failed to fetch header data',
					logo: null,
					menu: [],
					phone: '',
					email: '',
				}),
				{
					status: 200,
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}

		return new Response(JSON.stringify(headerData), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error('Error in /api/header:', error);
		return new Response(
			JSON.stringify({ 
				error: 'Internal server error',
				logo: null,
				menu: [],
				phone: '',
				email: '',
			}),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	}
}


