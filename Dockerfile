# Используем официальный образ Node.js
FROM node:20-alpine AS base

# Установка зависимостей только когда нужно
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Копируем файлы зависимостей
COPY package.json package-lock.json* ./
RUN npm ci

# Сборка приложения
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Отключаем телеметрию Next.js во время сборки
ENV NEXT_TELEMETRY_DISABLED 1
ENV DOCKER_BUILD true

# Создаём production сборку
RUN npm run build

# Production образ
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Создаём пользователя для запуска приложения
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копируем необходимые файлы
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Устанавливаем правильные permissions
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Запускаем приложение
CMD ["node", "server.js"]
