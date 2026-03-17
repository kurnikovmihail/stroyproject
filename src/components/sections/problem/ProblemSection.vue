<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const sectionRef = ref(null)
const isVisible = ref(false)
let observer

const problemCards = [
  {
    index: '01',
    title: 'Участок недооценивают',
    text: 'Рельеф, грунты, УГВ, инсоляция и подъездные пути не проверяют заранее, поэтому сильные ограничения всплывают уже после старта.',
    icon: 'terrain',
  },
  {
    index: '02',
    title: 'Проект делают по картинке',
    text: 'Визуально эффектное решение не проходит проверку на конструктив и инженерию, и команда получает красивую, но конфликтную концепцию.',
    icon: 'render',
  },
  {
    index: '03',
    title: 'Бюджет учитывают слишком поздно',
    text: 'Финансовые рамки не зашиты в логику решений, поэтому после согласования начинается болезненное урезание проекта.',
    icon: 'budget',
  },
  {
    index: '04',
    title: 'Планировка не работает в жизни',
    text: 'Без сценариев движения, хранения, приватности и света дом выглядит убедительно на рендере, но неудобен в ежедневной эксплуатации.',
    icon: 'layout',
  },
  {
    index: '05',
    title: 'Документация дает трактовки',
    text: 'Недостаточная детализация узлов и спецификаций провоцирует вопросы подрядчиков, задержки, спорные решения и перерасход.',
    icon: 'docs',
  },
  {
    index: '06',
    title: 'Разделы не увязаны между собой',
    text: 'Архитектура, конструктив и инженерия развиваются отдельно, из-за чего на стройке появляются пересечения и дорогие переделки.',
    icon: 'systems',
  },
]

