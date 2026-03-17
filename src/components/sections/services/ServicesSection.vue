<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const sectionRef = ref(null)
const isVisible = ref(false)
const activeRoute = ref('private')
let observer

const privateRoute = {
  id: 'private',
  title: 'Для частных объектов',
  description:
    'Маршрут для домов, коттеджей, вилл и резиденций, где важны индивидуальная архитектура, логичная планировка и реализуемость на участке.',
  nodes: [
    { title: 'Архитектурное проектирование частных домов', type: 'primary' },
    { title: 'Индивидуальные планировочные решения' },
    { title: 'Эскизный проект' },
    { title: 'Рабочий проект' },
    { title: 'Проект реконструкции' },
    { title: 'Виллы, коттеджи и резиденции' },
  ],
}

const commercialRoute = {
  id: 'commercial',
  title: 'Для коммерческих объектов',
  description:
    'Маршрут для офисов, гостиничных и торговых пространств, где ключевые потоки, эксплуатация, экономика площади и бизнес-логика.',
  nodes: [
    { title: 'Проектирование коммерческих объектов', type: 'primary' },
    { title: 'Офисы и административные пространства' },
    { title: 'Гостиницы, гостевые дома и апартаменты' },
    { title: 'Рестораны, кафе и магазины' },
    { title: 'Адаптация под бизнес-задачи' },
    { title: 'Реконструкция действующих площадок' },
  ],
}

const modules = [
  {
    title: '3D-визуализация',
    text: 'Проверяем образ объекта до стройки',
    icon: 'M4 12.2 8.4 9.4V4.7L4 7.5v4.7Zm5.8-2.9 4.3 2.8v-4.7L9.8 4.7v4.6Zm5.8 2.8L20 9.4V4.7l-4.4 2.8v4.6Z',
  },
  {
    title: 'Авторский надзор',
    text: 'Сопровождаем ключевые решения на площадке',
    icon: 'M5 19h14M7 19V6.8L12 4l5 2.8V19M9.8 11h4.4',
  },
  {
    title: 'Сопровождение стройки',
    text: 'Помогаем держать сроки и последовательность',
    icon: 'M4 17h16M7 17V9m5 8V7m5 10v-5M4 9h16',
  },
  {
    title: 'Подбор подрядчиков',
    text: 'Сверяем компетенции под задачи проекта',
    icon: 'M4.5 8.5h15m-12 0a2.2 2.2 0 1 1 0-4.4 2.2 2.2 0 0 1 0 4.4Zm9 11.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4ZM4.5 15.3h15',
  },
  {
    title: 'Смежники и разделы',
    text: 'Собираем разделы в единое решение',
    icon: 'M6 7.4h12M6 12h12M6 16.6h12M8.4 7.4v9.2m7.2-9.2v9.2',
  },
  {
    title: 'Консультации директора',
    text: 'Разбор задачи на уровне стратегии проекта',
    icon: 'M12 4.5a3.2 3.2 0 1 1 0 6.4 3.2 3.2 0 0 1 0-6.4ZM5.2 19a6.8 6.8 0 0 1 13.6 0',
  },
]

const activeRouteData = computed(() => (activeRoute.value === 'private' ? privateRoute : commercialRoute))
const inactiveRouteData = computed(() => (activeRoute.value === 'private' ? commercialRoute : privateRoute))

