<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const sectionRef = ref(null)
const isVisible = ref(false)
let observer

const stages = [
  {
    id: 'consultation',
    index: '01',
    title: 'Первичная консультация',
    text: 'Фиксируем задачу, вводные по объекту и целевой бюджет, чтобы задать корректный старт проекта.',
    result: 'Структура старта и список исходных данных.',
  },
  {
    id: 'analysis',
    index: '02',
    title: 'Предпроектный анализ',
    text: 'Оцениваем участок, ограничения, рельеф и контекст, чтобы решения сразу опирались на реальную среду.',
    result: 'Карта ограничений и приоритетов по объекту.',
  },
  {
    id: 'concept',
    index: '03',
    title: 'Концепция и планировки',
    text: 'Собираем пространственную логику и планировочную структуру с учетом сценариев использования.',
    result: 'Согласованный концепт и рабочая планировка.',
  },
  {
    id: 'architecture',
    index: '04',
    title: 'Архитектурный проект',
    text: 'Прорабатываем фасады, объем и архитектурный язык, сохраняя связку с конструктивной реализуемостью.',
    result: 'Целостный архитектурный раздел проекта.',
  },
  {
    id: 'documentation',
    index: '05',
    title: 'Рабочая документация',
    text: 'Формируем комплект чертежей, узлов и спецификаций для предсказуемой работы строителей.',
    result: 'Подробный рабочий комплект без лишних трактовок.',
  },
  {
    id: 'support',
    index: '06',
    title: 'Сопровождение реализации',
    text: 'Поддерживаем проект в ходе стройки, синхронизируем решения и снимаем технические вопросы подрядчиков.',
    result: 'Контроль качества реализации и хода проекта.',
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
    id="services"
    ref="sectionRef"
    class="services-section"
    :class="{ 'is-visible': isVisible }"
    aria-labelledby="services-title"
  >
    <div class="services-section__decor" aria-hidden="true"></div>

    <div class="services">
      <div class="services__intro">
        <span class="services__eyebrow services-reveal services-reveal--eyebrow">Форматы проектирования</span>
        <h2 id="services-title" class="services__title services-reveal services-reveal--title">
          Выберите <span>маршрут проектирования</span> под ваш объект
        </h2>
        <p class="services__lead services-reveal services-reveal--lead">
          Спокойный и понятный маршрут из шести этапов: от входной консультации до сопровождения реализации.
        </p>
      </div>

      <div class="services-grid services-reveal services-reveal--grid">
        <article v-for="(stage, index) in stages" :key="stage.id" class="service-stage" :style="{ '--delay': `${index * 70}ms` }">
          <p class="service-stage__meta">Этап {{ stage.index }}</p>
          <h3 class="service-stage__title">{{ stage.title }}</h3>
          <p class="service-stage__text">{{ stage.text }}</p>
          <div class="service-stage__result">
            <p class="service-stage__result-label">Результат этапа</p>
            <p class="service-stage__result-text">{{ stage.result }}</p>
          </div>
        </article>
      </div>

      <div class="services-scheme services-reveal services-reveal--scheme">
        <p class="services-scheme__text">
          Полный маршрут проектирования можно открыть или скачать в виде схемы.
        </p>
        <div class="services-scheme__actions">
          <a href="/images/project-route-scheme-download.png" target="_blank" rel="noopener" class="services-scheme__action">
            Посмотреть схему
          </a>
          <a href="/images/project-route-scheme-download.png" download="stroyproject-route-scheme.png" class="services-scheme__action services-scheme__action--ghost">
            Скачать изображение
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services-section {
  position: relative;
  isolation: isolate;
  overflow: clip;
  padding: 120px 32px;
  background:
    radial-gradient(circle at 48% 44%, rgba(201, 169, 110, 0.06), transparent 34%),
    radial-gradient(circle at 54% 60%, rgba(0, 196, 180, 0.05), transparent 38%),
    linear-gradient(180deg, #0a1428 0%, #111c33 50%, #0a1428 100%);
}

.services-section__decor {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.34;
  background-image:
    linear-gradient(to right, rgba(167, 176, 193, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(167, 176, 193, 0.05) 1px, transparent 1px);
  background-size: 52px 52px, 52px 52px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.86) 24%, rgba(0, 0, 0, 0.2));
}

.services {
  width: min(100%, 1320px);
  margin: 0 auto;
}

.services__intro {
  max-width: 860px;
}

.services__eyebrow {
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

.services__title {
  margin: 20px 0 0;
  max-width: 980px;
  font-family: 'Montserrat', 'Manrope', sans-serif;
  font-size: clamp(2.65rem, 5vw, 4rem);
  line-height: 1.04;
  letter-spacing: -0.02em;
  font-weight: 760;
  color: #e0e0e0;
  text-wrap: balance;
}

.services__title span {
  color: #c9a96e;
}

.services__lead {
  margin: 26px 0 0;
  max-width: 820px;
  font-size: clamp(18px, 1.45vw, 20px);
  line-height: 1.65;
  color: #a7b0c1;
}

.services-grid {
  margin-top: 42px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  align-items: stretch;
}

.service-stage {
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(22, 35, 61, 0.78);
  box-shadow: 0 16px 42px rgba(0, 0, 0, 0.2);
  min-height: 276px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  transition:
    border-color 260ms ease,
    background-color 260ms ease,
    transform 260ms ease;
}

.service-stage:hover {
  transform: translateY(-3px);
  border-color: rgba(201, 169, 110, 0.22);
  background: rgba(24, 39, 67, 0.88);
}

.service-stage__meta {
  margin: 0;
  font-size: 12px;
  line-height: 1.2;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: rgba(201, 169, 110, 0.9);
}

.service-stage__title {
  margin: 12px 0 0;
  font-size: clamp(1.28rem, 1.4vw, 1.58rem);
  line-height: 1.18;
  font-weight: 680;
  color: #e0e0e0;
}

.service-stage__text {
  margin: 14px 0 0;
  font-size: 15px;
  line-height: 1.6;
  color: #a7b0c1;
}

.service-stage__result {
  margin-top: auto;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.03);
  padding: 12px 14px;
}

.service-stage__result-label {
  margin: 0;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: rgba(201, 169, 110, 0.9);
}

.service-stage__result-text {
  margin: 8px 0 0;
  font-size: 14px;
  line-height: 1.52;
  color: #d5dce9;
}

.services-scheme {
  margin-top: 24px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(17, 28, 51, 0.74), rgba(22, 35, 61, 0.9));
  padding: 24px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 14px 18px;
  align-items: center;
}

.services-scheme__text {
  margin: 0;
  font-size: 16px;
  line-height: 1.58;
  color: #a7b0c1;
}

.services-scheme__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
}