const iconPaths = {
  terrain: 'M4 17.5 8.6 12l3.1 2.8 4.3-5.8L20 12.7V20H4Z M4 20V7.2L8.1 4l3.5 2.4L15.9 3 20 5.8',
  render: 'M4 6h16v12H4z M8 6V4m8 2V4M8 18v2m8-2v2M4 10h16',
  budget: 'M12 4v16M7.2 8.4c0-1.7 1.7-2.8 4.6-2.8 2.7 0 4.2 1 4.2 2.6 0 1.8-1.6 2.4-4.2 2.9-2.5.4-4.4 1.1-4.4 3 0 1.7 1.8 2.9 4.8 2.9 2.9 0 4.6-1.2 4.6-3',
  layout: 'M4 5h16v14H4z M4 10h16M10 10v9M14 10v9',
  docs: 'M7 4h7l4 4v12H7z M14 4v5h5M9.5 12h6M9.5 15h6',
  systems: 'M12 7.5V3.8M6.6 11.2l-2.9-1.7M17.4 11.2l2.9-1.7M6.6 16.7l-2.9 1.7M17.4 16.7l2.9 1.7M12 20.2v-3.7 M8.4 14a3.6 3.6 0 1 1 7.2 0 3.6 3.6 0 0 1-7.2 0Z',
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
    { threshold: 0.18 },
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
    id="problem"
    ref="sectionRef"
    class="problem-section"
    :class="{ 'is-visible': isVisible }"
    aria-labelledby="problem-title"
  >
    <div class="problem-section__grid-layer" aria-hidden="true"></div>

    <div class="problem-section__container">
      <div class="problem__intro">
        <span class="problem__eyebrow problem-reveal problem-reveal--eyebrow">
          С чего начинаются лишние затраты
        </span>

        <h2 id="problem-title" class="problem__title problem-reveal problem-reveal--title">
          Большинство <span>переделок</span> закладываются ещё на этапе проекта
        </h2>

        <p class="problem__lead problem-reveal problem-reveal--lead">
          Красивый рендер не гарантирует реализуемость. Хаос, перерасход и конфликтные решения обычно появляются, когда проект
          не связывает участок, бюджет, конструктив, инженерию и сценарий эксплуатации в единую систему.
        </p>
      </div>

      <div class="problem__grid">
        <article
          v-for="(card, index) in problemCards"
          :key="card.index"
          class="problem-card problem-reveal problem-reveal--card"
          :style="{ '--problem-delay': `${280 + index * 90}ms` }"
        >
          <div class="problem-card__meta">
            <span class="problem-card__index">{{ card.index }}</span>
            <span class="problem-card__line" aria-hidden="true"></span>
          </div>

          <div class="problem-card__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
              <path :d="iconPaths[card.icon]" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>

          <h3 class="problem-card__title">{{ card.title }}</h3>
          <p class="problem-card__text">{{ card.text }}</p>
        </article>
      </div>

      <div class="problem-summary problem-reveal problem-reveal--summary">
        <div class="problem-summary__content">
          <h3 class="problem-summary__title">
            Хаос на стройке почти всегда начинается с
            <span>непродуманного проекта</span>
          </h3>
          <p class="problem-summary__text">
            Когда архитектура, бюджет, участок, конструктив и инженерия связаны заранее, риск переделок и потери сроков
            снижается кратно.
          </p>
        </div>

        <div class="problem-summary__action">
          <a href="#approach" class="problem-summary__cta">
            <span>Как мы это решаем</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
              <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </a>
          <p class="problem-summary__hint">Следующий этап: подход к проектированию без хаоса и переделок</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.problem-section {
  position: relative;
  isolation: isolate;
  overflow: clip;
  padding: 120px 32px;
  background:
    radial-gradient(circle at 14% 18%, rgba(201, 169, 110, 0.06), transparent 34%),
    radial-gradient(circle at 88% 78%, rgba(10, 92, 58, 0.06), transparent 36%),
    radial-gradient(circle at 50% 100%, rgba(10, 20, 40, 0.35), transparent 56%),
    linear-gradient(180deg, #0a1428 0%, #111c33 50%, #0a1428 100%);
}

.problem-section__grid-layer {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.45;
  background-image:
    linear-gradient(to right, rgba(167, 176, 193, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(167, 176, 193, 0.05) 1px, transparent 1px);
  background-size: 42px 42px, 42px 42px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.24), rgba(0, 0, 0, 0.85) 28%, rgba(0, 0, 0, 0.32));
}

.problem-section__container {
  width: min(100%, 1280px);
  margin: 0 auto;
}

.problem__intro {
  max-width: 860px;
}

.problem__eyebrow {
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

.problem__title {
  margin: 20px 0 0;
  max-width: 860px;
  font-family: 'Montserrat', 'Manrope', sans-serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1.03;
  letter-spacing: -0.02em;
  font-weight: 700;
  color: #e0e0e0;
  text-wrap: balance;
}

.problem__title span {
  color: #c9a96e;
}

.problem__lead {
  margin: 28px 0 0;
  max-width: 760px;
  font-size: clamp(18px, 1.5vw, 20px);
  line-height: 1.65;
  color: #a7b0c1;
}

.problem__grid {
  margin-top: 44px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.problem-card {
  position: relative;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(22, 35, 61, 0.72);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.22);
  padding: 28px;
  min-height: 288px;
  transition:
    transform 280ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 280ms cubic-bezier(0.22, 1, 0.36, 1),
    background-color 280ms cubic-bezier(0.22, 1, 0.36, 1);
}

.problem-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.06), transparent 40%);
  opacity: 0;
  pointer-events: none;
  transition: opacity 280ms ease;
}

.problem-card:hover {
  transform: translateY(-4px);
  border-color: rgba(201, 169, 110, 0.22);
}

.problem-card:hover::before {
  opacity: 1;
}

.problem-card__meta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.problem-card__index {
  font-size: 14px;
  line-height: 1;
  font-weight: 600;
  color: rgba(212, 175, 122, 0.82);
}

.problem-card__line {
  width: 36px;
  height: 1px;
  background: rgba(212, 175, 122, 0.32);
}

.problem-card__icon {
  margin-top: 16px;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(201, 169, 110, 0.08);
  color: #c9a96e;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: color 280ms ease, border-color 280ms ease, background-color 280ms ease;
}

.problem-card__icon svg {
  width: 24px;
  height: 24px;
}

.problem-card:hover .problem-card__icon {
  color: #d4af37;
  border-color: rgba(201, 169, 110, 0.24);
  background: rgba(201, 169, 110, 0.12);
}

.problem-card__title {
  margin: 18px 0 0;
  font-size: clamp(21px, 1.55vw, 24px);
  line-height: 1.2;
  font-weight: 650;
  color: #e0e0e0;
  text-wrap: balance;
}

