<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const sectionRef = ref(null)
const isVisible = ref(false)
const activeFactorId = ref('area')

let observer

const priceCards = [
  {
    id: 'private',
    category: 'Частные дома',
    price: '3 500',
    unit: '₽/м²',
    description: 'Финальная ставка зависит от площади, рельефа, конструктивной сложности и состава документации.',
    chips: ['частный дом', 'сложный участок', 'индивидуальный проект'],
    note: 'Подходит для концепции, архитектурной части и подготовки к реализации.',
    accent: 'warm',
  },
  {
    id: 'commercial',
    category: 'Коммерческие объекты',
    price: '4 200',
    unit: '₽/м²',
    description: 'Итоговая стоимость учитывает бизнес-сценарий, потоки, нормы, инженерную логику и объём рабочей части.',
    chips: ['коммерция', 'потоки', 'инженерия'],
    note: 'Для объектов, где важны эксплуатация, нормы и предсказуемость реализации.',
    accent: 'cool',
  },
]

const factors = [
  {
    id: 'area',
    label: 'Площадь и тип объекта',
    size: 'large',
    hint: 'Чем больше площадь и сложнее тип объекта, тем выше объём проектной проработки и координации разделов.',
    accent: 'gold',
  },
  {
    id: 'complexity',
    label: 'Сложность архитектуры',
    size: 'large',
    hint: 'Сложная пластика объёмов и нестандартные решения увеличивают количество узлов и глубину детализации.',
    accent: 'gold',
  },
  {
    id: 'site',
    label: 'Рельеф, грунты, УГВ, климат',
    size: 'medium',
    hint: 'Сложные условия участка напрямую влияют на конструктивную схему, инженерные решения и состав документации.',
    accent: 'teal',
  },
  {
    id: 'docs',
    label: 'Состав документации',
    size: 'medium',
    hint: 'Эскизный, архитектурный и рабочий уровни дают разную глубину проработки и напрямую формируют стоимость.',
    accent: 'gold',
  },
  {
    id: 'visual',
    label: '3D-визуализации',
    size: 'small',
    hint: 'Дополнительные визуализации повышают прозрачность решений, но увеличивают объём работ по визуальному пакету.',
    accent: 'neutral',
  },
  {
    id: 'timeline',
    label: 'Срочность и этапность',
    size: 'small',
    hint: 'Сжатые сроки или нестандартная этапность требуют отдельного планирования нагрузки команды.',
    accent: 'teal',
  },
]

const activeFactor = computed(() => factors.find((factor) => factor.id === activeFactorId.value) ?? factors[0])

const setActiveFactor = (factorId) => {
  activeFactorId.value = factorId
}

