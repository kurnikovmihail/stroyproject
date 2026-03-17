<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const sectionRef = ref(null)
const isVisible = ref(false)
const activeFormatId = ref('working')

let observer

const formats = [
  {
    id: 'sketch',
    stage: 'Старт',
    title: 'Эскизный проект',
    text: 'Подходит для старта, посадки на участок и первичной пространственной логики.',
    hint: 'Для концепции и согласования направления',
    accent: 'warm',
    short: 'Эскиз',
  },
  {
    id: 'architectural',
    stage: 'Базовый уровень',
    title: 'Архитектурный проект',
    text: 'Фиксирует архитектурный образ, фасады и функциональную структуру объекта.',
    hint: 'Для полноценной архитектурной проработки',
    accent: 'neutral',
    short: 'Арх.',
  },
  {
    id: 'working',
    stage: 'Под стройку',
    title: 'Рабочий проект',
    text: 'Дает комплект решений и узлов для точной реализации без лишних трактовок.',
    hint: 'Для подготовки к строительству',
    accent: 'cool',
    short: 'Рабочий',
  },
  {
    id: 'supervision',
    stage: 'Во время реализации',
    title: 'Авторское сопровождение',
    text: 'Поддержка на площадке, контроль проектной логики и работа со смежниками.',
    hint: 'Для сопровождения реализации',
    accent: 'support',
    short: 'Сопров.',
  },
]

const matrixRows = [
  {
    id: 'genplan',
    title: 'Генплан участка',
    values: {
      sketch: 'included',
      architectural: 'included',
      working: 'included',
      supervision: 'partial',
    },
  },
  {
    id: 'plans',
    title: 'Планировки и функциональные схемы',
    values: {
      sketch: 'included',
      architectural: 'included',
      working: 'included',
      supervision: 'partial',
    },
  },
  {
    id: 'facades',
    title: 'Фасады и разрезы',
    values: {
      sketch: 'partial',
      architectural: 'included',
      working: 'included',
      supervision: 'partial',
    },
  },
  {
    id: 'structural',
    title: 'Конструктивные решения и узлы',
    values: {
      sketch: 'none',
      architectural: 'partial',
      working: 'included',
      supervision: 'partial',
    },
  },
  {
    id: 'specs',
    title: 'Спецификации и ведомости',
    values: {
      sketch: 'none',
      architectural: 'partial',
      working: 'included',
      supervision: 'partial',
    },
  },
  {
    id: 'materials',
    title: 'Рекомендации по материалам',
    values: {
      sketch: 'partial',
      architectural: 'included',
      working: 'included',
      supervision: 'partial',
    },
  },
  {
    id: 'engineering',
    title: 'Инженерная логика',
    values: {
      sketch: 'partial',
      architectural: 'included',
      working: 'included',
      supervision: 'partial',
    },
  },
  {
    id: 'visual',
    title: '3D-визуализация',
    values: {
      sketch: 'partial',
      architectural: 'included',
      working: 'partial',
      supervision: 'none',
    },
  },
  {
    id: 'consulting',
    title: 'Консультации в ходе стройки',
    values: {
      sketch: 'none',
      architectural: 'partial',
      working: 'partial',
      supervision: 'included',
    },
  },
]

const statusLabels = {
  included: 'Входит',
  partial: 'Опционально',
  none: 'Не входит',
}

const setActiveFormat = (formatId) => {
  activeFormatId.value = formatId
}

const resetActiveFormat = () => {
  activeFormatId.value = 'working'
}

const getStatus = (row, formatId) => row.values[formatId] ?? 'none'

const getStatusLabel = (status) => statusLabels[status] ?? statusLabels.none

