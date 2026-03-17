<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const sectionRef = ref(null)
const isVisible = ref(false)
const activeFilter = ref('all')
let observer

const filters = [
  { id: 'all', label: 'Все проекты' },
  { id: 'private', label: 'Частные дома' },
  { id: 'commercial', label: 'Коммерческие объекты' },
  { id: 'slope', label: 'Сложный рельеф' },
  { id: 'reconstruction', label: 'Реконструкция' },
  { id: 'premium', label: 'Премиум-сегмент' },
]

const cases = [
  {
    id: 'case-01',
    title: 'Частный дом 280 м² — сложный рельеф с перепадом высот 8 м',
    objectType: 'Частный дом',
    area: '280 м²',
    duration: '14 недель',
    task: 'Нужно было посадить дом на участок с перепадом высот, сохранить видовые точки и не усложнить стройку.',
    result: 'Сформирована каскадная структура планировок, сохранена приватность и сокращены риски переработок на площадке.',
    preview: 'Сложный рельеф',
    image: '/images/case-01.jpg',
    categories: ['private', 'slope', 'premium'],
  },
  {
    id: 'case-02',
    title: 'Бутик-отель 1 450 м² с акцентом на сценарии гостевого потока',
    objectType: 'Гостиничный объект',
    area: '1 450 м²',
    duration: '18 недель',
    task: 'Требовалось совместить выразительную архитектуру с логикой обслуживания, инженерией и эксплуатационной эффективностью.',
    result: 'Оптимизированы маршруты гостей и персонала, повышена эффективность площади и упрощено согласование инженерных решений.',
    preview: 'Гостиничный кейс',
    image: '/images/case-02.jpg',
    categories: ['commercial', 'premium'],
  },
  {
    id: 'case-03',
    title: 'Дом в средней полосе с повышенной снеговой нагрузкой',
    objectType: 'Частный дом',
    area: '360 м²',
    duration: '12 недель',
    task: 'Нужно было сохранить архитектурную чистоту формы и обеспечить надежную работу конструкций под региональные нагрузки.',
    result: 'Согласованы конструктив и архитектура без потери образа, оптимизированы узлы и кровельная логика для реальной реализации.',
    preview: 'Климатические нагрузки',
    image: '/images/case-03.jpg',
    categories: ['private', 'premium'],
  },
  {
    id: 'case-04',
    title: 'Ресторан в городской среде с плотным функциональным сценарием',
    objectType: 'Коммерческий объект',
    area: '620 м²',
    duration: '10 недель',
    task: 'Требовалось увязать посадку, кухонные процессы, технические зоны и маршруты посетителей без потери атмосферы пространства.',
    result: 'Сбалансирована бизнес-логика и интерьерная архитектура, снижены эксплуатационные конфликты и потери площади.',
    preview: 'Ресторанный формат',
    image: '/images/case-04.jpg',
    categories: ['commercial'],
  },
  {
    id: 'case-05',
    title: 'Реконструкция исторического здания под современный формат',
    objectType: 'Реконструкция',
    area: '980 м²',
    duration: '16 недель',
    task: 'Нужно было адаптировать существующий объект под новые задачи, сохранив архитектурный характер и техничность решений.',
    result: 'Объект получил новую функциональную модель с сохранением ключевой идентичности и управляемой стоимостью реализации.',
    preview: 'Адаптация объекта',
    image: '/images/case-05.jpg',
    categories: ['reconstruction', 'commercial'],
  },
  {
    id: 'case-06',
    title: 'Частная резиденция с акцентом на приватность и видовые сценарии',
    objectType: 'Резиденция',
    area: '540 м²',
    duration: '15 недель',
    task: 'Требовалось совместить статусную архитектуру, сложную посадку на участке и приватные сценарии для семьи.',
    result: 'Разработана композиция объемов с четким разделением функций, удобной логистикой и готовностью к этапной реализации.',
    preview: 'Премиум-сегмент',
    image: '/images/case-06.jpg',
    categories: ['private', 'premium'],
  },
  {
    id: 'case-07',
    title: 'Апарт-комплекс с упором на экономику площади и эксплуатацию',
    objectType: 'Инвестиционный объект',
    area: '2 100 м²',
    duration: '20 недель',
    task: 'Задача — получить архитектурно выразительный объект с предсказуемой моделью эксплуатации и загрузки.',
    result: 'Оптимизированы планировочные модули и инженерные сценарии, снижены операционные риски и стоимость переделок.',
    preview: 'Инвестиционный кейс',
    image: '/images/case-07.jpg',
    categories: ['commercial', 'premium'],
  },
  {
    id: 'case-08',
    title: 'Дом на участке с высоким УГВ и сложной геологией',
    objectType: 'Частный дом',
    area: '310 м²',
    duration: '13 недель',
    task: 'Нужно было учесть ограничения по грунтам и воде, сохранив архитектурную идею и комфортную планировочную структуру.',
    result: 'Согласованы решения по фундаменту, инженерии и объемно-пространственной схеме без потери визуального качества проекта.',
    preview: 'Сложные условия',
    image: '/images/case-08.jpg',
    categories: ['private', 'slope'],
  },
]

