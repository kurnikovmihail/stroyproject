# CODEX HANDOFF: `stroyproject`

Документ для следующего Codex/инженера, чтобы без контекста быстро понять проект, текущее состояние и безопасно продолжить работу.

## 1) Что это за проект

- Тип: одностраничный лендинг архитектурной компании (Vue 3 + Vite).
- Язык контента: русский.
- Стиль: premium UI, много кастомных секций, акцент на UX/конверсию.
- Репозиторий в этой машине: `/home/mihail/проекты/Авито/лендинги/stroyproject`.

## 2) Текущее состояние Git

- Активная ветка: `main`.
- Локально ветка ahead of origin на несколько коммитов.
- Ключевые последние коммиты:
  - `a3bc150` — добавлена backend-интеграция заявок под amoCRM + обновление формы.
  - `d139c35` — добавлены legal-блоки и согласие на обработку ПДн.
  - `b26718f` — структурная чистка проекта + базовый docker deploy.

Если нужен publish на удалённый репозиторий: `git push origin main`.

## 3) Архитектура приложения

### 3.1 Frontend

- Стек: Vue 3 (SFC), Vite.
- Точка входа UI: `src/App.vue`.
- Порядок секций лендинга задаётся в `src/App.vue`.
- Ключевые секции лежат в `src/components/sections/*`.

Список текущих секций (файлы):
- `src/components/sections/problem/ProblemSection.vue`
- `src/components/sections/approach/ApproachSection.vue`
- `src/components/sections/benefits/BenefitsSection.vue`
- `src/components/sections/audience/AudienceSection.vue`
- `src/components/sections/services/ServicesSection.vue`
- `src/components/sections/portfolio/PortfolioSection.vue`
- `src/components/sections/process/ProcessSection.vue`
- `src/components/sections/scope/ScopeSection.vue`
- `src/components/sections/pricing/PricingSection.vue`
- `src/components/sections/trust/TrustSection.vue`
- `src/components/sections/director/DirectorSection.vue`
- `src/components/sections/faq/FaqSection.vue`
- `src/components/sections/reviews/ReviewsSection.vue`
- `src/components/sections/lead-magnets/LeadMagnetsSection.vue`
- `src/components/sections/contacts/ContactsSection.vue`
- `src/components/sections/legal/LegalSection.vue`
- `src/components/sections/footer/FooterSection.vue`

### 3.2 Backend API (новое)

- Путь: `server/`.
- Назначение: принять форму с фронта, провалидировать, отправить лид в amoCRM.
- Входная точка: `server/src/index.js`.
- Конфиг ENV: `server/src/config.js`.
- Клиент amoCRM/OAuth: `server/src/lib/amoClient.js`.

API endpoints:
- `GET /api/health`
  - Возвращает `{"ok": true, "provider": "amoCRM"|"disabled"}`.
- `POST /api/leads`
  - Принимает JSON формы.
  - Валидирует поля через `zod`.
  - Требует `consent: true`.
  - При включённой интеграции создаёт лид + добавляет заметку в amoCRM.

## 4) Форма заявок: как работает сейчас

Фронтовая форма:
- Файл: `src/components/sections/contacts/ContactsSection.vue`.
- Отправка: `fetch('/api/leads', { method: 'POST' ... })`.
- Поля:
  - `name`
  - `phone`
  - `objectType`
  - `firstStep`
  - `comment`
  - `consent` (обязательный чекбокс)
- Состояния UI:
  - `isSubmitting` — дизейбл кнопки + текст “Отправляем заявку…”
  - `submitError` — блок ошибки
  - `isSubmitted` — блок успеха

Legal блок:
- Файл: `src/components/sections/legal/LegalSection.vue`.
- Якоря:
  - `#privacy-policy`
  - `#consent-agreement`
- Футер ссылается на политику.

## 5) amoCRM интеграция: что важно

Флаг включения:
- `AMO_ENABLED=true` включает реальную отправку в CRM.
- `AMO_ENABLED=false` оставляет API живым, но `POST /api/leads` отвечает 503 с понятным сообщением.

Обязательные env при включении:
- `AMO_SUBDOMAIN`
- `AMO_CLIENT_ID`
- `AMO_CLIENT_SECRET`
- `AMO_REDIRECT_URI`
- `AMO_REFRESH_TOKEN`

Опциональные env:
- `AMO_PIPELINE_ID`
- `AMO_STATUS_ID`
- `AMO_SOURCE_TAG`

