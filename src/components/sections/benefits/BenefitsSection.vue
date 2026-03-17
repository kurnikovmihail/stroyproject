<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const sectionRef = ref(null)
const isVisible = ref(false)
let observer

const advantages = [
  {
    index: '01',
    title: 'Проект под участок и образ жизни',
    text: 'Решения учитывают рельеф, инсоляцию, ограничения площадки и реальные сценарии использования объекта.',
    accent: 'warm',
    icon: 'M4 18.2 8.8 12.7l3 2.8 4.2-6 4 4V20H4zm0 0V7.4L8 4l3.7 2.6L16 3.7 20 6.4',
  },
  {
    index: '02',
    title: 'Просчитываем стройку заранее',
    text: 'Проверяем решения на реализуемость до запуска работ, чтобы на площадке не возникало критичных сюрпризов.',
    accent: 'neutral',
    icon: 'M4 6h16v12H4zM4 10h16M8 6V4m8 2V4M8 18v2m8-2v2',
  },
  {
    index: '03',
    title: 'Снижаем риск переделок',
    text: 'Точная логика узлов и согласованность разделов уменьшают количество ошибок и повторных работ.',
    accent: 'cool',
    icon: 'M5 12h14M12 5v14M6.5 6.5l11 11M17.5 6.5l-11 11',
  },
  {
    index: '04',
    title: 'Продуманная планировка',
    text: 'Функциональность, приватность, свет, маршруты и хранение формируются как единая система.',
    accent: 'warm',
    icon: 'M4 5h16v14H4zM4 10h16M10 10v9M14 10v9',
  },
  {
    index: '05',
    title: 'Понимание бюджета',
    text: 'Проект развивается в согласованных финансовых рамках, без резкого пересмотра концепции в конце.',
    accent: 'neutral',
    icon: 'M12 4v16M7.4 8.4c0-1.7 1.8-2.8 4.6-2.8 2.7 0 4.2 1 4.2 2.6 0 1.8-1.6 2.4-4.2 2.9-2.5.4-4.4 1.1-4.4 3.1 0 1.7 1.8 2.9 4.8 2.9 2.9 0 4.6-1.2 4.6-3',
  },
  {
    index: '06',
    title: 'Прозрачный процесс',
    text: 'Понятные этапы, согласования и сроки позволяют держать проект под контролем на каждом шаге.',
    accent: 'cool',
    icon: 'M5 6h14M5 12h14M5 18h10M16.5 18l2.8 2.8L22 18',
  },
  {
    index: '07',
    title: 'Универсально для разных условий',
    text: 'Снеговые и ветровые нагрузки, влажность, УГВ, тип грунтов и региональные особенности учитываются заранее.',
    accent: 'warm',
    icon: 'M12 3.8v3.4M8 6.3l1.8 2.8M16 6.3l-1.8 2.8M4.6 11.8h3.3m8.2 0h3.3M8 15.6 6.1 18.6M16 15.6l1.9 3M12 16a4.2 4.2 0 1 0 0-8.4A4.2 4.2 0 0 0 12 16Z',
  },
  {
    index: '08',
    title: 'Документация без компромиссов',
    text: 'Команда получает рабочий комплект, с которым можно уверенно строить без постоянных уточнений.',
    accent: 'neutral',
    icon: 'M7 4h7l4 4v12H7zM14 4v5h5M9.5 12h6M9.5 15h6',
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
    id="advantages"
    ref="sectionRef"
    class="advantages-section"
    :class="{ 'is-visible': isVisible }"
    aria-labelledby="advantages-title"
  >
    <div class="advantages-section__decor" aria-hidden="true"></div>

    <div class="advantages-section__container">
      <div class="advantages__intro">
        <span class="advantages__eyebrow advantages-reveal advantages-reveal--eyebrow">Почему к нам обращаются</span>
        <h2 id="advantages-title" class="advantages__title advantages-reveal advantages-reveal--title">
          Конкретные преимущества, которые влияют на <span>результат проекта</span>
        </h2>
        <p class="advantages__lead advantages-reveal advantages-reveal--lead">
          Не общие слова, а решения, которые снижают риски, делают стройку предсказуемее, а проект — действительно реализуемым
          в рамках вашего бюджета и сроков.
        </p>
      </div>

      <div class="advantages__grid">
        <article
          v-for="(item, index) in advantages"
          :key="item.index"
          class="advantage-card advantages-reveal advantages-reveal--card"
          :class="`advantage-card--${item.accent}`"
          :style="{ '--adv-delay': `${260 + index * 80}ms` }"
        >
          <div class="advantage-card__meta">
            <span class="advantage-card__index">{{ item.index }}</span>
            <span class="advantage-card__line" aria-hidden="true"></span>
          </div>

          <div class="advantage-card__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
              <path :d="item.icon" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>

          <h3 class="advantage-card__title">{{ item.title }}</h3>
          <p class="advantage-card__text">{{ item.text }}</p>
        </article>
      </div>

      <div class="advantages-summary advantages-reveal advantages-reveal--summary">
        <div class="advantages-summary__content">
          <h3 class="advantages-summary__title">
            Системный подход превращается в <span>конкретный результат</span> — меньше рисков, больше контроля и спокойная
            реализация.
          </h3>
          <p class="advantages-summary__text">
            Эти преимущества работают в комплексе и дают заказчику более предсказуемый путь от идеи до построенного объекта.
          </p>
        </div>

        <a href="#for-whom" class="advantages-summary__cta">
          <span>Посмотреть, с какими задачами мы работаем</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
            <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.advantages-section {
  position: relative;
  isolation: isolate;
  overflow: clip;
  padding: 120px 32px;
  background:
    radial-gradient(circle at 50% 6%, rgba(201, 169, 110, 0.05), transparent 28%),
    radial-gradient(circle at 50% 96%, rgba(0, 196, 180, 0.03), transparent 36%),
    linear-gradient(180deg, #0a1428 0%, #111c33 52%, #0a1428 100%);
}

.advantages-section__decor {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.34;
  background-image:
    linear-gradient(to right, rgba(167, 176, 193, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(167, 176, 193, 0.05) 1px, transparent 1px);
  background-size: 48px 48px, 48px 48px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.22), rgba(0, 0, 0, 0.86) 22%, rgba(0, 0, 0, 0.25));
}

.advantages-section__container {
  width: min(100%, 1280px);
  margin: 0 auto;
}

.advantages__intro {
  max-width: 860px;
}

.advantages__eyebrow {
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

.advantages__title {
  margin: 20px 0 0;
  max-width: 940px;
  font-family: 'Montserrat', 'Manrope', sans-serif;
  font-size: clamp(2.5rem, 5vw, 3.875rem);
  line-height: 1.04;
  letter-spacing: -0.02em;
  font-weight: 750;
  color: #e0e0e0;
  text-wrap: balance;
}

.advantages__title span {
  color: #c9a96e;
}

.advantages__lead {
  margin: 28px 0 0;
  max-width: 760px;
  font-size: clamp(18px, 1.45vw, 20px);
  line-height: 1.65;
  color: #a7b0c1;
}

.advantages__grid {
  margin-top: 42px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
}

.advantage-card {
  position: relative;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(22, 35, 61, 0.78);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.22);
  padding: 28px;
  min-height: 264px;
  transition:
    transform 280ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 280ms cubic-bezier(0.22, 1, 0.36, 1),
    background-color 280ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1);
}

.advantage-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  opacity: 0;
  pointer-events: none;
  transition: opacity 280ms ease;
}

