<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const sectionRef = ref(null)
const isVisible = ref(false)
const activeFilter = ref('all')
let observer

const filters = [
  { id: 'all', label: 'Все проекты' },
  { id: 'private', label: 'Частные' },
  { id: 'commercial', label: 'Коммерческие' },
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
    image: {
      lg: '/images/case-01.webp',
      md: '/images/case-01-md.webp',
      thumb: '/images/case-01-thumb.webp',
    },
    categories: ['private', 'premium'],
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
    image: {
      lg: '/images/case-02.webp',
      md: '/images/case-02-md.webp',
      thumb: '/images/case-02-thumb.webp',
    },
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
    image: {
      lg: '/images/case-03.webp',
      md: '/images/case-03-md.webp',
      thumb: '/images/case-03-thumb.webp',
    },
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
    image: {
      lg: '/images/case-04.webp',
      md: '/images/case-04-md.webp',
      thumb: '/images/case-04-thumb.webp',
    },
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
    image: {
      lg: '/images/case-05.webp',
      md: '/images/case-05-md.webp',
      thumb: '/images/case-05-thumb.webp',
    },
    categories: ['commercial'],
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
    image: {
      lg: '/images/case-06.webp',
      md: '/images/case-06-md.webp',
      thumb: '/images/case-06-thumb.webp',
    },
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
    image: {
      lg: '/images/case-07.webp',
      md: '/images/case-07-md.webp',
      thumb: '/images/case-07-thumb.webp',
    },
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
    image: {
      lg: '/images/case-08.webp',
      md: '/images/case-08-md.webp',
      thumb: '/images/case-08-thumb.webp',
    },
    categories: ['private'],
  },
]

const activeCaseId = ref(cases[0].id)

const filteredCases = computed(() => {
  if (activeFilter.value === 'all') return cases
  return cases.filter((item) => item.categories.includes(activeFilter.value))
})

const activeCase = computed(() => {
  const found = filteredCases.value.find((item) => item.id === activeCaseId.value)
  return found ?? filteredCases.value[0] ?? cases[0]
})

const secondaryCases = computed(() => {
  return filteredCases.value.filter((item) => item.id !== activeCase.value.id)
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
          Реализованные <span>проекты</span>
        </h2>
        <p class="portfolio__lead portfolio-reveal portfolio-reveal--lead">
          Подборка объектов с разным масштабом, типом и задачами.
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
          <div class="portfolio-featured__media">
            <transition name="case-fade" mode="out-in">
              <img
                :key="`${activeCase.id}-image`"
                :src="activeCase.image.md"
                :srcset="`${activeCase.image.thumb} 640w, ${activeCase.image.md} 1400w, ${activeCase.image.lg} 2000w`"
                sizes="(max-width: 1023px) 100vw, (max-width: 1439px) 62vw, 780px"
                :alt="activeCase.title"
                class="portfolio-featured__image"
                width="2000"
                height="1611"
                loading="lazy"
                decoding="async"
                fetchpriority="low"
              />
            </transition>

            <div class="portfolio-featured__overlay"></div>

            <div class="portfolio-featured__meta">
              <span class="portfolio-featured__pill">{{ activeCase.objectType }}</span>
              <span class="portfolio-featured__pill">{{ activeCase.area }}</span>
              <span class="portfolio-featured__pill">{{ activeCase.duration }}</span>
            </div>
          </div>

          <div class="portfolio-featured__content">
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
          <div class="portfolio-secondary__scroll">
            <article
              v-for="item in secondaryCases"
              :key="item.id"
              class="portfolio-secondary-card"
              :class="{ active: item.id === activeCase.id }"
              @click="selectCase(item.id)"
            >
              <div class="portfolio-secondary-card__thumb-wrap">
                <img
                  :src="item.image.thumb"
                  :srcset="`${item.image.thumb} 640w, ${item.image.md} 1400w`"
                  sizes="(max-width: 1023px) 86vw, 330px"
                  :alt="item.title"
                  class="portfolio-secondary-card__thumb"
                  width="640"
                  height="515"
                  loading="lazy"
                  decoding="async"
                  fetchpriority="low"
                />
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
      </div>
    </div>
  </section>
</template>

<style scoped>
.portfolio-section {
  position: relative;
  isolation: isolate;
  overflow: clip;
  padding: 96px 32px;
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
  max-width: 720px;
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
  margin: 16px 0 0;
  max-width: 680px;
  font-family: 'Montserrat', 'Manrope', sans-serif;
  font-size: clamp(2rem, 3.5vw, 3rem);
  line-height: 1.08;
  letter-spacing: -0.02em;
  font-weight: 760;
  color: #e0e0e0;
  text-wrap: balance;
}

.portfolio__title span {
  color: #c9a96e;
}

.portfolio__lead {
  margin: 16px 0 0;
  max-width: 620px;
  font-size: 16px;
  line-height: 1.6;
  color: #a7b0c1;
}

.portfolio__filters {
  margin-top: 26px;
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
  margin-top: 28px;
  display: grid;
  grid-template-columns: minmax(0, 1.42fr) minmax(320px, 0.82fr);
  gap: 20px;
  align-items: stretch;
}

.portfolio-featured,
.portfolio-secondary {
  height: 760px;
}

.portfolio-featured {
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  overflow: hidden;
  border-radius: 32px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(180deg, rgba(17, 28, 51, 0.82), rgba(22, 35, 61, 0.96));
  box-shadow: 0 22px 60px rgba(0, 0, 0, 0.32);
  min-height: 0;
}

.portfolio-featured__media {
  position: relative;
  min-height: 0;
  overflow: hidden;
}

.portfolio-featured__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.8) saturate(0.92) contrast(1.03);
}

