<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const sectionRef = ref(null)
const isVisible = ref(false)
let observer

const metrics = [
  {
    value: '70+',
    title: 'реализованных объектов',
    text: 'Частные и коммерческие проекты с разной степенью сложности и эксплуатационными сценариями.',
  },
  {
    value: '15 000+',
    title: 'м² спроектированной площади',
    text: 'Объекты разного масштаба, где архитектура связана с конструктивной и инженерной логикой.',
  },
  {
    value: '15+',
    title: 'лет практического опыта',
    text: 'Системная практика в проектировании с прозрачной структурой этапов и контрольных точек.',
  },
  {
    value: '92%',
    title: 'проектов без переделок планировок',
    text: 'Большая часть объектов проходит реализацию без пересборки базовых планировочных решений.',
  },
]

const regions = [
  'Московская область',
  'Ленинградская область',
  'Калининградская область',
  'Республика Карелия',
  'Краснодарский край',
  'Ростовская область',
  'Ставропольский край',
  'Республика Крым',
  'Республика Татарстан',
  'Самарская область',
  'Нижегородская область',
  'Республика Башкортостан',
  'Свердловская область',
  'Челябинская область',
  'Тюменская область',
  'Пермский край',
  'Новосибирская область',
  'Омская область',
  'Томская область',
  'Красноярский край',
  'Иркутская область',
  'Алтайский край',
  'Приморский край',
  'Хабаровский край',
]

const modules = [
  {
    status: 'Подтверждено',
    title: 'Допуск СРО',
    text: 'Работаем в рамках профильных требований и юридически корректного проектного процесса.',
    accent: 'warm',
  },
  {
    status: 'Цифровая среда',
    title: 'BIM / Revit компетенции',
    text: 'Цифровая координация разделов снижает конфликтность решений и повышает точность проектной модели.',
    accent: 'cool',
  },
  {
    status: 'Проектные стандарты',
    title: 'Стандарты LOD и регламенты',
    text: 'Фиксируем глубину проработки и структуру данных, чтобы команда реализации работала предсказуемо.',
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
    id="trust"
    ref="sectionRef"
    class="trust-section"
    :class="{ 'is-visible': isVisible }"
    aria-labelledby="trust-title"
  >
    <div class="trust-section__decor" aria-hidden="true"></div>

    <div class="trust">
      <div class="trust__intro">
        <span class="trust__eyebrow trust-reveal trust-reveal--eyebrow">Доверие и профессионализм</span>
        <h2 id="trust-title" class="trust__title trust-reveal trust-reveal--title">
          <span>Сильные цифры</span>, широкая география и подтверждённая экспертиза
        </h2>
        <p class="trust__lead trust-reveal trust-reveal--lead">
          Опираемся не только на визуальную подачу, но и на практический опыт, масштаб реализованных задач, региональную
          экспертизу и профессиональные стандарты проектирования.
        </p>
      </div>

      <div class="trust-metrics trust-reveal trust-reveal--metrics">
        <article
          v-for="(metric, index) in metrics"
          :key="metric.value"
          class="trust-metric trust-reveal trust-reveal--metric"
          :style="{ '--metric-delay': `${280 + index * 90}ms` }"
        >
          <p class="trust-metric__value">{{ metric.value }}</p>
          <h3 class="trust-metric__title">{{ metric.title }}</h3>
          <p class="trust-metric__text">{{ metric.text }}</p>
        </article>
      </div>

      <div class="trust-panels trust-reveal trust-reveal--panels">
        <article class="trust-geography">
          <h3 class="trust-geography__title">География проектов</h3>
          <p class="trust-geography__text">
            Работаем с объектами в разных субъектах РФ, а также подключаем дистанционный формат по России и СНГ.
          </p>

          <div class="trust-geography__regions">
            <span v-for="region in regions" :key="region" class="trust-geography__region">{{ region }}</span>
          </div>
        </article>

        <article class="trust-guarantee">
          <span class="trust-guarantee__label">Гарантия</span>
          <h3 class="trust-guarantee__title">Если в рабочей документации обнаружится ошибка по нашей вине — дорабатываем бесплатно.</h3>
          <p class="trust-guarantee__text">
            Берём ответственность за качество проектных решений и оперативно закрываем замечания в рамках нашей зоны
            ответственности.
          </p>
        </article>
      </div>

      <div class="trust-modules trust-reveal trust-reveal--modules">
        <article
          v-for="(module, index) in modules"
          :key="module.title"
          class="trust-module trust-reveal trust-reveal--module"
          :class="`trust-module--${module.accent}`"
          :style="{ '--module-delay': `${520 + index * 90}ms` }"
        >
          <p class="trust-module__status">{{ module.status }}</p>
          <h3 class="trust-module__title">{{ module.title }}</h3>
          <p class="trust-module__text">{{ module.text }}</p>
        </article>
      </div>

      <div class="trust-footer trust-reveal trust-reveal--footer">
        <p class="trust-footer__text">
          Сначала подтверждаем доверие цифрами и системой работы, затем показываем, кто лично отвечает за качество проекта и
          контроль ключевых решений.
        </p>
        <a href="#director" class="trust-footer__cta">
          <span>Познакомиться с директором</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
            <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.trust-section {
  position: relative;
  isolation: isolate;
  overflow: clip;
  padding: 120px 32px;
  background:
    radial-gradient(circle at 34% 20%, rgba(201, 169, 110, 0.04), transparent 30%),
    radial-gradient(circle at 72% 70%, rgba(0, 196, 180, 0.025), transparent 36%),
    linear-gradient(180deg, #0a1428 0%, #111c33 52%, #0a1428 100%);
}

.trust-section__decor {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.2;
  background-image:
    linear-gradient(to right, rgba(167, 176, 193, 0.045) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(167, 176, 193, 0.045) 1px, transparent 1px);
  background-size: 56px 56px, 56px 56px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.85) 24%, rgba(0, 0, 0, 0.2));
}

.trust {
  width: min(100%, 1280px);
  margin: 0 auto;
}

.trust__intro {
  max-width: 840px;
}

.trust__eyebrow {
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

.trust__title {
  margin: 20px 0 0;
  max-width: 960px;
  font-family: 'Montserrat', 'Manrope', sans-serif;
  font-size: clamp(2.5rem, 5vw, 3.75rem);
  line-height: 1.04;
  letter-spacing: -0.02em;
  font-weight: 760;
  color: #e0e0e0;
  text-wrap: balance;
}

.trust__title span {
  color: #c9a96e;
}

.trust__lead {
  margin: 28px 0 0;
  max-width: 800px;
  font-size: clamp(18px, 1.45vw, 20px);
  line-height: 1.65;
  color: #a7b0c1;
}

.trust-metrics {
  margin-top: 38px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
}

.trust-metric {
  position: relative;
  border-radius: 26px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(22, 35, 61, 0.72);
  padding: 28px;
  min-height: 224px;
  transition:
    transform 280ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 280ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1);
}

.trust-metric::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 2px;
  background: linear-gradient(90deg, rgba(201, 169, 110, 0.74), transparent 82%);
  opacity: 0.5;
}

