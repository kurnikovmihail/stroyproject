<script setup>
const navLinks = [
  { label: 'Преимущества', href: '#benefits' },
  { label: 'Услуги', href: '#services' },
  { label: 'Кейсы', href: '#cases' },
  { label: 'Процесс', href: '#process' },
  { label: 'Стоимость', href: '#pricing' },
  { label: 'Контакты', href: '#contacts' },
]

const heroTrust = [
  'Работаем по Сочи и Краснодарскому краю',
  'Частные дома, гостиницы и коммерческие объекты',
  'Индивидуальный подход под участок, задачи и бюджет',
]

const outcomes = [
  {
    title: 'Проект под ваш участок и образ жизни',
    text: 'Не шаблон: учитываем рельеф, инсоляцию, видовые точки и реальные сценарии жизни или бизнеса.',
  },
  {
    title: 'Логика строительства просчитана заранее',
    text: 'Проектируем так, чтобы стройка шла без хаоса и непредвиденных затрат на переделки.',
  },
  {
    title: 'Снижаем риск ошибок на стройке',
    text: 'Точные решения по конструктиву, узлам и инженерной логике экономят деньги и нервы.',
  },
  {
    title: 'Продуманная планировка',
    text: 'Функциональность, свет, удобные маршруты, хранение и приватность на каждом уровне.',
  },
  {
    title: 'Проектируем в рамках бюджета',
    text: 'Сразу учитываем финансовые ограничения заказчика и этапность реализации объекта.',
  },
  {
    title: 'Прозрачный процесс',
    text: 'Понятные этапы, сроки, согласования и конкретный результат после каждого шага.',
  },
  {
    title: 'Учитываем климат Сочи',
    text: 'Влажность, морской воздух, солнце, ветровые нагрузки и эксплуатационные особенности региона.',
  },
  {
    title: 'Проекты с личным контролем директора',
    text: 'Сергей Светлаков лично ведет ключевые этапы и контролирует качество выдаваемой документации.',
  },
]

const audience = [
  'Владельцы участков, которые строят дом для семьи',
  'Заказчики вилл, коттеджей и домов у моря',
  'Инвесторы и девелоперы жилых проектов',
  'Владельцы гостиниц, апарт-объектов и коммерческих площадей',
  'Предприниматели, которым нужен проект под бизнес-задачу',
  'Собственники, планирующие реконструкцию или перепланировку',
]

const serviceCategories = [
  {
    category: 'Для частных объектов',
    list: [
      'Архитектурное проектирование частных домов',
      'Индивидуальные планировочные решения',
      'Эскизный проект',
      'Рабочий проект',
      'Проект реконструкции',
      'Проектирование вилл, коттеджей и резиденций',
    ],
  },
  {
    category: 'Для коммерческих объектов',
    list: [
      'Проектирование офисов',
      'Проектирование гостиниц, гостевых домов и апартаментов',
      'Проектирование ресторанов, кафе и магазинов',
      'Коммерческие здания и помещения',
      'Реконструкция и адаптация объектов под бизнес',
    ],
  },
  {
    category: 'Дополнительные опции',
    list: [
      '3D-визуализация высокого качества',
      'Авторский надзор',
      'Сопровождение строительства',
      'Помощь в подборе подрядчиков',
      'Согласование и взаимодействие со смежниками',
    ],
  },
]

const cases = [
  {
    title: 'Дом 280 м² в Сочи',
    type: 'Частный объект',
    area: '280 м²',
    period: '9 недель проектирования',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
    task: 'Спроектировать дом на участке с уклоном и видом на море, сохранив приватность и рациональную площадь.',
    done: [
      'Архитектурная концепция и посадка на рельеф',
      'Планировочная логика по этажам',
      'Конструктивные и инженерные решения',
      'Рабочий комплект для строительства',
    ],
    result:
      'Проект реализован без переработки планировок на стройке. Максимально использованы видовые точки и инсоляция.',
    business: 'Экономия времени на этапе строительства: -4 недели за счет точной документации.',
    comment:
      'Ключевая задача была в том, чтобы совместить видовые характеристики участка с приватностью помещений. Решение строится вокруг террас и внутренних осей обзора.',
  },
  {
    title: 'Бутик-отель 1 450 м²',
    type: 'Гостиничный объект',
    area: '1 450 м²',
    period: '11 недель проектирования',
    image:
      'https://images.unsplash.com/photo-1468824357306-a439d58ccb1c?auto=format&fit=crop&w=1600&q=80',
    task: 'Сделать проект отеля в курортной локации с эффективной посадкой номеров и инженерной логикой эксплуатации.',
    done: [
      'Концепция и функциональное зонирование',
      'Оптимизация логистики гостей и персонала',
      'Рабочая документация с учетом норм',
      'Сопровождение на стадии реализации',
    ],
    result:
      'Объект получил понятную структуру потоков, сократил потерю полезной площади и упростил эксплуатацию инженерных систем.',
    business: 'Рост коммерческой эффективности: +12% полезной площади под номерной фонд.',
    comment:
      'В коммерческих проектах важно проектировать не только красиво, но и окупаемо. Здесь мы сосредоточились на трафике, посадке и эксплуатационной экономике.',
  },
  {
    title: 'Ресторанный комплекс 620 м²',
    type: 'Коммерческий объект',
    area: '620 м²',
    period: '7 недель проектирования',
    image:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80',
    task: 'Перепланировать и адаптировать объект под ресторан с летней террасой и интенсивным трафиком.',
    done: [
      'Предпроектный анализ и проверка ограничений',
      'Сценарии гостевого и сервисного движения',
      'Рабочий комплект для подрядчиков',
      'Поддержка в ходе запуска',
    ],
    result:
      'Оптимизирована посадка, сокращены пересечения потоков персонала и гостей, улучшена эксплуатационная логика кухни.',
    business: 'Бизнес-эффект: +18% эффективной посадки за счет перепланировки.',
    comment:
      'Проектировали от операционной задачи бизнеса: каждая зона должна работать на скорость сервиса и выручку.',
  },
]

