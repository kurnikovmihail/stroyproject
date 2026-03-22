# Deploy без домена (по IP)

Ниже два варианта: через Docker (рекомендовано) и через системный Nginx.

## 1) Docker (рекомендовано)

### Требования
- Ubuntu/Debian сервер
- Установлены Docker и Docker Compose plugin

### Запуск
```bash
# на сервере
cd /path/to/stroyproject

docker compose up -d --build
```

После запуска сайт доступен по:
- `http://<SERVER_IP>:8080`

### Обновление
```bash
cd /path/to/stroyproject
git pull
docker compose up -d --build
```

### Остановка
```bash
docker compose down
```

## 2) Nginx на сервере (без Docker)

### Сборка проекта
```bash
npm ci
npm run build
```

### Копирование `dist`
Скопируйте `dist` в `/var/www/stroyproject/dist`.

### Конфиг Nginx
Используйте `deploy/nginx/default.conf` как основу и замените:
- `root /usr/share/nginx/html;` на `root /var/www/stroyproject/dist;`

После этого:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

Сайт будет доступен по:
- `http://<SERVER_IP>` (если nginx слушает 80)

## Что уже подготовлено в проекте
- `Dockerfile` — сборка Vite + отдача через Nginx
- `docker-compose.yml` — быстрый старт контейнера
- `deploy/nginx/default.conf` — SPA fallback + кеширование статики