const resetFactor = () => {
  activeFactorId.value = 'area'
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
    id="pricing"
    ref="sectionRef"
    class="pricing-section"
    :class="{ 'is-visible': isVisible }"
    aria-labelledby="pricing-title"
  >
    <div class="pricing-section__decor" aria-hidden="true"></div>

    <div class="pricing">
      <div class="pricing__intro">
        <span class="pricing__eyebrow pricing-reveal pricing-reveal--eyebrow">Ориентиры по бюджету</span>
        <h2 id="pricing-title" class="pricing__title pricing-reveal pricing-reveal--title">
          <span>Понятные ориентиры</span> и прозрачные факторы ценообразования
        </h2>
        <p class="pricing__lead pricing-reveal pricing-reveal--lead">
          Точная стоимость зависит от задачи и глубины проектной проработки, но уже на старте вы получаете честный ориентир по
          типу объекта и составу работ.
        </p>
      </div>

      <div class="pricing__grid pricing-reveal pricing-reveal--grid">
        <div class="pricing-prices">
          <article
            v-for="(card, index) in priceCards"
            :key="card.id"
            class="pricing-card"
            :class="[`pricing-card--${card.accent}`]"
            :style="{ '--pricing-card-delay': `${280 + index * 100}ms` }"
          >
            <p class="pricing-card__category">{{ card.category }}</p>

            <p class="pricing-card__price" aria-label="Ориентир стоимости">
              <span class="pricing-card__from">от</span>
              <span class="pricing-card__value">{{ card.price }}</span>
              <span class="pricing-card__unit">{{ card.unit }}</span>
            </p>

            <p class="pricing-card__description">{{ card.description }}</p>

            <div class="pricing-card__chips">
              <span v-for="chip in card.chips" :key="`${card.id}-${chip}`" class="pricing-card__chip">{{ chip }}</span>
            </div>

            <p class="pricing-card__note">{{ card.note }}</p>
          </article>
        </div>

        <aside class="pricing-factors" @mouseleave="resetFactor">
          <h3 class="pricing-factors__title">Что влияет на стоимость</h3>

          <div class="pricing-factors__tags">
            <button
              v-for="factor in factors"
              :key="factor.id"
              type="button"
              class="pricing-factor-tag"
              :class="[
                `pricing-factor-tag--${factor.size}`,
                `pricing-factor-tag--${factor.accent}`,
                { 'is-active': factor.id === activeFactorId },
              ]"
              @mouseenter="setActiveFactor(factor.id)"
              @focus="setActiveFactor(factor.id)"
              @click="setActiveFactor(factor.id)"
            >
              {{ factor.label }}
            </button>
          </div>

          <div class="pricing-factors__hint" aria-live="polite">
            <p class="pricing-factors__hint-label">Комментарий</p>
            <p class="pricing-factors__hint-text">{{ activeFactor.hint }}</p>
          </div>
        </aside>
      </div>

      <div class="pricing-estimate pricing-reveal pricing-reveal--estimate">
        <p class="pricing-estimate__text">Предварительный ориентир даём за 15 минут после короткого брифа по вашей задаче.</p>
        <a href="#contacts" class="pricing-estimate__cta">
          <span>Получить расчёт стоимости за 15 минут</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
            <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      </div>

      <div class="pricing__footer pricing-reveal pricing-reveal--footer">
        <p class="pricing__summary">
          Стоимость формируется из параметров объекта и глубины проектной проработки. Поэтому уже на старте можно дать
          реалистичный ориентир без завышенных обещаний.
        </p>

        <a href="#trust" class="pricing__next">
          <span>Смотреть цифры и доказательства</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
            <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pricing-section {
  position: relative;
  isolation: isolate;
  overflow: clip;
  padding: 120px 32px;
  background:
    radial-gradient(circle at 34% 22%, rgba(201, 169, 110, 0.05), transparent 30%),
    radial-gradient(circle at 74% 58%, rgba(0, 196, 180, 0.035), transparent 36%),
    linear-gradient(180deg, #0a1428 0%, #101d35 52%, #0a1428 100%);
}

.pricing-section__decor {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.2;
  background-image:
    linear-gradient(to right, rgba(167, 176, 193, 0.045) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(167, 176, 193, 0.045) 1px, transparent 1px);
  background-size: 54px 54px, 54px 54px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.85) 24%, rgba(0, 0, 0, 0.18));
}

.pricing {
  width: min(100%, 1280px);
  margin: 0 auto;
}

.pricing__intro {
  max-width: 840px;
}

.pricing__eyebrow {
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

.pricing__title {
  margin: 20px 0 0;
  max-width: 920px;
  font-family: 'Montserrat', 'Manrope', sans-serif;
  font-size: clamp(2.5rem, 5vw, 3.75rem);
  line-height: 1.04;
  letter-spacing: -0.02em;
  font-weight: 760;
  color: #e0e0e0;
  text-wrap: balance;
}

.pricing__title span {
  color: #c9a96e;
}

.pricing__lead {
  margin: 28px 0 0;
  max-width: 780px;
  font-size: clamp(18px, 1.45vw, 20px);
  line-height: 1.65;
  color: #a7b0c1;
}

.pricing__grid {
  margin-top: 38px;
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(300px, 1fr);
  gap: 22px;
}

.pricing-prices {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
}

.pricing-card {
  position: relative;
  overflow: hidden;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(22, 35, 61, 0.84), rgba(17, 28, 51, 0.94));
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.24);
  padding: 30px 32px;
  min-height: 342px;
  transition:
    transform 280ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 280ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1);
}

.pricing-card::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 2px;
  opacity: 0.55;
}

.pricing-card--warm::before {
  background: linear-gradient(90deg, rgba(201, 169, 110, 0.82), transparent 84%);
}

.pricing-card--cool::before {
  background: linear-gradient(90deg, rgba(0, 196, 180, 0.8), transparent 84%);
}

.pricing-card:hover {
  transform: translateY(-3px);
  border-color: rgba(255, 255, 255, 0.16);
  box-shadow: 0 22px 56px rgba(0, 0, 0, 0.28);
}

.pricing-card--warm:hover {
  border-color: rgba(201, 169, 110, 0.26);
}

.pricing-card--cool:hover {
  border-color: rgba(0, 196, 180, 0.28);
}