const processSteps = [
  {
    title: 'Первичная консультация',
    description: 'Разбираем задачу, участок, пожелания, бюджет и сроки.',
    deliverable: 'Что получает клиент: дорожная карта проекта и чек-лист исходных данных.',
    duration: 'Срок: 1-2 дня',
    approvals: 'Согласований: 1 встреча + резюме по итогам',
  },
  {
    title: 'Предпроектный анализ',
    description: 'Изучаем ограничения, рельеф, инсоляцию, климат и особенности локации.',
    deliverable: 'Что получает клиент: аналитическую базу и риски до старта концепции.',
    duration: 'Срок: 3-5 дней',
    approvals: 'Согласований: 1 промежуточный звонок',
  },
  {
    title: 'Концепция и планировочные решения',
    description: 'Предлагаем варианты, обсуждаем и корректируем до оптимального решения.',
    deliverable: 'Что получает клиент: 2-3 варианта планировок и финальную концепцию.',
    duration: 'Срок: 7-14 дней',
    approvals: 'Согласований: до 2 итераций',
  },
  {
    title: 'Архитектурный проект',
    description: 'Формируем внешний облик и объемно-пространственные решения.',
    deliverable: 'Что получает клиент: фасады, разрезы, ключевые архитектурные листы.',
    duration: 'Срок: 10-20 дней',
    approvals: 'Согласований: 1 утверждение архитектуры',
  },
  {
    title: 'Рабочая документация',
    description: 'Готовим комплект для строительства и взаимодействия с подрядчиками.',
    deliverable: 'Что получает клиент: полный рабочий проект с узлами и ведомостями.',
    duration: 'Срок: 15-30 дней',
    approvals: 'Согласований: пакетная выдача по разделам',
  },
  {
    title: 'Сопровождение и консультации',
    description: 'Помогаем сохранить проектные решения во время реализации.',
    deliverable: 'Что получает клиент: ответы на запросы стройки и экспертную поддержку.',
    duration: 'Срок: по договоренности',
    approvals: 'Согласований: регулярный контроль ключевых узлов',
  },
]

const packageRows = [
  { feature: 'Генеральные решения по участку', values: [true, true, true, true] },
  { feature: 'Планировки и функциональные схемы', values: [true, true, true, true] },
  { feature: 'Фасады и разрезы', values: [false, true, true, true] },
  { feature: 'Конструктивные решения и узлы', values: [false, false, true, true] },
  { feature: 'Спецификации и ведомости', values: [false, false, true, true] },
  { feature: 'Рекомендации по материалам', values: [false, true, true, true] },
  { feature: 'Инженерная логика', values: [false, true, true, true] },
  { feature: '3D-визуализация', values: [true, true, true, false] },
  { feature: 'Консультации в процессе стройки', values: [false, false, false, true] },
]

const tariffs = [
  'Эскизный проект',
  'Архитектурный проект',
  'Рабочий проект',
  'Авторское сопровождение',
]

const priceRanges = [
  {
    title: 'Частные дома',
    value: 'от 3 500 ₽/м²',
    note: 'В зависимости от площади, рельефа участка и состава документации.',
  },
  {
    title: 'Коммерческие объекты',
    value: 'от 4 200 ₽/м²',
    note: 'Финальная стоимость зависит от функционала, норм и требований к инженерным разделам.',
  },
]

const priceFactors = [
  'Площадь и тип объекта',
  'Сложность архитектуры и рельеф участка',
  'Состав проектной документации',
  'Наличие 3D-визуализации',
  'Срочность выполнения',
  'Требуемый уровень сопровождения',
]

const trustStats = [
  '10+ лет в проектировании',
  '70+ объектов в портфеле',
  '15 000+ м² спроектированной площади',
  'Сочи и Краснодарский край',
  'Частные и коммерческие заказчики',
  'Большая доля клиентов по рекомендациям',
]

const trustProof = [
  'Команда архитекторов, конструкторов и инженерных специалистов',
  'Работа по действующим нормам и требованиям эксплуатации',
  'Опыт сложных участков: уклон, видовые зоны, плотная застройка',
  'Сопровождение после выдачи проекта',
]

