# Smysl Bakery - Deployment Guide

## Содержание
- [Development & Production Guide](#development--production-guide)
- [Docker Deployment](#docker-deployment-на-сервере-regru)

---

## Development & Production Guide

### Проблема и решение

#### Проблема: SSL/TLS ошибка при загрузке изображений

На локальном сервере Node.js не мог подключиться к Directus из-за проблем с OpenSSL:
```
ERR_SSL_INVALID_SESSION_ID - invalid session id
```

#### Решение

1. **Отключаем Image Optimizer для development** 
   - В development: `unoptimized: true`
   - На production (Vercel): `unoptimized: false` (автоматически)

2. **Отключаем ISR для development**
   - В development: `revalidate = false`
   - На production (Vercel): `revalidate = 60` (1 минута)

3. **Используем NODE_TLS_REJECT_UNAUTHORIZED=0 только для development**
   - .env.production НЕ содержит эту переменную
   - Устанавливается в батниках для development

## Запуск приложения локально

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
Автоматический deploy с GitHub
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

---

## Docker Deployment на сервере reg.ru

### Предварительные требования

На вашем сервере должны быть установлены:
- Docker (версия 20.10+)
- Docker Compose (версия 2.0+)
- Git

### Установка Docker на сервере reg.ru

```bash
# Обновляем систему
sudo apt update && sudo apt upgrade -y

# Устанавливаем Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Добавляем пользователя в группу docker
sudo usermod -aG docker $USER

# Устанавливаем Docker Compose
sudo apt install docker-compose-plugin

# Проверяем установку
docker --version
docker compose version
```

### Развертывание проекта

#### 1. Клонирование репозитория

```bash
# Подключаемся к серверу по SSH
ssh user@your-server-ip

# Создаём директорию для проекта
mkdir -p ~/projects
cd ~/projects

# Клонируем репозиторий (или загружаем файлы)
git clone https://github.com/your-repo/smysl-bakery.git
# Или используйте scp для загрузки файлов

cd smysl-bakery
```

#### 2. Настройка переменных окружения

```bash
# Копируем пример файла окружения
cp .env.production.example .env.production

# Редактируем файл
nano .env.production

# Вставьте ваши реальные значения:
# NEXT_PUBLIC_DIRECTUS_URL=https://smysl-bakery-directus.onrender.com
# NEXT_PUBLIC_DIRECTUS_TOKEN=ваш_токен
# DIRECTUS_URL=https://smysl-bakery-directus.onrender.com
# DIRECTUS_TOKEN=ваш_токен
```

#### 3. Сборка и запуск

```bash
# Делаем скрипт исполняемым
chmod +x deploy.sh

# Запускаем развертывание
./deploy.sh
```

Или вручную:

```bash
# Собираем образ
docker compose build

# Запускаем контейнеры
docker compose up -d

# Проверяем статус
docker compose ps
```

#### 4. Проверка работы

```bash
# Смотрим логи
docker compose logs -f web

# Проверяем, что приложение отвечает
curl http://localhost:3000

# Проверяем запущенные контейнеры
docker ps
```

### Настройка Nginx (рекомендуется)

Для работы через доменное имя настройте Nginx как reverse proxy:

```bash
# Устанавливаем Nginx
sudo apt install nginx

# Создаём конфигурацию
sudo nano /etc/nginx/sites-available/smysl-bakery
```

Содержимое конфигурации:

```nginx
server {
    listen 80;
    server_name ваш-домен.ru www.ваш-домен.ru;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Включаем сайт
sudo ln -s /etc/nginx/sites-available/smysl-bakery /etc/nginx/sites-enabled/

# Проверяем конфигурацию
sudo nginx -t

# Перезапускаем Nginx
sudo systemctl restart nginx
```

### Установка SSL сертификата (Let's Encrypt)

```bash
# Устанавливаем Certbot
sudo apt install certbot python3-certbot-nginx

# Получаем сертификат
sudo certbot --nginx -d ваш-домен.ru -d www.ваш-домен.ru

# Автообновление сертификата
sudo certbot renew --dry-run
```

### Управление приложением

**Просмотр логов:**
```bash
docker compose logs -f web
```

**Перезапуск:**
```bash
docker compose restart
```

**Остановка:**
```bash
docker compose down
```

**Обновление приложения:**
```bash
# Получаем новый код
git pull origin main

# Пересобираем и перезапускаем
./deploy.sh
```

**Очистка Docker:**
```bash
# Удаляем неиспользуемые образы
docker system prune -a

# Удаляем неиспользуемые volume
docker volume prune
```

### Мониторинг и отладка

**Проверка использования ресурсов:**
```bash
docker stats
```

**Вход в контейнер:**
```bash
docker compose exec web sh
```

**Проверка сети:**
```bash
docker network ls
docker network inspect smysl-bakery_app-network
```

### Автозапуск при перезагрузке сервера

Docker контейнеры настроены с `restart: unless-stopped`, поэтому они автоматически запустятся после перезагрузки сервера.

Для автозапуска Docker:
```bash
sudo systemctl enable docker
```

### Резервное копирование

Создайте скрипт для регулярного бэкапа:

```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/user/backups"

mkdir -p $BACKUP_DIR

# Создаём архив проекта
tar -czf $BACKUP_DIR/smysl-bakery-$DATE.tar.gz \
    --exclude=node_modules \
    --exclude=.next \
    ~/projects/smysl-bakery

# Удаляем бэкапы старше 30 дней
find $BACKUP_DIR -name "smysl-bakery-*.tar.gz" -mtime +30 -delete

echo "Backup created: smysl-bakery-$DATE.tar.gz"
```

Добавьте в crontab для автоматического выполнения:
```bash
crontab -e

# Добавьте строку для ежедневного бэкапа в 3:00
0 3 * * * /home/user/backup.sh
```

### Troubleshooting

**Проблема: Контейнер не запускается**
```bash
# Проверьте логи
docker compose logs web

# Проверьте конфигурацию
docker compose config
```

**Проблема: Порт 3000 занят**
```bash
# Найдите процесс
sudo lsof -i :3000

# Или измените порт в docker-compose.yml
ports:
  - "8080:3000"
```

**Проблема: Недостаточно памяти**
```bash
# Проверьте использование памяти
free -h

# Добавьте swap если нужно
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

### Полезные команды

```bash
# Просмотр всех контейнеров
docker ps -a

# Удаление всех остановленных контейнеров
docker container prune

# Просмотр образов
docker images

# Просмотр использования диска
docker system df

# Полная очистка
docker system prune -a --volumes
```

### Контакты поддержки

При возникновении проблем обращайтесь к документации:
- [Docker Documentation](https://docs.docker.com/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [reg.ru Support](https://www.reg.ru/support/)

## Troubleshooting

Если изображения не загружаются на production (Vercel):
1. Проверьте, что Directus доступен
2. Проверьте правильность URL в .env.production
3. Проверьте, что токен Directus корректен
