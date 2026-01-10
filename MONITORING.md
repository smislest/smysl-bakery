# 📊 Мониторинг и логирование Docker deployment

## Просмотр логов

### Все логи контейнера в реальном времени
```bash
docker compose logs -f web
```

### Последние 100 строк
```bash
docker compose logs --tail=100 web
```

### Логи с временными метками
```bash
docker compose logs -f -t web
```

### Поиск в логах
```bash
docker compose logs web | grep "error"
docker compose logs web | grep "Directus"
docker compose logs web | grep "GET /"
```

---

## Проверка статуса

### Статус всех контейнеров
```bash
docker compose ps
```

### Детальная информация
```bash
docker inspect smysl-bakery-web
```

### Использование ресурсов в реальном времени
```bash
docker stats smysl-bakery-web
```

---

## Мониторинг производительности

### Использование CPU, памяти, сети
```bash
docker stats
```

Вывод:
```
CONTAINER ID   NAME              CPU %   MEM USAGE / LIMIT   MEM %   NET I/O
abc123         smysl-bakery-web  0.5%    150MB / 2GB        7.5%    10MB / 5MB
```

### Проверка дискового пространства
```bash
docker system df
```

### Детальная информация о дисках
```bash
docker system df -v
```

---

## Логи приложения Next.js

### Логи запуска
После запуска контейнера вы увидите:
```
▲ Next.js 16.1.1
- Local:        http://localhost:3000
- Environment:  production

✓ Ready in 500ms
```

### Логи запросов
```
GET / 200 in 150ms
GET /_next/static/... 200 in 5ms
```

### Логи ошибок
```
❌ Error loading site settings: ...
⚠️  products: fetch failed (using fallback)
```

---

## Сохранение логов в файл

### Сохранить последние логи
```bash
docker compose logs web > logs.txt
```

### Сохранять логи постоянно
```bash
docker compose logs -f web > logs.txt 2>&1
```

### Ротация логов (создаём скрипт)
```bash
#!/bin/bash
# save-logs.sh

DATE=$(date +%Y%m%d_%H%M%S)
LOG_DIR="/home/user/logs"

mkdir -p $LOG_DIR

docker compose logs --tail=1000 web > $LOG_DIR/smysl-bakery-$DATE.log

# Удаляем логи старше 7 дней
find $LOG_DIR -name "smysl-bakery-*.log" -mtime +7 -delete
```

Добавьте в crontab для ежедневного сохранения:
```bash
crontab -e

# Сохранять логи каждый день в полночь
0 0 * * * /home/user/save-logs.sh
```

---

## Настройка логирования Docker

### Ограничение размера логов

Отредактируйте `docker-compose.yml`:

```yaml
services:
  web:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"      # Максимальный размер файла
        max-file: "3"        # Количество файлов ротации
```

Теперь логи не займут больше 30MB (10MB × 3 файла).

---

## Мониторинг с помощью инструментов

### Установка ctop (красивый docker stats)
```bash
sudo wget https://github.com/bcicen/ctop/releases/download/v0.7.7/ctop-0.7.7-linux-amd64 -O /usr/local/bin/ctop
sudo chmod +x /usr/local/bin/ctop

# Запуск
ctop
```

### Установка lazydocker (TUI для управления Docker)
```bash
curl https://raw.githubusercontent.com/jesseduffield/lazydocker/master/scripts/install_update_linux.sh | bash

# Запуск
lazydocker
```

---

## Алерты и уведомления

### Проверка "живости" приложения

Создайте скрипт мониторинга:

```bash
#!/bin/bash
# health-check.sh

URL="http://localhost:3000"
TELEGRAM_BOT_TOKEN="your_bot_token"
TELEGRAM_CHAT_ID="your_chat_id"

if ! curl -f -s -o /dev/null $URL; then
    MESSAGE="⚠️ ALERT: smysl-bakery is DOWN!"
    curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
        -d chat_id="${TELEGRAM_CHAT_ID}" \
        -d text="${MESSAGE}"
    
    # Перезапускаем контейнер
    cd /home/user/smysl-bakery
    docker compose restart
fi
```

Добавьте в crontab (каждые 5 минут):
```bash
*/5 * * * * /home/user/health-check.sh
```

---

## Анализ проблем

### Контейнер не запускается
```bash
# Смотрим что произошло
docker compose logs web

# Проверяем exit code
docker inspect smysl-bakery-web | grep ExitCode
```

### Приложение медленно работает
```bash
# Проверяем ресурсы
docker stats smysl-bakery-web

# Смотрим процессы внутри контейнера
docker compose exec web ps aux

# Смотрим логи медленных запросов
docker compose logs web | grep "GET.*[0-9][0-9][0-9][0-9]ms"
```

### Проблемы с сетью
```bash
# Проверяем сеть
docker network inspect smysl-bakery_app-network

# Тестируем подключение к Directus из контейнера
docker compose exec web sh -c "wget -O- https://smysl-bakery-directus.onrender.com"
```

### Проблемы с памятью
```bash
# Смотрим использование памяти
docker stats --no-stream smysl-bakery-web

# Ограничиваем память в docker-compose.yml
services:
  web:
    deploy:
      resources:
        limits:
          memory: 512M
```

---

## Экспорт метрик для Grafana/Prometheus

### Установка cAdvisor
```bash
docker run -d \
  --name=cadvisor \
  --restart=unless-stopped \
  -p 8080:8080 \
  -v /:/rootfs:ro \
  -v /var/run:/var/run:ro \
  -v /sys:/sys:ro \
  -v /var/lib/docker/:/var/lib/docker:ro \
  google/cadvisor:latest
```

Метрики доступны на: http://your-server:8080

---

## Полезные команды для отладки

```bash
# Вход в контейнер
docker compose exec web sh

# Просмотр переменных окружения
docker compose exec web printenv

# Проверка файловой системы
docker compose exec web ls -la

# Проверка процессов
docker compose exec web top

# Проверка сетевых соединений
docker compose exec web netstat -tuln

# Тест подключения к Directus
docker compose exec web wget -O- https://smysl-bakery-directus.onrender.com/items/site_settings
```

---

## Автоматическая перезагрузка при падении

Docker Compose уже настроен с `restart: unless-stopped`, но можно добавить более продвинутую логику:

```yaml
services:
  web:
    restart: unless-stopped
    deploy:
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
        window: 120s
```

---

## Проверка безопасности

### Scan на уязвимости
```bash
# Сканируем образ
docker scan smysl-bakery-web

# Или с помощью Trivy
docker run aquasec/trivy image smysl-bakery-web
```

### Проверка открытых портов
```bash
docker compose exec web netstat -tuln | grep LISTEN
```

---

## Dashboard для мониторинга

Создайте простой HTML dashboard для отображения статуса:

```bash
#!/bin/bash
# generate-status.sh

cat > /var/www/html/status.html << EOF
<!DOCTYPE html>
<html>
<head>
    <title>smysl-bakery Status</title>
    <meta http-equiv="refresh" content="30">
</head>
<body>
    <h1>smysl-bakery Status</h1>
    <pre>$(docker compose ps)</pre>
    <pre>$(docker stats --no-stream smysl-bakery-web)</pre>
    <p>Last updated: $(date)</p>
</body>
</html>
EOF
```

Добавьте в crontab (обновление каждую минуту):
```bash
* * * * * /home/user/generate-status.sh
```
