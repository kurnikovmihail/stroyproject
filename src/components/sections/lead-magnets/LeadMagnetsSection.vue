<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const sectionRef = ref(null)
const isVisible = ref(false)
let observer

const leadCards = [
  {
    id: 'analysis',
    label: 'Быстрый разбор',
    title: 'Бесплатный разбор участка и ТЗ',
    text: 'Подходит, если нужно быстро понять ограничения участка, уточнить вводные и собрать корректный старт проекта без лишних ошибок.',
    tags: ['сложный рельеф', 'неясное ТЗ', 'быстрый старт'],
    cta: 'Получить разбор',
    href: '#contacts',
    accent: 'warm',
    ctaStyle: 'strong',
  },
  {
    id: 'checklist',
    label: 'Полезный материал',
    title: 'Чек-лист дорогих ошибок',
    text: 'Короткий материал с 10 частыми ошибками, которые приводят к переплатам и переделкам на этапе строительства.',
    tags: ['дом', 'отель', 'предпроектная стадия'],
    cta: 'Получить чек-лист',
    href: '#contacts',
    accent: 'neutral',
    ctaStyle: 'soft',
  },
  {
    id: 'selection',
    label: 'Ориентир по проектам',
    title: 'Подборка реальных проектов под бюджет',
    text: 'Получите 5–7 релевантных решений по типу объекта, уровню сложности участка и целевому диапазону бюджета.',
    tags: ['частный', 'коммерческий', 'ориентир по решениям'],
    cta: 'Подобрать проекты',
    href: '#contacts',
    accent: 'cool',
    ctaStyle: 'soft',
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
    id="lead-magnets"
    ref="sectionRef"
    class="leads-section"
    :class="{ 'is-visible': isVisible }"
    aria-labelledby="lead-magnets-title"
  >
    <div class="leads-section__decor" aria-hidden="true"></div>

    <div class="leads">
      <div class="leads__intro">
        <span class="leads__eyebrow leads-reveal leads-reveal--eyebrow">Мягкий вход в проект</span>
        <h2 id="lead-magnets-title" class="leads__title leads-reveal leads-reveal--title">
          Выберите <span>удобный первый шаг</span> перед стартом проекта
        </h2>
        <p class="leads__lead leads-reveal leads-reveal--lead">
          Если пока не готовы к полноценному входу, можно начать с разборa, полезного материала или подбора ориентиров под вашу
          задачу.
        </p>
      </div>

      <div class="leads__grid leads-reveal leads-reveal--grid">
        <article
          v-for="(card, index) in leadCards"
          :key="card.id"
          class="lead-card"
          :class="[`lead-card--${card.accent}`]"
          :style="{ '--lead-delay': `${260 + index * 90}ms` }"
        >
          <span class="lead-card__label">{{ card.label }}</span>
          <h3 class="lead-card__title">{{ card.title }}</h3>
          <p class="lead-card__text">{{ card.text }}</p>

          <div class="lead-card__context">
            <p class="lead-card__context-title">Когда особенно полезно</p>
            <div class="lead-card__tags">
              <span v-for="tag in card.tags" :key="`${card.id}-${tag}`" class="lead-card__tag">{{ tag }}</span>
            </div>
          </div>

          <a :href="card.href" class="lead-card__cta" :class="[`lead-card__cta--${card.ctaStyle}`]">
            <span>{{ card.cta }}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
              <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </a>
        </article>
      </div>

      <div class="leads__summary leads-reveal leads-reveal--summary">
        <p class="leads__summary-text">
          Можно начать с полезного материала, быстрой экспертной оценки или подбора похожих решений — и уже потом перейти к
          полноценному проекту без лишней спешки.
        </p>

        <a href="#contacts" class="leads__summary-cta">
          <span>Связаться и выбрать лучший первый шаг</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
            <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.leads-section {
  position: relative;
  isolation: isolate;
  overflow: clip;
  padding: 110px 32px;
  background:
    radial-gradient(circle at 42% 20%, rgba(201, 169, 110, 0.04), transparent 30%),
    radial-gradient(circle at 66% 72%, rgba(0, 196, 180, 0.025), transparent 35%),
    linear-gradient(180deg, #0a1428 0%, #101a2f 52%, #0a1428 100%);
}

.leads-section__decor {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.12;
  background-image:
    linear-gradient(to right, rgba(167, 176, 193, 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(167, 176, 193, 0.04) 1px, transparent 1px);
  background-size: 60px 60px, 60px 60px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.86) 24%, rgba(0, 0, 0, 0.22));
}

.leads {
  width: min(100%, 1240px);
  margin: 0 auto;
}

.leads__intro {
  max-width: 760px;
}

.leads__eyebrow {
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

.leads__title {
  margin: 20px 0 0;
  max-width: 920px;
  font-family: 'Montserrat', 'Manrope', sans-serif;
  font-size: clamp(2.35rem, 4.5vw, 3.5rem);
  line-height: 1.05;
  letter-spacing: -0.02em;
  font-weight: 760;
  color: #e0e0e0;
  text-wrap: balance;
}

.leads__title span {
  color: #c9a96e;
}

.leads__lead {
  margin: 24px 0 0;
  max-width: 760px;
  font-size: 18px;
  line-height: 1.65;
  color: #a7b0c1;
}

.leads__grid {
  margin-top: 28px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.lead-card {
  position: relative;
  overflow: hidden;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(22, 35, 61, 0.8), rgba(17, 28, 51, 0.92));
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.2);
  padding: 28px;
  min-height: 352px;
  display: flex;
  flex-direction: column;
  transition:
    transform 280ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 280ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1),
    background-color 280ms cubic-bezier(0.22, 1, 0.36, 1);
}

.lead-card::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 2px;
  opacity: 0.54;
}

