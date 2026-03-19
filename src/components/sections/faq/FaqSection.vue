<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const sectionRef = ref(null)
const isVisible = ref(false)
const openItemId = ref('price')

let observer

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

const toggleItem = (id) => {
  openItemId.value = openItemId.value === id ? '' : id
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

      <div class="faq-accordion faq-reveal faq-reveal--accordion">
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

          <div
            :id="`faq-body-${item.id}`"
            class="faq-item__content"
            role="region"
            :aria-hidden="openItemId === item.id ? 'false' : 'true'"
          >
            <div class="faq-item__body">
              <p class="faq-item__answer">{{ item.answer }}</p>
              <p class="faq-item__hint">{{ item.hint }}</p>
            </div>
          </div>
        </article>
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

.faq-accordion {
  margin-top: 30px;
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

.faq-item__content {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 320ms cubic-bezier(0.22, 1, 0.36, 1);
}

.faq-item.is-open .faq-item__content {
  grid-template-rows: 1fr;
}

.faq-item__body {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 24px;
  opacity: 0;
  transform: translateY(-6px);
  transition:
    opacity 220ms ease,
    transform 260ms ease,
    padding-bottom 320ms cubic-bezier(0.22, 1, 0.36, 1);
}

.faq-item.is-open .faq-item__body {
  padding-bottom: 24px;
  opacity: 1;
  transform: translateY(0);
}

.faq-item__answer {
  margin: 0;
  font-size: 15px;
  line-height: 1.7;
  color: #a7b0c1;
}

.faq-item__hint {
  margin: 0;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  padding: 10px 12px;
  font-size: 13px;
  line-height: 1.5;
  color: rgba(224, 224, 224, 0.88);
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

.faq-reveal--accordion {
  transition-delay: 260ms;
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

  .faq-accordion {
    margin-top: 22px;
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
    padding: 0 18px;
    gap: 10px;
  }

  .faq-item.is-open .faq-item__body {
    padding-bottom: 18px;
  }

  .faq-item__answer {
    font-size: 14px;
    line-height: 1.62;
  }

  .faq-item__hint {
    font-size: 12px;
    padding: 9px 10px;
  }

  .faq-reveal {
    transition:
      opacity 540ms ease-out,
      transform 540ms ease-out;
  }
}

@media (prefers-reduced-motion: reduce) {
  .faq-reveal,
  .faq-item,
  .faq-item__icon,
  .faq-item__content,
  .faq-item__body {
    transition: none;
  }
}
</style>
