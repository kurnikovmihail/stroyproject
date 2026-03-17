<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const sectionRef = ref(null)
const isVisible = ref(false)
let observer

const principlesTop = [
  {
    id: 'site',
    title: 'Участок как исходная точка',
    text: 'Рельеф, инсоляция, климат, грунты и ограничения территории задают рамки проектных решений с самого начала.',
    delay: 420,
    icon: 'M5 18.5 9.3 12.8l3.4 3.1 4.1-6.1L20 13v6.5H5Zm0 0V7.1l3.7-2.9 3.8 2.3L16 3.8 20 6.4',
  },
  {
    id: 'scenario',
    title: 'Сценарии использования',
    text: 'Планировка строится под образ жизни семьи или бизнес-процессы, а не под формальную схему помещений.',
    delay: 500,
    icon: 'M4 7.2h16M4 12h16M4 16.8h16M8 7.2v9.6M16 7.2v9.6',
  },
  {
    id: 'budget',
    title: 'Бюджет и приоритеты',
    text: 'Стоимость и этапность реализации учитываются заранее, чтобы проект не пришлось резко упрощать на стройке.',
    delay: 580,
    icon: 'M12 4v16M7.3 8.4c0-1.6 1.6-2.8 4.6-2.8 2.7 0 4.2 1 4.2 2.6 0 1.7-1.5 2.3-4.2 2.8-2.5.5-4.4 1.2-4.4 3.1 0 1.7 1.8 2.9 4.8 2.9 2.9 0 4.6-1.2 4.6-3',
  },
]

