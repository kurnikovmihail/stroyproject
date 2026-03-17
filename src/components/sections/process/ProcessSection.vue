<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const sectionRef = ref(null)
const stepRefs = ref([])
const isVisible = ref(false)
const activeStepId = ref('consultation')

let sectionObserver
let stepObserver

const steps = [
  {
    id: 'consultation',
    index: '01',
    phase: 'старт',
    status: 'Старт',
    title: 'Первичная консультация',
    text: 'Разбираем задачу, исходные вводные по объекту, ожидания по бюджету и сроки, чтобы собрать корректную стартовую рамку проекта.',
    result: 'Структура проекта, список исходных данных и понятная траектория следующего шага.',
    duration: '1–2 дня',
    approvals: '1 встреча + резюме',
    side: 'top',
    area: 's1',
  },
  {
    id: 'analysis',
    index: '02',
    phase: 'анализ',
    status: 'Анализ',
    title: 'Предпроектный анализ',
    text: 'Фиксируем ограничения участка, рельеф, инсоляцию, технический контекст и сценарии использования объекта.',
    result: 'Карту ограничений и параметров, на основе которой принимаются дальнейшие архитектурные решения.',
    duration: '4–7 дней',
    approvals: '1 согласование',
    tags: ['участок', 'ограничения', 'сценарии'],
    side: 'bottom',
    area: 's2',
  },
  {
    id: 'concept',
    index: '03',
    phase: 'концепция',
    status: 'Концепция',
    title: 'Концепция и планировки',
    text: 'Формируем пространственную логику, планировочную структуру и функциональные сценарии с учетом реальной реализации.',
    result: 'Согласованную концепцию и рабочий вариант планировок для перехода к архитектурной проработке.',
    duration: '2–4 недели',
    approvals: '2–3 итерации',
    side: 'top',
    area: 's3',
    isKey: true,
  },
  {
    id: 'architecture',
    index: '04',
    phase: 'архитектура',
    status: 'Архитектура',
    title: 'Архитектурный проект',
    text: 'Прорабатываем фасады, объемно-пространственные решения и архитектурную логику с учетом конструктивной согласованности.',
    result: 'Целостный архитектурный раздел, который отражает образ объекта и его техническую реализуемость.',
    duration: '2–3 недели',
    approvals: '1–2 согласования',
    side: 'bottom',
    area: 's4',
  },
  {
    id: 'documentation',
    index: '05',
    phase: 'документация',
    status: 'Документация',
    title: 'Рабочая документация',
    text: 'Готовим комплект чертежей, узлов и спецификаций, чтобы строители работали без трактовок и постоянных уточнений.',
    result: 'Понятный и детальный рабочий комплект для предсказуемой реализации на площадке.',
    duration: '3–5 недель',
    approvals: 'Пакет согласований',
    side: 'top',
    area: 's5',
  },
  {
    id: 'support',
    index: '06',
    phase: 'реализация',
    status: 'Реализация',
    title: 'Сопровождение реализации',
    text: 'Консультируем в ходе стройки, помогаем разбирать вопросы подрядчиков и удерживать проектную логику в реализации.',
    result: 'Контроль проектных решений на стройке и снижение риска хаоса при переходе к реальному объекту.',
    duration: 'По графику стройки',
    approvals: 'Регулярные сверки',
    side: 'bottom',
    area: 's6',
    isFinal: true,
  },
]

const activeIndex = computed(() => {
  const foundIndex = steps.findIndex((step) => step.id === activeStepId.value)
  return foundIndex < 0 ? 0 : foundIndex
})

const activeProgress = computed(() => ((activeIndex.value + 1) / steps.length) * 100)

const setStepRef = (element, index) => {
  if (!element) return
  stepRefs.value[index] = element
}

const setActiveStep = (stepId) => {
  activeStepId.value = stepId
}

onMounted(() => {
  sectionObserver = new IntersectionObserver(
    (entries) => {
      const [entry] = entries
      if (!entry) return

      if (entry.isIntersecting) {
        isVisible.value = true
        sectionObserver?.disconnect()
      }
    },
    { threshold: 0.16 },
  )

  if (sectionRef.value) {
    sectionObserver.observe(sectionRef.value)
  }

  stepObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const stepId = entry.target.getAttribute('data-step-id')
        if (!stepId) return
        activeStepId.value = stepId
      })
    },
    {
      threshold: 0,
      rootMargin: '-35% 0px -45% 0px',
    },
  )

  stepRefs.value.forEach((element) => {
    if (element) {
      stepObserver.observe(element)
    }
  })
})