const activeCaseId = ref(cases[0].id)

const filteredCases = computed(() => {
  if (activeFilter.value === 'all') {
    return cases
  }

  return cases.filter((item) => item.categories.includes(activeFilter.value))
})

const activeCase = computed(() => {
  const found = filteredCases.value.find((item) => item.id === activeCaseId.value)
  return found ?? filteredCases.value[0] ?? cases[0]
})

const secondaryCases = computed(() => filteredCases.value.filter((item) => item.id !== activeCase.value.id))

const caseIndex = computed(() => filteredCases.value.findIndex((item) => item.id === activeCase.value.id) + 1)
const caseCount = computed(() => filteredCases.value.length)
const caseProgress = computed(() => {
  if (!caseCount.value) return 0
  return (caseIndex.value / caseCount.value) * 100
})

watch(filteredCases, (list) => {
  if (!list.length) return
  if (!list.some((item) => item.id === activeCaseId.value)) {
    activeCaseId.value = list[0].id
  }
})

const selectFilter = (filterId) => {
  activeFilter.value = filterId
}

const selectCase = (caseId) => {
  activeCaseId.value = caseId
}

const resetFilters = () => {
  activeFilter.value = 'all'
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries
      if (!entry) return
      if (entry.isIntersecting) {
        isVisible.value = true
        observer?.disconnect()
      }
    },
    { threshold: 0.14 },
  )

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <section
    id="portfolio"
    ref="sectionRef"
    class="portfolio-section"
    :class="{ 'is-visible': isVisible }"
    aria-labelledby="portfolio-title"
  >
    <div class="portfolio-section__decor" aria-hidden="true"></div>

    <div class="portfolio">
      <div class="portfolio__intro">
        <span class="portfolio__eyebrow portfolio-reveal portfolio-reveal--eyebrow">Портфолио и кейсы</span>
        <h2 id="portfolio-title" class="portfolio__title portfolio-reveal portfolio-reveal--title">
          Показываем не только визуал, но и <span>ограничения, задачу и результат</span>
        </h2>
        <p class="portfolio__lead portfolio-reveal portfolio-reveal--lead">
          В кейсах фиксируем не только образ объекта, но и контекст: что нужно было решить, какие ограничения были на входе и
          какой результат получился в реализации.
        </p>
      </div>

      <div class="portfolio__filters portfolio-reveal portfolio-reveal--filters" role="tablist" aria-label="Фильтрация кейсов">
        <button
          v-for="filter in filters"
          :key="filter.id"
          type="button"
          class="portfolio-filter"
          :class="{ active: activeFilter === filter.id }"
          :aria-selected="activeFilter === filter.id"
          @click="selectFilter(filter.id)"
        >
          {{ filter.label }}
        </button>
      </div>

      <div class="portfolio-showcase">
        <article class="portfolio-featured portfolio-reveal portfolio-reveal--featured">
          <transition name="case-fade" mode="out-in">
            <img
              :key="`${activeCase.id}-image`"
              :src="activeCase.image"
              :alt="activeCase.title"
              class="portfolio-featured__image"
            />
          </transition>

          <div class="portfolio-featured__overlay"></div>

          <div class="portfolio-featured__meta">
            <span class="portfolio-featured__pill">{{ activeCase.objectType }}</span>
            <span class="portfolio-featured__pill">{{ activeCase.area }}</span>
            <span class="portfolio-featured__pill">{{ activeCase.duration }}</span>
          </div>

          <div class="portfolio-counter-rail" aria-live="polite">
            <p class="portfolio-counter-rail__value">{{ caseIndex }} / {{ caseCount }}</p>
            <div class="portfolio-counter-rail__track" aria-hidden="true">
              <span class="portfolio-counter-rail__progress" :style="{ width: `${caseProgress}%` }"></span>
            </div>
          </div>

          <div class="portfolio-featured__info">
            <h3 class="portfolio-featured__title">{{ activeCase.title }}</h3>

            <div class="portfolio-featured__detail">
              <span class="portfolio-featured__detail-label">Задача</span>
              <p>{{ activeCase.task }}</p>
            </div>

            <div class="portfolio-featured__detail">
              <span class="portfolio-featured__detail-label portfolio-featured__detail-label--result">Результат</span>
              <p>{{ activeCase.result }}</p>
            </div>

            <a href="#contacts" class="portfolio-featured__cta">
              <span>Хочу похожий проект</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
                <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </a>
          </div>
        </article>

        <div class="portfolio-secondary portfolio-reveal portfolio-reveal--secondary">
          <article
            v-for="item in secondaryCases"
            :key="item.id"
            class="portfolio-secondary-card"
            @click="selectCase(item.id)"
          >
            <div class="portfolio-secondary-card__thumb-wrap">
              <img :src="item.image" :alt="item.title" class="portfolio-secondary-card__thumb" />
            </div>

            <div class="portfolio-secondary-card__content">
              <p class="portfolio-secondary-card__meta">{{ item.objectType }} • {{ item.area }}</p>
              <h3 class="portfolio-secondary-card__title">{{ item.title }}</h3>
              <p class="portfolio-secondary-card__preview">{{ item.preview }}</p>
            </div>

            <span class="portfolio-secondary-card__arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
                <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </article>
        </div>
      </div>

      <div class="portfolio__footer portfolio-reveal portfolio-reveal--footer">
        <button type="button" class="portfolio__all" @click="resetFilters">
          <span>Показать все {{ cases.length }} кейсов</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
            <path d="M4 12h16M12 4v16" stroke-linecap="round" />
          </svg>
        </button>

        <div class="portfolio__summary">
          <p class="portfolio__summary-text">
            Каждый проект показываем через задачу, ограничения и итог реализации, чтобы вы видели не только визуальный образ, но
            и логику принятия решений.
          </p>
          <a href="#process" class="portfolio__process-cta">
            <span>Как строится работа по этапам</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
              <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.portfolio-section {
  position: relative;
  isolation: isolate;
  overflow: clip;
  padding: 120px 32px;
  background:
    radial-gradient(circle at 52% 22%, rgba(201, 169, 110, 0.05), transparent 30%),
    radial-gradient(circle at 82% 88%, rgba(0, 196, 180, 0.035), transparent 34%),
    linear-gradient(180deg, #0a1428 0%, #071525 50%, #0a1428 100%);
}

.portfolio-section__decor {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.28;
  background-image:
    linear-gradient(to right, rgba(167, 176, 193, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(167, 176, 193, 0.05) 1px, transparent 1px);
  background-size: 56px 56px, 56px 56px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.84) 24%, rgba(0, 0, 0, 0.2));
}

