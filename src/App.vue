<script setup>
import { computed, ref } from 'vue'

const navLinks = [
  { label: 'Преимущества', href: '#benefits' },
  { label: 'Услуги', href: '#services' },
  { label: 'Кейсы', href: '#cases' },
  { label: 'Процесс', href: '#process' },
  { label: 'Стоимость', href: '#pricing' },
  { label: 'Контакты', href: '#contacts' },
]

const heroTriggers = [
  'Проект под задачи семьи или бизнеса, а не шаблонный типовой альбом',
  'Продуманная логика строительства, чтобы не терять деньги на переделках',
  'Личный контроль директора на ключевых этапах проектирования',
]

const benefits = [
  {
    title: 'Проект под ваш участок и образ жизни',
    text: 'Решение под реальные параметры земли, рельефа, инсоляции и сценарии использования.',
  },
  {
    title: 'Просчитываем стройку заранее',
    text: 'Чтобы проект не оказался дорогим или технически сложным уже на этапе реализации.',
  },
  {
    title: 'Снижаем риск переделок',
    text: 'Точные решения по конструктиву и узлам экономят бюджет и сокращают сроки.',
  },
  {
    title: 'Продуманная планировка',
    text: 'Функциональность, приватность, маршруты движения, хранение и естественный свет.',
  },
  {
    title: 'Понимание бюджета',
    text: 'Проектируем в финансовых рамках заказчика и фиксируем приоритеты по этапам.',
  },
  {
    title: 'Прозрачный процесс',
    text: 'Понятные этапы, сроки, согласования и конкретный результат на каждом шаге.',
  },
  {
    title: 'Универсально для любого региона',
    text: 'Учитываем климат и эксплуатацию: снег, ветер, влажность, УГВ, сейсмику и тип грунтов.',
  },
  {
    title: 'Рабочая документация без компромиссов',
    text: 'Строители получают понятный комплект, с которым можно работать без лишних вопросов.',
  },
]

const audiences = [
  'Владельцы участков, которые хотят построить дом для семьи',
  'Заказчики вилл, коттеджей и резиденций',
  'Инвесторы и девелоперы',
  'Владельцы гостиниц, апарт-объектов и коммерческих площадей',
  'Предприниматели, которым нужен проект под бизнес-задачу',
  'Собственники, планирующие реконструкцию или перепланировку',
]

const serviceGroups = [
  {
    title: 'Для частных объектов',
    items: [
      'Архитектурное проектирование частных домов',
      'Индивидуальные планировочные решения',
      'Эскизный проект',
      'Рабочий проект',
      'Проект реконструкции',
      'Проектирование вилл, коттеджей и резиденций',
    ],
  },
  {
    title: 'Для коммерческих объектов',
    items: [
      'Проектирование офисов',
      'Проектирование гостиниц и гостевых домов',
      'Проектирование ресторанов, кафе и магазинов',
      'Коммерческие здания и помещения',
      'Адаптация объекта под бизнес-логику',
      'Реконструкция действующих площадок',
    ],
  },
  {
    title: 'Дополнительные услуги',
    items: [
      '3D-визуализация',
      'Авторский надзор',
      'Сопровождение строительства',
      'Подбор подрядчиков',
      'Взаимодействие со смежниками',
      'Экспертные консультации директора',
    ],
  },
]

const cases = [
  {
    title: 'Частный дом 280 м² - сложный рельеф с перепадом высот 8 м',
    type: 'Частный дом',
    area: '280 м²',
    period: '9 недель проектирования',
    image: '/images/case-01.jpg',
    task: 'Посадить дом на участок с большим перепадом высот и сохранить удобную внутреннюю логику.',
    result: 'Проект реализован без пересборки планировок, с рациональной вертикальной логистикой и террасами.',
  },
  {
    title: 'Дом 340 м² в средней полосе - снеговая нагрузка 220 кг/м²',
    type: 'Частный дом',
    area: '340 м²',
    period: '8 недель проектирования',
    image: '/images/case-02.jpg',
    task: 'Разработать архитектуру под выраженную снеговую нагрузку и сезонные перепады температур.',
    result: 'Оптимизирован конструктив кровли и узлов, что снизило риски деформаций и упростило строительство.',
  },
  {
    title: 'Дом 240 м² на участке с высоким УГВ и болотистым грунтом',
    type: 'Частный дом',
    area: '240 м²',
    period: '7 недель проектирования',
    image: '/images/case-03.jpg',
    task: 'Сделать надежное решение для сложных грунтов и высокой грунтовой воды.',
    result: 'Выбрана конструктивная схема, которая сохранила бюджет и обеспечила устойчивость здания.',
  },
  {
    title: 'Бутик-отель 1 450 м²',
    type: 'Гостиничный объект',
    area: '1 450 м²',
    period: '11 недель проектирования',
    image: '/images/case-04.jpg',
    task: 'Объединить выразительную архитектуру и эффективные гостевые/сервисные потоки.',
    result: 'Увеличена полезная площадь номерного фонда и оптимизирована эксплуатация инженерии.',
  },
  {
    title: 'Гостевой дом 980 м² в лесной зоне',
    type: 'Гостиничный объект',
    area: '980 м²',
    period: '8 недель проектирования',
    image: '/images/case-05.jpg',
    task: 'Вписать объект в природный контекст и учесть ограничения по пятну застройки.',
    result: 'Сохранены видовые коридоры и реализована компактная инженерная схема для эксплуатации круглый год.',
  },
  {
    title: 'Ресторан 620 м² в городской среде',
    type: 'Коммерческий объект',
    area: '620 м²',
    period: '7 недель проектирования',
    image: '/images/case-06.jpg',
    task: 'Увеличить посадку и убрать конфликт потоков гостей и персонала.',
    result: 'Получили удобную посадку, корректную технологическую цепочку и готовность к быстрому запуску.',
  },
  {
    title: 'Реконструкция исторического здания 1 100 м²',
    type: 'Реконструкция',
    area: '1 100 м²',
    period: '13 недель проектирования',
    image: '/images/case-07.jpg',
    task: 'Адаптировать объект под современную функцию и сохранить архитектурную идентичность.',
    result: 'Обновили планировочную логику и инженерную инфраструктуру без потери исторического характера.',
  },
  {
    title: 'Офисный хаб 1 900 м² с гибридными пространствами',
    type: 'Коммерческий объект',
    area: '1 900 м²',
    period: '10 недель проектирования',
    image: '/images/case-08.jpg',
    task: 'Создать офис с гибкими зонами под разные команды и сценарии работы.',
    result: 'Увеличили функциональную емкость этажей и сохранили комфорт при высокой плотности.',
  },
]

