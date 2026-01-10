/** @type {import('next').NextConfig} */
const nextConfig = {
	// Для Docker deployment нужен standalone режим
	output: process.env.DOCKER_BUILD === 'true' ? 'standalone' : undefined,
	
	images: {
		// Отключаем оптимизацию для development (локальный SSL проблемы)
		// На Vercel (production) будет включена (unoptimized: false)
		unoptimized: process.env.NODE_ENV === 'development',
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'admin.smislest.ru',
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
		// Кэширование изображений на 1 год (max-age)
		minimumCacheTTL: 31536000,
		// Форматы для оптимизации
		formats: ['image/avif', 'image/webp'],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
	},
	// Динамический импорт для тяжелых компонентов
	experimental: {
		optimizePackageImports: ['@react-spring/web'],
	},
	// Отключаем reactStrictMode в development для избежания двойного рендера
	reactStrictMode: process.env.NODE_ENV !== 'development',
};

module.exports = nextConfig;