const certifications = [
  'СРО / допуски (добавить актуальные)',
  'Профильное образование команды',
  'Сертификаты и повышение квалификации',
]

const directorPrinciples = [
  'Проект должен быть не только красивым, но и реализуемым без хаоса на стройке.',
  'Решения принимаются с учетом бюджета, рельефа и условий региона.',
  'Клиент получает понятную структуру этапов, сроков и результата.',
  'Качество документации контролирую лично на ключевых этапах.',
]

const expertTips = [
  'До заказа проекта проверьте ограничения участка: это экономит недели и бюджет.',
  'Не разделяйте архитектуру и инженерию: ошибки в связке стоят дороже всего.',
  'Требуйте понятный состав рабочей документации до подписания договора.',
  'Сравнивайте проект по реализуемости, а не только по рендерам.',
]

const faqItems = [
  {
    q: 'Сколько стоит проект?',
    a: 'Ориентир зависит от типа объекта, площади и состава документации. Предварительный расчет делаем за 15 минут после короткого брифа.',
  },
  {
    q: 'Какие сроки проектирования?',
    a: 'В среднем от 4 до 12 недель. Точные сроки фиксируем после предпроектного анализа.',
  },
  {
    q: 'Можно ли работать дистанционно?',
    a: 'Да. Большая часть согласований проходит онлайн, а ключевые выезды организуем по графику.',
  },
  {
    q: 'Берете сложные участки с уклоном?',
    a: 'Да, это наша частая задача для Сочи. Учитываем рельеф, дренаж, инсоляцию и видовые характеристики.',
  },
  {
    q: 'Можно ли прийти с наброском идеи?',
    a: 'Да, мы дорабатываем исходные идеи до профессионального проекта с реалистичной логикой реализации.',
  },
  {
    q: 'Можно заказать только архитектурную часть?',
    a: 'Да, возможен отдельный формат. Но всегда объясняем, какие риски появляются без полного комплекта.',
  },
  {
    q: 'Помогаете во время строительства?',
    a: 'Да, доступно авторское сопровождение и консультации для подрядчиков на этапе реализации.',
  },
  {
    q: 'Сколько правок входит?',
    a: 'Количество итераций фиксируется в договоре. Обычно 2 итерации на этапе концепции включены.',
  },
  {
    q: 'Можно спроектировать под конкретный бюджет?',
    a: 'Да. Мы проектируем с учетом бюджета и предлагаем варианты решений по приоритетам.',
  },
  {
    q: 'Делаете коммерческие объекты?',
    a: 'Да. Офисы, гостиницы, рестораны, ритейл и другие форматы с учетом бизнес-логики.',
  },
  {
    q: 'Какие исходные данные нужны на старте?',
    a: 'Адрес/кадастр, параметры участка, пожелания по площади и функционалу, ориентир по бюджету и срокам.',
  },
]

const testimonials = [
  {
    name: 'Анна и Максим',
    type: 'Частный дом на сложном участке',
    fear: 'Боялись, что красивую идею невозможно реализовать без резкого роста бюджета.',
    result:
      'Получили понятную структуру работ, несколько вариантов планировки и проект, который строители оценили как один из самых проработанных.',
    quote:
      'В процессе стало спокойно: на каждом этапе было понятно, что происходит и за что мы платим.',
    image:
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=700&q=80',
  },
  {
    name: 'Артем Р.',
    type: 'Бутик-отель в Сочи',
    fear: 'Переживали за сроки и соответствие нормам для коммерческой эксплуатации.',
    result:
      'Команда дала четкий график, прозрачные согласования и проект с логикой трафика гостей и персонала.',
    quote:
      'Результат оказался не только красивым, но и финансово оправданным в эксплуатации.',
    image:
      'https://images.unsplash.com/photo-1559589689-577aabd1db4f?auto=format&fit=crop&w=700&q=80',
  },
  {
    name: 'Елена В.',
    type: 'Реконструкция коммерческого помещения',
    fear: 'Был риск потерять полезную площадь и получить неудобную планировку для бизнеса.',
    result:
      'Перепланировка повысила эффективность посадки и сократила потери площади. Запуск прошел без критичных переделок.',
    quote:
      'Самое ценное - проект сразу учитывал эксплуатацию, а не только визуальную часть.',
    image:
      'https://images.unsplash.com/photo-1464863979621-258859e62245?auto=format&fit=crop&w=700&q=80',
  },
]

const leadMagnetItems = [
  'Бесплатная консультация директора 30 минут',
  'Предварительный разбор задачи и участка',
  'Чек-лист: 7 ошибок при проектировании дома в Сочи',
  'Предварительная оценка стоимости проекта',
  'Аудит вашего эскиза или текущей идеи',
]

const messengerLinks = [
  { label: 'WhatsApp', href: '#', description: 'Быстрый ответ в рабочее время' },
  { label: 'Telegram', href: '#', description: 'Отправка материалов и файлов' },
]