const processSteps = [
  {
    title: 'Первичная консультация',
    text: 'Разбираем задачу, участок, пожелания, бюджет и сроки.',
    deliverable: 'Что получает клиент: структура проекта и список исходных данных.',
    duration: 'Срок: 1-2 дня',
    approvals: 'Согласований: 1 встреча + письменное резюме',
  },
  {
    title: 'Предпроектный анализ',
    text: 'Проверяем ограничения, рельеф, грунты, климатические факторы и риски.',
    deliverable: 'Что получает клиент: аналитическая база и сценарий реализации.',
    duration: 'Срок: 3-5 дней',
    approvals: 'Согласований: 1 промежуточный созвон',
  },
  {
    title: 'Концепция и планировки',
    text: 'Предлагаем варианты, корректируем и утверждаем оптимальное решение.',
    deliverable: 'Что получает клиент: 2-3 варианта и финальную концепцию.',
    duration: 'Срок: 7-14 дней',
    approvals: 'Согласований: до 2 итераций',
  },
  {
    title: 'Архитектурный проект',
    text: 'Разрабатываем фасады, объемно-пространственную модель и ключевые узлы.',
    deliverable: 'Что получает клиент: архитектурный комплект на согласование.',
    duration: 'Срок: 10-20 дней',
    approvals: 'Согласований: 1 пакетное утверждение',
  },
  {
    title: 'Рабочая документация',
    text: 'Готовим комплект для строителей, подрядчиков и контроля на площадке.',
    deliverable: 'Что получает клиент: рабочий проект с ведомостями и узлами.',
    duration: 'Срок: 15-30 дней',
    approvals: 'Согласований: выдача по разделам',
  },
  {
    title: 'Сопровождение реализации',
    text: 'Консультируем в процессе строительства и фиксируем решения по узлам.',
    deliverable: 'Что получает клиент: поддержку до ключевых строительных этапов.',
    duration: 'Срок: по договору',
    approvals: 'Согласований: по графику проекта',
  },
]

const tariffs = ['Эскизный проект', 'Архитектурный проект', 'Рабочий проект', 'Авторское сопровождение']

const packageRows = [
  { name: 'Генплан участка', values: [true, true, true, true] },
  { name: 'Планировки и функциональные схемы', values: [true, true, true, true] },
  { name: 'Фасады и разрезы', values: [false, true, true, true] },
  { name: 'Конструктивные решения и узлы', values: [false, false, true, true] },
  { name: 'Спецификации и ведомости', values: [false, false, true, true] },
  { name: 'Рекомендации по материалам', values: [false, true, true, true] },
  { name: 'Инженерная логика', values: [false, true, true, true] },
  { name: '3D-визуализация', values: [true, true, true, false] },
  { name: 'Консультации в ходе стройки', values: [false, false, false, true] },
]

const pricing = [
  {
    title: 'Частные дома',
    value: 'от 3 500 ₽/м²',
    note: 'Финальная ставка зависит от площади, рельефа, конструктивной сложности и состава документации.',
  },
  {
    title: 'Коммерческие объекты',
    value: 'от 4 200 ₽/м²',
    note: 'Учитываются нормы, функциональные сценарии, инженерные требования и сроки реализации.',
  },
]

const pricingFactors = [
  'Площадь и тип объекта',
  'Сложность архитектуры',
  'Рельеф, грунты, УГВ, климат',
  'Состав проектной документации',
  'Необходимость 3D-визуализаций',
  'Срочность и этапность реализации',
]

const trustStats = [
  { value: '70+', label: 'реализованных объектов' },
  { value: '15 000+ м²', label: 'спроектированной площади' },
  { value: '15+ лет', label: 'практического опыта' },
  { value: '92%', label: 'проектов сданы без переделок планировок' },
]

const regions = [
  'Москва и МО',
  'Краснодарский край',
  'Санкт-Петербург и ЛО',
  'Алтай',
  'Карелия',
  'Калининград',
  'Урал',
  'Сибирь',
  'Поволжье',
]

const documents = [
  {
    title: 'Допуск СРО',
    desc: 'Подтверждённое право выполнения проектных работ.',
    image: '/images/doc-01.jpg',
  },
  {
    title: 'BIM / Revit компетенции',
    desc: 'Работаем в цифровой среде с высокой точностью коллизий.',
    image: '/images/doc-02.jpg',
  },
  {
    title: 'Стандарты LOD и регламенты',
    desc: 'Соблюдение проектных стандартов и прозрачная структура данных.',
    image: '/images/doc-03.jpg',
  },
]