const getMarkerClass = (status, formatId) => [`scope-marker--${status}`, `scope-marker--${formatId}`]

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
    id="scope"
    ref="sectionRef"
    class="scope-section"
    :class="{ 'is-visible': isVisible }"
    aria-labelledby="scope-title"
  >
    <div class="scope-section__decor" aria-hidden="true"></div>

    <div class="scope">
      <div class="scope__intro">
        <span class="scope__eyebrow scope-reveal scope-reveal--eyebrow">Что входит в проект</span>
        <h2 id="scope-title" class="scope__title scope-reveal scope-reveal--title">
          <span>Понятный состав работ</span>: что именно входит в каждый формат проекта
        </h2>
        <p class="scope__lead scope-reveal scope-reveal--lead">
          Форматы отличаются глубиной проработки: от концептуального старта и архитектурной части до полного рабочего
          комплекта и сопровождения в ходе реализации.
        </p>
      </div>

      <div class="scope__formats-wrap scope-reveal scope-reveal--formats" @mouseleave="resetActiveFormat">
        <div class="scope__formats no-scrollbar" role="tablist" aria-label="Форматы состава работ">
          <article
            v-for="(format, index) in formats"
            :key="format.id"
            class="scope-format-card"
            :class="[
              `scope-format-card--${format.accent}`,
              { 'is-active': activeFormatId === format.id },
            ]"
            :style="{ '--scope-card-delay': `${260 + index * 90}ms` }"
            tabindex="0"
            role="tab"
            :aria-selected="activeFormatId === format.id"
            @mouseenter="setActiveFormat(format.id)"
            @focus="setActiveFormat(format.id)"
            @click="setActiveFormat(format.id)"
          >
            <span class="scope-format-card__stage">{{ format.stage }}</span>
            <h3 class="scope-format-card__title">{{ format.title }}</h3>
            <p class="scope-format-card__text">{{ format.text }}</p>
            <p class="scope-format-card__hint">{{ format.hint }}</p>
          </article>
        </div>
      </div>

      <div class="scope-matrix-wrap scope-reveal scope-reveal--matrix" @mouseleave="resetActiveFormat">
        <div class="scope-matrix" role="table" aria-label="Сравнение состава работ по форматам">
          <div class="scope-matrix__head" role="rowgroup">
            <div class="scope-matrix__head-cell scope-matrix__head-cell--feature" role="columnheader">Состав работ</div>

            <button
              v-for="format in formats"
              :key="`head-${format.id}`"
              type="button"
              role="columnheader"
              class="scope-matrix__head-cell scope-matrix__head-cell--format"
              :class="[
                `scope-matrix__head-cell--${format.accent}`,
                { 'is-focused': activeFormatId === format.id },
              ]"
              @mouseenter="setActiveFormat(format.id)"
              @focus="setActiveFormat(format.id)"
              @click="setActiveFormat(format.id)"
            >
              {{ format.short }}
            </button>
          </div>

          <div class="scope-matrix__body" role="rowgroup">
            <div
              v-for="(row, index) in matrixRows"
              :key="row.id"
              class="scope-matrix__row"
              role="row"
              :style="{ '--scope-row-delay': `${420 + index * 42}ms` }"
            >
              <div class="scope-matrix__feature" role="rowheader">{{ row.title }}</div>

              <div
                v-for="format in formats"
                :key="`${row.id}-${format.id}`"
                class="scope-matrix__cell"
                :class="[{ 'is-focused': activeFormatId === format.id }]"
                :data-format="format.id"
                role="cell"
                @mouseenter="setActiveFormat(format.id)"
              >
                <span
                  class="scope-marker"
                  :class="getMarkerClass(getStatus(row, format.id), format.id)"
                  :aria-label="getStatusLabel(getStatus(row, format.id))"
                >
                  <svg
                    v-if="getStatus(row, format.id) === 'included'"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    aria-hidden="true"
                  >
                    <path d="M5 12.5 10.3 18 19 7" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span v-else-if="getStatus(row, format.id) === 'partial'" class="scope-marker__partial-dot" aria-hidden="true"></span>
                  <span v-else class="scope-marker__dash" aria-hidden="true">—</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="scope-mobile scope-reveal scope-reveal--mobile">
        <details v-for="(row, index) in matrixRows" :key="`mobile-${row.id}`" class="scope-mobile-row" :open="index < 2">
          <summary class="scope-mobile-row__summary">
            <span>{{ row.title }}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true">
              <path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </summary>

          <div class="scope-mobile-row__content">
            <div v-for="format in formats" :key="`mobile-cell-${row.id}-${format.id}`" class="scope-mobile-row__item">
              <p class="scope-mobile-row__format">{{ format.short }}</p>
              <div class="scope-mobile-row__status">
                <span class="scope-marker" :class="getMarkerClass(getStatus(row, format.id), format.id)">
                  <svg
                    v-if="getStatus(row, format.id) === 'included'"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    aria-hidden="true"
                  >
                    <path d="M5 12.5 10.3 18 19 7" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span v-else-if="getStatus(row, format.id) === 'partial'" class="scope-marker__partial-dot" aria-hidden="true"></span>
                  <span v-else class="scope-marker__dash" aria-hidden="true">—</span>
                </span>
                <span class="scope-mobile-row__status-label">{{ getStatusLabel(getStatus(row, format.id)) }}</span>
              </div>
            </div>
          </div>
        </details>
      </div>

      <div class="scope-summary scope-reveal scope-reveal--summary">
        <div class="scope-summary__copy">
          <h3 class="scope-summary__title">
            Если нужен старт и направление — достаточно эскизного уровня. Если нужна подготовка к стройке без лишних вопросов —
            выбирайте <span>рабочий проект</span>.
          </h3>
          <p class="scope-summary__text">
            Формат подбирается по стадии, глубине задачи и роли команды в реализации. На консультации поможем выбрать оптимальный
            состав без переплаты за лишний объем.
          </p>
        </div>

        <a href="#pricing" class="scope-summary__cta">
          <span>Посмотреть ориентиры по стоимости</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
            <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scope-section {
  position: relative;
  isolation: isolate;
  overflow: clip;
  padding: 120px 32px;
  background:
    radial-gradient(circle at 50% 20%, rgba(201, 169, 110, 0.04), transparent 33%),
    radial-gradient(circle at 46% 76%, rgba(0, 196, 180, 0.025), transparent 40%),
    linear-gradient(180deg, #0a1428 0%, #111c33 52%, #0a1428 100%);
}

.scope-section__decor {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.24;
  background-image:
    linear-gradient(to right, rgba(167, 176, 193, 0.045) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(167, 176, 193, 0.045) 1px, transparent 1px);
  background-size: 50px 50px, 50px 50px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.22), rgba(0, 0, 0, 0.85) 26%, rgba(0, 0, 0, 0.2));
}