const setRoute = (routeId) => {
  activeRoute.value = routeId
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
          Услуги собраны по типам задач и уровням вовлечения: от концептуального старта до полного рабочего комплекта и
          сопровождения реализации.
        </p>
      </div>

      <div class="services-router services-reveal services-reveal--router">
        <div class="services-router__connections" aria-hidden="true">
          <span class="services-router__line services-router__line--left"></span>
          <span class="services-router__line services-router__line--right"></span>
        </div>

        <article
          class="services-route services-route--private"
          :class="{ 'is-active': activeRoute === 'private', 'is-inactive': activeRoute !== 'private' }"
        >
          <h3 class="services-route__title">{{ privateRoute.title }}</h3>
          <p class="services-route__description">{{ privateRoute.description }}</p>

          <div class="services-route__nodes">
            <button
              v-for="(node, index) in privateRoute.nodes"
              :key="`private-${node.title}`"
              type="button"
              class="service-node"
              :class="{ 'service-node--primary': node.type === 'primary' }"
              :style="{ '--node-delay': `${460 + index * 70}ms` }"
            >
              {{ node.title }}
            </button>
          </div>

          <button
            type="button"
            class="services-route__mobile-switch"
            :class="{ visible: activeRoute !== 'private' }"
            @click="setRoute('private')"
          >
            Показать маршрут
          </button>
        </article>

        <div class="services-router__hub" :class="`route-${activeRoute}`">
          <span class="services-router__label">Тип объекта</span>
          <div class="services-router__switch">
            <button
              type="button"
              class="services-router__switch-btn"
              :class="{ active: activeRoute === 'private' }"
              @click="setRoute('private')"
            >
              Частный
            </button>
            <button
              type="button"
              class="services-router__switch-btn"
              :class="{ active: activeRoute === 'commercial' }"
              @click="setRoute('commercial')"
            >
              Коммерческий
            </button>
          </div>
          <p class="services-router__hint">
            Активный маршрут:
            <span>{{ activeRouteData.title }}</span>
          </p>
        </div>

        <article
          class="services-route services-route--commercial"
          :class="{ 'is-active': activeRoute === 'commercial', 'is-inactive': activeRoute !== 'commercial' }"
        >
          <h3 class="services-route__title">{{ commercialRoute.title }}</h3>
          <p class="services-route__description">{{ commercialRoute.description }}</p>

          <div class="services-route__nodes">
            <button
              v-for="(node, index) in commercialRoute.nodes"
              :key="`commercial-${node.title}`"
              type="button"
              class="service-node"
              :class="{ 'service-node--primary': node.type === 'primary' }"
              :style="{ '--node-delay': `${460 + index * 70}ms` }"
            >
              {{ node.title }}
            </button>
          </div>

          <button
            type="button"
            class="services-route__mobile-switch"
            :class="{ visible: activeRoute !== 'commercial' }"
            @click="setRoute('commercial')"
          >
            Показать маршрут
          </button>
        </article>
      </div>

      <div class="services-modules services-reveal services-reveal--modules">
        <article
          v-for="(module, index) in modules"
          :key="module.title"
          class="service-module"
          :style="{ '--module-delay': `${660 + index * 80}ms` }"
        >
          <div class="service-module__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
              <path :d="module.icon" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <h3 class="service-module__title">{{ module.title }}</h3>
          <p class="service-module__text">{{ module.text }}</p>
        </article>
      </div>

      <div class="services-summary services-reveal services-reveal--summary">
        <div class="services-summary__content">
          <h3 class="services-summary__title">
            Можно подключиться на этапе идеи, взять полный маршрут под реализацию или усилить проект
            <span>дополнительными модулями</span>.
          </h3>
          <p class="services-summary__text">
            Выбор формата зависит от задачи, но логика одна: проект должен быть реализуемым, понятным и управляемым на каждом
            этапе.
          </p>
        </div>
        <a href="#portfolio" class="services-summary__cta">
          <span>Посмотреть реализованные проекты</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
            <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
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

.services-router {
  position: relative;
  margin-top: 48px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(260px, 300px) minmax(0, 1fr);
  gap: 18px;
  align-items: stretch;
}

.services-router__connections {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.services-router__line {
  position: absolute;
  top: 50%;
  height: 1px;
  transform: translateY(-50%);
  background: linear-gradient(90deg, transparent 0%, rgba(201, 169, 110, 0.2) 52%, transparent 100%);
}

.services-router__line--left {
  left: 8%;
  width: 34%;
}

.services-router__line--right {
  right: 8%;
  width: 34%;
}

.services-router__hub {
  position: relative;
  z-index: 2;
  align-self: center;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(180deg, rgba(30, 43, 71, 0.9), rgba(22, 35, 61, 0.94));
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.28);
  padding: 22px 20px 20px;
}

.services-router__hub.route-private {
  box-shadow:
    0 18px 60px rgba(0, 0, 0, 0.28),
    0 0 24px rgba(201, 169, 110, 0.12);
}

.services-router__hub.route-commercial {
  box-shadow:
    0 18px 60px rgba(0, 0, 0, 0.28),
    0 0 24px rgba(0, 196, 180, 0.14);
}

.services-router__label {
  display: block;
  font-size: 12px;
  line-height: 1.2;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(201, 169, 110, 0.88);
}

.services-router__switch {
  margin-top: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.services-router__switch-btn {
  min-height: 40px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  font-size: 13px;
  font-weight: 600;
  color: #a7b0c1;
  transition:
    border-color 240ms ease,
    background-color 240ms ease,
    color 240ms ease;
}

.services-router__switch-btn.active {
  border-color: rgba(201, 169, 110, 0.3);
  background: rgba(201, 169, 110, 0.14);
  color: #e0e0e0;
}

.services-router__hub.route-commercial .services-router__switch-btn.active {
  border-color: rgba(0, 196, 180, 0.34);
  background: rgba(0, 196, 180, 0.14);
}

.services-router__hint {
  margin: 12px 0 0;
  font-size: 13px;
  line-height: 1.45;
  color: #a7b0c1;
}

.services-router__hint span {
  color: #e0e0e0;
}

.services-route {
  position: relative;
  z-index: 1;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(22, 35, 61, 0.78);
  box-shadow: 0 16px 42px rgba(0, 0, 0, 0.24);
  padding: 28px;
  min-height: 418px;
  transition:
    border-color 280ms cubic-bezier(0.22, 1, 0.36, 1),
    background-color 280ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 280ms cubic-bezier(0.22, 1, 0.36, 1);
}

.services-route.is-active {
  transform: translateY(-2px);
}

.services-route--private.is-active {
  border-color: rgba(201, 169, 110, 0.24);
}

.services-route--commercial.is-active {
  border-color: rgba(0, 196, 180, 0.25);
}

.services-route.is-inactive {
  opacity: 0.92;
}

.services-route__title {
  margin: 0;
  font-size: clamp(1.45rem, 2vw, 1.75rem);
  line-height: 1.18;
  font-weight: 700;
  color: #e0e0e0;
}

.services-route__description {
  margin: 12px 0 0;
  font-size: 15px;
  line-height: 1.62;
  color: #a7b0c1;
}

.services-route__nodes {
  margin-top: 16px;
  display: grid;
  gap: 10px;
}

.service-node {
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  min-height: 42px;
  padding: 10px 14px;
  text-align: left;
  font-size: 14px;
  line-height: 1.4;
  color: #a7b0c1;
  transition:
    border-color 240ms ease,
    background-color 240ms ease,
    color 240ms ease,
    transform 240ms ease;
}

.service-node--primary {
  border-color: rgba(201, 169, 110, 0.28);
  background: rgba(201, 169, 110, 0.1);
  color: #e0e0e0;
  font-weight: 600;
}

.services-route--commercial .service-node--primary {
  border-color: rgba(0, 196, 180, 0.3);
  background: rgba(0, 196, 180, 0.12);
}

.service-node:hover {
  transform: scale(1.01);
  border-color: rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.08);
  color: #e0e0e0;
}

.services-route__mobile-switch {
  display: none;
  margin-top: 14px;
  width: 100%;
  min-height: 44px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.05);
  font-size: 13px;
  font-weight: 600;
  color: #e0e0e0;
}

