<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useExpandTransition } from '../../../composables/useExpandTransition.js'

const sectionRef = ref(null)
const accordionRef = ref(null)
const isVisible = ref(false)
const openItemId = ref('price')

let observer

const quickAnswers = [
  {
    id: 'quick-price',
    label: 'Стоимость',
    question: 'Сколько стоит проект?',
    answer: 'Предварительный ориентир даём за 15–20 минут после короткого брифа по объекту.',
    targetId: 'price',
  },
  {
    id: 'quick-timeline',
    label: 'Сроки',
    question: 'Какие сроки проектирования?',
    answer: 'Срок зависит от площади и состава, но этапы и контрольные точки фиксируем заранее.',
    targetId: 'timeline',
  },
  {
    id: 'quick-remote',
    label: 'Формат работы',
    question: 'Можно ли работать дистанционно?',
    answer: 'Да. Работаем с проектами по всей России и СНГ в прозрачном удалённом формате.',
    targetId: 'remote',
  },
  {
    id: 'quick-slope',
    label: 'Сложные участки',
    question: 'Берёте сложные участки с уклоном?',
    answer: 'Да, это одна из самых частых задач: уклон, УГВ, слабые грунты и ограничения.',
    targetId: 'slope',
  },
]

const faqItems = [
  {
    id: 'price',
    question: 'Сколько стоит проект и как получить ориентир?',
    answer:
      'Стоимость зависит от типа объекта, площади, рельефа, состава документации и степени детализации. Чтобы не давать абстрактные цифры, сначала уточняем задачу и после короткого брифа даём реалистичный предварительный ориентир.',
    hint: 'Ориентир можно получить на короткой консультации до старта проектирования.',
  },
  {
    id: 'timeline',
    question: 'Какие сроки проектирования и как фиксируются этапы?',
    answer:
      'Сроки зависят от сложности объекта и выбранного формата работ. Мы заранее фиксируем этапы, ожидаемый результат и точки согласования, чтобы у клиента была прозрачная траектория проекта без неопределённости.',
    hint: 'Сроки и итерации согласуются до входа в основную фазу работ.',
  },
  {
    id: 'remote',
    question: 'Можно ли работать дистанционно по всей России и СНГ?',
    answer:
      'Да, работаем дистанционно с частными и коммерческими объектами в разных регионах. Все ключевые материалы, согласования и контрольные точки ведём в понятном цифровом формате с регулярной связью.',
    hint: 'Удалённый формат не снижает качество, если процесс структурирован.',
  },
  {
    id: 'slope',
    question: 'Что делать, если участок сложный или с уклоном?',
    answer:
      'Для сложных участков сначала проводим предпроектный анализ: рельеф, инсоляция, УГВ, ограничения и сценарии использования. Это помогает принять реалистичные решения заранее и снизить риск дорогих переделок в процессе строительства.',
    hint: 'Сложный участок учитывается на старте, а не “допридумывается” в ходе стройки.',
  },
  {
    id: 'arch-only',
    question: 'Можно заказать только архитектурную часть?',
    answer:
      'Да, можно начать с архитектурного уровня или эскизного этапа. При этом заранее уточняем, какой глубины проработки достаточно для вашей задачи, чтобы потом не потерять управляемость проекта.',
    hint: 'Формат можно расширять по этапам по мере движения проекта.',
  },
  {
    id: 'support',
    question: 'Помогаете ли вы во время строительства?',
    answer:
      'Да, в формате сопровождения консультируем по вопросам реализации, разбираем узлы и помогаем удерживать проектную логику при взаимодействии со строителями и смежниками.',
    hint: 'Подходит для объектов, где важен личный контроль реализации.',
  },
]

const {
  animateExpandEnter,
  animateExpandAfterEnter,
  animateExpandLeave,
  animateExpandAfterLeave,
} = useExpandTransition()

const toggleItem = (id) => {
  openItemId.value = openItemId.value === id ? '' : id
}

