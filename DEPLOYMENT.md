# Smysl Bakery - Development & Production Guide

## Проблема и решение

### Проблема: SSL/TLS ошибка при загрузке изображений

На локальном сервере Node.js не мог подключиться к Directus из-за проблем с OpenSSL:
```
ERR_SSL_INVALID_SESSION_ID - invalid session id
```

### Решение

1. **Отключаем Image Optimizer для development** 
   - В development: `unoptimized: true`
   - На production (Vercel): `unoptimized: false` (автоматически)

2. **Отключаем ISR для development**
   - В development: `revalidate = false`
   - На production (Vercel): `revalidate = 60` (1 минута)

3. **Используем NODE_TLS_REJECT_UNAUTHORIZED=0 только для development**
   - .env.production НЕ содержит эту переменную
   - Устанавливается в батниках для development

## Запуск приложения

### Development
```bash
npm run dev
```

Или используйте батник:
```bash
run-dev.bat
```

### Production (локальный тест)
```bash
npm run build
npm start
```

Или используйте батник:
```bash
test-prod.bat
```

### Production (Vercel)
Автоматический deploy с GitHub:
- next.config.js использует `unoptimized: false` для production
- ISR включен (revalidate = 60)
- Нет NODE_TLS_REJECT_UNAUTHORIZED (не нужен на Vercel)

## Конфигурация

### next.config.js
```javascript
images: {
  unoptimized: process.env.NODE_ENV === 'development',
  remotePatterns: [
    // Production хост
    { protocol: 'https', hostname: 'smysl-bakery-directus.onrender.com', ... },
    // Development хосты (только в development режиме)
    ...
  ]
}
```

### .env.local (Development)
```
NEXT_PUBLIC_DIRECTUS_URL=https://smysl-bakery-directus.onrender.com
NEXT_PUBLIC_DIRECTUS_TOKEN=...
```

### .env.production (Production)
```
NEXT_PUBLIC_DIRECTUS_URL=https://smysl-bakery-directus.onrender.com
NEXT_PUBLIC_DIRECTUS_TOKEN=...
```

## Почему Image Optimizer отключен в development?

Next.js Image Optimizer работает на сервере:
1. Скачивает изображение с Directus через HTTPS (требует валидного SSL)
2. Оптимизирует и сжимает
3. Возвращает браузеру оптимизированное изображение

На Vercel это работает отлично. На локальном сервере OpenSSL имеет проблемы.

**Решение**: В development браузер загружает изображения напрямую с Directus, минуя оптимизацию.

## Performance

- **Development**: Изображения не оптимизированы (быстрее сборка)
- **Production (Vercel)**: Изображения оптимизированы для скорости загрузки

## Troubleshooting

Если изображения не загружаются на production (Vercel):
1. Проверьте, что Directus доступен
2. Проверьте правильность URL в .env.production
3. Проверьте, что токен Directus корректен