.portfolio {
  width: min(100%, 1360px);
  margin: 0 auto;
}

.portfolio__intro {
  max-width: 860px;
}

.portfolio__eyebrow {
  display: inline-flex;
  align-items: center;
  margin: 0;
  border-radius: 999px;
  border: 1px solid rgba(201, 169, 110, 0.18);
  background: rgba(201, 169, 110, 0.08);
  padding: 7px 12px;
  font-size: 12px;
  line-height: 1.2;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  color: #c9a96e;
}

.portfolio__title {
  margin: 20px 0 0;
  max-width: 980px;
  font-family: 'Montserrat', 'Manrope', sans-serif;
  font-size: clamp(2.65rem, 5vw, 4rem);
  line-height: 1.03;
  letter-spacing: -0.02em;
  font-weight: 760;
  color: #e0e0e0;
  text-wrap: balance;
}

.portfolio__title span {
  color: #c9a96e;
}

.portfolio__lead {
  margin: 26px 0 0;
  max-width: 820px;
  font-size: clamp(18px, 1.45vw, 20px);
  line-height: 1.65;
  color: #a7b0c1;
}

.portfolio__filters {
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.portfolio-filter {
  min-height: 42px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  padding: 0 16px;
  font-size: 14px;
  font-weight: 500;
  color: #a7b0c1;
  transition:
    border-color 240ms ease,
    background-color 240ms ease,
    color 240ms ease,
    box-shadow 240ms ease;
}

.portfolio-filter:hover {
  border-color: rgba(201, 169, 110, 0.22);
  background: rgba(201, 169, 110, 0.1);
  color: #e0e0e0;
}

.portfolio-filter.active {
  border-color: rgba(0, 196, 180, 0.28);
  background: rgba(0, 196, 180, 0.12);
  color: #e0e0e0;
  box-shadow: 0 0 16px rgba(0, 196, 180, 0.14);
}

.portfolio-showcase {
  margin-top: 30px;
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(340px, 0.85fr);
  gap: 20px;
}

.portfolio-featured {
  position: relative;
  overflow: hidden;
  border-radius: 32px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  min-height: clamp(640px, 74vh, 760px);
  box-shadow: 0 22px 60px rgba(0, 0, 0, 0.32);
}

.portfolio-featured__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.78) saturate(0.9) contrast(1.04);
}