.pricing-card__category {
  margin: 0;
  font-size: 17px;
  line-height: 1.3;
  font-weight: 560;
  color: #a7b0c1;
}

.pricing-card__price {
  margin: 14px 0 0;
  display: inline-flex;
  align-items: flex-end;
  gap: 8px;
  color: #e0e0e0;
}

.pricing-card__from {
  font-size: 18px;
  line-height: 1;
  color: rgba(167, 176, 193, 0.9);
  transform: translateY(-8px);
}

.pricing-card__value {
  font-size: clamp(2.5rem, 4.8vw, 3.5rem);
  line-height: 0.9;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #e0e0e0;
}

.pricing-card__unit {
  font-size: 18px;
  line-height: 1;
  font-weight: 600;
  color: rgba(224, 224, 224, 0.92);
  transform: translateY(-8px);
}

.pricing-card__description {
  margin: 16px 0 0;
  font-size: 15px;
  line-height: 1.62;
  color: #a7b0c1;
}

.pricing-card__chips {
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.pricing-card__chip {
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  padding: 8px 12px;
  font-size: 13px;
  line-height: 1.2;
  color: #a7b0c1;
}

.pricing-card__note {
  margin: auto 0 0;
  padding-top: 14px;
  font-size: 14px;
  line-height: 1.55;
  color: rgba(224, 224, 224, 0.88);
}

.pricing-factors {
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(17, 28, 51, 0.72);
  padding: 28px;
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.pricing-factors__title {
  margin: 0;
  font-size: 23px;
  line-height: 1.2;
  font-weight: 680;
  color: #e0e0e0;
}

.pricing-factors__tags {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
}

.pricing-factor-tag {
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  padding: 10px 14px;
  font-size: 13px;
  line-height: 1.3;
  font-weight: 520;
  color: #a7b0c1;
  text-align: left;
  transition:
    border-color 240ms ease,
    background-color 240ms ease,
    color 240ms ease,
    box-shadow 240ms ease;
}

.pricing-factor-tag--large {
  font-size: 14px;
  font-weight: 560;
  padding: 11px 14px;
}

.pricing-factor-tag--small {
  font-size: 12px;
}

.pricing-factor-tag--gold.is-active {
  border-color: rgba(201, 169, 110, 0.3);
  background: rgba(201, 169, 110, 0.14);
  color: #e0e0e0;
}

.pricing-factor-tag--teal.is-active {
  border-color: rgba(0, 196, 180, 0.32);
  background: rgba(0, 196, 180, 0.13);
  color: #e0e0e0;
}

.pricing-factor-tag--neutral.is-active {
  border-color: rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.1);
  color: #e0e0e0;
}

.pricing-factor-tag:hover {
  border-color: rgba(255, 255, 255, 0.2);
  color: #e0e0e0;
}

.pricing-factors__hint {
  margin-top: auto;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  padding: 14px 16px;
}

.pricing-factors__hint-label {
  margin: 0;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: rgba(201, 169, 110, 0.9);
}

.pricing-factors__hint-text {
  margin: 8px 0 0;
  font-size: 14px;
  line-height: 1.58;
  color: #d5dce9;
}

.pricing-estimate {
  margin-top: 20px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(22, 35, 61, 0.78), rgba(17, 28, 51, 0.92));
  padding: 22px 24px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 16px;
  align-items: center;
}

.pricing-estimate__text {
  margin: 0;
  font-size: 16px;
  line-height: 1.58;
  color: #d5dce9;
}

.pricing-estimate__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 52px;
  border-radius: 16px;
  border: 1px solid rgba(255, 107, 53, 0.5);
  background: #ff6b35;
  padding: 0 18px;
  font-size: 14px;
  line-height: 1.2;
  font-weight: 650;
  color: #122134;
  transition:
    transform 240ms ease,
    box-shadow 240ms ease,
    background-color 240ms ease;
}

.pricing-estimate__cta svg {
  width: 16px;
  height: 16px;
  transition: transform 240ms ease;
}

.pricing-estimate__cta:hover {
  transform: translateY(-1px);
  background: #ff5a1d;
  box-shadow: 0 8px 24px rgba(255, 107, 53, 0.32);
}

.pricing-estimate__cta:hover svg {
  transform: translateX(4px);
}

.pricing__footer {
  margin-top: 18px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 14px;
  align-items: center;
}

.pricing__summary {
  margin: 0;
  font-size: 15px;
  line-height: 1.62;
  color: #a7b0c1;
}