.scope {
  width: min(100%, 1320px);
  margin: 0 auto;
}

.scope__intro {
  max-width: 860px;
}

.scope__eyebrow {
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

.scope__title {
  margin: 20px 0 0;
  max-width: 990px;
  font-family: 'Montserrat', 'Manrope', sans-serif;
  font-size: clamp(2.5rem, 5vw, 3.75rem);
  line-height: 1.04;
  letter-spacing: -0.02em;
  font-weight: 760;
  color: #e0e0e0;
  text-wrap: balance;
}

.scope__title span {
  color: #c9a96e;
}

.scope__lead {
  margin: 28px 0 0;
  max-width: 820px;
  font-size: clamp(18px, 1.45vw, 20px);
  line-height: 1.65;
  color: #a7b0c1;
}

.scope__formats-wrap {
  margin-top: 40px;
}

.scope__formats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 22px;
}

.scope-format-card {
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(22, 35, 61, 0.78);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.22);
  min-height: 236px;
  padding: 24px;
  transition:
    transform 280ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 280ms cubic-bezier(0.22, 1, 0.36, 1),
    background-color 280ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1);
}

.scope-format-card::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 2px;
  opacity: 0.5;
}

.scope-format-card--warm::before {
  background: linear-gradient(90deg, rgba(201, 169, 110, 0.8), transparent 86%);
}

.scope-format-card--neutral::before {
  background: linear-gradient(90deg, rgba(212, 175, 122, 0.7), rgba(255, 255, 255, 0.16) 80%, transparent 100%);
}

.scope-format-card--cool::before {
  background: linear-gradient(90deg, rgba(0, 196, 180, 0.82), transparent 86%);
}

.scope-format-card--support::before {
  background: linear-gradient(90deg, rgba(167, 176, 193, 0.84), rgba(255, 107, 53, 0.22) 82%, transparent 100%);
}

.scope-format-card:hover,
.scope-format-card:focus-visible,
.scope-format-card.is-active {
  transform: translateY(-3px);
  border-color: rgba(255, 255, 255, 0.18);
  background: rgba(22, 35, 61, 0.9);
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.26);
}

.scope-format-card--warm.is-active {
  border-color: rgba(201, 169, 110, 0.28);
}

.scope-format-card--cool.is-active {
  border-color: rgba(0, 196, 180, 0.3);
}

.scope-format-card__stage {
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 600;
  color: #c9a96e;
}

.scope-format-card--cool .scope-format-card__stage {
  color: rgba(0, 196, 180, 0.94);
}

.scope-format-card__title {
  margin: 14px 0 0;
  font-size: clamp(1.36rem, 1.4vw, 1.68rem);
  line-height: 1.16;
  font-weight: 680;
  color: #e0e0e0;
  text-wrap: balance;
}