OAuth поведение:
- API делает refresh через `/oauth2/access_token`.
- Access/refresh токены кешируются в JSON-файл.
- По умолчанию файл токена: `/data/amo-token.json`.
- В Docker это хранится в volume `amo_data`.

## 6) Docker и деплой

### 6.1 Контейнеры

`docker-compose.yml` поднимает 2 сервиса:
- `stroyproject-web` (frontend, nginx, порт `8080:80`)
- `stroyproject-api` (node api, внутренний порт `3000`)

Nginx прокси:
- Файл: `deploy/nginx/default.conf`
- `location /api/` проксирует на `http://api:3000`.

### 6.2 Dockerfiles

- `Dockerfile` — фронт (vite build + nginx runtime)
- `Dockerfile.api` — backend api (Node 20 alpine)

### 6.3 ENV

- Шаблон: `.env.example`.
- Реальный секретный файл для сервера: `.env` (в git игнорируется).

### 6.4 Сервер и путь

Текущий сервер:
- IP: `91.229.10.161`
- Пользователь: `root`
- Проект на сервере: `/opt/stroyproject`
- Публичный URL на текущий момент: `http://91.229.10.161:8080`

Проверки после деплоя:
- `curl -I http://127.0.0.1:8080`
- `curl http://127.0.0.1:8080/api/health`
- `docker compose ps`

## 7) Важный operational нюанс (критично)

На этом сервере был баг со старым `docker-compose` v1:
- ошибка: `KeyError: 'ContainerConfig'`.

Решение:
- использовать только `docker compose` (v2 plugin), НЕ `docker-compose` v1.
- Плагин v2 был установлен вручную в:
  - `/usr/local/lib/docker/cli-plugins/docker-compose`

Проверка:
- `docker compose version`

Если снова возникнут проблемы с recreate:
- `docker compose down`
- `docker compose up -d --build`
- при необходимости удалить старые контейнеры и сеть проекта.

## 8) SSH контекст на ноутбуке

### 8.1 Что сейчас в `~/.ssh/config`

Настроены алиасы для других проектов:
- `stroimperm-server` -> `31.128.37.36` (key: `~/.ssh/id_ed25519_stroimperm`)
- `skgarant-server` -> `89.111.170.65` (key: `~/.ssh/id_ed25519_skgarant_deploy`)

### 8.2 Для сервера `91.229.10.161`

- Отдельного host alias в `~/.ssh/config` на момент написания нет.
- Подключение выполнялось напрямую: `ssh root@91.229.10.161`.
- Фактически использовалась парольная авторизация.

Важно:
- Пароль root передавался вручную в чате и не должен храниться в репозитории.
- Рекомендуется перевести доступ на key-based auth (создать отдельный deploy key + запретить password login).

## 9) Медиа и структура файлов

- Боевые ассеты фронта: `public/images/*`.
- Технический архив/неиспользуемые исходники вынесены в `assets-source/`.
- Это сделано специально, чтобы не загрязнять runtime-структуру в `public`.

## 10) Где вероятнее всего будут следующие правки

1. Настройка реальной amoCRM:
- Заполнить `/opt/stroyproject/.env`
- Включить `AMO_ENABLED=true`
- Проверить создание лида тестовой формой

2. Безопасность:
- Перевести сервер на ssh key only
- Убрать парольный root логин
- Настроить firewall и fail2ban

3. Прод:
- Подключить домен + HTTPS (Let's Encrypt)
- Добавить мониторинг API ошибок

## 11) Команды “быстрый старт для следующего Codex”

Локально:
```bash
cd /home/mihail/проекты/Авито/лендинги/stroyproject
npm run build
node --check server/src/index.js
```

На сервере:
```bash
ssh root@91.229.10.161
cd /opt/stroyproject
cp .env.example .env   # если .env еще нет
nano .env              # заполнить amo переменные
docker compose up -d --build
docker compose ps
curl http://127.0.0.1:8080/api/health
```

Проверка с локальной машины:
```bash
curl -I http://91.229.10.161:8080
curl http://91.229.10.161:8080/api/health
```

## 12) Что НЕ хранить в git

- `.env` с реальными секретами
- root пароли / токены в markdown
- приватные SSH ключи

Хранить только:
- `.env.example`
- инструкции, как и где подставить секреты

---

Если читаешь этот файл как новый Codex: начни с `src/App.vue`, затем `ContactsSection.vue`, затем `server/src/index.js`, затем `docker-compose.yml`.
Это самый короткий путь понять runtime и поток заявки end-to-end.