.lead-card--warm::before {
  background: linear-gradient(90deg, rgba(201, 169, 110, 0.84), rgba(255, 107, 53, 0.32) 78%, transparent 100%);
}

.lead-card--neutral::before {
  background: linear-gradient(90deg, rgba(201, 169, 110, 0.74), transparent 84%);
}

.lead-card--cool::before {
  background: linear-gradient(90deg, rgba(0, 196, 180, 0.8), transparent 84%);
}

.lead-card:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.16);
  box-shadow: 0 22px 52px rgba(0, 0, 0, 0.25);
  background: linear-gradient(180deg, rgba(22, 35, 61, 0.88), rgba(17, 28, 51, 0.96));
}

.lead-card--warm:hover {
  border-color: rgba(255, 107, 53, 0.28);
}

.lead-card--cool:hover {
  border-color: rgba(0, 196, 180, 0.28);
}

.lead-card__label {
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  line-height: 1.2;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 600;
  color: #c9a96e;
}

.lead-card--cool .lead-card__label {
  color: #00c4b4;
}

.lead-card__title {
  margin: 14px 0 0;
  font-size: clamp(1.45rem, 1.6vw, 1.76rem);
  line-height: 1.2;
  font-weight: 680;
  color: #e0e0e0;
  text-wrap: balance;
}

.lead-card__text {
  margin: 11px 0 0;
  font-size: 15px;
  line-height: 1.64;
  color: #a7b0c1;
}

.lead-card__context {
  margin-top: 14px;
}

.lead-card__context-title {
  margin: 0;
  font-size: 12px;
  line-height: 1.2;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 610;
  color: rgba(224, 224, 224, 0.88);
}

