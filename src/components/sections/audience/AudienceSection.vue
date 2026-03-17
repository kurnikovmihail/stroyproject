<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const sectionRef = ref(null)
const isVisible = ref(false)
let observer

const audienceCards = [
  {
    label: 'Частный объект',
    title: 'Владельцы участков для семейного дома',
    text: 'Подбираем решения под участок и повседневный сценарий жизни, чтобы дом был удобным не только на рендерах, но и в эксплуатации.',
    tags: ['семейный дом', 'планировка', 'участок', 'бюджет'],
    hint: 'Частый сценарий проекта',
    accent: 'warm',
  },
  {
    label: 'Премиум-сегмент',
    title: 'Заказчики вилл, коттеджей и резиденций',
    text: 'Соединяем индивидуальную архитектуру, высокий уровень детализации и реалистичную строительную логику для сложных участков.',
    tags: ['премиум', 'резиденция', 'индивидуальность', 'детализация'],
    hint: 'Подходит наш формат работы',
    accent: 'warm',
  },
  {
    label: 'Инвестиционный проект',
    title: 'Инвесторы и девелоперы',
    text: 'Фокусируемся на эффективности площади, экономике объекта и ясной документации, чтобы проект был управляемым на всех этапах.',
    tags: ['инвестиции', 'эффективность', 'окупаемость', 'документация'],
    hint: 'Можем показать похожие кейсы',
    accent: 'cool',
  },
  {
    label: 'Коммерческий объект',
    title: 'Владельцы гостиниц и апарт-объектов',
    text: 'Проектируем под бизнес-логику: потоки, сервис, эксплуатационные требования, инженерные зоны и опыт гостей.',
    tags: ['гостиница', 'потоки', 'сервис', 'эксплуатация'],
    hint: 'Подходит наш формат работы',
    accent: 'cool',
  },
  {
    label: 'Бизнес-задача',
    title: 'Предприниматели под развитие бизнеса',
    text: 'Создаем пространство как рабочий инструмент бизнеса: с понятной логикой использования, масштабирования и дальнейшей эксплуатации.',
    tags: ['бизнес', 'сценарии', 'коммерция', 'логика'],
    hint: 'Частый сценарий проекта',
    accent: 'cool',
  },
  {
    label: 'Реконструкция',
    title: 'Собственники с задачей перепланировки',
    text: 'Адаптируем существующие объекты под новые цели, сохраняя сильные стороны здания и соблюдая технические ограничения.',
    tags: ['реконструкция', 'адаптация', 'ограничения', 'перепланировка'],
    hint: 'Сложный, но привычный формат',
    accent: 'neutral',
  },
]

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
    { threshold: 0.16 },
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
    id="for-whom"
    ref="sectionRef"
    class="for-whom-section"
    :class="{ 'is-visible': isVisible }"
    aria-labelledby="for-whom-title"
  >
    <div class="for-whom-section__decor" aria-hidden="true"></div>

    <div class="for-whom">
      <div class="for-whom__intro">
        <span class="for-whom__eyebrow for-whom-reveal for-whom-reveal--eyebrow">Для кого мы работаем</span>
        <h2 id="for-whom-title" class="for-whom__title for-whom-reveal for-whom-reveal--title">
          Вы узнаете себя в <span>одной из этих задач</span>
        </h2>
        <p class="for-whom__lead for-whom-reveal for-whom-reveal--lead">
          Работаем с частными и коммерческими объектами, где важны реализуемость, ясная логика решений и качественная
          документация без потери архитектурного уровня.
        </p>
      </div>

      <div class="for-whom__grid">
        <article
          v-for="(card, index) in audienceCards"
          :key="card.title"
          class="audience-card for-whom-reveal for-whom-reveal--card"
          :class="`audience-card--${card.accent}`"
          :style="{ '--aud-delay': `${260 + index * 90}ms` }"
        >
          <span class="audience-card__label">{{ card.label }}</span>
          <h3 class="audience-card__title">{{ card.title }}</h3>
          <p class="audience-card__text">{{ card.text }}</p>

          <div class="audience-card__tags">
            <span v-for="tag in card.tags" :key="tag" class="audience-card__tag">{{ tag }}</span>
          </div>

          <div class="audience-card__footer">
            <span class="audience-card__hint">{{ card.hint }}</span>
            <span class="audience-card__arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
                <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </div>
        </article>
      </div>

      <div class="for-whom__summary for-whom-reveal for-whom-reveal--summary">
        <div class="for-whom__summary-content">
          <h3 class="for-whom__summary-title">
            Независимо от типа объекта, задача одна — <span>связать идею с реальными условиями реализации</span>.
          </h3>
          <p class="for-whom__summary-text">
            Именно так архитектура становится не только выразительной, но и предсказуемой по бюджету, срокам и эксплуатации.
          </p>
        </div>
        <a href="#services" class="for-whom__summary-cta">
          <span>Посмотреть подходящие услуги</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
            <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.for-whom-section {
  position: relative;
  isolation: isolate;
  overflow: clip;
  padding: 120px 32px;
  background:
    radial-gradient(circle at 78% 14%, rgba(0, 196, 180, 0.035), transparent 32%),
    radial-gradient(circle at 20% 6%, rgba(201, 169, 110, 0.04), transparent 30%),
    linear-gradient(180deg, #0a1428 0%, #111c33 48%, #0a1428 100%);
}

.for-whom-section__decor {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.3;
  background-image:
    linear-gradient(to right, rgba(167, 176, 193, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(167, 176, 193, 0.05) 1px, transparent 1px);
  background-size: 52px 52px, 52px 52px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.16), rgba(0, 0, 0, 0.82) 22%, rgba(0, 0, 0, 0.2));
}