.services-route__mobile-switch.visible {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.services-modules {
  margin-top: 22px;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(17, 28, 51, 0.72), rgba(22, 35, 61, 0.88));
  padding: 24px 26px;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 12px;
}

.service-module {
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  padding: 14px 12px;
  transition:
    border-color 260ms ease,
    transform 260ms ease;
}

.service-module:hover {
  transform: translateY(-2px);
  border-color: rgba(0, 196, 180, 0.28);
}

.service-module__icon {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  border: 1px solid rgba(0, 196, 180, 0.2);
  background: rgba(0, 196, 180, 0.1);
  color: #00c4b4;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.service-module__icon svg {
  width: 18px;
  height: 18px;
}

.service-module__title {
  margin: 10px 0 0;
  font-size: 14px;
  line-height: 1.32;
  font-weight: 600;
  color: #e0e0e0;
}

.service-module__text {
  margin: 8px 0 0;
  font-size: 12px;
  line-height: 1.45;
  color: #a7b0c1;
}

.services-summary {
  margin-top: 26px;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(17, 28, 51, 0.74), rgba(22, 35, 61, 0.9));
  padding: 30px 34px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 22px;
  align-items: center;
}

.services-summary__title {
  margin: 0;
  max-width: 820px;
  font-size: clamp(1.6rem, 2.35vw, 2rem);
  line-height: 1.2;
  font-weight: 700;
  color: #e0e0e0;
  text-wrap: balance;
}