.trust-metric:hover {
  transform: translateY(-3px);
  border-color: rgba(255, 255, 255, 0.16);
  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.25);
}

.trust-metric__value {
  margin: 0;
  font-size: clamp(2.7rem, 5vw, 4.5rem);
  line-height: 0.92;
  letter-spacing: -0.03em;
  font-weight: 800;
  color: #e0e0e0;
}

.trust-metric__title {
  margin: 16px 0 0;
  font-size: 19px;
  line-height: 1.35;
  font-weight: 620;
  color: #e0e0e0;
}

.trust-metric__text {
  margin: 10px 0 0;
  font-size: 14px;
  line-height: 1.62;
  color: #a7b0c1;
}

.trust-panels {
  margin-top: 20px;
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
  gap: 20px;
}

.trust-geography,
.trust-guarantee {
  border-radius: 28px;
  padding: 28px;
}

.trust-geography {
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(17, 28, 51, 0.74);
}

.trust-geography__title {
  margin: 0;
  font-size: 24px;
  line-height: 1.2;
  font-weight: 680;
  color: #e0e0e0;
}

.trust-geography__text {
  margin: 12px 0 0;
  max-width: 680px;
  font-size: 15px;
  line-height: 1.6;
  color: #a7b0c1;
}

.trust-geography__regions {
  margin-top: 18px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.trust-geography__region {
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  padding: 10px 14px;
  font-size: 13px;
  line-height: 1.2;
  color: #d5dce9;
}

.trust-guarantee {
  border: 1px solid rgba(201, 169, 110, 0.18);
  background: linear-gradient(180deg, rgba(22, 35, 61, 0.82), rgba(17, 28, 51, 0.94));
}

.trust-guarantee__label {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  border: 1px solid rgba(201, 169, 110, 0.26);
  background: rgba(201, 169, 110, 0.12);
  padding: 6px 10px;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 620;
  color: #c9a96e;
}

.trust-guarantee__title {
  margin: 14px 0 0;
  font-size: clamp(1.3rem, 1.9vw, 1.8rem);
  line-height: 1.24;
  font-weight: 700;
  color: #e0e0e0;
  text-wrap: balance;
}

.trust-guarantee__text {
  margin: 12px 0 0;
  font-size: 14px;
  line-height: 1.6;
  color: #a7b0c1;
}

.trust-modules {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.trust-module {
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(22, 35, 61, 0.72);
  padding: 24px;
  transition:
    transform 260ms ease,
    border-color 260ms ease,
    background-color 260ms ease;
}

.trust-module:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.16);
  background: rgba(22, 35, 61, 0.84);
}

.trust-module__status {
  margin: 0;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: #a7b0c1;
}

.trust-module--warm .trust-module__status {
  color: #c9a96e;
}