onBeforeUnmount(() => {
  sectionObserver?.disconnect()
  stepObserver?.disconnect()
})
</script>

<template>
  <section
    id="process"
    ref="sectionRef"
    class="process-section"
    :class="{ 'is-visible': isVisible }"
    aria-labelledby="process-title"
  >
    <div class="process-section__decor" aria-hidden="true"></div>

    <div class="process">
      <div class="process__intro">
        <span class="process__eyebrow process-reveal process-reveal--eyebrow">Как проходит работа</span>
        <h2 id="process-title" class="process__title process-reveal process-reveal--title">
          Прозрачный процесс: <span>этапы, сроки и согласования</span>
        </h2>
        <p class="process__lead process-reveal process-reveal--lead">
          Каждый этап имеет свою задачу, контрольные точки согласования и конкретный результат, чтобы вы понимали, где сейчас
          находится проект и что будет дальше.
        </p>
      </div>

      <div class="process-rail process-reveal process-reveal--rail" aria-hidden="true">
        <span
          v-for="(step, index) in steps"
          :key="`rail-${step.id}`"
          class="process-rail__item"
          :class="{
            'is-complete': index < activeIndex,
            'is-active': step.id === activeStepId,
          }"
        >
          {{ step.status }}
        </span>
      </div>

      <div class="process-track process-reveal process-reveal--track" :style="{ '--active-progress': `${activeProgress}%` }">
        <div class="process-track__line" aria-hidden="true">
          <span class="process-track__line-base"></span>
          <span class="process-track__line-active"></span>
        </div>

        <article
          v-for="(step, index) in steps"
          :key="step.id"
          :ref="(element) => setStepRef(element, index)"
          class="process-step process-reveal process-reveal--step"
          :class="[
            `process-step--${step.side}`,
            `process-step--${step.area}`,
            {
              'is-active': step.id === activeStepId,
              'is-complete': index < activeIndex,
              'is-key': step.isKey,
              'is-final': step.isFinal,
            },
          ]"
          :style="{ '--step-delay': `${300 + index * 90}ms` }"
          :data-step-id="step.id"
          @mouseenter="setActiveStep(step.id)"
          @focusin="setActiveStep(step.id)"
          @click="setActiveStep(step.id)"
        >
          <span class="process-step__anchor" aria-hidden="true">
            <span class="process-step__anchor-ring"></span>
            <span class="process-step__anchor-dot"></span>
          </span>

          <div class="process-step__card">
            <div class="process-step__meta">
              <span class="process-step__index">{{ step.index }}</span>
              <span class="process-step__meta-separator">·</span>
              <span class="process-step__phase">{{ step.phase }}</span>
            </div>

            <h3 class="process-step__title">{{ step.title }}</h3>
            <p class="process-step__text">{{ step.text }}</p>

            <div v-if="step.tags?.length" class="process-step__tags">
              <span v-for="tag in step.tags" :key="`${step.id}-${tag}`" class="process-step__tag">{{ tag }}</span>
            </div>

            <div class="process-step__result">
              <p class="process-step__result-label">Что получает клиент</p>
              <p class="process-step__result-text">{{ step.result }}</p>
            </div>

            <div class="process-step__chips">
              <span class="process-step__chip">{{ step.duration }}</span>
              <span class="process-step__chip">{{ step.approvals }}</span>
            </div>
          </div>
        </article>
      </div>

      <div class="process-summary process-reveal process-reveal--summary">
        <div class="process-summary__copy">
          <h3 class="process-summary__title">
            Работа разбита на понятные этапы, где у клиента всегда есть <span>контрольная точка</span> и ясность по следующему
            шагу.
          </h3>
          <p class="process-summary__text">
            Вы видите, что происходит на каждом этапе, какие решения согласуются и какой практический результат получаете до
            перехода к следующей фазе проекта.
          </p>
        </div>

        <a href="#scope" class="process-summary__cta">
          <span>Посмотреть состав работ</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
            <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.process-section {
  position: relative;
  isolation: isolate;
  overflow: clip;
  padding: 120px 32px;
  background:
    radial-gradient(circle at 52% 14%, rgba(201, 169, 110, 0.05), transparent 30%),
    radial-gradient(circle at 50% 58%, rgba(0, 196, 180, 0.05), transparent 38%),
    linear-gradient(180deg, #0a1428 0%, #101f39 54%, #0a1428 100%);
}

.process-section__decor {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.34;
  background-image:
    linear-gradient(to right, rgba(167, 176, 193, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(167, 176, 193, 0.05) 1px, transparent 1px);
  background-size: 52px 52px, 52px 52px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.86) 24%, rgba(0, 0, 0, 0.24));
}

