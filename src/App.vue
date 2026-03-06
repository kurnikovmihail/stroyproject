<script setup>
const heroFeatures = [
  {
    title: 'Индивидуальная архитектура',
    icon: 'M3 10.5 12 3l9 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5v-3h-3v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 3 19.5z',
  },
  {
    title: 'BIM и современные технологии',
    icon: 'M12 3l8 4.5v9L12 21l-8-4.5v-9z M12 3v9l8-4.5 M12 12l-8-4.5',
  },
  {
    title: 'Полный комплект документации',
    icon: 'M7.5 3h6l4.5 4.5V21H7.5A1.5 1.5 0 0 1 6 19.5v-15A1.5 1.5 0 0 1 7.5 3z M13.5 3v4.5H18 M9 12h6 M9 15h6',
  },
  {
    title: 'Жилые и коммерческие объекты',
    icon: 'M3 21h18 M6 21V8h5v13 M13 21V4h5v17 M8 11h.01 M8 14h.01 M15 8h.01 M15 11h.01 M15 14h.01',
  },
]

const trustStats = [
  { value: '120+', label: 'реализованных проектов' },
  { value: '10 лет', label: 'опыта в проектировании' },
  { value: '35 000 м²', label: 'спроектированных площадей' },
  { value: '14 регионов', label: 'география реализованных работ' },
]

const clientLogos = [
  'Atlas Development',
  'Nordline Group',
  'Brama Retail',
  'Residence Park',
  'Urban Vision',
]

const services = [
  {
    title: 'Проектирование частных домов',
    description:
      'Создаем уникальные проекты домов с учетом участка, климата, бюджета и образа жизни владельцев.',
  },
  {
    title: 'Проектирование коммерческих зданий',
    description:
      'Проектируем офисы, магазины, рестораны, торговые и бизнес-центры с акцентом на функциональность.',
  },
  {
    title: 'Архитектурная концепция',
    description:
      'Разрабатываем идею объекта, планировки, визуализации и стилистику, которая выделяет проект на рынке.',
  },
  {
    title: 'Рабочая документация',
    description:
      'Подготавливаем полный комплект чертежей для стройки, согласований и точной реализации без потерь качества.',
  },
  {
    title: '3D-визуализация',
    description:
      'Показываем будущий объект в реалистичном формате, чтобы согласовать решения еще до начала строительства.',
  },
  {
    title: 'Генеральное проектирование',
    description:
      'Координируем архитектуру, конструктив и инженерные разделы в единой системе управления проектом.',
  },
]

const portfolio = [
  {
    title: 'Villa Horizon',
    type: 'Частный дом',
    area: '320 м²',
    description: 'Минималистичная резиденция с панорамным остеклением и приватным внутренним двором.',
    image:
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Nexus Office',
    type: 'Офисное здание',
    area: '2 800 м²',
    description: 'Лаконичная архитектура класса A с гибкими планировками и энергоэффективным фасадом.',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Atrium Retail',
    type: 'Коммерческий объект',
    area: '1 950 м²',
    description: 'Городской торговый формат с выразительной входной группой и продуманной навигацией.',
    image:
      'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Pine Residence',
    type: 'Коттедж',
    area: '280 м²',
    description: 'Современный коттедж в природном контексте с террасами и биоклиматическими решениями.',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'City Hall Loft',
    type: 'Общественное пространство',
    area: '1 200 м²',
    description: 'Ревитализация общественной площадки с комфортными сценариями для работы и отдыха.',
    image:
      'https://images.unsplash.com/photo-1465800872432-4d7e1b8c4f1b?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Terrace Business Hub',
    type: 'Бизнес-центр',
    area: '4 100 м²',
    description: 'Комплекс с открытыми террасами, фасадным озеленением и модульной структурой этажей.',
    image:
      'https://images.unsplash.com/photo-1481026469463-66327c86e544?auto=format&fit=crop&w=1400&q=80',
  },
]