.scope-format-card__text {
  margin: 11px 0 0;
  font-size: 15px;
  line-height: 1.6;
  color: #a7b0c1;
}

.scope-format-card__hint {
  margin: 14px 0 0;
  font-size: 13px;
  line-height: 1.5;
  color: rgba(224, 224, 224, 0.84);
}

.scope-matrix-wrap {
  margin-top: 24px;
}

.scope-matrix {
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(17, 28, 51, 0.74);
  overflow: hidden;
}

.scope-matrix__head,
.scope-matrix__row {
  display: grid;
  grid-template-columns: minmax(280px, 1.9fr) repeat(4, minmax(0, 1fr));
}

.scope-matrix__head {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
}

.scope-matrix__head-cell {
  min-height: 62px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 14px;
  font-size: 13px;
  font-weight: 620;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: rgba(224, 224, 224, 0.9);
}

.scope-matrix__head-cell--feature {
  justify-content: flex-start;
  padding-left: 24px;
  color: #a7b0c1;
}

.scope-matrix__head-cell--format {
  position: relative;
  transition:
    background-color 220ms ease,
    color 220ms ease,
    box-shadow 220ms ease;
}

.scope-matrix__head-cell--format.is-focused {
  color: #e0e0e0;
  background: rgba(255, 255, 255, 0.04);
}

.scope-matrix__head-cell--warm.is-focused {
  box-shadow: inset 0 2px 0 rgba(201, 169, 110, 0.64);
}

.scope-matrix__head-cell--cool.is-focused {
  box-shadow: inset 0 2px 0 rgba(0, 196, 180, 0.72);
}

.scope-matrix__body .scope-matrix__row {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: background-color 220ms ease;
}

.scope-matrix__body .scope-matrix__row:last-child {
  border-bottom: 0;
}

.scope-matrix__body .scope-matrix__row:hover {
  background: rgba(255, 255, 255, 0.02);
}

.scope-matrix__feature,
.scope-matrix__cell {
  min-height: 64px;
  display: inline-flex;
  align-items: center;
}

.scope-matrix__feature {
  padding: 0 24px;
  font-size: 15px;
  line-height: 1.45;
  color: #d5dce9;
}

.scope-matrix__cell {
  justify-content: center;
  transition: background-color 220ms ease;
}

.scope-matrix__cell.is-focused {
  background: rgba(255, 255, 255, 0.03);
}

.scope-marker {
  width: 26px;
  height: 26px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.84);
  background: rgba(255, 255, 255, 0.02);
}

.scope-marker svg {
  width: 14px;
  height: 14px;
}

.scope-marker__partial-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: currentColor;
  opacity: 0.85;
}

.scope-marker__dash {
  font-size: 15px;
  line-height: 1;
  transform: translateY(-0.5px);
}

.scope-marker--included.scope-marker--sketch,
.scope-marker--included.scope-marker--architectural {
  border-color: rgba(201, 169, 110, 0.48);
  color: #d4af37;
  background: rgba(201, 169, 110, 0.14);
}

.scope-marker--included.scope-marker--working {
  border-color: rgba(0, 196, 180, 0.54);
  color: #00c4b4;
  background: rgba(0, 196, 180, 0.16);
}

.scope-marker--included.scope-marker--supervision {
  border-color: rgba(167, 176, 193, 0.44);
  color: #d5dce9;
  background: rgba(167, 176, 193, 0.14);
}

.scope-marker--partial {
  border-color: rgba(255, 255, 255, 0.2);
  color: rgba(167, 176, 193, 0.94);
  background: rgba(255, 255, 255, 0.06);
}

.scope-marker--none {
  border-color: rgba(255, 255, 255, 0.08);
  color: rgba(134, 148, 170, 0.75);
  background: transparent;
}

.scope-mobile {
  display: none;
}

.scope-mobile-row {
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(22, 35, 61, 0.74);
  overflow: hidden;
}

.scope-mobile-row + .scope-mobile-row {
  margin-top: 10px;
}

.scope-mobile-row__summary {
  list-style: none;
  min-height: 56px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: 14px;
  line-height: 1.4;
  color: #e0e0e0;
  cursor: pointer;
}

.scope-mobile-row__summary svg {
  width: 16px;
  height: 16px;
  color: #a7b0c1;
  transition: transform 220ms ease;
}

.scope-mobile-row[open] .scope-mobile-row__summary svg {
  transform: rotate(180deg);
}