const principlesBottom = [
  {
    id: 'structure',
    title: 'Конструктивная логика',
    text: 'Архитектура сразу проверяется на рациональность несущей схемы и узлов, чтобы исключить внутренние конфликты.',
    delay: 700,
    icon: 'M4 5h16v14H4zM4 10h16M10 10v9M14 10v9',
  },
  {
    id: 'engineering',
    title: 'Инженерия и эксплуатация',
    text: 'Трассировки, технические зоны и обслуживание закладываются на раннем этапе, а не переносятся на «потом».',
    delay: 780,
    icon: 'M12 3.8v3.6M7 6l2 3.1M17 6l-2 3.1M4.2 12h3.7m8.2 0h3.7M8.3 15.2l-2.1 3.2M15.7 15.2l2.1 3.2M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
  },
  {
    id: 'docs',
    title: 'Рабочая документация',
    text: 'Комплект выдается в формате, понятном строителям: меньше трактовок, меньше остановок, выше предсказуемость.',
    delay: 860,
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
    id="approach"
    ref="sectionRef"
    class="approach-section"
    :class="{ 'is-visible': isVisible }"
    aria-labelledby="approach-title"
  >
    <div class="approach-section__decor" aria-hidden="true"></div>

    <div class="approach-section__container">
      <div class="approach__intro">
        <span class="approach__eyebrow approach-reveal approach-reveal--eyebrow">Как мы проектируем</span>
        <h2 id="approach-title" class="approach__title approach-reveal approach-reveal--title">
          Сначала понимаем <span>условия объекта</span>. Потом принимаем архитектурные решения.
        </h2>
        <p class="approach__lead approach-reveal approach-reveal--lead">
          Мы не отделяем архитектуру от конструктивной, инженерной и эксплуатационной логики. Каждое решение проверяется на
          реализуемость, финансовую адекватность и удобство использования объекта в реальной жизни.
        </p>
      </div>

      <div class="approach-system">
        <div class="approach-system__connections" aria-hidden="true">
          <span class="approach-line approach-line--1"></span>
          <span class="approach-line approach-line--2"></span>
        </div>

        <div class="approach-system__grid approach-system__grid--top">
          <article
            v-for="item in principlesTop"
            :key="item.id"
            class="approach-principle approach-reveal approach-reveal--card"
            :style="{ '--approach-delay': `${item.delay}ms` }"
          >
            <div class="approach-principle__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
                <path :d="item.icon" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <h3 class="approach-principle__title">{{ item.title }}</h3>
            <p class="approach-principle__text">{{ item.text }}</p>
          </article>
        </div>

        <article class="approach-core approach-reveal approach-reveal--core">
          <span class="approach-core__label">Единая логика проекта</span>
          <h3 class="approach-core__title">Архитектура, которую можно реализовать без хаоса и лишних переделок</h3>
          <p class="approach-core__text">
            Проект проверяется не только на визуальный образ, но и на стоимость, конструктивную согласованность, инженерную
            целостность и будущую эксплуатацию.
          </p>
        </article>

        <div class="approach-system__grid approach-system__grid--bottom">
          <article
            v-for="item in principlesBottom"
            :key="item.id"
            class="approach-principle approach-reveal approach-reveal--card"
            :style="{ '--approach-delay': `${item.delay}ms` }"
          >
            <div class="approach-principle__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
                <path :d="item.icon" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <h3 class="approach-principle__title">{{ item.title }}</h3>
            <p class="approach-principle__text">{{ item.text }}</p>
          </article>
        </div>
      </div>

      <div class="approach-summary approach-reveal approach-reveal--summary">
        <div class="approach-summary__copy">
          <h3 class="approach-summary__title">Подход влияет не только на проект, но и на то, как пройдёт вся стройка</h3>
          <p class="approach-summary__text">
            Именно поэтому объект становится предсказуемее по бюджету, понятнее для команды реализации и стабильнее по срокам.
          </p>
        </div>
        <a href="#advantages" class="approach-summary__cta">
          <span>Посмотреть преимущества</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
            <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.approach-section {
  position: relative;
  isolation: isolate;
  overflow: clip;
  padding: 120px 32px;
  background:
    radial-gradient(circle at 50% 14%, rgba(201, 169, 110, 0.05), transparent 30%),
    radial-gradient(circle at 84% 78%, rgba(0, 196, 180, 0.04), transparent 34%),
    linear-gradient(180deg, #0a1428 0%, #111c33 54%, #0a1428 100%);
}

.approach-section__decor {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.4;
  background-image:
    linear-gradient(to right, rgba(167, 176, 193, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(167, 176, 193, 0.05) 1px, transparent 1px);
  background-size: 46px 46px, 46px 46px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.88) 25%, rgba(0, 0, 0, 0.25));
}

.approach-section__container {
  width: min(100%, 1280px);
  margin: 0 auto;
}

.approach__intro {
  max-width: 860px;
}

.approach__eyebrow {
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

.approach__title {
  margin: 20px 0 0;
  max-width: 980px;
  font-family: 'Montserrat', 'Manrope', sans-serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1.04;
  letter-spacing: -0.02em;
  font-weight: 750;
  color: #e0e0e0;
  text-wrap: balance;
}

.approach__title span {
  color: #c9a96e;
}

.approach__lead {
  margin: 28px 0 0;
  max-width: 760px;
  font-size: clamp(18px, 1.5vw, 20px);
  line-height: 1.65;
  color: #a7b0c1;
}

.approach-system {
  position: relative;
  margin-top: 52px;
  display: grid;
  gap: 24px;
}

.approach-system__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.approach-system__connections {
  position: absolute;
  inset: 28% 14% 28%;
  pointer-events: none;
  z-index: 0;
}

.approach-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(201, 169, 110, 0.14) 50%, transparent 100%);
}

.approach-line--1 {
  top: 26%;
}

.approach-line--2 {
  bottom: 26%;
}

.approach-core {
  position: relative;
  z-index: 1;
  width: min(100%, 520px);
  margin: 0 auto;
  border-radius: 32px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(180deg, rgba(30, 43, 71, 0.88), rgba(22, 35, 61, 0.92));
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.28);
  padding: 30px 32px;
}

.approach-core__label {
  font-size: 12px;
  line-height: 1.2;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(201, 169, 110, 0.88);
}

.approach-core__title {
  margin: 16px 0 0;
  font-size: clamp(1.75rem, 2.7vw, 2.1rem);
  line-height: 1.16;
  font-weight: 700;
  color: #e0e0e0;
  text-wrap: balance;
}

.approach-core__text {
  margin: 14px 0 0;
  font-size: 15px;
  line-height: 1.6;
  color: #a7b0c1;
}

.approach-principle {
  position: relative;
  z-index: 1;
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(17, 28, 51, 0.68);
  padding: 23px;
  min-height: 224px;
  transition:
    transform 280ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 280ms cubic-bezier(0.22, 1, 0.36, 1),
    background-color 280ms cubic-bezier(0.22, 1, 0.36, 1);
}

.approach-principle:hover {
  transform: translateY(-3px);
  border-color: rgba(201, 169, 110, 0.24);
  background: rgba(17, 28, 51, 0.78);
}

.approach-principle__icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(201, 169, 110, 0.08);
  color: #c9a96e;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: color 280ms ease, box-shadow 280ms ease, border-color 280ms ease;
}