const faqItems = [
  {
    q: 'Сколько стоит проект?',
    a: 'Даем предварительный ориентир за 15-20 минут после короткого брифа и исходных данных по объекту.',
  },
  {
    q: 'Какие сроки проектирования?',
    a: 'Обычно 4-12 недель в зависимости от площади, сложности и состава разделов.',
  },
  {
    q: 'Можно ли работать дистанционно?',
    a: 'Да. Работаем дистанционно по всей России и СНГ, ключевые этапы фиксируем в онлайн-формате.',
  },
  {
    q: 'Берёте сложные участки с уклоном?',
    a: 'Да, это одна из наших самых частых задач. Уклон, высокий УГВ, слабые грунты, ограничения по высоте — работаем с любыми условиями.',
  },
  {
    q: 'Можно заказать только архитектурную часть?',
    a: 'Да, но заранее объясняем риски по бюджету и реализации без полного рабочего комплекта.',
  },
  {
    q: 'Помогаете во время строительства?',
    a: 'Да. Включаем авторское сопровождение и консультации подрядчиков на этапе реализации.',
  },
]

const reviews = [
  {
    name: 'Анна и Максим',
    type: 'Частный дом на сложном рельефе',
    text: 'Был страх, что красивую идею не получится построить без резкого роста бюджета. В итоге получили рабочий проект, по которому строители шли без постоянных уточнений.',
    image: '/images/review-01.jpg',
  },
  {
    name: 'Алексей Р.',
    type: 'Бутик-отель',
    text: 'Нужна была не только архитектура, но и коммерческая логика пространства. Команда учла потоки, эксплуатацию и окупаемость, что сразу отразилось на запуске.',
    image: '/images/review-02.jpg',
  },
  {
    name: 'Екатерина В.',
    type: 'Реконструкция исторического здания',
    text: 'Сохранили характер объекта и при этом адаптировали его под современный формат. Особенно понравилась прозрачность процесса и качество рабочей документации.',
    image: '/images/review-03.jpg',
  },
]

const leadOffers = [
  'Бесплатный разбор участка и ТЗ за 15-20 минут от директора',
  'Чек-лист: 10 самых дорогих ошибок при проектировании дома / отеля на сложном участке',
  'Подборка 5-7 реальных проектов под ваш бюджет и сложность участка',
]

const commonErrors = [
  'Игнорирование геологии и УГВ до выбора конструктивной схемы',
  'Слабая проработка узлов и стыков в рабочей документации',
  'Планировка без учёта реальных сценариев жизни или бизнеса',
]

const messengers = [
  { label: 'WhatsApp', href: 'https://wa.me/79000000000', short: 'WA' },
  { label: 'Telegram', href: 'https://t.me/stroyproject_arch', short: 'TG' },
]

const projectTypes = [
  'Частный дом',
  'Коттедж / резиденция',
  'Гостиница / гостевой дом',
  'Ресторан / коммерческое помещение',
  'Реконструкция',
]

const formSubmitted = ref(false)
const showAllCases = ref(false)
const openProcess = ref(0)
const openFaq = ref(0)
const activeBenefit = ref(0)
const benefitsTrack = ref(null)

const visibleCases = computed(() => (showAllCases.value ? cases : cases.slice(0, 4)))

const submitLead = () => {
  formSubmitted.value = true
}

const resetForm = () => {
  formSubmitted.value = false
}

const toggleCases = () => {
  showAllCases.value = !showAllCases.value
}

const onBenefitsScroll = () => {
  const track = benefitsTrack.value
  if (!track) return

  const cards = track.querySelectorAll('[data-benefit-card]')
  if (!cards.length) return

  const center = track.scrollLeft + track.clientWidth / 2
  let closestIndex = 0
  let closestDistance = Number.POSITIVE_INFINITY

  cards.forEach((card, index) => {
    const cardCenter = card.offsetLeft + card.clientWidth / 2
    const distance = Math.abs(cardCenter - center)
    if (distance < closestDistance) {
      closestDistance = distance
      closestIndex = index
    }
  })

  activeBenefit.value = closestIndex
}

const toggleProcess = (index) => {
  openProcess.value = openProcess.value === index ? -1 : index
}

const toggleFaq = (index) => {
  openFaq.value = openFaq.value === index ? -1 : index
}

const animateExpandEnter = (el) => {
  el.style.height = '0'
  el.style.opacity = '0'
  el.style.overflow = 'hidden'
  el.style.transition = 'height 320ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease'
  void el.offsetHeight
  el.style.height = `${el.scrollHeight}px`
  el.style.opacity = '1'
}

const animateExpandAfterEnter = (el) => {
  el.style.height = 'auto'
  el.style.overflow = 'visible'
}

const animateExpandLeave = (el) => {
  el.style.height = `${el.scrollHeight}px`
  el.style.opacity = '1'
  el.style.overflow = 'hidden'
  el.style.transition = 'height 280ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms ease'
  void el.offsetHeight
  el.style.height = '0'
  el.style.opacity = '0'
}