const openFromQuick = async (targetId) => {
  openItemId.value = targetId
  await nextTick()
  const targetNode = document.getElementById(`faq-item-${targetId}`)
  targetNode?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
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
    id="faq"
    ref="sectionRef"
    class="faq-section"
    :class="{ 'is-visible': isVisible }"
    aria-labelledby="faq-title"
  >
    <div class="faq-section__decor" aria-hidden="true"></div>

    <div class="faq">
      <div class="faq__intro">
        <span class="faq__eyebrow faq-reveal faq-reveal--eyebrow">Частые вопросы перед стартом</span>
        <h2 id="faq-title" class="faq__title faq-reveal faq-reveal--title">Закрываем <span>ключевые вопросы</span> до заявки</h2>
        <p class="faq__lead faq-reveal faq-reveal--lead">
          Здесь собрали ответы на вопросы, которые чаще всего останавливают перед обращением: стоимость, сроки, формат работы
          и особенности сложных объектов.
        </p>
      </div>

      <div class="faq-quick faq-reveal faq-reveal--quick">
        <article
          v-for="(card, index) in quickAnswers"
          :key="card.id"
          class="faq-quick-card"
          :style="{ '--quick-delay': `${260 + index * 70}ms` }"
        >
          <p class="faq-quick-card__label">{{ card.label }}</p>
          <h3 class="faq-quick-card__question">{{ card.question }}</h3>
          <p class="faq-quick-card__answer">{{ card.answer }}</p>

          <button type="button" class="faq-quick-card__more" @click="openFromQuick(card.targetId)">
            <span>Подробнее</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
              <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </article>
      </div>

      <div ref="accordionRef" class="faq-accordion faq-reveal faq-reveal--accordion">
        <article
          v-for="(item, index) in faqItems"
          :id="`faq-item-${item.id}`"
          :key="item.id"
          class="faq-item"
          :class="{ 'is-open': openItemId === item.id }"
          :style="{ '--faq-delay': `${420 + index * 60}ms` }"
        >
          <button
            type="button"
            class="faq-item__header"
            :aria-expanded="openItemId === item.id ? 'true' : 'false'"
            :aria-controls="`faq-body-${item.id}`"
            @click="toggleItem(item.id)"
          >
            <span class="faq-item__question">{{ item.question }}</span>
            <span class="faq-item__icon" :class="{ 'is-open': openItemId === item.id }" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
                <path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </button>

          <transition
            @enter="animateExpandEnter"
            @after-enter="animateExpandAfterEnter"
            @leave="animateExpandLeave"
            @after-leave="animateExpandAfterLeave"
          >
            <div v-if="openItemId === item.id" :id="`faq-body-${item.id}`" class="faq-item__body">
              <p class="faq-item__answer">{{ item.answer }}</p>
              <p class="faq-item__hint">{{ item.hint }}</p>
            </div>
          </transition>
        </article>
      </div>

      <div class="faq-help faq-reveal faq-reveal--help">
        <p class="faq-help__text">
          Если не нашли свой вопрос в списке, разберём вашу задачу на короткой консультации и подскажем оптимальный формат
          работы под объект.
        </p>

        <a href="#reviews" class="faq-help__cta">
          <span>Посмотреть отзывы клиентов</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
            <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-section {
  position: relative;
  isolation: isolate;
  overflow: clip;
  padding: 110px 32px;
  background:
    radial-gradient(circle at 42% 18%, rgba(201, 169, 110, 0.03), transparent 28%),
    radial-gradient(circle at 68% 66%, rgba(0, 196, 180, 0.02), transparent 34%),
    linear-gradient(180deg, #0a1428 0%, #101a30 52%, #0a1428 100%);
}

.faq-section__decor {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.14;
  background-image:
    linear-gradient(to right, rgba(167, 176, 193, 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(167, 176, 193, 0.04) 1px, transparent 1px);
  background-size: 58px 58px, 58px 58px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.86) 22%, rgba(0, 0, 0, 0.22));
}

.faq {
  width: min(100%, 1180px);
  margin: 0 auto;
}

.faq__intro {
  max-width: 760px;
}

.faq__eyebrow {
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

.faq__title {
  margin: 20px 0 0;
  max-width: 900px;
  font-family: 'Montserrat', 'Manrope', sans-serif;
  font-size: clamp(2.35rem, 4.5vw, 3.5rem);
  line-height: 1.05;
  letter-spacing: -0.02em;
  font-weight: 760;
  color: #e0e0e0;
  text-wrap: balance;
}

.faq__title span {
  color: #c9a96e;
}

.faq__lead {
  margin: 24px 0 0;
  max-width: 720px;
  font-size: 18px;
  line-height: 1.65;
  color: #a7b0c1;
}

.faq-quick {
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.faq-quick-card {
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(22, 35, 61, 0.7);
  min-height: 168px;
  padding: 22px 24px;
  transition:
    transform 260ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 260ms cubic-bezier(0.22, 1, 0.36, 1),
    background-color 260ms cubic-bezier(0.22, 1, 0.36, 1);
}

.faq-quick-card:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.15);
  background: rgba(22, 35, 61, 0.82);
}

.faq-quick-card__label {
  margin: 0;
  font-size: 12px;
  line-height: 1.2;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 600;
  color: #c9a96e;
}

.faq-quick-card__question {
  margin: 10px 0 0;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 650;
  color: #e0e0e0;
}

.faq-quick-card__answer {
  margin: 9px 0 0;
  font-size: 15px;
  line-height: 1.6;
  color: #a7b0c1;
}

.faq-quick-card__more {
  margin-top: 12px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 0;
  background: transparent;
  padding: 0;
  font-size: 14px;
  line-height: 1.3;
  font-weight: 600;
  color: #e0e0e0;
}

.faq-quick-card__more svg {
  width: 15px;
  height: 15px;
  transition: transform 220ms ease;
}

.faq-quick-card__more:hover svg {
  transform: translateX(3px);
}

.faq-accordion {
  margin-top: 22px;
  display: grid;
  gap: 10px;
}

.faq-item {
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(17, 28, 51, 0.72);
  overflow: hidden;
  transition:
    border-color 240ms ease,
    background-color 240ms ease;
}

.faq-item:hover,
.faq-item.is-open {
  border-color: rgba(255, 255, 255, 0.14);
  background: rgba(17, 28, 51, 0.82);
}

.faq-item.is-open {
  border-color: rgba(201, 169, 110, 0.2);
}

.faq-item__header {
  width: 100%;
  min-height: 64px;
  padding: 22px 24px;
  border: 0;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  text-align: left;
  cursor: pointer;
}

.faq-item__question {
  font-size: 22px;
  line-height: 1.3;
  font-weight: 620;
  color: #e0e0e0;
}

.faq-item__icon {
  width: 24px;
  height: 24px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.04);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #a7b0c1;
  transition:
    transform 240ms ease,
    color 240ms ease,
    border-color 240ms ease;
}