.portfolio-featured__overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(6, 16, 29, 0.2) 0%, rgba(7, 19, 34, 0.35) 48%, rgba(7, 19, 34, 0.9) 100%),
    radial-gradient(circle at 72% 18%, rgba(201, 169, 110, 0.12), transparent 44%);
}

.portfolio-featured__meta {
  position: absolute;
  top: 22px;
  left: 22px;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.portfolio-featured__pill {
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(8, 19, 33, 0.48);
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 600;
  color: #e0e0e0;
}

.portfolio-counter-rail {
  position: absolute;
  top: 22px;
  right: 22px;
  z-index: 2;
  width: 120px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(8, 19, 33, 0.5);
  padding: 8px 10px;
}

.portfolio-counter-rail__value {
  margin: 0;
  font-size: 12px;
  font-weight: 600;
  color: rgba(224, 224, 224, 0.94);
}

.portfolio-counter-rail__track {
  margin-top: 7px;
  width: 100%;
  height: 4px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  overflow: hidden;
}

.portfolio-counter-rail__progress {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #c9a96e 0%, #00c4b4 100%);
}

.portfolio-featured__info {
  position: absolute;
  right: 22px;
  bottom: 22px;
  left: 22px;
  z-index: 2;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(20, 30, 50, 0.45);
  backdrop-filter: blur(14px);
  padding: 24px 26px;
}

.portfolio-featured__title {
  margin: 0;
  max-width: 760px;
  font-size: clamp(1.75rem, 2.6vw, 2.15rem);
  line-height: 1.14;
  font-weight: 720;
  color: #e0e0e0;
  text-wrap: balance;
}

.portfolio-featured__detail {
  margin-top: 14px;
}

.portfolio-featured__detail-label {
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: rgba(201, 169, 110, 0.9);
}

.portfolio-featured__detail-label--result {
  color: rgba(0, 196, 180, 0.95);
}

.portfolio-featured__detail p {
  margin: 8px 0 0;
  font-size: 15px;
  line-height: 1.62;
  color: #a7b0c1;
}

.portfolio-featured__cta {
  margin-top: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 44px;
  border-radius: 999px;
  border: 1px solid rgba(255, 107, 53, 0.48);
  background: #ff6b35;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 650;
  color: #111c33;
  transition:
    transform 240ms ease,
    box-shadow 240ms ease,
    background-color 240ms ease;
}

.portfolio-featured__cta svg {
  width: 16px;
  height: 16px;
  transition: transform 240ms ease;
}

.portfolio-featured__cta:hover {
  transform: translateY(-1px);
  background: #ff5a1d;
  box-shadow: 0 8px 24px rgba(255, 107, 53, 0.34);
}

.portfolio-featured__cta:hover svg {
  transform: translateX(3px);
}

.portfolio-secondary {
  display: grid;
  gap: 12px;
}

.portfolio-secondary-card {
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(22, 35, 61, 0.76);
  padding: 12px;
  display: grid;
  grid-template-columns: 132px minmax(0, 1fr) 22px;
  gap: 12px;
  align-items: center;
  min-height: 188px;
  cursor: pointer;
  transition:
    border-color 260ms ease,
    transform 260ms ease,
    background-color 260ms ease;
}

.portfolio-secondary-card:hover {
  border-color: rgba(201, 169, 110, 0.24);
  transform: translateY(-3px);
  background: rgba(22, 35, 61, 0.86);
}

.portfolio-secondary-card__thumb-wrap {
  height: 100%;
  min-height: 160px;
  border-radius: 16px;
  overflow: hidden;
}

.portfolio-secondary-card__thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 280ms ease;
}