.approach-principle__icon svg {
  width: 24px;
  height: 24px;
}

.approach-principle:hover .approach-principle__icon {
  color: #d4af37;
  border-color: rgba(201, 169, 110, 0.2);
  box-shadow: 0 0 18px rgba(201, 169, 110, 0.14);
}

.approach-principle__title {
  margin: 16px 0 0;
  font-size: clamp(1.25rem, 1.6vw, 1.45rem);
  line-height: 1.2;
  font-weight: 650;
  color: #e0e0e0;
  text-wrap: balance;
}

.approach-principle__text {
  margin: 10px 0 0;
  font-size: 15px;
  line-height: 1.62;
  color: #a7b0c1;
}

.approach-summary {
  margin-top: 36px;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(22, 35, 61, 0.56);
  padding: 28px 32px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 22px;
  align-items: center;
}

.approach-summary__title {
  margin: 0;
  max-width: 760px;
  font-size: clamp(1.55rem, 2.3vw, 2rem);
  line-height: 1.2;
  font-weight: 700;
  color: #e0e0e0;
  text-wrap: balance;
}

.approach-summary__text {
  margin: 12px 0 0;
  max-width: 760px;
  font-size: 16px;
  line-height: 1.62;
  color: #a7b0c1;
}

.approach-summary__cta {
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

.approach-summary__cta svg {
  width: 16px;
  height: 16px;
  transition: transform 260ms ease;
}

.approach-summary__cta:hover {
  border-color: rgba(0, 196, 180, 0.38);
  background: rgba(0, 196, 180, 0.18);
  box-shadow: 0 0 22px rgba(0, 196, 180, 0.16);
}

.approach-summary__cta:hover svg {
  transform: translateX(4px);
}

.approach-reveal {
  opacity: 0;
  transform: translateY(22px);
  transition:
    opacity 780ms ease-out,
    transform 780ms ease-out;
}

.approach-reveal--eyebrow {
  transition-delay: 0ms;
}

.approach-reveal--title {
  transition-delay: 100ms;
}

.approach-reveal--lead {
  transition-delay: 180ms;
}

.approach-reveal--core {
  transition-delay: 300ms;
}

.approach-reveal--card {
  transition-delay: var(--approach-delay, 420ms);
}

.approach-reveal--summary {
  transition-delay: 940ms;
}

.approach-section.is-visible .approach-reveal {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 1219px) {
  .approach-system__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .approach-principle {
    min-height: 0;
  }
}

@media (max-width: 1023px) {
  .approach-section {
    padding: 72px 20px;
  }

  .approach-section__decor {
    opacity: 0.2;
    background-size: 58px 58px, 58px 58px;
  }

  .approach__title {
    font-size: clamp(2rem, 8.8vw, 2.5rem);
    line-height: 1.08;
  }

  .approach__lead {
    margin-top: 20px;
    font-size: 16px;
    line-height: 1.6;
    max-width: 100%;
  }

  .approach-system {
    margin-top: 34px;
    gap: 14px;
  }

  .approach-system__connections {
    display: none;
  }

  .approach-system__grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .approach-system__grid--top {
    order: 2;
  }

  .approach-core {
    order: 1;
    width: 100%;
    border-radius: 24px;
    padding: 24px;
  }

  .approach-system__grid--bottom {
    order: 3;
  }

  .approach-core__title {
    font-size: clamp(1.6rem, 6.8vw, 1.95rem);
  }

  .approach-core__text {
    font-size: 15px;
  }

  .approach-principle {
    border-radius: 20px;
    padding: 19px;
  }

  .approach-principle__icon {
    width: 40px;
    height: 40px;
  }

  .approach-principle__title {
    font-size: 20px;
  }

  .approach-principle__text {
    font-size: 14px;
    line-height: 1.58;
  }

  .approach-summary {
    margin-top: 26px;
    border-radius: 22px;
    padding: 20px;
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .approach-summary__title {
    font-size: clamp(1.35rem, 5.8vw, 1.65rem);
  }

  .approach-summary__text {
    font-size: 15px;
    line-height: 1.58;
  }

  .approach-summary__cta {
    width: 100%;
    min-height: 50px;
  }

  .approach-reveal {
    transition:
      opacity 560ms ease-out,
      transform 560ms ease-out;
  }
}

@media (prefers-reduced-motion: reduce) {
  .approach-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .approach-principle,
  .approach-principle__icon,
  .approach-summary__cta,
  .approach-summary__cta svg {
    transition: none;
  }
}
</style>