.for-whom {
  width: min(100%, 1280px);
  margin: 0 auto;
}

.for-whom__intro {
  max-width: 840px;
}

.for-whom__eyebrow {
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

.for-whom__title {
  margin: 20px 0 0;
  max-width: 920px;
  font-family: 'Montserrat', 'Manrope', sans-serif;
  font-size: clamp(2.5rem, 5vw, 3.75rem);
  line-height: 1.05;
  letter-spacing: -0.02em;
  font-weight: 750;
  color: #e0e0e0;
  text-wrap: balance;
}

.for-whom__title span {
  color: #c9a96e;
}

.for-whom__lead {
  margin: 26px 0 0;
  max-width: 820px;
  font-size: clamp(18px, 1.45vw, 20px);
  line-height: 1.65;
  color: #a7b0c1;
}

.for-whom__grid {
  margin-top: 42px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.audience-card {
  border-radius: 26px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(22, 35, 61, 0.7);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.2);
  padding: 28px;
  min-height: 294px;
  display: flex;
  flex-direction: column;
  transition:
    transform 280ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 280ms cubic-bezier(0.22, 1, 0.36, 1),
    background-color 280ms cubic-bezier(0.22, 1, 0.36, 1);
}

.audience-card::before {
  content: '';
  position: absolute;
}

.audience-card:hover {
  transform: translateY(-4px);
  background: rgba(22, 35, 61, 0.82);
}

.audience-card--warm:hover {
  border-color: rgba(201, 169, 110, 0.2);
}

.audience-card--cool:hover {
  border-color: rgba(0, 196, 180, 0.2);
}

.audience-card--neutral:hover {
  border-color: rgba(255, 255, 255, 0.14);
}

.audience-card__label {
  align-self: flex-start;
  border-radius: 999px;
  border: 1px solid rgba(201, 169, 110, 0.2);
  background: rgba(201, 169, 110, 0.08);
  padding: 6px 10px;
  font-size: 12px;
  line-height: 1.2;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 600;
  color: #c9a96e;
}

.audience-card--cool .audience-card__label {
  border-color: rgba(0, 196, 180, 0.22);
  background: rgba(0, 196, 180, 0.1);
  color: rgba(0, 196, 180, 0.95);
}

.audience-card__title {
  margin: 16px 0 0;
  font-size: clamp(1.35rem, 1.8vw, 1.75rem);
  line-height: 1.22;
  font-weight: 670;
  color: #e0e0e0;
  text-wrap: balance;
}

.audience-card__text {
  margin: 12px 0 0;
  font-size: 15px;
  line-height: 1.65;
  color: #a7b0c1;
}

.audience-card__tags {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.audience-card__tag {
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  padding: 7px 11px;
  font-size: 13px;
  line-height: 1;
  color: #a7b0c1;
}

.audience-card__footer {
  margin-top: auto;
  padding-top: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.audience-card__hint {
  font-size: 14px;
  line-height: 1.4;
  font-weight: 500;
  color: #e0e0e0;
}

.audience-card__arrow {
  width: 18px;
  height: 18px;
  color: #c9a96e;
  flex-shrink: 0;
  transition: transform 280ms ease;
}

.audience-card--cool .audience-card__arrow {
  color: #00c4b4;
}

.audience-card:hover .audience-card__arrow {
  transform: translateX(4px);
}

.for-whom__summary {
  margin-top: 34px;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(17, 28, 51, 0.72), rgba(22, 35, 61, 0.88));
  padding: 32px 36px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 24px;
  align-items: center;
}

.for-whom__summary-title {
  margin: 0;
  max-width: 760px;
  font-size: clamp(1.6rem, 2.3vw, 2.05rem);
  line-height: 1.2;
  font-weight: 700;
  color: #e0e0e0;
  text-wrap: balance;
}

.for-whom__summary-title span {
  color: #c9a96e;
}

.for-whom__summary-text {
  margin: 12px 0 0;
  max-width: 760px;
  font-size: 16px;
  line-height: 1.62;
  color: #a7b0c1;
}

.for-whom__summary-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 46px;
  border-radius: 999px;
  border: 1px solid rgba(0, 196, 180, 0.24);
  background: rgba(0, 196, 180, 0.12);
  padding: 0 18px;
  font-size: 14px;
  font-weight: 600;
  color: #e0e0e0;
  transition:
    border-color 260ms ease,
    background-color 260ms ease,
    box-shadow 260ms ease;
}

.for-whom__summary-cta svg {
  width: 16px;
  height: 16px;
  transition: transform 260ms ease;
}

.for-whom__summary-cta:hover {
  border-color: rgba(0, 196, 180, 0.4);
  background: rgba(0, 196, 180, 0.2);
  box-shadow: 0 0 20px rgba(0, 196, 180, 0.16);
}

.for-whom__summary-cta:hover svg {
  transform: translateX(4px);
}

.for-whom-reveal {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 760ms ease-out,
    transform 760ms ease-out;
}

.for-whom-reveal--eyebrow {
  transition-delay: 0ms;
}

.for-whom-reveal--title {
  transition-delay: 90ms;
}

.for-whom-reveal--lead {
  transition-delay: 170ms;
}

.for-whom-reveal--card {
  transition-delay: var(--aud-delay, 260ms);
}

.for-whom-reveal--summary {
  transition-delay: 900ms;
}

.for-whom-section.is-visible .for-whom-reveal {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 1219px) {
  .for-whom__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .audience-card {
    min-height: 0;
  }
}

@media (max-width: 1023px) {
  .for-whom-section {
    padding: 72px 20px;
  }

  .for-whom__title {
    font-size: clamp(2rem, 8.8vw, 2.5rem);
    line-height: 1.08;
  }

  .for-whom__lead {
    margin-top: 20px;
    font-size: 16px;
    line-height: 1.6;
    max-width: 100%;
  }

  .for-whom__grid {
    margin-top: 30px;
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .audience-card {
    border-radius: 20px;
    padding: 20px;
  }

  .audience-card__title {
    font-size: 21px;
  }

  .audience-card__text {
    font-size: 14px;
    line-height: 1.58;
  }

  .audience-card__tag {
    font-size: 12px;
    padding: 6px 10px;
  }

  .for-whom__summary {
    margin-top: 24px;
    border-radius: 22px;
    padding: 20px;
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .for-whom__summary-title {
    font-size: clamp(1.4rem, 6vw, 1.68rem);
  }

  .for-whom__summary-text {
    font-size: 15px;
    line-height: 1.58;
  }

  .for-whom__summary-cta {
    width: 100%;
    min-height: 50px;
  }

  .for-whom-reveal {
    transition:
      opacity 560ms ease-out,
      transform 560ms ease-out;
  }
}

@media (prefers-reduced-motion: reduce) {
  .for-whom-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .audience-card,
  .audience-card__arrow,
  .for-whom__summary-cta,
  .for-whom__summary-cta svg {
    transition: none;
  }
}
</style>