.services-summary__title span {
  color: #c9a96e;
}

.services-summary__text {
  margin: 12px 0 0;
  max-width: 760px;
  font-size: 16px;
  line-height: 1.62;
  color: #a7b0c1;
}

.services-summary__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 46px;
  border-radius: 999px;
  border: 1px solid rgba(0, 196, 180, 0.24);
  background: rgba(0, 196, 180, 0.14);
  padding: 0 18px;
  font-size: 14px;
  font-weight: 600;
  color: #e0e0e0;
  transition:
    border-color 260ms ease,
    background-color 260ms ease,
    box-shadow 260ms ease;
}

.services-summary__cta svg {
  width: 16px;
  height: 16px;
  transition: transform 260ms ease;
}

.services-summary__cta:hover {
  border-color: rgba(0, 196, 180, 0.4);
  background: rgba(0, 196, 180, 0.2);
  box-shadow: 0 0 20px rgba(0, 196, 180, 0.16);
}

.services-summary__cta:hover svg {
  transform: translateX(4px);
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
  transition-delay: 80ms;
}

.services-reveal--lead {
  transition-delay: 160ms;
}

.services-reveal--router {
  transition-delay: 260ms;
}

.services-reveal--modules {
  transition-delay: 540ms;
}

.services-reveal--summary {
  transition-delay: 760ms;
}

.services-section.is-visible .services-reveal {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 1279px) {
  .services-router {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .services-router__connections {
    display: none;
  }

  .services-router__hub {
    order: 1;
  }

  .services-route--private {
    order: 2;
  }

  .services-route--commercial {
    order: 3;
  }

  .services-modules {
    grid-template-columns: repeat(3, minmax(0, 1fr));
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
    margin-top: 20px;
    font-size: 16px;
    line-height: 1.6;
    max-width: 100%;
  }

  .services-router {
    margin-top: 30px;
  }

  .services-route {
    border-radius: 22px;
    padding: 20px;
    min-height: 0;
  }

  .services-route.is-inactive .service-node:nth-child(n + 4) {
    display: none;
  }

  .services-route.is-inactive .services-route__mobile-switch {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .services-router__hub {
    border-radius: 22px;
    padding: 18px 16px;
  }

  .services-modules {
    margin-top: 16px;
    display: flex;
    overflow-x: auto;
    gap: 12px;
    padding: 18px;
  }

  .service-module {
    min-width: 210px;
    flex: 0 0 auto;
  }

  .services-summary {
    margin-top: 20px;
    border-radius: 22px;
    padding: 20px;
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .services-summary__title {
    font-size: clamp(1.4rem, 5.8vw, 1.7rem);
  }

  .services-summary__text {
    font-size: 15px;
    line-height: 1.58;
  }

  .services-summary__cta {
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

  .services-route,
  .services-router__switch-btn,
  .service-node,
  .service-module,
  .services-summary__cta,
  .services-summary__cta svg {
    transition: none;
  }
}
</style>
