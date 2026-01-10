# ⚡ Развертывание на сервере reg.ru - Краткая инструкция

## Что вам понадобится

- ✅ Сервер на reg.ru с Ubuntu/Debian
- ✅ SSH доступ к серверу
- ✅ Домен (опционально, для HTTPS)

## Шаги развертывания

### 1️⃣ Подключитесь к серверу

```bash
ssh user@your-server-ip
```

### 2️⃣ Установите Docker

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
sudo apt install docker-compose-plugin
```

**Важно**: После этого выйдите и снова войдите по SSH!

### 3️⃣ Загрузите проект на сервер

**Вариант A - через Git:**
```bash
cd ~
git clone https://github.com/your-repo/smysl-bakery.git
cd smysl-bakery
```

**Вариант B - через SFTP** (WinSCP/FileZilla):
- Загрузите все файлы проекта в `~/smysl-bakery`
- НЕ загружайте: `node_modules/`, `.next/`, `.git/`

### 4️⃣ Настройте переменные окружения

```bash
cd smysl-bakery
cp .env.production.example .env.production
nano .env.production
```

Замените на ваши значения:
```env
NEXT_PUBLIC_DIRECTUS_URL=https://smysl-bakery-directus.onrender.com
NEXT_PUBLIC_DIRECTUS_TOKEN=your_real_token_here
DIRECTUS_URL=https://smysl-bakery-directus.onrender.com
DIRECTUS_TOKEN=your_real_token_here
NODE_ENV=production
```

Сохраните: `Ctrl+X` → `Y` → `Enter`

### 5️⃣ Запустите приложение

```bash
chmod +x deploy.sh
./deploy.sh
```

Дождитесь завершения (3-5 минут).

### 6️⃣ Проверьте работу

```bash
# Проверьте статус
docker compose ps

# Посмотрите логи
docker compose logs -f web

# Откройте в браузере
# http://your-server-ip:3000
```

## ✅ Готово!

Ваш сайт работает на порту 3000!

---

## 🌐 Настройка домена (опционально)

### 1. Установите Nginx

```bash
sudo apt install nginx
```

### 2. Создайте конфигурацию

```bash
sudo nano /etc/nginx/sites-available/smysl-bakery
```

Вставьте:
```nginx
server {
    listen 80;
    server_name your-domain.ru www.your-domain.ru;

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

### 3. Активируйте сайт

```bash
sudo ln -s /etc/nginx/sites-available/smysl-bakery /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 4. Установите SSL (HTTPS)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.ru -d www.your-domain.ru
```

Следуйте инструкциям certbot.

## ✅ Готово с доменом!

Теперь сайт доступен:
- http://your-domain.ru
- https://your-domain.ru (с SSL)

---

## 🔧 Управление приложением

### Просмотр логов
```bash
docker compose logs -f web
```

### Перезапуск
```bash
docker compose restart
```

### Остановка
```bash
docker compose down
```

### Обновление кода
```bash
git pull origin main
./deploy.sh
```

---

## ⚠️ Troubleshooting

### Проблема: "Cannot connect to Docker daemon"

```bash
sudo systemctl start docker
sudo systemctl enable docker
```

### Проблема: "Port 3000 is already in use"

```bash
# Найдите процесс
sudo lsof -i :3000

# Или измените порт в docker-compose.yml
ports:
  - "8080:3000"
```

### Проблема: Контейнер не запускается

```bash
# Смотрите логи ошибок
docker compose logs web

# Проверьте конфигурацию
docker compose config
```

### Проблема: Directus не работает

Проверьте:
1. Правильность токена в `.env.production`
2. Доступность Directus: `curl https://smysl-bakery-directus.onrender.com`
3. Логи: `docker compose logs web | grep Directus`

---

## 📚 Дополнительная документация

- [DOCKER-QUICKSTART.md](DOCKER-QUICKSTART.md) - Детальная инструкция
- [DEPLOYMENT.md](DEPLOYMENT.md) - Полная документация
- [MONITORING.md](MONITORING.md) - Мониторинг и логирование
- [UPLOAD-TO-SERVER.md](UPLOAD-TO-SERVER.md) - Загрузка через SFTP

---

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи: `docker compose logs -f web`
2. Проверьте документацию в папке проекта
3. Обратитесь в support reg.ru

---

**Успешного развертывания! 🚀**
