# 🚀 Быстрое развертывание на сервере reg.ru

## Шаг 1: Подключение к серверу

```bash
ssh user@your-server-ip
```

## Шаг 2: Установка Docker

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
sudo apt install docker-compose-plugin
```

Выйдите и снова войдите в SSH для применения изменений.

## Шаг 3: Загрузка проекта

### Вариант А: Через Git

```bash
cd ~
git clone https://github.com/your-repo/smysl-bakery.git
cd smysl-bakery
```

### Вариант Б: Через SCP (с вашего компьютера)

```bash
# На вашем компьютере (Windows):
scp -r E:\site-smyslest\site\smysl-bakery user@your-server-ip:~/
```

## Шаг 4: Настройка переменных окружения

```bash
cd smysl-bakery
cp .env.production.example .env.production
nano .env.production
```

Замените значения:
```env
NEXT_PUBLIC_DIRECTUS_URL=https://smysl-bakery-directus.onrender.com
NEXT_PUBLIC_DIRECTUS_TOKEN=ваш_реальный_токен
DIRECTUS_URL=https://smysl-bakery-directus.onrender.com
DIRECTUS_TOKEN=ваш_реальный_токен
```

Сохраните: `Ctrl+X`, затем `Y`, затем `Enter`

## Шаг 5: Запуск

```bash
chmod +x deploy.sh
./deploy.sh
```

## Шаг 6: Проверка

```bash
# Проверяем статус
docker compose ps

# Смотрим логи
docker compose logs -f web

# Проверяем работу
curl http://localhost:3000
```

## Шаг 7: Настройка Nginx (опционально, для домена)

```bash
sudo apt install nginx

# Создаём конфигурацию
sudo nano /etc/nginx/sites-available/smysl-bakery
```

Вставьте:
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
sudo nginx -t
sudo systemctl restart nginx
```

## Шаг 8: SSL сертификат (опционально)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d ваш-домен.ru -d www.ваш-домен.ru
```

## ✅ Готово!

Ваш сайт доступен по адресу:
- http://your-server-ip:3000 (без Nginx)
- http://ваш-домен.ru (с Nginx)
- https://ваш-домен.ru (с SSL)

## 📝 Полезные команды

```bash
# Остановить
docker compose down

# Перезапустить
docker compose restart

# Обновить код и перезапустить
git pull origin main && ./deploy.sh

# Посмотреть логи
docker compose logs -f web

# Проверить статус
docker compose ps
```

## 📚 Полная документация

Смотрите [DEPLOYMENT.md](DEPLOYMENT.md) для детальной инструкции.