.process {
  width: min(100%, 1360px);
  margin: 0 auto;
}

.process__intro {
  max-width: 860px;
}

.process__eyebrow {
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

.process__title {
  margin: 20px 0 0;
  max-width: 980px;
  font-family: 'Montserrat', 'Manrope', sans-serif;
  font-size: clamp(2.6rem, 5vw, 4rem);
  line-height: 1.03;
  letter-spacing: -0.02em;
  font-weight: 760;
  color: #e0e0e0;
  text-wrap: balance;
}

.process__title span {
  color: #c9a96e;
}

.process__lead {
  margin: 28px 0 0;
  max-width: 820px;
  font-size: clamp(18px, 1.45vw, 20px);
  line-height: 1.65;
  color: #a7b0c1;
}

.process-rail {
  margin-top: 28px;
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
}

.process-rail__item {
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(22, 35, 61, 0.62);
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #a7b0c1;
  transition:
    color 260ms ease,
    border-color 260ms ease,
    background-color 260ms ease,
    box-shadow 260ms ease;
}

.process-rail__item.is-complete {
  border-color: rgba(201, 169, 110, 0.24);
  color: rgba(224, 224, 224, 0.92);
  background: rgba(201, 169, 110, 0.1);
}

.process-rail__item.is-active {
  border-color: rgba(0, 196, 180, 0.34);
  color: #e0e0e0;
  background: rgba(0, 196, 180, 0.14);
  box-shadow: 0 0 16px rgba(0, 196, 180, 0.14);
}

.process-track {
  --active-progress: 16.666%;
  position: relative;
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-areas:
    's1 s3 s5'
    's2 s4 s6';
  gap: 120px 22px;
}

.process-track__line {
  position: absolute;
  left: 12%;
  right: 12%;
  top: 50%;
  transform: translateY(-50%);
  height: 2px;
  pointer-events: none;
  z-index: 0;
}

.process-track__line-base,
.process-track__line-active {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  border-radius: 999px;
}

.process-track__line-base {
  width: 100%;
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0.16) 0%, rgba(167, 176, 193, 0.16) 100%),
    repeating-linear-gradient(
      to right,
      rgba(167, 176, 193, 0.26) 0,
      rgba(167, 176, 193, 0.26) 7px,
      rgba(167, 176, 193, 0.02) 7px,
      rgba(167, 176, 193, 0.02) 14px
    );
}

.process-track__line-active {
  width: var(--active-progress);
  background: linear-gradient(90deg, rgba(201, 169, 110, 0.82) 0%, rgba(0, 196, 180, 0.9) 100%);
  box-shadow: 0 0 16px rgba(0, 196, 180, 0.2);
  transition: width 520ms cubic-bezier(0.22, 1, 0.36, 1);
}

.process-step {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 360px;
  justify-self: center;
}

.process-step--s1 {
  grid-area: s1;
}

.process-step--s2 {
  grid-area: s2;
}

.process-step--s3 {
  grid-area: s3;
}

.process-step--s4 {
  grid-area: s4;
}

.process-step--s5 {
  grid-area: s5;
}

.process-step--s6 {
  grid-area: s6;
}

.process-step__card {
  height: 344px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(22, 35, 61, 0.82);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.22);
  padding: 24px;
  display: flex;
  flex-direction: column;
  transition:
    transform 280ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 280ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1),
    background-color 280ms cubic-bezier(0.22, 1, 0.36, 1);
}

.process-step__anchor {
  position: absolute;
  left: 50%;
  width: 18px;
  height: 18px;
  transform: translateX(-50%);
}

.process-step__anchor::before {
  content: '';
  position: absolute;
  left: 50%;
  width: 1px;
  transform: translateX(-50%);
  background: linear-gradient(180deg, rgba(167, 176, 193, 0.1), rgba(167, 176, 193, 0.42));
}

.process-step--top .process-step__anchor {
  bottom: -60px;
}