.portfolio-secondary-card:hover .portfolio-secondary-card__thumb {
  transform: scale(1.03);
}

.portfolio-secondary-card__meta {
  margin: 0;
  font-size: 12px;
  line-height: 1.3;
  color: rgba(201, 169, 110, 0.9);
}

.portfolio-secondary-card__title {
  margin: 10px 0 0;
  font-size: 20px;
  line-height: 1.24;
  font-weight: 650;
  color: #e0e0e0;
  text-wrap: balance;
}

.portfolio-secondary-card__preview {
  margin: 10px 0 0;
  font-size: 14px;
  line-height: 1.5;
  color: #a7b0c1;
}

.portfolio-secondary-card__arrow {
  color: #c9a96e;
}

.portfolio-secondary-card__arrow svg {
  width: 16px;
  height: 16px;
  transition: transform 240ms ease;
}

.portfolio-secondary-card:hover .portfolio-secondary-card__arrow svg {
  transform: translateX(4px);
}

.portfolio-secondary-card:nth-child(n + 4) {
  display: none;
}

.portfolio__footer {
  margin-top: 24px;
  display: grid;
  gap: 16px;
}

.portfolio__all {
  align-self: start;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 44px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(22, 35, 61, 0.74);
  padding: 0 16px;
  font-size: 14px;
  font-weight: 600;
  color: #e0e0e0;
  transition:
    border-color 240ms ease,
    background-color 240ms ease,
    color 240ms ease;
}

.portfolio__all:hover {
  border-color: rgba(255, 255, 255, 0.24);
  background: rgba(22, 35, 61, 0.9);
}

.portfolio__all svg {
  width: 16px;
  height: 16px;
}

.portfolio__summary {
  border-radius: 26px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(17, 28, 51, 0.72), rgba(22, 35, 61, 0.88));
  padding: 24px 26px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 18px;
  align-items: center;
}

.portfolio__summary-text {
  margin: 0;
  max-width: 760px;
  font-size: 16px;
  line-height: 1.62;
  color: #a7b0c1;
}

.portfolio__process-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 44px;
  border-radius: 999px;
  border: 1px solid rgba(0, 196, 180, 0.24);
  background: rgba(0, 196, 180, 0.12);
  padding: 0 16px;
  font-size: 14px;
  font-weight: 600;
  color: #e0e0e0;
  transition:
    border-color 240ms ease,
    background-color 240ms ease,
    box-shadow 240ms ease;
}

.portfolio__process-cta svg {
  width: 16px;
  height: 16px;
  transition: transform 240ms ease;
}

.portfolio__process-cta:hover {
  border-color: rgba(0, 196, 180, 0.4);
  background: rgba(0, 196, 180, 0.2);
  box-shadow: 0 0 18px rgba(0, 196, 180, 0.14);
}

.portfolio__process-cta:hover svg {
  transform: translateX(4px);
}