const projectTypes = [
  'Частный дом',
  'Вилла / коттедж',
  'Гостиница / апарт-объект',
  'Офис / ритейл / ресторан',
  'Реконструкция / перепланировка',
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
      { threshold: 0.16, rootMargin: '0px 0px -40px 0px' },
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
    <div class="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[620px] bg-[radial-gradient(circle_at_55%_0%,rgba(24,69,63,0.24),transparent_60%)]"></div>

    <header class="container-shell pt-6 sm:pt-8">
      <div class="nav-shell" v-reveal>
        <div class="flex items-center justify-between gap-4">
          <a href="#hero" class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-pine font-display text-sm text-white">SP</div>
            <div>
              <p class="font-display text-sm font-semibold sm:text-base">Строй Проект</p>
              <p class="text-xs text-graphite/70">Архитектурное проектирование, Сочи</p>
            </div>
          </a>

          <a href="#contacts" class="btn-primary hidden sm:inline-flex">Получить консультацию</a>
        </div>

        <nav class="mt-4 hidden flex-wrap gap-5 text-sm font-medium text-graphite/80 lg:flex">
          <a v-for="link in navLinks" :key="link.href" :href="link.href" class="transition hover:text-ink">{{ link.label }}</a>
        </nav>
      </div>
    </header>

    <main>
      <section id="hero" class="container-shell pb-16 pt-8 sm:pt-12 md:pb-24">
        <div class="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p class="pill" v-reveal="60">Проектирование в Сочи и Краснодарском крае</p>
            <h1 class="mt-5 font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-[3.5rem]" v-reveal="120">
              Проектирование частных домов и коммерческих объектов в Сочи -
              <span class="headline-gradient">без переделок, лишних затрат и хаоса на стройке</span>
            </h1>
            <p class="mt-6 max-w-2xl text-sm leading-relaxed text-graphite/85 sm:text-base" v-reveal="180">
              Создаём архитектурные и рабочие проекты, в которых продуманы планировка, конструктив, инженерия и бюджет
              реализации. От идеи до готового комплекта документации.
            </p>
            <p class="mt-5 max-w-2xl rounded-2xl border border-pine/15 bg-white/85 p-4 text-sm text-graphite/85" v-reveal="220">
              УТП: проектируем так, чтобы объект было реально удобно строить, согласовывать и эксплуатировать в условиях
              южного региона.
            </p>

            <div class="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" v-reveal="260">
              <a href="#contacts" class="btn-primary">Получить консультацию</a>
              <a href="#pricing" class="btn-secondary">Рассчитать стоимость</a>
              <a href="#lead" class="btn-ghost">Получить пример КП</a>
            </div>

            <div class="mt-8 grid gap-3 sm:grid-cols-3">
              <article v-for="(fact, index) in heroTrust" :key="fact" class="card-soft p-4" v-reveal="320 + index * 80">
                <p class="text-sm leading-relaxed text-graphite/85">{{ fact }}</p>
              </article>
            </div>
          </div>

          <div class="relative" v-reveal="220">
            <div class="absolute -left-12 -top-10 hidden h-36 w-36 rounded-full bg-bronze/30 blur-3xl sm:block"></div>
            <div class="absolute -right-10 bottom-12 hidden h-44 w-44 rounded-full bg-pine/30 blur-3xl sm:block animate-pulse-glow"></div>

            <div class="relative overflow-hidden rounded-[2rem] border border-white/65 shadow-premium">
              <img
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80"
                alt="Реальный уровень архитектурных проектов компании"
                class="h-[460px] w-full object-cover sm:h-[560px]"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[#101820da] via-[#10182075] to-transparent"></div>

              <div class="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/30 bg-white/12 p-4 text-white backdrop-blur-md sm:p-5">
                <p class="text-xs uppercase tracking-[0.15em] text-white/75">Личный контроль директора</p>
                <p class="mt-2 text-sm leading-relaxed sm:text-base">
                  Лично контролирую ключевые этапы проектирования и качество выдаваемой документации.
                </p>
              </div>
            </div>

            <div class="absolute -left-4 top-10 w-[220px] rounded-2xl border border-white/55 bg-white/90 p-4 shadow-soft backdrop-blur sm:-left-10">
              <div class="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80"
                  alt="Сергей Светлаков, директор компании Строй Проект"
                  class="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p class="text-sm font-semibold text-ink">Сергей Светлаков</p>
                  <p class="text-xs text-graphite/70">директор «Строй Проект»</p>
                </div>
              </div>
            </div>

            <a href="#director" class="absolute right-4 top-4 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-pine shadow-soft transition hover:bg-white">
              Видео-приветствие 56 сек
            </a>
          </div>
        </div>
      </section>

      <section id="benefits" class="container-shell py-16 md:py-24">
        <p class="pill" v-reveal>Почему к нам обращаются</p>
        <h2 class="section-title mt-5" v-reveal="80">Что получает клиент в работе с нами</h2>
        <p class="section-subtitle" v-reveal="140">
          Не общие обещания, а конкретные результаты, которые уменьшают риски и дают предсказуемый путь от идеи до
          реализации.
        </p>

        <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <article
            v-for="(item, index) in outcomes"
            :key="item.title"
            class="card-soft h-full"
            v-reveal="180 + index * 60"
          >
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-pine/85">0{{ index + 1 }}</p>
            <h3 class="mt-3 font-display text-xl leading-tight">{{ item.title }}</h3>
            <p class="mt-3 text-sm leading-relaxed text-graphite/82">{{ item.text }}</p>
          </article>
        </div>
      </section>

      <section id="audience" class="py-16 md:py-24">
        <div class="container-shell">
          <div class="mesh-bg rounded-[2rem] border border-white/70 p-6 shadow-soft sm:p-8 md:p-10">
            <p class="pill" v-reveal>Для кого мы работаем</p>
            <h2 class="section-title mt-5" v-reveal="80">Если узнаете себя - мы точно сможем помочь</h2>

            <div class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <article v-for="(item, index) in audience" :key="item" class="rounded-2xl border border-ink/10 bg-white/85 p-4" v-reveal="160 + index * 70">
                <p class="text-sm leading-relaxed text-graphite/85">{{ item }}</p>
              </article>
            </div>

            <a href="#contacts" class="btn-primary mt-8" v-reveal="240">Обсудить вашу задачу</a>
          </div>
        </div>
      </section>

      <section id="services" class="container-shell py-16 md:py-24">
        <p class="pill" v-reveal>Услуги</p>
        <h2 class="section-title mt-5" v-reveal="80">Разделяем услуги по задачам, а не смешиваем всё в один список</h2>

        <div class="mt-10 grid gap-4 lg:grid-cols-3">
          <article
            v-for="(group, index) in serviceCategories"
            :key="group.category"
            class="card-soft h-full"
            v-reveal="160 + index * 90"
          >
            <h3 class="font-display text-2xl leading-tight">{{ group.category }}</h3>
            <ul class="mt-4 space-y-2 text-sm leading-relaxed text-graphite/84">
              <li v-for="item in group.list" :key="item" class="flex items-start gap-3">
                <span class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-bronze"></span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section id="cases" class="py-16 md:py-24">
        <div class="container-shell">
          <p class="pill" v-reveal>Кейсы и портфолио</p>
          <h2 class="section-title mt-5" v-reveal="80">Показываем не только визуал, но и результат для клиента</h2>

          <div class="mt-10 space-y-6">
            <article
              v-for="(item, index) in cases"
              :key="item.title"
              class="overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 shadow-soft"
              v-reveal="160 + index * 90"
            >
              <div class="grid gap-0 lg:grid-cols-[0.48fr_0.52fr]">
                <img :src="item.image" :alt="item.title" class="h-72 w-full object-cover sm:h-80 lg:h-full" loading="lazy" />

                <div class="p-6 sm:p-7">
                  <div class="flex flex-wrap items-center gap-2 text-xs text-graphite/70">
                    <span class="rounded-full bg-stone px-3 py-1">{{ item.type }}</span>
                    <span class="rounded-full bg-stone px-3 py-1">{{ item.area }}</span>
                    <span class="rounded-full bg-stone px-3 py-1">{{ item.period }}</span>
                  </div>

                  <h3 class="mt-4 font-display text-3xl leading-tight">{{ item.title }}</h3>
                  <p class="mt-4 text-sm leading-relaxed text-graphite/85"><span class="font-semibold text-ink">Задача:</span> {{ item.task }}</p>

                  <div class="mt-4">
                    <p class="text-xs font-semibold uppercase tracking-[0.14em] text-pine/85">Что сделали</p>
                    <ul class="mt-2 space-y-2 text-sm leading-relaxed text-graphite/83">
                      <li v-for="entry in item.done" :key="entry" class="flex items-start gap-3">
                        <span class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-pine"></span>
                        <span>{{ entry }}</span>
                      </li>
                    </ul>
                  </div>

                  <p class="mt-4 text-sm leading-relaxed text-graphite/85"><span class="font-semibold text-ink">Результат:</span> {{ item.result }}</p>
                  <p class="mt-2 text-sm leading-relaxed text-graphite/85"><span class="font-semibold text-ink">Бизнес-результат:</span> {{ item.business }}</p>

                  <div class="mt-4 rounded-2xl border border-pine/20 bg-pine/5 p-4 text-sm leading-relaxed text-graphite/88">
                    <p class="font-semibold text-pine">Комментарий Сергея:</p>
                    <p class="mt-2">{{ item.comment }}</p>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <a href="#contacts" class="btn-primary mt-8" v-reveal="240">Получить подборку кейсов под ваш объект</a>
        </div>
      </section>

      <section id="process" class="container-shell py-16 md:py-24">
        <p class="pill" v-reveal>Как проходит работа</p>
        <h2 class="section-title mt-5" v-reveal="80">Снимаем тревогу через прозрачные этапы, сроки и согласования</h2>

        <div class="mt-10 grid gap-4 md:grid-cols-2">
          <article
            v-for="(step, index) in processSteps"
            :key="step.title"
            class="card-soft"
            v-reveal="160 + index * 70"
          >
            <div class="flex items-center gap-3">
              <span class="flex h-9 w-9 items-center justify-center rounded-full bg-pine font-display text-sm text-white">{{ index + 1 }}</span>
              <h3 class="font-display text-2xl leading-tight">{{ step.title }}</h3>
            </div>
            <p class="mt-3 text-sm leading-relaxed text-graphite/85">{{ step.description }}</p>
            <div class="mt-4 space-y-2 text-sm text-graphite/82">
              <p>{{ step.deliverable }}</p>
              <p>{{ step.duration }}</p>
              <p>{{ step.approvals }}</p>
            </div>
          </article>
        </div>
      </section>

      <section id="scope" class="py-16 md:py-24">
        <div class="container-shell">
          <div class="mesh-bg rounded-[2rem] border border-white/70 p-6 shadow-soft sm:p-8 md:p-10">
            <p class="pill" v-reveal>Что входит в проект</p>
            <h2 class="section-title mt-5" v-reveal="80">Показываем состав работ по тарифам, чтобы клиент понимал, за что платит</h2>

            <div class="mt-8 overflow-x-auto" v-reveal="150">
              <table class="min-w-[820px] w-full border-collapse overflow-hidden rounded-2xl border border-ink/10 bg-white/90 text-sm">
                <thead>
                  <tr class="bg-stone/70 text-left text-ink">
                    <th class="px-4 py-3 font-semibold">Состав проекта</th>
                    <th v-for="tariff in tariffs" :key="tariff" class="px-4 py-3 text-center font-semibold">{{ tariff }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in packageRows" :key="row.feature" class="border-t border-ink/8">
                    <td class="px-4 py-3 text-graphite/90">{{ row.feature }}</td>
                    <td v-for="(value, idx) in row.values" :key="`${row.feature}-${idx}`" class="px-4 py-3 text-center">
                      <span :class="value ? 'text-pine font-semibold' : 'text-graphite/35'">{{ value ? '✓' : '—' }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <a href="#contacts" class="btn-secondary mt-8" v-reveal="220">Запросить точный состав под ваш объект</a>
          </div>
        </div>
      </section>

      <section id="pricing" class="container-shell py-16 md:py-24">
        <p class="pill" v-reveal>Стоимость</p>
        <h2 class="section-title mt-5" v-reveal="80">Даём ориентиры и объясняем, от чего зависит цена</h2>

        <div class="mt-10 grid gap-4 md:grid-cols-2">
          <article v-for="(item, index) in priceRanges" :key="item.title" class="card-soft" v-reveal="160 + index * 80">
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-pine/85">{{ item.title }}</p>
            <p class="mt-3 font-display text-4xl leading-tight">{{ item.value }}</p>
            <p class="mt-3 text-sm leading-relaxed text-graphite/84">{{ item.note }}</p>
          </article>
        </div>

        <div class="mt-6 rounded-3xl border border-ink/10 bg-white/85 p-6" v-reveal="220">
          <p class="text-sm font-semibold uppercase tracking-[0.14em] text-graphite/75">Что влияет на стоимость</p>
          <ul class="mt-4 grid gap-3 sm:grid-cols-2">
            <li v-for="factor in priceFactors" :key="factor" class="flex items-start gap-3 text-sm text-graphite/85">
              <span class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-bronze"></span>
              <span>{{ factor }}</span>
            </li>
          </ul>
          <a href="#contacts" class="btn-primary mt-6">Получить расчёт стоимости за 15 минут</a>
        </div>
      </section>

      <section id="trust" class="py-16 md:py-24">
        <div class="container-shell">
          <div class="rounded-[2rem] bg-ink p-6 text-white shadow-premium sm:p-8 md:p-10">
            <p class="pill border-white/25 bg-white/10 text-white" v-reveal>Почему нам доверяют</p>
            <h2 class="mt-5 font-display text-3xl leading-tight sm:text-4xl" v-reveal="80">Конкретные цифры, опыт и профессиональная команда</h2>

            <div class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <article v-for="(stat, index) in trustStats" :key="stat" class="rounded-2xl border border-white/20 bg-white/8 p-4" v-reveal="140 + index * 60">
                <p class="text-sm leading-relaxed text-white/90">{{ stat }}</p>
              </article>
            </div>

            <div class="mt-8 grid gap-4 lg:grid-cols-2">
              <div class="rounded-2xl border border-white/20 bg-white/8 p-5" v-reveal="220">
                <p class="text-xs uppercase tracking-[0.14em] text-white/70">Факты о работе</p>
                <ul class="mt-3 space-y-2 text-sm leading-relaxed text-white/90">
                  <li v-for="proof in trustProof" :key="proof" class="flex items-start gap-3">
                    <span class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-bronzeSoft"></span>
                    <span>{{ proof }}</span>
                  </li>
                </ul>
              </div>

              <div class="rounded-2xl border border-white/20 bg-white/8 p-5" v-reveal="260">
                <p class="text-xs uppercase tracking-[0.14em] text-white/70">Документы и квалификация</p>
                <ul class="mt-3 space-y-2 text-sm leading-relaxed text-white/90">
                  <li v-for="item in certifications" :key="item" class="flex items-start gap-3">
                    <span class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-bronzeSoft"></span>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="director" class="container-shell py-16 md:py-24">
        <p class="pill" v-reveal>Личный бренд директора</p>
        <h2 class="section-title mt-5" v-reveal="80">Сергей Светлаков - директор «Строй Проект»</h2>

        <div class="mt-10 grid gap-6 lg:grid-cols-[0.46fr_0.54fr]">
          <article class="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/88 shadow-soft" v-reveal="150">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1000&q=80"
              alt="Сергей Светлаков в рабочей среде"
              class="h-[420px] w-full object-cover sm:h-[480px]"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#0f1f1bbb] to-transparent"></div>
            <div class="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/30 bg-white/12 p-4 text-white backdrop-blur-md">
              <p class="font-display text-2xl">«Хороший проект - это решение, которое можно построить без хаоса и лишних затрат»</p>
            </div>
          </article>

          <div class="space-y-4" v-reveal="210">
            <article class="card-soft">
              <p class="text-sm leading-relaxed text-graphite/86">
                Я убеждён, что архитектура должна работать в реальной жизни: быть удобной, экономически оправданной и
                понятной для строителей. Поэтому мы делаем акцент на реализуемости, продуманной планировке и качестве
                рабочей документации.
              </p>
              <p class="mt-3 text-sm leading-relaxed text-graphite/86">
                В каждом проекте лично контролирую ключевые этапы: от концепции до выдачи финального комплекта.
              </p>
            </article>

            <article class="relative overflow-hidden rounded-3xl border border-white/70 bg-white/88 shadow-soft">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80"
                alt="Видео-обращение Сергея Светлакова"
                class="h-52 w-full object-cover"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[#112723dd] via-[#11272388] to-transparent"></div>
              <div class="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/25 bg-white/12 p-3 text-white backdrop-blur">
                <p class="text-xs uppercase tracking-[0.14em] text-white/75">Видео-приветствие директора</p>
                <p class="mt-2 text-sm leading-relaxed">Кто мы, как работаем и почему с нами комфортно на каждом этапе.</p>
                <a href="#contacts" class="btn-secondary mt-3 border-white/35 bg-white/90 text-pine hover:bg-white">Смотреть видео</a>
              </div>
            </article>

            <article class="card-soft">
              <p class="text-xs font-semibold uppercase tracking-[0.14em] text-pine/80">Принципы работы</p>
              <ul class="mt-3 space-y-2 text-sm leading-relaxed text-graphite/84">
                <li v-for="item in directorPrinciples" :key="item" class="flex items-start gap-3">
                  <span class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-pine"></span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </article>

            <article class="card-soft">
              <p class="text-xs font-semibold uppercase tracking-[0.14em] text-pine/80">Полезно знать перед заказом проекта</p>
              <ul class="mt-3 space-y-2 text-sm leading-relaxed text-graphite/84">
                <li v-for="tip in expertTips" :key="tip" class="flex items-start gap-3">
                  <span class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-bronze"></span>
                  <span>{{ tip }}</span>
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section id="faq" class="py-16 md:py-24">
        <div class="container-shell">
          <div class="mesh-bg rounded-[2rem] border border-white/70 p-6 shadow-soft sm:p-8 md:p-10">
            <p class="pill" v-reveal>FAQ и возражения</p>
            <h2 class="section-title mt-5" v-reveal="80">Отвечаем на вопросы до того, как они станут барьером</h2>

            <div class="mt-8 space-y-3">
              <details
                v-for="(item, index) in faqItems"
                :key="item.q"
                class="rounded-2xl border border-ink/10 bg-white/90 p-4"
                :open="index === 0"
                v-reveal="140 + index * 40"
              >
                <summary class="cursor-pointer list-none text-sm font-semibold text-ink">{{ item.q }}</summary>
                <p class="mt-3 text-sm leading-relaxed text-graphite/84">{{ item.a }}</p>
              </details>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" class="container-shell py-16 md:py-24">
        <p class="pill" v-reveal>Отзывы</p>
        <h2 class="section-title mt-5" v-reveal="80">Реальные отзывы с контекстом задачи и результата</h2>

        <div class="mt-10 grid gap-4 lg:grid-cols-3">
          <article
            v-for="(item, index) in testimonials"
            :key="item.name"
            class="card-soft h-full"
            v-reveal="160 + index * 80"
          >
            <img :src="item.image" :alt="item.name" class="h-44 w-full rounded-2xl object-cover" loading="lazy" />
            <p class="mt-4 text-sm font-semibold text-ink">{{ item.name }}</p>
            <p class="text-xs uppercase tracking-[0.13em] text-graphite/65">{{ item.type }}</p>

            <p class="mt-3 text-sm leading-relaxed text-graphite/84"><span class="font-semibold text-ink">Страх:</span> {{ item.fear }}</p>
            <p class="mt-2 text-sm leading-relaxed text-graphite/84"><span class="font-semibold text-ink">Результат:</span> {{ item.result }}</p>
            <p class="mt-3 text-sm italic leading-relaxed text-graphite/86">«{{ item.quote }}»</p>
          </article>
        </div>
      </section>

      <section id="lead" class="py-16 md:py-24">
        <div class="container-shell">
          <div class="rounded-[2rem] border border-pine/20 bg-pine p-6 text-white shadow-premium sm:p-8 md:p-10">
            <p class="pill border-white/25 bg-white/10 text-white" v-reveal>Лид-магнит</p>
            <h2 class="mt-5 font-display text-3xl leading-tight sm:text-4xl" v-reveal="80">
              Бесплатная консультация директора + предварительный разбор задачи
            </h2>
            <p class="mt-4 max-w-3xl text-sm leading-relaxed text-white/86" v-reveal="130">
              Подходит тем, кто еще выбирает формат проекта. Помогаем понять оптимальный состав работ и ориентир по
              стоимости до подписания договора.
            </p>

            <div class="mt-8 grid gap-3 sm:grid-cols-2" v-reveal="180">
              <article v-for="item in leadMagnetItems" :key="item" class="rounded-2xl border border-white/20 bg-white/8 p-4 text-sm">
                {{ item }}
              </article>
            </div>

            <div class="mt-8 flex flex-col gap-3 sm:flex-row" v-reveal="230">
              <a href="#contacts" class="btn-secondary border-white/30 bg-white text-pine hover:bg-white/90">Записаться на консультацию</a>
              <a href="#contacts" class="btn-ghost border-white/35 bg-white/10 text-white hover:bg-white/20">Пройти квиз из 5 вопросов</a>
              <a href="#contacts" class="btn-ghost border-white/35 bg-white/10 text-white hover:bg-white/20">Получить PDF-презентацию</a>
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" class="container-shell py-16 md:py-24">
        <p class="pill" v-reveal>Контакты и заявка</p>
        <h2 class="section-title mt-5" v-reveal="80">Оставьте заявку - свяжемся в течение 15 минут в рабочее время</h2>

        <div class="mt-10 grid gap-6 xl:grid-cols-[0.44fr_0.56fr]">
          <article class="card-soft space-y-4" v-reveal="150">
            <p class="text-sm leading-relaxed text-graphite/85">
              Работаем с частными и коммерческими объектами в Сочи и Краснодарском крае. Возможен дистанционный формат
              работы с выездами на ключевые этапы.
            </p>

            <div class="space-y-2 text-sm text-graphite/86">
              <p><span class="font-semibold text-ink">Телефон:</span> +7 (900) 000-00-00</p>
              <p><span class="font-semibold text-ink">Email:</span> hello@stroyproekt-sochi.ru</p>
              <p><span class="font-semibold text-ink">Адрес:</span> г. Сочи, ул. Несебрская, 6</p>
              <p><span class="font-semibold text-ink">Время ответа:</span> до 15 минут в рабочее время</p>
            </div>

            <div class="grid gap-3 sm:grid-cols-2">
              <a v-for="item in messengerLinks" :key="item.label" :href="item.href" class="rounded-2xl border border-ink/10 bg-white p-4 transition hover:border-pine/35">
                <p class="text-sm font-semibold text-ink">{{ item.label }}</p>
                <p class="mt-1 text-xs text-graphite/70">{{ item.description }}</p>
              </a>
            </div>

            <div class="overflow-hidden rounded-2xl border border-ink/10">
              <iframe
                title="Карта офиса в Сочи"
                class="h-52 w-full"
                src="https://www.openstreetmap.org/export/embed.html?bbox=39.7070%2C43.5750%2C39.7345%2C43.5945&layer=mapnik&marker=43.5845%2C39.7208"
              ></iframe>
            </div>
          </article>

          <form class="card-soft" @submit.prevent v-reveal="210">
            <div class="grid gap-4">
              <label class="text-sm font-medium text-graphite">
                Имя
                <input type="text" class="input-field mt-2" placeholder="Как к вам обращаться" required />
              </label>

              <label class="text-sm font-medium text-graphite">
                Телефон
                <input type="tel" class="input-field mt-2" placeholder="+7 (___) ___-__-__" required />
              </label>

              <label class="text-sm font-medium text-graphite">
                Тип объекта
                <select class="input-field mt-2" required>
                  <option value="" disabled selected>Выберите тип объекта</option>
                  <option v-for="type in projectTypes" :key="type" :value="type">{{ type }}</option>
                </select>
              </label>

              <label class="text-sm font-medium text-graphite">
                Комментарий
                <textarea class="input-field mt-2 min-h-[130px] resize-y" placeholder="Кратко опишите задачу, площадь и пожелания"></textarea>
              </label>
            </div>

            <button type="submit" class="btn-primary mt-6 w-full">Узнать стоимость проекта</button>
            <p class="mt-3 text-xs text-graphite/65">Отправляя форму, вы соглашаетесь на обработку персональных данных.</p>
          </form>
        </div>
      </section>
    </main>

    <footer class="container-shell pt-8">
      <div class="flex flex-col gap-2 border-t border-ink/10 py-6 text-sm text-graphite/72 sm:flex-row sm:items-center sm:justify-between">
        <p>© {{ currentYear }} Строй Проект, Сочи</p>
        <p>Проектирование частных домов и коммерческих объектов с личным контролем директора</p>
      </div>
    </footer>
  </div>
</template>