.process-step--top .process-step__anchor::before {
  top: -44px;
  height: 44px;
}

.process-step--bottom .process-step__anchor {
  top: -60px;
}

.process-step--bottom .process-step__anchor::before {
  bottom: -44px;
  height: 44px;
}

.process-step__anchor-ring,
.process-step__anchor-dot {
  position: absolute;
  border-radius: 999px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.process-step__anchor-ring {
  width: 18px;
  height: 18px;
  border: 1px solid rgba(201, 169, 110, 0.56);
  background: rgba(12, 23, 41, 0.8);
  box-shadow: 0 0 0 0 rgba(0, 196, 180, 0);
  transition:
    border-color 280ms ease,
    box-shadow 280ms ease,
    transform 280ms ease;
}

.process-step__anchor-dot {
  width: 6px;
  height: 6px;
  background: #c9a96e;
  transition: background-color 280ms ease, transform 280ms ease;
}

.process-step__meta {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: rgba(201, 169, 110, 0.9);
}

.process-step__meta-separator {
  color: rgba(167, 176, 193, 0.48);
}

.process-step__title {
  margin: 14px 0 0;
  font-size: clamp(1.42rem, 1.45vw, 1.75rem);
  line-height: 1.18;
  font-weight: 680;
  color: #e0e0e0;
  text-wrap: balance;
}

.process-step__text {
  margin: 11px 0 0;
  font-size: 15px;
  line-height: 1.62;
  color: #a7b0c1;
}

.process-step__tags {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.process-step__tag {
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  padding: 6px 10px;
  font-size: 11px;
  line-height: 1;
  color: #a7b0c1;
}

.process-step__result {
  margin-top: auto;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.03);
  padding: 12px 14px;
}

.process-step__result-label {
  margin: 0;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: rgba(201, 169, 110, 0.9);
}

.process-step__result-text {
  margin: 8px 0 0;
  font-size: 14px;
  line-height: 1.55;
  color: #d5dce9;
}

.process-step__chips {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.process-step__chip {
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  padding: 7px 10px;
  font-size: 12px;
  line-height: 1.2;
  color: #a7b0c1;
}

.process-step.is-active .process-step__card,
.process-step:hover .process-step__card {
  transform: translateY(-4px);
  border-color: rgba(201, 169, 110, 0.24);
  background: rgba(22, 35, 61, 0.9);
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.28);
}

.process-step.is-active .process-step__anchor-ring,
.process-step:hover .process-step__anchor-ring {
  border-color: rgba(0, 196, 180, 0.66);
  box-shadow: 0 0 0 6px rgba(0, 196, 180, 0.12);
  transform: translate(-50%, -50%) scale(1.04);
}

.process-step.is-active .process-step__anchor-dot,
.process-step:hover .process-step__anchor-dot {
  background: #00c4b4;
  transform: translate(-50%, -50%) scale(1.08);
}

.process-step.is-complete .process-step__meta {
  color: rgba(212, 175, 122, 0.96);
}

.process-step.is-key .process-step__card {
  border-color: rgba(201, 169, 110, 0.2);
  background: linear-gradient(180deg, rgba(24, 39, 67, 0.88), rgba(22, 35, 61, 0.9));
}

.process-step.is-final .process-step__card {
  border-color: rgba(0, 196, 180, 0.24);
  background: linear-gradient(180deg, rgba(21, 39, 67, 0.9), rgba(17, 33, 58, 0.92));
}

.process-summary {
  margin-top: 38px;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(17, 28, 51, 0.72), rgba(22, 35, 61, 0.9));
  padding: 32px 36px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 20px;
  align-items: center;
}

.process-summary__title {
  margin: 0;
  max-width: 780px;
  font-size: clamp(1.5rem, 2vw, 2rem);
  line-height: 1.2;
  font-weight: 690;
  color: #e0e0e0;
  text-wrap: balance;
}

.process-summary__title span {
  color: #c9a96e;
}

.process-summary__text {
  margin: 12px 0 0;
  max-width: 760px;
  font-size: 16px;
  line-height: 1.62;
  color: #a7b0c1;
}