.services-scheme__action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  border-radius: 999px;
  border: 1px solid rgba(0, 196, 180, 0.3);
  background: rgba(0, 196, 180, 0.14);
  padding: 0 16px;
  font-size: 14px;
  font-weight: 600;
  color: #e0e0e0;
  transition:
    border-color 240ms ease,
    background-color 240ms ease,
    box-shadow 240ms ease;
}

.services-scheme__action:hover {
  border-color: rgba(0, 196, 180, 0.44);
  background: rgba(0, 196, 180, 0.2);
  box-shadow: 0 0 16px rgba(0, 196, 180, 0.12);
}

.services-scheme__action--ghost {
  border-color: rgba(201, 169, 110, 0.24);
  background: rgba(201, 169, 110, 0.12);
}

.services-scheme__action--ghost:hover {
  border-color: rgba(201, 169, 110, 0.36);
  background: rgba(201, 169, 110, 0.18);
  box-shadow: 0 0 16px rgba(201, 169, 110, 0.12);
}

.services-reveal {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 760ms ease-out,
    transform 760ms ease-out;
}

.services-reveal--eyebrow {
  transition-delay: 0ms;
}

.services-reveal--title {
  transition-delay: 90ms;
}

.services-reveal--lead {
  transition-delay: 170ms;
}

.services-reveal--grid {
  transition-delay: 260ms;
}

.services-reveal--scheme {
  transition-delay: 460ms;
}

.services-section.is-visible .services-reveal {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 1279px) {
  .services-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 1023px) {
  .services-section {
    padding: 72px 20px;
  }

  .services__title {
    font-size: clamp(2rem, 8.8vw, 2.5rem);
    line-height: 1.08;
  }

  .services__lead {
    margin-top: 18px;
    font-size: 16px;
    line-height: 1.6;
    max-width: 100%;
  }

  .services-grid {
    margin-top: 28px;
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .service-stage {
    min-height: 0;
    border-radius: 20px;
    padding: 18px;
  }

  .service-stage__title {
    font-size: 20px;
  }

  .service-stage__text {
    font-size: 14px;
    line-height: 1.56;
  }

  .service-stage__result {
    margin-top: 12px;
    padding: 11px 12px;
  }

  .services-scheme {
    margin-top: 18px;
    border-radius: 20px;
    padding: 18px;
    grid-template-columns: 1fr;
  }

  .services-scheme__text {
    font-size: 15px;
    line-height: 1.56;
  }

  .services-scheme__actions {
    justify-content: stretch;
    display: grid;
    grid-template-columns: 1fr;
  }

  .services-scheme__action {
    width: 100%;
    min-height: 50px;
  }

  .services-reveal {
    transition:
      opacity 560ms ease-out,
      transform 560ms ease-out;
  }
}

@media (prefers-reduced-motion: reduce) {
  .services-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .service-stage,
  .services-scheme__action {
    transition: none;
  }
}
</style>