.pricing__next {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 42px;
  border-radius: 999px;
  border: 1px solid rgba(0, 196, 180, 0.24);
  background: rgba(0, 196, 180, 0.1);
  padding: 0 14px;
  font-size: 13px;
  font-weight: 600;
  color: #e0e0e0;
  transition:
    border-color 220ms ease,
    background-color 220ms ease,
    box-shadow 220ms ease;
}

.pricing__next svg {
  width: 15px;
  height: 15px;
  transition: transform 220ms ease;
}

.pricing__next:hover {
  border-color: rgba(0, 196, 180, 0.38);
  background: rgba(0, 196, 180, 0.16);
  box-shadow: 0 0 16px rgba(0, 196, 180, 0.12);
}

.pricing__next:hover svg {
  transform: translateX(3px);
}

.pricing-reveal {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 760ms ease-out,
    transform 760ms ease-out;
}

.pricing-reveal--eyebrow {
  transition-delay: 0ms;
}

.pricing-reveal--title {
  transition-delay: 90ms;
}

.pricing-reveal--lead {
  transition-delay: 170ms;
}

.pricing-reveal--grid {
  transition-delay: 260ms;
}

.pricing-reveal--estimate {
  transition-delay: 420ms;
}

.pricing-reveal--footer {
  transition-delay: 560ms;
}

.pricing-section.is-visible .pricing-reveal {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 1279px) {
  .pricing__grid {
    grid-template-columns: 1fr;
  }

  .pricing-prices {
    grid-template-columns: 1fr;
  }

  .pricing-factors {
    min-height: 0;
  }

  .pricing-estimate {
    grid-template-columns: 1fr;
  }

  .pricing-estimate__cta {
    justify-self: start;
  }

  .pricing__footer {
    grid-template-columns: 1fr;
  }

  .pricing__next {
    justify-self: start;
  }
}

@media (max-width: 1023px) {
  .pricing-section {
    padding: 72px 20px;
  }

  .pricing__title {
    font-size: clamp(2rem, 8.8vw, 2.5rem);
    line-height: 1.08;
  }

  .pricing__lead {
    margin-top: 20px;
    font-size: 16px;
    line-height: 1.6;
  }

  .pricing__grid {
    margin-top: 24px;
    gap: 14px;
  }

  .pricing-card {
    border-radius: 22px;
    padding: 22px 24px;
    min-height: 0;
  }

  .pricing-card__price {
    gap: 6px;
  }

  .pricing-card__value {
    font-size: clamp(2.15rem, 8vw, 2.6rem);
  }

  .pricing-card__from,
  .pricing-card__unit {
    font-size: 15px;
    transform: translateY(-6px);
  }

  .pricing-card__description {
    font-size: 14px;
    line-height: 1.56;
  }

  .pricing-card__chip {
    font-size: 12px;
    padding: 7px 10px;
  }

  .pricing-card__note {
    padding-top: 12px;
    font-size: 13px;
  }

  .pricing-factors {
    border-radius: 22px;
    padding: 20px;
  }

  .pricing-factors__title {
    font-size: 20px;
  }

  .pricing-factor-tag {
    font-size: 12px;
    padding: 9px 11px;
  }

  .pricing-factor-tag--large {
    font-size: 13px;
  }

  .pricing-factors__hint {
    margin-top: 14px;
    border-radius: 14px;
    padding: 12px;
  }

  .pricing-factors__hint-text {
    font-size: 13px;
    line-height: 1.55;
  }

  .pricing-estimate {
    margin-top: 14px;
    border-radius: 20px;
    padding: 18px;
    gap: 12px;
  }

  .pricing-estimate__text {
    font-size: 15px;
    line-height: 1.56;
  }

  .pricing-estimate__cta {
    width: 100%;
  }

  .pricing__footer {
    margin-top: 14px;
    gap: 10px;
  }

  .pricing__summary {
    font-size: 14px;
    line-height: 1.58;
  }

  .pricing__next {
    width: 100%;
    min-height: 48px;
  }

  .pricing-reveal {
    transition:
      opacity 560ms ease-out,
      transform 560ms ease-out;
  }
}

@media (prefers-reduced-motion: reduce) {
  .pricing-reveal,
  .pricing-card,
  .pricing-factor-tag,
  .pricing-estimate__cta,
  .pricing-estimate__cta svg,
  .pricing__next,
  .pricing__next svg {
    transition: none;
  }
}
</style>
