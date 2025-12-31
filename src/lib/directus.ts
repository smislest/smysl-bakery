import { createDirectus, rest } from '@directus/sdk';

export const DIRECTUS_URL =
	process.env.NEXT_PUBLIC_DIRECTUS_URL ||
	process.env.DIRECTUS_URL ||
	'https://smysl-bakery-directus.onrender.com';

export const DIRECTUS_TOKEN = process.env.NEXT_PUBLIC_DIRECTUS_TOKEN || process.env.DIRECTUS_TOKEN || '';

const directus = createDirectus(DIRECTUS_URL).with(
	rest({
		onRequest: (options) => ({ ...options, cache: 'no-store' }),
	})
);

export default directus;