.case-fade-enter-active,
.case-fade-leave-active {
  transition: opacity 380ms ease;
}

.case-fade-enter-from,
.case-fade-leave-to {
  opacity: 0;
}

.portfolio-reveal {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 760ms ease-out,
    transform 760ms ease-out;
}

.portfolio-reveal--eyebrow {
  transition-delay: 0ms;
}

.portfolio-reveal--title {
  transition-delay: 90ms;
}

.portfolio-reveal--lead {
  transition-delay: 170ms;
}

.portfolio-reveal--filters {
  transition-delay: 240ms;
}

.portfolio-reveal--featured {
  transition-delay: 320ms;
}

.portfolio-reveal--secondary {
  transition-delay: 420ms;
}

.portfolio-reveal--footer {
  transition-delay: 620ms;
}

.portfolio-section.is-visible .portfolio-reveal {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 1279px) {
  .portfolio-showcase {
    grid-template-columns: 1fr;
  }

  .portfolio-secondary {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .portfolio-secondary-card {
    min-height: 168px;
    grid-template-columns: 114px minmax(0, 1fr) 18px;
  }

  .portfolio-secondary-card:nth-child(n + 4) {
    display: grid;
  }
}

@media (max-width: 1023px) {
  .portfolio-section {
    padding: 72px 20px;
  }

  .portfolio__title {
    font-size: clamp(2rem, 8.8vw, 2.5rem);
    line-height: 1.08;
  }

  .portfolio__lead {
    margin-top: 20px;
    font-size: 16px;
    line-height: 1.6;
    max-width: 100%;
  }

  .portfolio__filters {
    margin-top: 24px;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 6px;
  }

  .portfolio-filter {
    flex: 0 0 auto;
    min-height: 40px;
    font-size: 13px;
  }

  .portfolio-featured {
    min-height: 500px;
    border-radius: 24px;
  }

  .portfolio-featured__meta {
    top: 12px;
    left: 12px;
    right: 12px;
  }

  .portfolio-featured__pill {
    padding: 6px 10px;
    font-size: 11px;
  }

  .portfolio-counter-rail {
    top: auto;
    right: 12px;
    bottom: 176px;
    width: 108px;
    padding: 7px 9px;
  }

  .portfolio-featured__info {
    right: 12px;
    bottom: 12px;
    left: 12px;
    border-radius: 18px;
    padding: 16px;
  }

  .portfolio-featured__title {
    font-size: clamp(1.4rem, 5.6vw, 1.65rem);
  }

  .portfolio-featured__detail {
    margin-top: 10px;
  }

  .portfolio-featured__detail p {
    font-size: 14px;
    line-height: 1.55;
  }

  .portfolio-featured__cta {
    margin-top: 12px;
    width: 100%;
  }

  .portfolio-secondary {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .portfolio-secondary-card {
    min-height: 136px;
    border-radius: 18px;
    grid-template-columns: 98px minmax(0, 1fr) 16px;
  }

  .portfolio-secondary-card__thumb-wrap {
    min-height: 108px;
    border-radius: 12px;
  }

  .portfolio-secondary-card__title {
    font-size: 17px;
  }

  .portfolio-secondary-card__preview {
    font-size: 13px;
  }

  .portfolio__footer {
    margin-top: 18px;
  }

  .portfolio__all {
    width: 100%;
  }

  .portfolio__summary {
    border-radius: 20px;
    padding: 18px;
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .portfolio__summary-text {
    font-size: 15px;
    line-height: 1.58;
  }

  .portfolio__process-cta {
    width: 100%;
    min-height: 50px;
  }

  .portfolio-reveal {
    transition:
      opacity 560ms ease-out,
      transform 560ms ease-out;
  }
}

@media (prefers-reduced-motion: reduce) {
  .portfolio-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .portfolio-filter,
  .portfolio-secondary-card,
  .portfolio-secondary-card__thumb,
  .portfolio-featured__cta,
  .portfolio-featured__cta svg,
  .portfolio__all,
  .portfolio__process-cta,
  .portfolio__process-cta svg,
  .case-fade-enter-active,
  .case-fade-leave-active {
    transition: none;
  }
}
</style>