.lead-card__tags {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.lead-card__tag {
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  padding: 8px 12px;
  font-size: 12px;
  line-height: 1.2;
  color: #d5dce9;
  transition: border-color 220ms ease, color 220ms ease;
}

.lead-card:hover .lead-card__tag {
  border-color: rgba(255, 255, 255, 0.16);
  color: #e0e0e0;
}

.lead-card__cta {
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-height: 44px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  padding: 0 14px;
  font-size: 14px;
  font-weight: 620;
  transition:
    transform 220ms ease,
    border-color 220ms ease,
    background-color 220ms ease,
    box-shadow 220ms ease;
}

.lead-card__cta svg {
  width: 15px;
  height: 15px;
  transition: transform 220ms ease;
}

.lead-card__cta:hover {
  transform: translateY(-1px);
}

.lead-card__cta:hover svg {
  transform: translateX(3px);
}

.lead-card__cta--strong {
  border-color: rgba(255, 107, 53, 0.46);
  background: #ff6b35;
  color: #122134;
}

.lead-card__cta--strong:hover {
  background: #ff5a1d;
  box-shadow: 0 8px 24px rgba(255, 107, 53, 0.3);
}

.lead-card__cta--soft {
  border-color: rgba(0, 196, 180, 0.24);
  background: rgba(0, 196, 180, 0.1);
  color: #e0e0e0;
}

.lead-card__cta--soft:hover {
  border-color: rgba(0, 196, 180, 0.38);
  background: rgba(0, 196, 180, 0.16);
  box-shadow: 0 0 16px rgba(0, 196, 180, 0.12);
}

.leads__summary {
  margin-top: 16px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(17, 28, 51, 0.74);
  padding: 24px 26px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 14px;
  align-items: center;
}

.leads__summary-text {
  margin: 0;
  font-size: 16px;
  line-height: 1.6;
  color: #a7b0c1;
}

.leads__summary-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.05);
  padding: 0 14px;
  font-size: 13px;
  font-weight: 620;
  color: #e0e0e0;
  transition:
    border-color 220ms ease,
    background-color 220ms ease,
    box-shadow 220ms ease;
}

.leads__summary-cta svg {
  width: 15px;
  height: 15px;
  transition: transform 220ms ease;
}

.leads__summary-cta:hover {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 14px rgba(255, 255, 255, 0.08);
}

.leads__summary-cta:hover svg {
  transform: translateX(3px);
}

.leads-reveal {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 700ms ease-out,
    transform 700ms ease-out;
}

.leads-reveal--eyebrow {
  transition-delay: 0ms;
}

.leads-reveal--title {
  transition-delay: 90ms;
}

.leads-reveal--lead {
  transition-delay: 160ms;
}

.leads-reveal--grid {
  transition-delay: 240ms;
}

.leads-reveal--summary {
  transition-delay: 420ms;
}

.leads-section.is-visible .leads-reveal {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 1023px) {
  .leads-section {
    padding: 72px 20px;
  }

  .leads__title {
    font-size: clamp(2rem, 8vw, 2.5rem);
    line-height: 1.08;
  }

  .leads__lead {
    margin-top: 18px;
    font-size: 16px;
    line-height: 1.6;
  }

  .leads__grid {
    margin-top: 22px;
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .lead-card {
    border-radius: 22px;
    padding: 22px;
    min-height: 0;
  }

  .lead-card__title {
    font-size: 24px;
  }

  .lead-card__text {
    font-size: 14px;
    line-height: 1.58;
  }

  .lead-card__tag {
    font-size: 11px;
  }

  .lead-card__cta {
    width: 100%;
    min-height: 50px;
    margin-top: 16px;
  }

  .leads__summary {
    margin-top: 12px;
    border-radius: 20px;
    padding: 16px;
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .leads__summary-text {
    font-size: 14px;
    line-height: 1.56;
  }

  .leads__summary-cta {
    width: 100%;
    min-height: 50px;
  }

  .leads-reveal {
    transition:
      opacity 540ms ease-out,
      transform 540ms ease-out;
  }
}

@media (prefers-reduced-motion: reduce) {
  .leads-reveal,
  .lead-card,
  .lead-card__cta,
  .lead-card__cta svg,
  .leads__summary-cta,
  .leads__summary-cta svg {
    transition: none;
  }
}
</style>