.faq-item__icon svg {
  width: 14px;
  height: 14px;
}

.faq-item__icon.is-open {
  transform: rotate(180deg);
  color: #e0e0e0;
  border-color: rgba(201, 169, 110, 0.3);
}

.faq-item__body {
  padding: 0 24px 24px;
}

.faq-item__answer {
  margin: 0;
  font-size: 15px;
  line-height: 1.7;
  color: #a7b0c1;
}

.faq-item__hint {
  margin: 12px 0 0;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  padding: 10px 12px;
  font-size: 13px;
  line-height: 1.5;
  color: rgba(224, 224, 224, 0.88);
}

.faq-help {
  margin-top: 14px;
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(17, 28, 51, 0.66);
  padding: 18px 20px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 12px;
  align-items: center;
}

.faq-help__text {
  margin: 0;
  font-size: 15px;
  line-height: 1.58;
  color: #a7b0c1;
}

.faq-help__cta {
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
  font-weight: 620;
  color: #e0e0e0;
  transition:
    border-color 220ms ease,
    background-color 220ms ease,
    box-shadow 220ms ease;
}

.faq-help__cta svg {
  width: 15px;
  height: 15px;
  transition: transform 220ms ease;
}

.faq-help__cta:hover {
  border-color: rgba(0, 196, 180, 0.38);
  background: rgba(0, 196, 180, 0.16);
  box-shadow: 0 0 16px rgba(0, 196, 180, 0.12);
}

.faq-help__cta:hover svg {
  transform: translateX(3px);
}

.faq-reveal {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 700ms ease-out,
    transform 700ms ease-out;
}

.faq-reveal--eyebrow {
  transition-delay: 0ms;
}

.faq-reveal--title {
  transition-delay: 90ms;
}

.faq-reveal--lead {
  transition-delay: 160ms;
}

.faq-reveal--quick {
  transition-delay: 240ms;
}

.faq-reveal--accordion {
  transition-delay: 320ms;
}

.faq-reveal--help {
  transition-delay: 440ms;
}

.faq-section.is-visible .faq-reveal {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 1023px) {
  .faq-section {
    padding: 72px 20px;
  }

  .faq__title {
    font-size: clamp(2rem, 8vw, 2.5rem);
    line-height: 1.08;
  }

  .faq__lead {
    margin-top: 18px;
    font-size: 16px;
    line-height: 1.6;
  }

  .faq-quick {
    margin-top: 22px;
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .faq-quick-card {
    border-radius: 20px;
    padding: 20px;
    min-height: 0;
  }

  .faq-quick-card__question {
    font-size: 20px;
  }

  .faq-quick-card__answer {
    font-size: 14px;
    line-height: 1.56;
  }

  .faq-accordion {
    margin-top: 12px;
  }

  .faq-item {
    border-radius: 18px;
  }

  .faq-item__header {
    min-height: 56px;
    padding: 18px;
  }

  .faq-item__question {
    font-size: 18px;
    line-height: 1.34;
  }

  .faq-item__body {
    padding: 0 18px 18px;
  }

  .faq-item__answer {
    font-size: 14px;
    line-height: 1.62;
  }

  .faq-item__hint {
    margin-top: 10px;
    font-size: 12px;
    padding: 9px 10px;
  }

  .faq-help {
    margin-top: 10px;
    border-radius: 18px;
    padding: 16px;
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .faq-help__text {
    font-size: 14px;
    line-height: 1.56;
  }

  .faq-help__cta {
    width: 100%;
    min-height: 48px;
  }

  .faq-reveal {
    transition:
      opacity 540ms ease-out,
      transform 540ms ease-out;
  }
}

@media (prefers-reduced-motion: reduce) {
  .faq-reveal,
  .faq-quick-card,
  .faq-item,
  .faq-item__icon,
  .faq-help__cta,
  .faq-help__cta svg,
  .faq-quick-card__more svg {
    transition: none;
  }
}
</style>