.problem-card__text {
  margin: 12px 0 0;
  font-size: 15px;
  line-height: 1.65;
  color: #a7b0c1;
}

.problem-summary {
  margin-top: 34px;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(17, 28, 51, 0.72), rgba(22, 35, 61, 0.88));
  padding: 32px 36px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 26px;
  align-items: center;
}

.problem-summary__title {
  margin: 0;
  font-size: clamp(1.75rem, 3vw, 2.2rem);
  line-height: 1.16;
  font-weight: 650;
  color: #e0e0e0;
  text-wrap: balance;
}

.problem-summary__title span {
  color: #c9a96e;
}

.problem-summary__text {
  margin: 12px 0 0;
  max-width: 760px;
  font-size: 16px;
  line-height: 1.62;
  color: #a7b0c1;
}

.problem-summary__action {
  min-width: 270px;
}

.problem-summary__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 46px;
  border-radius: 999px;
  border: 1px solid rgba(201, 169, 110, 0.24);
  background: rgba(201, 169, 110, 0.12);
  padding: 0 18px;
  font-size: 14px;
  font-weight: 600;
  color: #e0e0e0;
  transition:
    border-color 260ms ease,
    background-color 260ms ease,
    color 260ms ease;
}

.problem-summary__cta svg {
  width: 16px;
  height: 16px;
  transition: transform 260ms ease;
}

.problem-summary__cta:hover {
  border-color: rgba(201, 169, 110, 0.34);
  background: rgba(201, 169, 110, 0.18);
}

.problem-summary__cta:hover svg {
  transform: translateX(4px);
}

.problem-summary__hint {
  margin: 10px 0 0;
  font-size: 13px;
  line-height: 1.5;
  color: rgba(167, 176, 193, 0.9);
}

.problem-reveal {
  opacity: 0;
  transform: translateY(22px);
  filter: blur(5px);
  transition:
    opacity 760ms ease-out,
    transform 760ms ease-out,
    filter 760ms ease-out;
}

.problem-reveal--eyebrow {
  transition-delay: 0ms;
}

.problem-reveal--title {
  transition-delay: 90ms;
}

.problem-reveal--lead {
  transition-delay: 160ms;
}

.problem-reveal--card {
  transition-delay: var(--problem-delay, 280ms);
}

.problem-reveal--summary {
  transition-delay: 860ms;
}

.problem-section.is-visible .problem-reveal {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

@media (max-width: 1219px) {
  .problem__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 1023px) {
  .problem-section {
    padding: 72px 20px;
  }

  .problem-section__grid-layer {
    opacity: 0.2;
    background-size: 58px 58px, 58px 58px;
  }

  .problem__title {
    font-size: clamp(2rem, 8.8vw, 2.5rem);
    line-height: 1.06;
  }

  .problem__lead {
    margin-top: 20px;
    font-size: 16px;
    line-height: 1.6;
    max-width: 100%;
  }

  .problem__grid {
    margin-top: 32px;
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .problem-card {
    border-radius: 20px;
    padding: 20px;
    min-height: 0;
    backdrop-filter: blur(7px);
  }

  .problem-card__icon {
    width: 40px;
    height: 40px;
  }

  .problem-card__title {
    font-size: 20px;
  }

  .problem-card__text {
    font-size: 14px;
    line-height: 1.58;
  }

  .problem-summary {
    margin-top: 24px;
    border-radius: 22px;
    padding: 20px;
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .problem-summary__title {
    font-size: clamp(1.45rem, 6vw, 1.7rem);
  }

  .problem-summary__text {
    font-size: 15px;
    line-height: 1.58;
  }

  .problem-summary__action {
    min-width: 0;
  }

  .problem-summary__cta {
    width: 100%;
    min-height: 48px;
  }

  .problem-reveal {
    filter: none;
    transition:
      opacity 520ms ease-out,
      transform 520ms ease-out;
  }

  .problem-reveal--card {
    transition-delay: var(--problem-delay, 180ms);
  }
}

@media (prefers-reduced-motion: reduce) {
  .problem-reveal {
    opacity: 1;
    transform: none;
    filter: none;
    transition: none;
  }

  .problem-card,
  .problem-card::before,
  .problem-card__icon,
  .problem-summary__cta,
  .problem-summary__cta svg {
    transition: none;
  }
}
</style>