.advantage-card--warm::before {
  background: linear-gradient(180deg, rgba(201, 169, 110, 0.12), transparent 42%);
}

.advantage-card--neutral::before {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.07), transparent 42%);
}

.advantage-card--cool::before {
  background: linear-gradient(180deg, rgba(0, 196, 180, 0.1), transparent 42%);
}

.advantage-card:hover {
  transform: translateY(-4px);
  border-color: rgba(201, 169, 110, 0.22);
  background: rgba(22, 35, 61, 0.86);
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.26);
}

.advantage-card:hover::before {
  opacity: 1;
}

.advantage-card__meta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.advantage-card__index {
  font-size: 14px;
  line-height: 1;
  font-weight: 600;
  color: rgba(212, 175, 122, 0.86);
}

.advantage-card__line {
  width: 32px;
  height: 1px;
  background: rgba(212, 175, 122, 0.24);
}

.advantage-card__icon {
  margin-top: 14px;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(201, 169, 110, 0.08);
  color: #c9a96e;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: color 280ms ease, border-color 280ms ease, box-shadow 280ms ease, background-color 280ms ease;
}

.advantage-card--cool .advantage-card__icon {
  background: rgba(0, 196, 180, 0.1);
  color: rgba(0, 196, 180, 0.92);
}

.advantage-card__icon svg {
  width: 23px;
  height: 23px;
}