.portfolio-featured__overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(6, 16, 29, 0.18) 0%, rgba(7, 19, 34, 0.24) 100%),
    radial-gradient(circle at 72% 18%, rgba(201, 169, 110, 0.12), transparent 44%);
}

.portfolio-featured__meta {
  position: absolute;
  top: 22px;
  left: 22px;
  right: 22px;
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

.portfolio-featured__content {
  padding: 24px 26px 26px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background:
    linear-gradient(180deg, rgba(17, 28, 51, 0.88), rgba(22, 35, 61, 0.96));
}

.portfolio-featured__title {
  margin: 0;
  font-size: clamp(1.45rem, 2vw, 1.95rem);
  line-height: 1.16;
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
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: rgba(201, 169, 110, 0.9);
}

.portfolio-featured__detail-label--result {
  color: rgba(0, 196, 180, 0.95);
}

.portfolio-featured__detail p {
  margin: 7px 0 0;
  font-size: 14px;
  line-height: 1.58;
  color: #a7b0c1;
}

.portfolio-featured__cta {
  margin-top: 18px;
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
  border-radius: 32px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(17, 28, 51, 0.68);
  overflow: hidden;
  min-height: 0;
  transform: translateZ(0);
}

.portfolio-secondary__scroll {
  height: 100%;
  overflow-y: auto;
  padding: 14px;
  display: grid;
  gap: 12px;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  transform: translateZ(0);

  scrollbar-width: none;     /* Firefox */
  -ms-overflow-style: none;  /* IE / old Edge */
}

.portfolio-secondary__scroll::-webkit-scrollbar {
  display: none;             /* Chrome, Safari, Opera */
}
.portfolio-secondary-card {
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(22, 35, 61, 0.76);
  padding: 12px;
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr) 22px;
  gap: 12px;
  align-items: center;
  min-height: 156px;
  cursor: pointer;

  /* было слишком тяжело */
  transition: border-color 180ms ease, background-color 180ms ease, box-shadow 180ms ease;

  /* изоляция от перерисовок соседей */
  contain: layout paint;
}

.portfolio-secondary-card:hover {
  border-color: rgba(201, 169, 110, 0.24);
  background: rgba(22, 35, 61, 0.86);
  transform: none;
}

.portfolio-secondary-card__thumb-wrap {
  height: 100%;
  min-height: 132px;
  border-radius: 16px;
  overflow: hidden;
  transform: translateZ(0);
}

.portfolio-secondary-card__thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;

  /* убираем анимацию масштаба */
  transition: none;
  transform: translateZ(0);
}

.portfolio-secondary-card:hover .portfolio-secondary-card__thumb {
  transform: none;
}

.portfolio-secondary-card__arrow svg {
  width: 16px;
  height: 16px;
  transition: none;
}

.portfolio-secondary-card:hover .portfolio-secondary-card__arrow svg {
  transform: none;
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
  transition-delay: 160ms;
}

.portfolio-reveal--filters {
  transition-delay: 220ms;
}

.portfolio-reveal--featured {
  transition-delay: 300ms;
}

.portfolio-reveal--secondary {
  transition-delay: 400ms;
}

.portfolio-section.is-visible .portfolio-reveal {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 1279px) {
  .portfolio-showcase {
    grid-template-columns: 1fr;
  }

  .portfolio-featured,
  .portfolio-secondary {
    height: auto;
  }

  .portfolio-featured {
    min-height: 680px;
  }

  .portfolio-secondary {
    min-height: 520px;
  }
}

@media (max-width: 1023px) {
  .portfolio-section {
    padding: 72px 20px;
  }

  .portfolio__title {
    font-size: clamp(1.8rem, 7vw, 2.35rem);
    line-height: 1.1;
  }

  .portfolio__lead {
    margin-top: 14px;
    font-size: 15px;
    line-height: 1.58;
    max-width: 100%;
  }

  .portfolio__filters {
    margin-top: 22px;
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
    min-height: 0;
    border-radius: 24px;
  }

  .portfolio-featured__media {
    min-height: 300px;
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

  .portfolio-featured__content {
    padding: 18px 16px 18px;
  }

  .portfolio-featured__title {
    font-size: clamp(1.28rem, 5vw, 1.6rem);
  }

  .portfolio-featured__detail {
    margin-top: 12px;
  }

  .portfolio-featured__detail p {
    font-size: 14px;
    line-height: 1.52;
  }

  .portfolio-featured__cta {
    margin-top: 14px;
    width: 100%;
  }

  .portfolio-secondary {
    min-height: 440px;
    border-radius: 24px;
  }

  .portfolio-secondary__scroll {
    padding: 12px;
    gap: 10px;
  }

  .portfolio-secondary-card {
    min-height: 132px;
    border-radius: 18px;
    grid-template-columns: 92px minmax(0, 1fr) 16px;
  }

  .portfolio-secondary-card__thumb-wrap {
    min-height: 104px;
    border-radius: 12px;
  }

  .portfolio-secondary-card__title {
    font-size: 15px;
  }

  .portfolio-secondary-card__preview {
    font-size: 13px;
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
  .case-fade-enter-active,
  .case-fade-leave-active {
    transition: none;
  }
}
</style>