const processSteps = [
  {
    title: 'Консультация и анализ задачи',
    text: 'Изучаем участок, исходные данные, ограничения и бюджет. Фиксируем цели и приоритеты проекта.',
  },
  {
    title: 'Разработка архитектурной концепции',
    text: 'Формируем стиль, функциональные сценарии, планировки и ключевой образ объекта.',
  },
  {
    title: '3D-визуализация',
    text: 'Создаем реалистичную визуальную модель, чтобы согласовать архитектуру до начала стройки.',
  },
  {
    title: 'Рабочая документация',
    text: 'Готовим архитектурные чертежи и комплект документации, который понятен строителям и подрядчикам.',
  },
  {
    title: 'Сопровождение проекта',
    text: 'Консультируем команду на этапе реализации и помогаем сохранить качество проектных решений.',
  },
]

const advantages = [
  {
    title: 'Индивидуальный подход',
    text: 'Каждый проект создается с нуля под задачи клиента, без шаблонных решений.',
  },
  {
    title: 'Архитектура + инженерия',
    text: 'Сразу учитываем техническую реализацию, чтобы дизайн оставался выполнимым и экономичным.',
  },
  {
    title: 'Оптимизация бюджета',
    text: 'Подбираем решения, которые сохраняют визуальный уровень и контролируют стоимость стройки.',
  },
  {
    title: 'Современные стандарты',
    text: 'Используем BIM-моделирование и актуальные регламенты проектирования для надежного результата.',
  },
]

const caseResults = [
  'Разработка архитектурной концепции',
  'Планировка участка и функциональных зон',
  'Фотореалистичная 3D-визуализация',
  'Полный комплект рабочей документации',
]

const testimonials = [
  {
    name: 'Ирина К.',
    role: 'владелец частного дома',
    quote:
      'Получили проект, который полностью совпал с ожиданиями: эстетично, функционально и точно в бюджете.',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Алексей М.',
    role: 'собственник сети кофеен',
    quote:
      'Команда продумала коммерческую логику пространства. Проект помог открыть объект быстрее и без переделок.',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Екатерина П.',
    role: 'девелопер',
    quote:
      'Понравилась дисциплина в документации и четкая коммуникация. Решения выглядели премиально и были реалистичны.',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
  },
]

const pricing = [
  {
    name: 'Архитектурная концепция',
    price: 'от 4 500 €',
    detail: 'Идея объекта, планировки, стилистика и презентационные материалы.',
  },
  {
    name: 'Проект частного дома',
    price: 'от 9 000 €',
    detail: 'Концепция, 3D-визуализация и полный комплект рабочей документации.',
    featured: true,
  },
  {
    name: 'Коммерческий проект',
    price: 'индивидуально',
    detail: 'Расчет зависит от площади, функционала, требований по инженерным разделам и срокам.',
  },
]

const projectTypes = [
  'Частный дом',
  'Коммерческое здание',
  'Офис / бизнес-центр',
  'Общественное пространство',
]

const vReveal = {
  mounted(el, binding) {
    const delay = typeof binding.value === 'number' ? binding.value : 0
    el.style.setProperty('--reveal-delay', `${delay}ms`)
    el.classList.add('reveal-item')

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            currentObserver.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.16,
        rootMargin: '0px 0px -40px 0px',
      },
    )

    observer.observe(el)
    el._revealObserver = observer
  },
  unmounted(el) {
    if (el._revealObserver) {
      el._revealObserver.disconnect()
      delete el._revealObserver
    }
  },
}

const currentYear = new Date().getFullYear()
</script>

