# Deploy без домена (по IP)

Проект разворачивается через Docker Compose:
- `stroyproject-web` — фронт (Vue + Nginx)
- `stroyproject-api` — API для отправки заявок в amoCRM

## 1) Требования
- Ubuntu/Debian сервер
- Docker Engine
- Docker Compose v2 (`docker compose`)

## 2) Первый запуск
```bash
cd /path/to/stroyproject

# создать файл окружения из примера
cp .env.example .env

# заполнить amoCRM переменные в .env
nano .env

# старт
docker compose up -d --build
```

Сайт будет доступен по:
- `http://<SERVER_IP>:8080`

## 3) Обновление
```bash
cd /path/to/stroyproject
git pull
docker compose up -d --build
```

## 4) Проверка
```bash
docker compose ps
curl -I http://127.0.0.1:8080
curl http://127.0.0.1:8080/api/health
```

## 5) Остановка
```bash
docker compose down
```

## 6) Переменные amoCRM (.env)
Обязательные, если включена интеграция:
- `AMO_ENABLED=true`
- `AMO_SUBDOMAIN` (например `mycompany` для `https://mycompany.amocrm.ru`)
- `AMO_CLIENT_ID`
- `AMO_CLIENT_SECRET`
- `AMO_REDIRECT_URI`
- `AMO_REFRESH_TOKEN`

Опционально:
- `AMO_PIPELINE_ID`
- `AMO_STATUS_ID`
- `AMO_SOURCE_TAG`

Если `AMO_ENABLED=false`, API запустится, но отправка лидов в CRM будет отключена.

## Что уже подготовлено в проекте
- `Dockerfile` — сборка фронта и отдача через Nginx
- `Dockerfile.api` — API-сервис для интеграции с amoCRM
- `docker-compose.yml` — запуск фронта + API + volume для токена OAuth
- `deploy/nginx/default.conf` — SPA fallback + прокси `/api/*` на backend
