/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		// Отключаем оптимизацию для development (локальный SSL проблемы)
		// На Vercel (production) будет включена (unoptimized: false)
		unoptimized: process.env.NODE_ENV === 'development',
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'smysl-bakery-directus.onrender.com',
				pathname: '/assets/**',
			},
			// Для development: поддерживаем локальные адреса
			...(process.env.NODE_ENV === 'development' ? [
				{
					protocol: 'http',
					hostname: 'localhost',
					pathname: '/assets/**',
				},
				{
					protocol: 'http',
					hostname: '**',
					pathname: '/assets/**',
				},
			] : []),
		],
	},
};

module.exports = nextConfig;