<template>
  <div class="relative overflow-x-clip pb-10 text-ink">
    <div
      class="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(circle_at_50%_0%,rgba(180,135,86,0.28),transparent_62%)]"
    ></div>

    <header class="container-shell pt-6 sm:pt-8">
      <nav class="glass-nav" v-reveal>
        <a href="#hero" class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-sm font-bold text-white">
            SP
          </div>
          <div>
            <p class="font-display text-sm font-semibold leading-tight sm:text-base">StroyProject Architects</p>
            <p class="text-xs text-slate/70">Архитектурное проектирование</p>
          </div>
        </a>

        <div class="hidden items-center gap-6 text-sm font-medium text-slate/80 md:flex">
          <a href="#services" class="transition hover:text-ink">Услуги</a>
          <a href="#portfolio" class="transition hover:text-ink">Портфолио</a>
          <a href="#pricing" class="transition hover:text-ink">Стоимость</a>
          <a href="#contact" class="transition hover:text-ink">Контакты</a>
        </div>

        <a href="#contact" class="btn-primary hidden sm:inline-flex">Обсудить проект</a>
      </nav>
    </header>

    <main>
      <section id="hero" class="container-shell pb-16 pt-8 sm:pt-12 md:pb-24">
        <div class="grid items-center gap-10 md:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p class="premium-pill" v-reveal="80">Архитектура, которая увеличивает ценность объекта</p>
            <h1 class="mt-5 font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-[3.6rem]" v-reveal="140">
              Проектируем дома и коммерческие здания,
              <span class="text-gradient">которые становятся архитектурой будущего</span>
            </h1>
            <p class="mt-6 max-w-xl text-sm leading-relaxed text-slate/80 sm:text-base" v-reveal="200">
              Индивидуальное проектирование домов, жилых комплексов и коммерческих помещений. От идеи и
              архитектурной концепции до полного комплекта документации для реализации.
            </p>

            <div class="mt-8 flex flex-col gap-3 sm:flex-row" v-reveal="250">
              <a href="#pricing" class="btn-primary">Рассчитать стоимость проекта</a>
              <a href="#contact" class="btn-secondary">Получить консультацию архитектора</a>
            </div>

            <div class="mt-8 grid gap-3 sm:grid-cols-2">
              <article
                v-for="(feature, index) in heroFeatures"
                :key="feature.title"
                class="rounded-2xl border border-white/60 bg-white/75 p-4 shadow-premium-sm backdrop-blur-sm transition hover:-translate-y-1"
                v-reveal="320 + index * 80"
              >
                <div class="flex items-start gap-3">
                  <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sand/70 text-bronzeDark">
                    <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.6">
                      <path :d="feature.icon" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </div>
                  <p class="text-sm font-medium leading-snug text-slate">{{ feature.title }}</p>
                </div>
              </article>
            </div>
          </div>

          <div class="relative" v-reveal="220">
            <div class="absolute -left-10 -top-10 hidden h-36 w-36 rounded-full bg-bronze/30 blur-3xl sm:block"></div>
            <div
              class="absolute -right-8 bottom-10 hidden h-44 w-44 rounded-full bg-bronzeDark/25 blur-3xl sm:block animate-glow-soft"
            ></div>

            <div class="relative overflow-hidden rounded-[2rem] border border-white/50 shadow-premium-lg">
              <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80"
                alt="Современный архитектурный объект"
                class="h-[430px] w-full object-cover sm:h-[540px]"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[#11151bcc] via-[#1a202755] to-transparent"></div>

              <div class="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/25 bg-white/10 p-4 backdrop-blur-md sm:p-5">
                <p class="text-xs uppercase tracking-[0.16em] text-white/75">Премиальный подход</p>
                <p class="mt-2 font-display text-xl text-white sm:text-2xl">Эстетика, инженерия и точность в одном проекте</p>
              </div>
            </div>

            <div
              class="absolute -left-3 top-8 rounded-2xl border border-white/45 bg-white/80 px-4 py-3 text-xs font-semibold text-slate shadow-premium-sm backdrop-blur sm:-left-8 sm:text-sm animate-float-slow"
            >
              <p>Срок концепции:</p>
              <p class="font-display text-base text-ink sm:text-lg">7-14 дней</p>
            </div>
          </div>
        </div>
      </section>

      <section class="container-shell py-16 md:py-20">
        <div class="mesh-panel rounded-[2rem] border border-white/70 p-6 shadow-premium-sm sm:p-8 lg:p-10">
          <div class="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p class="premium-pill" v-reveal>Репутация и опыт</p>
              <h2 class="section-title mt-5" v-reveal="80">Мы создаем архитектурные проекты, где форма работает на результат</h2>
              <p class="section-lead" v-reveal="140">
                Соединяем эстетику, функциональность и инженерную точность, чтобы клиент получал не просто красивую
                картинку, а реалистичный и экономически выверенный проект.
              </p>
            </div>

            <div class="grid grid-cols-2 gap-4" v-reveal="180">
              <article v-for="stat in trustStats" :key="stat.label" class="rounded-2xl border border-ink/10 bg-white/80 p-4">
                <p class="stat-value">{{ stat.value }}</p>
                <p class="mt-1 text-xs leading-relaxed text-slate/75 sm:text-sm">{{ stat.label }}</p>
              </article>
            </div>
          </div>

          <div class="mt-8 flex flex-wrap gap-3" v-reveal="220">
            <p class="w-full text-xs uppercase tracking-[0.14em] text-slate/65">Нам доверяют</p>
            <span
              v-for="logo in clientLogos"
              :key="logo"
              class="rounded-full border border-ink/10 bg-white/90 px-4 py-2 text-xs font-semibold text-slate/85"
            >
              {{ logo }}
            </span>
          </div>
        </div>
      </section>

      <section id="services" class="py-16 md:py-24">
        <div class="container-shell">
          <p class="premium-pill" v-reveal>Услуги</p>
          <h2 class="section-title mt-5" v-reveal="80">Архитектурное проектирование любого уровня сложности</h2>
          <p class="section-lead" v-reveal="140">
            Закрываем весь цикл: от первой идеи до рабочей документации и сопровождения на этапе реализации.
          </p>

          <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <article
              v-for="(service, index) in services"
              :key="service.title"
              class="soft-card h-full transition hover:-translate-y-1 hover:shadow-premium-lg"
              v-reveal="200 + index * 70"
            >
              <p class="text-xs font-semibold uppercase tracking-[0.14em] text-bronzeDark/80">0{{ index + 1 }}</p>
              <h3 class="mt-3 font-display text-xl leading-tight text-ink">{{ service.title }}</h3>
              <p class="mt-3 text-sm leading-relaxed text-slate/80">{{ service.description }}</p>
            </article>
          </div>
        </div>
      </section>

      <section id="portfolio" class="container-shell py-16 md:py-24">
        <p class="premium-pill" v-reveal>Портфолио</p>
        <h2 class="section-title mt-5" v-reveal="80">Наши проекты</h2>
        <p class="section-lead" v-reveal="140">
          Современные дома, коттеджи, офисные здания, коммерческие и общественные пространства.
        </p>

        <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="(project, index) in portfolio"
            :key="project.title"
            class="group relative overflow-hidden rounded-3xl"
            v-reveal="220 + index * 70"
          >
            <img :src="project.image" :alt="project.title" class="h-72 w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#11151be8] via-[#11151b66] to-transparent"></div>
            <div class="absolute bottom-0 left-0 right-0 p-5 text-white">
              <div class="flex items-center justify-between gap-3 text-xs text-white/75">
                <span>{{ project.type }}</span>
                <span>{{ project.area }}</span>
              </div>
              <h3 class="mt-2 font-display text-2xl leading-tight">{{ project.title }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-white/85">{{ project.description }}</p>
            </div>
          </article>
        </div>
      </section>

      <section id="process" class="py-16 md:py-24">
        <div class="container-shell">
          <div class="rounded-[2rem] border border-ink/5 bg-white/70 p-6 shadow-premium-sm sm:p-8 md:p-10">
            <p class="premium-pill" v-reveal>Процесс</p>
            <h2 class="section-title mt-5" v-reveal="80">Как мы создаем архитектурный проект</h2>

            <ol class="mt-10 space-y-4">
              <li
                v-for="(step, index) in processSteps"
                :key="step.title"
                class="grid gap-4 rounded-2xl border border-ink/10 bg-white/90 p-5 sm:grid-cols-[auto_1fr] sm:items-start"
                v-reveal="160 + index * 80"
              >
                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-ink font-display text-sm text-white">
                  {{ index + 1 }}
                </div>
                <div>
                  <h3 class="font-display text-xl leading-tight text-ink">{{ step.title }}</h3>
                  <p class="mt-2 text-sm leading-relaxed text-slate/80">{{ step.text }}</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section class="container-shell py-16 md:py-24">
        <p class="premium-pill" v-reveal>Преимущества</p>
        <h2 class="section-title mt-5" v-reveal="80">Почему клиенты выбирают нас</h2>

        <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <article
            v-for="(advantage, index) in advantages"
            :key="advantage.title"
            class="relative overflow-hidden rounded-3xl border border-ink/10 bg-white/80 p-5"
            v-reveal="160 + index * 80"
          >
            <div class="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-bronze/15 blur-2xl"></div>
            <h3 class="font-display text-xl leading-tight text-ink">{{ advantage.title }}</h3>
            <p class="mt-3 text-sm leading-relaxed text-slate/80">{{ advantage.text }}</p>
          </article>
        </div>
      </section>

      <section class="py-16 md:py-24">
        <div class="container-shell">
          <div class="relative overflow-hidden rounded-[2rem] bg-ink text-white shadow-premium-lg">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80"
              alt="Пример реализованного загородного дома"
              class="absolute inset-0 h-full w-full object-cover opacity-30"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-r from-[#101316f0] via-[#101316c9] to-[#10131699]"></div>

            <div class="relative grid gap-8 p-6 sm:p-8 md:grid-cols-2 md:gap-10 md:p-10">
              <div>
                <p class="premium-pill border-white/30 bg-white/10 text-white" v-reveal>Кейс</p>
                <h2 class="mt-5 font-display text-3xl leading-tight sm:text-4xl" v-reveal="80">Пример реализованного проекта</h2>
                <p class="mt-4 text-sm leading-relaxed text-white/85 sm:text-base" v-reveal="140">
                  Современный загородный дом площадью 320 м². Результат - минималистичная архитектура с панорамным
                  остеклением и энергоэффективными решениями.
                </p>
              </div>

              <div class="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm" v-reveal="200">
                <p class="text-xs uppercase tracking-[0.14em] text-white/70">Что было сделано</p>
                <ul class="mt-4 space-y-3 text-sm leading-relaxed text-white/90">
                  <li v-for="result in caseResults" :key="result" class="flex items-start gap-3">
                    <span class="mt-1 block h-2 w-2 shrink-0 rounded-full bg-bronze"></span>
                    <span>{{ result }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" class="container-shell py-16 md:py-24">
        <p class="premium-pill" v-reveal>Отзывы</p>
        <h2 class="section-title mt-5" v-reveal="80">Что говорят клиенты</h2>

        <div class="mt-10 grid gap-4 md:grid-cols-3">
          <article
            v-for="(review, index) in testimonials"
            :key="review.name"
            class="soft-card h-full"
            v-reveal="160 + index * 80"
          >
            <div class="flex items-center gap-3">
              <img :src="review.image" :alt="review.name" class="h-12 w-12 rounded-full object-cover" loading="lazy" />
              <div>
                <p class="font-semibold text-ink">{{ review.name }}</p>
                <p class="text-xs text-slate/70">{{ review.role }}</p>
              </div>
            </div>
            <p class="mt-4 text-sm leading-relaxed text-slate/85">"{{ review.quote }}"</p>
          </article>
        </div>
      </section>

      <section id="pricing" class="py-16 md:py-24">
        <div class="container-shell">
          <p class="premium-pill" v-reveal>Стоимость</p>
          <h2 class="section-title mt-5" v-reveal="80">Стоимость проектирования</h2>

          <div class="mt-10 grid gap-4 md:grid-cols-3">
            <article
              v-for="(item, index) in pricing"
              :key="item.name"
              class="rounded-3xl border p-6"
              :class="item.featured ? 'border-ink bg-ink text-white shadow-premium-lg' : 'border-ink/10 bg-white/80 text-ink'"
              v-reveal="160 + index * 80"
            >
              <p class="text-sm font-semibold uppercase tracking-[0.14em]" :class="item.featured ? 'text-white/75' : 'text-slate/70'">
                {{ item.name }}
              </p>
              <p class="mt-4 font-display text-3xl">{{ item.price }}</p>
              <p class="mt-3 text-sm leading-relaxed" :class="item.featured ? 'text-white/85' : 'text-slate/80'">
                {{ item.detail }}
              </p>
              <a
                href="#contact"
                class="mt-6 inline-flex rounded-full px-5 py-2.5 text-sm font-semibold"
                :class="item.featured ? 'bg-white text-ink hover:bg-white/90' : 'bg-ink text-white hover:bg-slate'"
              >
                Получить расчет
              </a>
            </article>
          </div>
        </div>
      </section>

      <section id="contact" class="container-shell py-16 md:py-24">
        <div class="rounded-[2rem] border border-white/65 bg-white/75 p-6 shadow-premium-sm backdrop-blur sm:p-8 md:p-10">
          <div class="grid gap-8 md:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p class="premium-pill" v-reveal>Обсудим ваш проект</p>
              <h2 class="section-title mt-5" v-reveal="80">Предложим архитектурное решение под ваш бюджет и задачи</h2>
              <p class="section-lead" v-reveal="140">
                Расскажите о вашей идее - подготовим концепцию, которая сочетает эстетику, функциональность и
                экономическую эффективность.
              </p>

              <div class="mt-8 space-y-3 text-sm text-slate/85" v-reveal="200">
                <p><span class="font-semibold text-ink">Телефон:</span> +7 (900) 000-00-00</p>
                <p><span class="font-semibold text-ink">Email:</span> hello@stroyproject.ru</p>
                <p><span class="font-semibold text-ink">Время ответа:</span> до 2 часов в рабочее время</p>
              </div>
            </div>

            <form class="rounded-3xl border border-ink/10 bg-white/90 p-5 sm:p-6" @submit.prevent v-reveal="180">
              <div class="grid gap-4">
                <label class="text-sm font-medium text-slate">
                  Имя
                  <input type="text" class="input-field mt-2" placeholder="Как к вам обращаться" required />
                </label>

                <label class="text-sm font-medium text-slate">
                  Телефон / Email
                  <input
                    type="text"
                    class="input-field mt-2"
                    placeholder="+7 (___) ___-__-__ или email"
                    required
                  />
                </label>

                <label class="text-sm font-medium text-slate">
                  Тип проекта
                  <select class="input-field mt-2" required>
                    <option value="" disabled selected>Выберите тип проекта</option>
                    <option v-for="type in projectTypes" :key="type" :value="type">{{ type }}</option>
                  </select>
                </label>

                <label class="text-sm font-medium text-slate">
                  Комментарий
                  <textarea
                    class="input-field mt-2 min-h-[120px] resize-y"
                    placeholder="Кратко опишите участок, площадь и пожелания"
                  ></textarea>
                </label>
              </div>

              <button type="submit" class="btn-primary mt-6 w-full">Получить консультацию архитектора</button>
            </form>
          </div>
        </div>
      </section>
    </main>

    <section class="container-shell pt-8">
      <div class="relative overflow-hidden rounded-[2rem] text-white">
        <img
          src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80"
          alt="Имиджевый финальный блок архитектурного бюро"
          class="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-[#101316e6] via-[#101316b5] to-[#101316a6]"></div>

        <div class="relative p-6 sm:p-8 md:p-12">
          <p class="max-w-3xl font-display text-3xl leading-tight sm:text-4xl md:text-5xl" v-reveal>
            Мы проектируем не просто здания - мы создаем архитектуру, в которой хочется жить, работать и развиваться.
          </p>
          <a href="#contact" class="btn-secondary mt-7 border-white/30 bg-white/10 text-white hover:bg-white/20" v-reveal="80">
            Начать проект
          </a>
        </div>
      </div>
    </section>

    <footer class="container-shell pt-8">
      <div class="flex flex-col gap-2 border-t border-ink/10 py-6 text-sm text-slate/70 sm:flex-row sm:items-center sm:justify-between">
        <p>© {{ currentYear }} StroyProject Architects</p>
        <p>Архитектура и проектирование жилых и коммерческих объектов</p>
      </div>
    </footer>
  </div>
</template>