.advantage-card:hover .advantage-card__icon {
  border-color: rgba(201, 169, 110, 0.24);
  box-shadow: 0 0 16px rgba(201, 169, 110, 0.14);
}

.advantage-card--cool:hover .advantage-card__icon {
  border-color: rgba(0, 196, 180, 0.34);
  box-shadow: 0 0 16px rgba(0, 196, 180, 0.18);
}

.advantage-card__title {
  margin: 16px 0 0;
  font-size: clamp(1.25rem, 1.5vw, 1.45rem);
  line-height: 1.2;
  font-weight: 650;
  color: #e0e0e0;
  text-wrap: balance;
}

.advantage-card__text {
  margin: 11px 0 0;
  font-size: 15px;
  line-height: 1.65;
  color: #a7b0c1;
}

.advantages-summary {
  margin-top: 34px;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(17, 28, 51, 0.78), rgba(22, 35, 61, 0.9));
  padding: 32px 36px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 24px;
  align-items: center;
}

.advantages-summary__title {
  margin: 0;
  max-width: 760px;
  font-size: clamp(1.6rem, 2.35vw, 2.05rem);
  line-height: 1.2;
  font-weight: 700;
  color: #e0e0e0;
  text-wrap: balance;
}

.advantages-summary__title span {
  color: #c9a96e;
}

.advantages-summary__text {
  margin: 12px 0 0;
  max-width: 760px;
  font-size: 16px;
  line-height: 1.62;
  color: #a7b0c1;
}

.advantages-summary__cta {
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

.advantages-summary__cta svg {
  width: 16px;
  height: 16px;
  transition: transform 260ms ease;
}

.advantages-summary__cta:hover {
  border-color: rgba(0, 196, 180, 0.4);
  background: rgba(0, 196, 180, 0.2);
  box-shadow: 0 0 20px rgba(0, 196, 180, 0.16);
}

.advantages-summary__cta:hover svg {
  transform: translateX(4px);
}

.advantages-reveal {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 760ms ease-out,
    transform 760ms ease-out;
}

.advantages-reveal--eyebrow {
  transition-delay: 0ms;
}

.advantages-reveal--title {
  transition-delay: 90ms;
}

.advantages-reveal--lead {
  transition-delay: 170ms;
}

.advantages-reveal--card {
  transition-delay: var(--adv-delay, 260ms);
}

.advantages-reveal--summary {
  transition-delay: 980ms;
}

.advantages-section.is-visible .advantages-reveal {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 1279px) {
  .advantages__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 1023px) {
  .advantages-section {
    padding: 72px 20px;
  }

  .advantages-section__decor {
    opacity: 0.22;
    background-size: 58px 58px, 58px 58px;
  }

  .advantages__title {
    font-size: clamp(2rem, 8.8vw, 2.5rem);
    line-height: 1.07;
  }

  .advantages__lead {
    margin-top: 20px;
    font-size: 16px;
    line-height: 1.6;
    max-width: 100%;
  }

  .advantages__grid {
    margin-top: 30px;
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .advantage-card {
    border-radius: 20px;
    padding: 20px;
    min-height: 0;
  }

  .advantage-card__title {
    font-size: 20px;
  }

  .advantage-card__text {
    font-size: 14px;
    line-height: 1.58;
  }

  .advantages-summary {
    margin-top: 24px;
    border-radius: 22px;
    padding: 20px;
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .advantages-summary__title {
    font-size: clamp(1.4rem, 6vw, 1.7rem);
  }

  .advantages-summary__text {
    font-size: 15px;
    line-height: 1.58;
  }

  .advantages-summary__cta {
    width: 100%;
    min-height: 50px;
  }

  .advantages-reveal {
    transition:
      opacity 560ms ease-out,
      transform 560ms ease-out;
  }
}

@media (prefers-reduced-motion: reduce) {
  .advantages-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .advantage-card,
  .advantage-card::before,
  .advantage-card__icon,
  .advantages-summary__cta,
  .advantages-summary__cta svg {
    transition: none;
  }
}
</style>