.process-summary__cta {
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

.process-summary__cta svg {
  width: 16px;
  height: 16px;
  transition: transform 240ms ease;
}

.process-summary__cta:hover {
  border-color: rgba(0, 196, 180, 0.4);
  background: rgba(0, 196, 180, 0.2);
  box-shadow: 0 0 18px rgba(0, 196, 180, 0.14);
}

.process-summary__cta:hover svg {
  transform: translateX(4px);
}

.process-reveal {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 760ms ease-out,
    transform 760ms ease-out;
}

.process-reveal--eyebrow {
  transition-delay: 0ms;
}

.process-reveal--title {
  transition-delay: 90ms;
}

.process-reveal--lead {
  transition-delay: 170ms;
}

.process-reveal--rail {
  transition-delay: 230ms;
}

.process-reveal--track {
  transition-delay: 300ms;
}

.process-reveal--step {
  transition-delay: var(--step-delay, 320ms);
}

.process-reveal--summary {
  transition-delay: 720ms;
}

.process-section.is-visible .process-reveal {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 1279px) {
  .process-track {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-areas:
      's1 s2'
      's3 s4'
      's5 s6';
    gap: 74px 18px;
  }

  .process-track__line {
    display: none;
  }

  .process-step__card {
    height: auto;
    min-height: 338px;
  }

  .process-step--top .process-step__anchor,
  .process-step--bottom .process-step__anchor {
    top: auto;
    bottom: -38px;
  }

  .process-step--top .process-step__anchor::before,
  .process-step--bottom .process-step__anchor::before {
    top: -24px;
    bottom: auto;
    height: 24px;
  }
}

@media (max-width: 1023px) {
  .process-section {
    padding: 72px 20px;
  }

  .process__title {
    font-size: clamp(2rem, 8.8vw, 2.5rem);
    line-height: 1.08;
  }

  .process__lead {
    margin-top: 20px;
    font-size: 16px;
    line-height: 1.6;
    max-width: 100%;
  }

  .process-rail {
    margin-top: 22px;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 6px;
  }

  .process-rail__item {
    flex: 0 0 auto;
    font-size: 11px;
  }

  .process-track {
    margin-top: 26px;
    grid-template-columns: 1fr;
    grid-template-areas: none;
    gap: 14px;
    padding-left: 30px;
  }

  .process-track::before,
  .process-track::after {
    content: '';
    position: absolute;
    left: 8px;
    top: 8px;
    bottom: 8px;
    width: 2px;
    border-radius: 999px;
    pointer-events: none;
  }

  .process-track::before {
    background: rgba(167, 176, 193, 0.26);
  }

  .process-track::after {
    background: linear-gradient(180deg, rgba(201, 169, 110, 0.92), rgba(0, 196, 180, 0.92));
    height: var(--active-progress);
    top: 8px;
    bottom: auto;
    transition: height 520ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .process-track__line {
    display: none;
  }

  .process-step {
    grid-area: auto !important;
    max-width: none;
  }

  .process-step__anchor {
    left: -22px;
    top: 28px !important;
    bottom: auto !important;
    width: 16px;
    height: 16px;
    transform: none;
  }

  .process-step__anchor::before {
    display: none;
  }

  .process-step__anchor-ring {
    width: 16px;
    height: 16px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .process-step__anchor-dot {
    width: 5px;
    height: 5px;
  }

  .process-step__card {
    min-height: 0;
    border-radius: 20px;
    padding: 20px;
  }

  .process-step__title {
    margin-top: 12px;
    font-size: 22px;
    line-height: 1.2;
  }

  .process-step__text {
    font-size: 14px;
    line-height: 1.58;
  }

  .process-step__result {
    margin-top: 12px;
    padding: 11px 12px;
  }

  .process-step__result-text {
    font-size: 14px;
    line-height: 1.52;
  }

  .process-step__chips {
    margin-top: 10px;
    gap: 7px;
  }

  .process-step__chip {
    font-size: 11px;
  }

  .process-summary {
    margin-top: 22px;
    border-radius: 22px;
    padding: 20px;
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .process-summary__title {
    font-size: 24px;
  }

  .process-summary__text {
    margin-top: 10px;
    font-size: 15px;
    line-height: 1.58;
  }

  .process-summary__cta {
    width: 100%;
    min-height: 50px;
  }

  .process-reveal {
    transition:
      opacity 560ms ease-out,
      transform 560ms ease-out;
  }
}

@media (prefers-reduced-motion: reduce) {
  .process-reveal,
  .process-step__card,
  .process-track__line-active,
  .process-track::after,
  .process-step__anchor-ring,
  .process-step__anchor-dot,
  .process-summary__cta svg {
    transition: none;
  }
}
</style>