.trust-module--cool .trust-module__status {
  color: #00c4b4;
}

.trust-module__title {
  margin: 12px 0 0;
  font-size: 22px;
  line-height: 1.22;
  font-weight: 660;
  color: #e0e0e0;
}

.trust-module__text {
  margin: 10px 0 0;
  font-size: 14px;
  line-height: 1.58;
  color: #a7b0c1;
}

.trust-footer {
  margin-top: 18px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(17, 28, 51, 0.66);
  padding: 20px 22px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 14px;
  align-items: center;
}

.trust-footer__text {
  margin: 0;
  font-size: 15px;
  line-height: 1.58;
  color: #a7b0c1;
}

.trust-footer__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  border-radius: 999px;
  border: 1px solid rgba(0, 196, 180, 0.24);
  background: rgba(0, 196, 180, 0.1);
  padding: 0 14px;
  font-size: 13px;
  font-weight: 620;
  color: #e0e0e0;
  transition:
    border-color 220ms ease,
    background-color 220ms ease,
    box-shadow 220ms ease;
}

.trust-footer__cta svg {
  width: 15px;
  height: 15px;
  transition: transform 220ms ease;
}

.trust-footer__cta:hover {
  border-color: rgba(0, 196, 180, 0.38);
  background: rgba(0, 196, 180, 0.16);
  box-shadow: 0 0 16px rgba(0, 196, 180, 0.12);
}

.trust-footer__cta:hover svg {
  transform: translateX(3px);
}

.trust-reveal {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 760ms ease-out,
    transform 760ms ease-out;
}

.trust-reveal--eyebrow {
  transition-delay: 0ms;
}

.trust-reveal--title {
  transition-delay: 90ms;
}

.trust-reveal--lead {
  transition-delay: 170ms;
}

.trust-reveal--metrics {
  transition-delay: 260ms;
}

.trust-reveal--panels {
  transition-delay: 360ms;
}

.trust-reveal--modules {
  transition-delay: 460ms;
}

.trust-reveal--metric {
  transition-delay: var(--metric-delay, 280ms);
}

.trust-reveal--module {
  transition-delay: var(--module-delay, 520ms);
}

.trust-reveal--footer {
  transition-delay: 560ms;
}

.trust-section.is-visible .trust-reveal {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 1279px) {
  .trust-metrics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .trust-panels {
    grid-template-columns: 1fr;
  }

  .trust-modules {
    grid-template-columns: 1fr;
  }

  .trust-footer {
    grid-template-columns: 1fr;
  }

  .trust-footer__cta {
    justify-self: start;
  }
}

@media (max-width: 1023px) {
  .trust-section {
    padding: 72px 20px;
  }

  .trust__title {
    font-size: clamp(2rem, 8.8vw, 2.5rem);
    line-height: 1.08;
  }

  .trust__lead {
    margin-top: 20px;
    font-size: 16px;
    line-height: 1.6;
  }

  .trust-metrics {
    margin-top: 24px;
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .trust-metric {
    border-radius: 22px;
    padding: 22px;
    min-height: 0;
  }

  .trust-metric__value {
    font-size: clamp(2.2rem, 9vw, 3rem);
  }

  .trust-metric__title {
    margin-top: 12px;
    font-size: 18px;
  }

  .trust-metric__text {
    margin-top: 8px;
    font-size: 13px;
  }

  .trust-panels {
    margin-top: 12px;
    gap: 12px;
  }

  .trust-geography,
  .trust-guarantee {
    border-radius: 22px;
    padding: 20px;
  }

  .trust-geography__title {
    font-size: 20px;
  }

  .trust-geography__text {
    margin-top: 10px;
    font-size: 14px;
  }

  .trust-geography__regions {
    margin-top: 14px;
    gap: 7px;
  }

  .trust-geography__region {
    font-size: 12px;
    padding: 8px 12px;
  }

  .trust-guarantee__title {
    margin-top: 12px;
    font-size: 22px;
  }

  .trust-guarantee__text {
    margin-top: 10px;
    font-size: 13px;
  }

  .trust-modules {
    margin-top: 12px;
    gap: 10px;
  }

  .trust-module {
    border-radius: 20px;
    padding: 18px;
  }

  .trust-module__title {
    margin-top: 10px;
    font-size: 20px;
  }

  .trust-module__text {
    margin-top: 8px;
    font-size: 13px;
  }

  .trust-footer {
    margin-top: 12px;
    border-radius: 20px;
    padding: 16px;
    gap: 10px;
  }

  .trust-footer__text {
    font-size: 14px;
  }

  .trust-footer__cta {
    width: 100%;
    min-height: 48px;
  }

  .trust-reveal {
    transition:
      opacity 560ms ease-out,
      transform 560ms ease-out;
  }
}

@media (prefers-reduced-motion: reduce) {
  .trust-reveal,
  .trust-metric,
  .trust-module,
  .trust-footer__cta,
  .trust-footer__cta svg {
    transition: none;
  }
}
</style>