const animateExpandAfterLeave = (el) => {
  el.style.height = ''
  el.style.opacity = ''
  el.style.overflow = ''
  el.style.transition = ''
}

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
  <div class="relative overflow-x-clip pb-32 text-textMain">
    <div class="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[620px] bg-[radial-gradient(circle_at_55%_0%,rgba(201,169,110,0.2),transparent_58%)]"></div>

    <header class="container-shell pt-6 sm:pt-8">
      <div class="nav-shell" v-reveal>
        <div class="flex flex-wrap items-center justify-between gap-3">
          <a href="#hero" class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gold text-sm font-bold text-base0">SP</div>
            <div>
              <p class="font-display text-sm font-semibold sm:text-base">Строй Проект</p>
              <p class="text-xs text-textMuted">Архитектурное проектирование и рабочая документация</p>
            </div>
          </a>

          <a href="tel:+79000000000" class="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-gold/10 px-3 py-1.5 text-xs font-semibold text-gold transition hover:bg-gold/20 sm:px-4 sm:py-2 sm:text-sm">
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.62a2 2 0 0 1-.45 2.11L8 9.7a16 16 0 0 0 6.3 6.3l1.25-1.28a2 2 0 0 1 2.11-.45c.84.29 1.72.5 2.62.62A2 2 0 0 1 22 16.92z" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            +7 (900) 000-00-00
          </a>
        </div>

        <nav class="mt-4 flex flex-wrap gap-4 text-sm font-medium text-textMuted sm:gap-5">
          <a v-for="item in navLinks" :key="item.href" :href="item.href" class="transition hover:text-textMain">{{ item.label }}</a>
        </nav>
      </div>
    </header>

    <main>
      <section id="hero" class="container-shell pb-10 pt-6 sm:pt-9 md:pb-16">
        <div class="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p class="pill" v-reveal="60">Практичное проектирование для частных и коммерческих объектов</p>
            <h1 class="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-[3.25rem]" v-reveal="120">
              Архитектурное проектирование частных домов и коммерческих объектов -
              <span class="headline-gradient">без переделок, лишних затрат и хаоса на стройке</span>
            </h1>
            <p class="mt-6 max-w-2xl text-sm leading-relaxed text-textMuted sm:text-base" v-reveal="180">
              Даже на самом сложном участке - с любым рельефом, грунтами и климатическими условиями.
            </p>

            <div class="mt-6 flex flex-col gap-2.5 sm:flex-row" v-reveal="230">
              <a href="#contacts" class="btn-primary">Получить консультацию директора</a>
              <a href="#cases" class="btn-secondary">Посмотреть {{ cases.length }}+ реализованных проектов</a>
            </div>

            <div class="mt-6 grid gap-2.5 sm:grid-cols-3">
              <article v-for="(item, index) in heroTriggers" :key="item" class="card-dark p-4" v-reveal="290 + index * 70">
                <p class="text-sm leading-relaxed text-textMuted">{{ item }}</p>
              </article>
            </div>
          </div>

          <div class="relative" v-reveal="200">
            <div class="absolute -left-10 -top-12 hidden h-40 w-40 rounded-full bg-gold/25 blur-3xl sm:block"></div>
            <div class="absolute -right-8 bottom-10 hidden h-44 w-44 rounded-full bg-teal/25 blur-3xl sm:block animate-pulse-glow"></div>

            <div class="relative overflow-hidden rounded-[2rem] border border-white/15 shadow-premium">
              <img
                src="/images/hero-main.jpg"
                alt="Современный реализованный архитектурный объект"
                class="h-[340px] w-full object-cover photo-dim sm:h-[520px]"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[#0a1428ee] via-[#0a142877] to-transparent"></div>

              <div class="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-base1/60 p-4 backdrop-blur-md sm:p-5">
                <p class="text-xs uppercase tracking-[0.15em] text-gold">Сергей Светлаков, директор «Строй Проект»</p>
                <p class="mt-2 text-sm leading-relaxed text-textMain/95">
                  Лично контролирую ключевые этапы проектирования и качество рабочей документации.
                </p>
              </div>
            </div>

            <div class="absolute -left-4 top-8 hidden w-[220px] rounded-2xl border border-white/18 bg-base1/90 p-4 shadow-soft backdrop-blur sm:-left-9 sm:block">
              <div class="flex items-center gap-3">
                <img
                  src="/images/hero-director.jpg"
                  alt="Портрет Сергея Светлакова"
                  class="h-11 w-11 rounded-full object-cover"
                />
                <div>
                  <p class="text-sm font-semibold">Сергей Светлаков</p>
                  <p class="text-xs text-textMuted">личный контроль проекта</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" class="container-shell py-10 sm:py-12 md:py-16">
        <p class="pill" v-reveal>Почему к нам обращаются</p>
        <h2 class="section-title mt-5" v-reveal="80">Конкретные преимущества, которые влияют на результат проекта</h2>
        <p class="section-lead" v-reveal="130">
          Не «общие слова», а конкретика: как мы снижаем риски, держим бюджет и делаем проект реально реализуемым.
        </p>

        <div class="mt-7 sm:hidden" v-reveal="160">
          <div class="mt-3 flex items-center justify-between text-xs text-textMuted">
            <p>Свайпайте карточки влево</p>
            <p>{{ activeBenefit + 1 }} / {{ benefits.length }}</p>
          </div>

          <div
            ref="benefitsTrack"
            class="no-scrollbar benefits-track mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2"
            @scroll.passive="onBenefitsScroll"
          >
            <article
              v-for="(item, index) in benefits"
              :key="`mobile-benefit-${item.title}`"
              data-benefit-card
              class="benefit-slide shrink-0 snap-start rounded-3xl border bg-panel/90 p-4 shadow-soft"
              :class="activeBenefit === index ? 'border-gold/45' : 'border-white/12'"
            >
              <p class="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
                {{ String(index + 1).padStart(2, '0') }}
              </p>
              <h3 class="mt-2 font-display text-xl leading-tight text-textMain">
                {{ item.title }}
              </h3>
              <p class="mt-2 text-sm leading-relaxed text-textMuted">
                {{ item.text }}
              </p>
            </article>
          </div>

          <div class="mt-3 flex items-center gap-1.5">
            <span
              v-for="(_, index) in benefits"
              :key="`benefit-dot-${index}`"
              class="h-1.5 rounded-full transition-all duration-300"
              :class="activeBenefit === index ? 'w-5 bg-gold' : 'w-1.5 bg-white/25'"
            ></span>
          </div>

          <div class="mt-2 h-1.5 overflow-hidden rounded-full bg-base2">
            <div class="h-full rounded-full bg-gold transition-all duration-300" :style="{ width: `${((activeBenefit + 1) / benefits.length) * 100}%` }"></div>
          </div>
        </div>

        <div class="mt-10 hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          <article v-for="(item, index) in benefits" :key="item.title" class="card-dark h-full" v-reveal="170 + index * 60">
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-gold">0{{ index + 1 }}</p>
            <h3 class="mt-3 font-display text-xl leading-tight">{{ item.title }}</h3>
            <p class="mt-3 text-sm leading-relaxed text-textMuted">{{ item.text }}</p>
          </article>
        </div>

        <a href="#contacts" class="mini-cta" v-reveal="230">Получить расчёт под ваш участок</a>
      </section>

      <section id="audience" class="py-10 sm:py-12 md:py-16">
        <div class="container-shell">
          <div class="panel-gradient rounded-[2rem] border border-white/10 p-6 shadow-soft sm:p-8 md:p-10">
            <p class="pill" v-reveal>Для кого мы работаем</p>
            <h2 class="section-title mt-5" v-reveal="80">Вы узнаете себя в одной из этих задач</h2>

            <div class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <article
                v-for="(item, index) in audiences"
                :key="item"
                class="rounded-2xl border border-white/12 bg-base1/70 p-4"
                v-reveal="150 + index * 60"
              >
                <p class="text-sm leading-relaxed text-textMuted">{{ item }}</p>
              </article>
            </div>

            <a href="#contacts" class="mini-cta" v-reveal="220">Получить расчёт под ваш участок</a>
          </div>
        </div>
      </section>

      <section id="services" class="container-shell py-10 sm:py-12 md:py-16">
        <p class="pill" v-reveal>Услуги</p>
        <h2 class="section-title mt-5" v-reveal="80">Разделяем услуги по категориям, чтобы клиент сразу видел нужный формат</h2>

        <div class="mt-10 grid gap-4 lg:grid-cols-3">
          <article v-for="(group, index) in serviceGroups" :key="group.title" class="card-dark h-full" v-reveal="150 + index * 90">
            <h3 class="font-display text-2xl">{{ group.title }}</h3>
            <ul class="mobile-list-compact mt-4 space-y-2 text-sm leading-relaxed text-textMuted">
              <li v-for="entry in group.items" :key="entry" class="flex items-start gap-3">
                <span class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold"></span>
                <span>{{ entry }}</span>
              </li>
            </ul>
          </article>
        </div>

        <a href="#contacts" class="mini-cta" v-reveal="230">Получить расчёт под ваш участок</a>
      </section>

      <section id="cases" class="py-10 sm:py-12 md:py-16">
        <div class="container-shell">
          <p class="pill" v-reveal>Портфолио и кейсы</p>
          <h2 class="section-title mt-5" v-reveal="80">{{ cases.length }}+ кейсов в разных условиях и типах объектов</h2>
          <p class="section-lead" v-reveal="130">
            Показываем не только визуал, но и задачу, ограничения и практический результат.
          </p>

          <div class="mt-8 grid gap-3 md:grid-cols-2">
            <article
              v-for="(item, index) in visibleCases"
              :key="item.title"
              class="overflow-hidden rounded-3xl border border-white/12 bg-panel/90 shadow-soft"
              v-reveal="160 + index * 60"
            >
              <img :src="item.image" :alt="item.title" class="h-52 w-full object-cover photo-dim" loading="lazy" />

              <div class="p-5">
                <div class="flex flex-wrap gap-2 text-xs text-textMuted/95">
                  <span class="rounded-full bg-base2 px-3 py-1">{{ item.type }}</span>
                  <span class="rounded-full bg-base2 px-3 py-1">{{ item.area }}</span>
                  <span class="rounded-full bg-base2 px-3 py-1">{{ item.period }}</span>
                </div>

                <h3 class="mt-4 font-display text-2xl leading-tight">{{ item.title }}</h3>
                <p class="mt-3 text-sm leading-relaxed text-textMuted"><span class="text-textMain font-semibold">Задача:</span> {{ item.task }}</p>
                <p class="mt-2 text-sm leading-relaxed text-textMuted"><span class="text-textMain font-semibold">Результат:</span> {{ item.result }}</p>

                <a href="#contacts" class="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold transition hover:text-goldBright">
                  Хочу похожий проект →
                </a>
              </div>
            </article>
          </div>

          <button
            type="button"
            class="btn-outline mt-5"
            @click="toggleCases"
          >
            {{ showAllCases ? 'Свернуть кейсы' : `Показать все ${cases.length} кейсов` }}
          </button>

          <a href="#contacts" class="mini-cta" v-reveal="240">Получить расчёт под ваш участок</a>
        </div>
      </section>

      <section id="process" class="container-shell py-10 sm:py-12 md:py-16">
        <p class="pill" v-reveal>Как проходит работа</p>
        <h2 class="section-title mt-5" v-reveal="80">Прозрачный процесс: этапы, сроки и согласования</h2>

        <div class="mt-8 space-y-3">
          <article
            v-for="(step, index) in processSteps"
            :key="step.title"
            class="rounded-2xl border border-white/12 bg-panel/85 p-4"
            v-reveal="150 + index * 55"
          >
            <button
              type="button"
              class="flex w-full items-center gap-3 text-left"
              @click="toggleProcess(index)"
              :aria-expanded="openProcess === index"
            >
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-bold text-base0">{{ index + 1 }}</span>
              <span class="font-display text-lg leading-tight text-textMain">{{ step.title }}</span>
              <svg
                viewBox="0 0 24 24"
                class="ml-auto h-5 w-5 shrink-0 transition duration-300"
                :class="openProcess === index ? 'rotate-180 text-gold' : 'text-textMuted'"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>

            <Transition
              @enter="animateExpandEnter"
              @after-enter="animateExpandAfterEnter"
              @leave="animateExpandLeave"
              @after-leave="animateExpandAfterLeave"
            >
              <div v-show="openProcess === index" class="mt-3">
                <p class="text-sm leading-relaxed text-textMuted">{{ step.text }}</p>
                <div class="mt-3 space-y-2 text-sm text-textMuted">
                  <p>{{ step.deliverable }}</p>
                  <p>{{ step.duration }}</p>
                  <p>{{ step.approvals }}</p>
                </div>
              </div>
            </Transition>
          </article>
        </div>

        <a href="#contacts" class="mini-cta" v-reveal="220">Получить расчёт под ваш участок</a>
      </section>

      <section id="scope" class="py-10 sm:py-12 md:py-16">
        <div class="container-shell">
          <div class="panel-gradient rounded-[2rem] border border-white/10 p-6 shadow-soft sm:p-8 md:p-10">
            <p class="pill" v-reveal>Что входит в проект</p>
            <h2 class="section-title mt-5" v-reveal="80">Таблица состава работ по тарифам</h2>

            <div class="mt-8 overflow-x-auto" v-reveal="140">
              <table class="w-full min-w-[820px] border-collapse overflow-hidden rounded-2xl border border-white/12 text-sm">
                <thead>
                  <tr class="bg-base2/90">
                    <th class="px-4 py-3 text-left font-semibold text-textMain">Состав проекта</th>
                    <th v-for="tariff in tariffs" :key="tariff" class="px-4 py-3 text-center font-semibold text-textMain">{{ tariff }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in packageRows" :key="row.name" class="border-t border-white/10 bg-base1/75">
                    <td class="px-4 py-3 text-textMuted">{{ row.name }}</td>
                    <td v-for="(value, idx) in row.values" :key="`${row.name}-${idx}`" class="px-4 py-3 text-center">
                      <span :class="value ? 'text-teal font-semibold' : 'text-textMuted/40'">{{ value ? '✓' : '—' }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <a href="#contacts" class="mini-cta" v-reveal="220">Получить расчёт под ваш участок</a>
          </div>
        </div>
      </section>

      <section id="pricing" class="container-shell py-10 sm:py-12 md:py-16">
        <p class="pill" v-reveal>Стоимость</p>
        <h2 class="section-title mt-5" v-reveal="80">Понятные ориентиры и прозрачные факторы ценообразования</h2>

        <div class="mt-10 grid gap-4 md:grid-cols-2">
          <article v-for="(item, index) in pricing" :key="item.title" class="card-dark" v-reveal="150 + index * 80">
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-gold">{{ item.title }}</p>
            <p class="mt-3 font-display text-4xl text-goldBright">{{ item.value }}</p>
            <p class="mt-3 text-sm leading-relaxed text-textMuted">{{ item.note }}</p>
          </article>
        </div>

        <div class="mt-6 card-dark" v-reveal="220">
          <p class="text-xs font-semibold uppercase tracking-[0.14em] text-textMuted">Что влияет на стоимость</p>
          <ul class="mt-4 grid gap-3 sm:grid-cols-2">
            <li v-for="factor in pricingFactors" :key="factor" class="flex items-start gap-3 text-sm text-textMuted">
              <span class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold"></span>
              <span>{{ factor }}</span>
            </li>
          </ul>
          <a href="#contacts" class="btn-primary mt-6">Получить расчёт стоимости за 15 минут</a>
        </div>

        <a href="#contacts" class="mini-cta" v-reveal="260">Получить расчёт под ваш участок</a>
      </section>

      <section id="trust" class="py-10 sm:py-12 md:py-16">
        <div class="container-shell">
          <div class="rounded-[2rem] border border-gold/25 bg-base1/95 p-6 shadow-premium sm:p-8 md:p-10">
            <p class="pill" v-reveal>Доверие и профессионализм</p>
            <h2 class="section-title mt-5" v-reveal="80">Сильные цифры, широкая география и подтверждённая экспертиза</h2>

            <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <article v-for="(item, index) in trustStats" :key="item.label" class="card-dark bg-base2/70" v-reveal="130 + index * 60">
                <p class="stat-number">{{ item.value }}</p>
                <p class="mt-2 text-sm text-textMuted">{{ item.label }}</p>
              </article>
            </div>

            <div class="mt-8 grid gap-4 lg:grid-cols-[0.55fr_0.45fr]">
              <article class="card-dark" v-reveal="220">
                <p class="text-xs font-semibold uppercase tracking-[0.14em] text-gold">География проектов</p>
                <div class="mt-4 flex flex-wrap gap-2">
                  <span v-for="region in regions" :key="region" class="rounded-full border border-white/15 bg-base2/70 px-3 py-1.5 text-xs text-textMain/95">
                    {{ region }}
                  </span>
                </div>
              </article>

              <article class="card-dark" v-reveal="260">
                <p class="text-xs font-semibold uppercase tracking-[0.14em] text-gold">Гарантия</p>
                <p class="mt-3 text-sm leading-relaxed text-textMuted">
                  Если в рабочей документации обнаружится ошибка по нашей вине — дорабатываем бесплатно.
                </p>
              </article>
            </div>

            <div class="mt-8 grid gap-4 md:grid-cols-3">
              <article v-for="(doc, index) in documents" :key="doc.title" class="overflow-hidden rounded-3xl border border-white/10 bg-base2/70" v-reveal="300 + index * 70">
                <img :src="doc.image" :alt="doc.title" class="h-32 w-full object-cover photo-dim" loading="lazy" />
                <div class="p-4">
                  <h3 class="font-display text-xl">{{ doc.title }}</h3>
                  <p class="mt-2 text-sm leading-relaxed text-textMuted">{{ doc.desc }}</p>
                </div>
              </article>
            </div>

            <a href="#contacts" class="mini-cta" v-reveal="340">Получить расчёт под ваш участок</a>
          </div>
        </div>
      </section>

      <section id="director" class="container-shell py-10 sm:py-12 md:py-16">
        <p class="pill" v-reveal>Личный бренд директора</p>
        <h2 class="section-title mt-5" v-reveal="80">Сергей Светлаков - лицо компании и персональный контроль качества</h2>

        <div class="mt-10 grid gap-6 lg:grid-cols-[0.44fr_0.56fr]">
          <article class="overflow-hidden rounded-[2rem] border border-white/12 bg-base1/85 shadow-soft" v-reveal="150">
            <img
                src="/images/director-main.jpg"
                alt="Сергей Светлаков в рабочей среде"
                class="h-[300px] w-full object-cover photo-dim sm:h-[420px]"
                loading="lazy"
              />
          </article>

          <div class="space-y-4" v-reveal="210">
            <article class="card-dark">
              <p class="text-sm leading-relaxed text-textMuted">
                «Хороший проект — это не просто красивая картинка. Это решение, которое можно построить без хаоса,
                лишних затрат и постоянных переделок. Поэтому в “Строй Проект” мы опираемся на реализуемость,
                продуманную планировку и качество рабочей документации».
              </p>
            </article>

            <article class="card-dark">
              <p class="text-xs font-semibold uppercase tracking-[0.14em] text-gold">Видео-обращение директора</p>
              <div class="relative mt-3 overflow-hidden rounded-2xl border border-white/15">
                <img
                  src="/images/director-video.jpg"
                  alt="Видеообращение Сергея Светлакова"
                  class="h-44 w-full object-cover photo-dim"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-[#0a1428dd] to-transparent"></div>
                <a href="#contacts" class="absolute bottom-3 left-3 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-base0">Смотреть 30-60 сек</a>
              </div>
            </article>
          </div>
        </div>

        <a href="#contacts" class="mini-cta" v-reveal="260">Получить расчёт под ваш участок</a>
      </section>

      <section id="faq" class="py-10 sm:py-12 md:py-16">
        <div class="container-shell">
          <div class="panel-gradient rounded-[2rem] border border-white/10 p-6 shadow-soft sm:p-8 md:p-10">
            <p class="pill" v-reveal>FAQ и возражения</p>
            <h2 class="section-title mt-5" v-reveal="80">Закрываем ключевые вопросы до заявки</h2>

            <div class="mt-8 space-y-3">
              <article
                v-for="(item, index) in faqItems"
                :key="item.q"
                class="rounded-2xl border border-white/12 bg-base1/80 p-4"
                v-reveal="130 + index * 50"
              >
                <button
                  type="button"
                  class="flex w-full items-center gap-3 text-left"
                  @click="toggleFaq(index)"
                  :aria-expanded="openFaq === index"
                >
                  <span class="text-sm font-semibold text-textMain">{{ item.q }}</span>
                  <svg
                    viewBox="0 0 24 24"
                    class="ml-auto h-5 w-5 shrink-0 transition duration-300"
                    :class="openFaq === index ? 'rotate-180 text-gold' : 'text-textMuted'"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                  >
                    <path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>

                <Transition
                  @enter="animateExpandEnter"
                  @after-enter="animateExpandAfterEnter"
                  @leave="animateExpandLeave"
                  @after-leave="animateExpandAfterLeave"
                >
                  <div v-show="openFaq === index" class="mt-3 text-sm leading-relaxed text-textMuted">
                    {{ item.a }}
                  </div>
                </Transition>
              </article>
            </div>

            <a href="#contacts" class="mini-cta" v-reveal="230">Получить расчёт под ваш участок</a>
          </div>
        </div>
      </section>

      <section id="reviews" class="container-shell py-10 sm:py-12 md:py-16">
        <p class="pill" v-reveal>Отзывы</p>
        <h2 class="section-title mt-5" v-reveal="80">Правдоподобные отзывы с конкретикой по задаче и результату</h2>

        <div class="mt-10 grid gap-4 lg:grid-cols-3">
          <article v-for="(item, index) in reviews" :key="item.name" class="card-dark h-full" v-reveal="140 + index * 70">
            <img :src="item.image" :alt="item.name" class="h-40 w-full rounded-2xl object-cover photo-dim" loading="lazy" />
            <p class="mt-4 text-sm font-semibold">{{ item.name }}</p>
            <p class="text-xs uppercase tracking-[0.13em] text-textMuted">{{ item.type }}</p>
            <p class="mt-3 text-sm leading-relaxed text-textMuted">{{ item.text }}</p>
          </article>
        </div>

        <a href="#contacts" class="mini-cta" v-reveal="230">Получить расчёт под ваш участок</a>
      </section>

      <section id="lead" class="py-10 sm:py-12 md:py-16">
        <div class="container-shell">
          <div class="rounded-[2rem] border border-teal/35 bg-teal/12 p-6 shadow-soft sm:p-8 md:p-10">
            <p class="pill border-teal/40 bg-teal/15 text-teal" v-reveal>Лид-магнит</p>
            <h2 class="section-title mt-5" v-reveal="80">Сильные предложения для мягкого входа в проект</h2>

            <div class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" v-reveal="140">
              <article v-for="item in leadOffers" :key="item" class="rounded-2xl border border-white/12 bg-base1/70 p-4 text-sm text-textMuted">
                {{ item }}
              </article>
            </div>

            <div class="mt-8 flex flex-col gap-3 sm:flex-row" v-reveal="210">
              <a href="#contacts" class="btn-primary">Получить разбор участка</a>
              <a href="#contacts" class="btn-outline">Получить чек-лист</a>
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" class="container-shell py-10 sm:py-12 md:py-16">
        <p class="pill" v-reveal>Контакты и заявка</p>
        <h2 class="section-title mt-5" v-reveal="80">Оставьте заявку — свяжемся с вами в течение 10-15 минут</h2>

        <div class="mt-10 grid gap-6 xl:grid-cols-[0.44fr_0.56fr]">
          <article class="card-dark space-y-4" v-reveal="140">
            <p class="text-sm leading-relaxed text-textMuted">
              Офис в Сочи (возможна удалённая работа по всей России). Работаем дистанционно по всей России и СНГ.
            </p>

            <div class="space-y-2 text-sm text-textMuted">
              <p><span class="font-semibold text-textMain">Телефон:</span> +7 (900) 000-00-00</p>
              <p><span class="font-semibold text-textMain">Email:</span> hello@stroyproject.ru</p>
              <p><span class="font-semibold text-textMain">Адрес офиса:</span> г. Сочи, ул. Несебрская, 6</p>
              <p><span class="font-semibold text-textMain">Ответ:</span> в рабочее время до 15 минут</p>
            </div>

            <div class="grid gap-3 sm:grid-cols-2">
              <a
                v-for="item in messengers"
                :key="item.label"
                :href="item.href"
                target="_blank"
                rel="noopener noreferrer"
                class="rounded-2xl border border-white/14 bg-base2/80 p-4 transition hover:border-teal/50"
              >
                <p class="text-sm font-semibold text-textMain">{{ item.label }}</p>
                <p class="mt-1 text-xs text-textMuted">Связаться в мессенджере</p>
              </a>
            </div>

            <div class="overflow-hidden rounded-2xl border border-white/12">
              <iframe
                title="Офис на карте"
                class="h-52 w-full"
                src="https://www.openstreetmap.org/export/embed.html?bbox=39.7070%2C43.5750%2C39.7345%2C43.5945&layer=mapnik&marker=43.5845%2C39.7208"
              ></iframe>
            </div>
          </article>

          <div class="card-dark" v-reveal="210">
            <form v-if="!formSubmitted" class="grid gap-4" @submit.prevent="submitLead">
              <label class="text-sm font-medium text-textMuted">
                Имя
                <input type="text" class="input-field mt-2" placeholder="Как к вам обращаться" required />
              </label>

              <label class="text-sm font-medium text-textMuted">
                Телефон
                <input type="tel" class="input-field mt-2" placeholder="+7 (___) ___-__-__" required />
              </label>

              <label class="text-sm font-medium text-textMuted">
                Тип объекта
                <select class="input-field mt-2" required>
                  <option value="" disabled selected>Выберите тип объекта</option>
                  <option v-for="item in projectTypes" :key="item" :value="item">{{ item }}</option>
                </select>
              </label>

              <label class="text-sm font-medium text-textMuted">
                Что хотите получить в первую очередь
                <select class="input-field mt-2" required>
                  <option value="" disabled selected>Выберите предложение</option>
                  <option v-for="item in leadOffers" :key="item" :value="item">{{ item }}</option>
                </select>
              </label>

              <label class="text-sm font-medium text-textMuted">
                Комментарий
                <textarea class="input-field mt-2 min-h-[120px] resize-y" placeholder="Кратко опишите задачу, площадь и ограничения участка"></textarea>
              </label>

              <button type="submit" class="btn-primary mt-2 w-full">Узнать стоимость проекта</button>
            </form>

            <div v-else class="rounded-2xl border border-teal/35 bg-teal/10 p-5">
              <h3 class="font-display text-2xl text-teal">Заявка принята</h3>
              <p class="mt-3 text-sm leading-relaxed text-textMuted">
                Сергей увидит её в течение 10-15 минут. Пока готовим разбор — вот 3 самых частых ошибки на сложных участках:
              </p>
              <ul class="mt-4 space-y-2 text-sm text-textMuted">
                <li v-for="item in commonErrors" :key="item" class="flex items-start gap-3">
                  <span class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold"></span>
                  <span>{{ item }}</span>
                </li>
              </ul>
              <button type="button" class="btn-outline mt-5" @click="resetForm">Отправить ещё одну заявку</button>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="container-shell pt-8">
      <div class="flex flex-col gap-2 border-t border-white/12 py-6 text-sm text-textMuted sm:flex-row sm:items-center sm:justify-between">
        <p>© {{ currentYear }} Строй Проект</p>
        <p>Архитектурное проектирование частных и коммерческих объектов</p>
      </div>
    </footer>

    <div class="fixed bottom-20 right-3 z-[60] flex flex-col gap-2 sm:bottom-16 sm:right-4">
      <a
        v-for="item in messengers"
        :key="`float-${item.label}`"
        :href="item.href"
        target="_blank"
        rel="noopener noreferrer"
        class="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-base1/95 text-xs font-bold text-teal shadow-soft transition hover:scale-105 sm:h-12 sm:w-12 sm:text-sm"
      >
        {{ item.short }}
      </a>
    </div>

    <div class="fixed inset-x-0 bottom-0 z-50 border-t border-gold/30 bg-base1/95 backdrop-blur-md">
      <div class="container-shell no-scrollbar overflow-x-auto whitespace-nowrap py-2 text-center text-[11px] font-medium text-textMain sm:text-sm">
        15+ лет • 70+ объектов • Личный контроль директора • Работа по всей России
      </div>
    </div>
  </div>
</template>