.scope-mobile-row__content {
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding: 12px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.scope-mobile-row__item {
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  padding: 10px;
}

.scope-mobile-row__format {
  margin: 0;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #a7b0c1;
}

.scope-mobile-row__status {
  margin-top: 8px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
}

.scope-mobile-row__status-label {
  font-size: 12px;
  color: #d5dce9;
}

.scope-summary {
  margin-top: 26px;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(22, 35, 61, 0.68), rgba(17, 28, 51, 0.88));
  padding: 30px 32px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 18px;
  align-items: center;
}

.scope-summary__title {
  margin: 0;
  max-width: 780px;
  font-size: clamp(1.45rem, 2vw, 1.95rem);
  line-height: 1.2;
  font-weight: 690;
  color: #e0e0e0;
  text-wrap: balance;
}

.scope-summary__title span {
  color: #c9a96e;
}

.scope-summary__text {
  margin: 12px 0 0;
  max-width: 760px;
  font-size: 16px;
  line-height: 1.62;
  color: #a7b0c1;
}

.scope-summary__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 46px;
  border-radius: 999px;
  border: 1px solid rgba(255, 107, 53, 0.44);
  background: rgba(255, 107, 53, 0.9);
  padding: 0 16px;
  font-size: 14px;
  font-weight: 620;
  color: #102133;
  transition:
    transform 240ms ease,
    box-shadow 240ms ease,
    background-color 240ms ease;
}

.scope-summary__cta svg {
  width: 16px;
  height: 16px;
  transition: transform 240ms ease;
}

.scope-summary__cta:hover {
  transform: translateY(-1px);
  background: #ff5a1d;
  box-shadow: 0 8px 24px rgba(255, 107, 53, 0.3);
}

.scope-summary__cta:hover svg {
  transform: translateX(4px);
}

.scope-reveal {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 760ms ease-out,
    transform 760ms ease-out;
}

.scope-reveal--eyebrow {
  transition-delay: 0ms;
}

.scope-reveal--title {
  transition-delay: 90ms;
}

.scope-reveal--lead {
  transition-delay: 170ms;
}

.scope-reveal--formats {
  transition-delay: 260ms;
}

.scope-reveal--matrix {
  transition-delay: 380ms;
}

.scope-reveal--mobile {
  transition-delay: 420ms;
}

.scope-reveal--summary {
  transition-delay: 620ms;
}

.scope-section.is-visible .scope-reveal {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 1279px) {
  .scope__formats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .scope-matrix__head,
  .scope-matrix__row {
    grid-template-columns: minmax(220px, 1.45fr) repeat(4, minmax(0, 1fr));
  }

  .scope-summary {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .scope-summary__cta {
    justify-self: start;
  }
}

@media (max-width: 1023px) {
  .scope-section {
    padding: 72px 20px;
  }

  .scope__title {
    font-size: clamp(2rem, 8.8vw, 2.5rem);
    line-height: 1.08;
  }

  .scope__lead {
    margin-top: 20px;
    font-size: 16px;
    line-height: 1.6;
    max-width: 100%;
  }

  .scope__formats-wrap {
    margin-top: 24px;
  }

  .scope__formats {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 6px;
  }

  .scope-format-card {
    flex: 0 0 min(86vw, 320px);
    min-height: 226px;
    border-radius: 20px;
    padding: 20px;
    scroll-snap-align: start;
  }

  .scope-format-card__title {
    font-size: 22px;
  }

  .scope-format-card__text {
    font-size: 14px;
    line-height: 1.56;
  }

  .scope-format-card__hint {
    font-size: 12px;
  }

  .scope-matrix-wrap {
    display: none;
  }

  .scope-mobile {
    display: block;
    margin-top: 14px;
  }

  .scope-summary {
    margin-top: 20px;
    border-radius: 22px;
    padding: 20px;
    gap: 12px;
  }

  .scope-summary__title {
    font-size: 24px;
  }

  .scope-summary__text {
    margin-top: 10px;
    font-size: 15px;
    line-height: 1.58;
  }

  .scope-summary__cta {
    width: 100%;
    min-height: 50px;
  }

  .scope-reveal {
    transition:
      opacity 560ms ease-out,
      transform 560ms ease-out;
  }
}

@media (prefers-reduced-motion: reduce) {
  .scope-reveal,
  .scope-format-card,
  .scope-matrix__head-cell--format,
  .scope-matrix__row,
  .scope-summary__cta,
  .scope-summary__cta svg,
  .scope-mobile-row__summary svg {
    transition: none;
  }
}
</style>
