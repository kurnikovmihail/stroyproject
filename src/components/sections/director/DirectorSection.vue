<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const sectionRef = ref(null)
const isVisible = ref(false)
let observer

const controls = [
  {
    index: '01',
    title: 'Контроль ключевых проектных решений',
    text: 'Лично подключаюсь в точках, где определяется логика объекта, а не только его визуальный образ.',
  },
  {
    index: '02',
    title: 'Проверка реализуемости',
    text: 'Архитектурные решения оцениваются через реальную практику строительства и ограничения площадки.',
  },
  {
    index: '03',
    title: 'Качество рабочей документации',
    text: 'Фокус на том, чтобы строители получали понятный комплект без трактовок и операционного хаоса.',
  },
  {
    index: '04',
    title: 'Экспертная консультация на старте',
    text: 'Входной анализ задачи вы получаете через профессиональный взгляд руководителя, а не шаблонный сценарий.',
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
    id="director"
    ref="sectionRef"
    class="director-section"
    :class="{ 'is-visible': isVisible }"
    aria-labelledby="director-title"
  >
    <div class="director-section__decor" aria-hidden="true"></div>

    <div class="director">
      <div class="director__header">
        <span class="director__eyebrow director-reveal director-reveal--eyebrow">Кто лично контролирует качество проекта</span>
        <h2 id="director-title" class="director__title director-reveal director-reveal--title">
          Ключевые этапы проекта проходят под <span>личным контролем директора</span>
        </h2>
      </div>

      <div class="director__scene">
        <div class="director-visual director-reveal director-reveal--visual">
          <img
            src="/images/director-main-sm.webp"
            srcset="/images/director-main-sm.webp 800w, /images/director-main-md.webp 1200w, /images/director-main.webp 1800w"
            sizes="(max-width: 1023px) 100vw, (max-width: 1439px) 52vw, 760px"
            alt="Сергей Светлаков, директор Строй Проект"
            class="director-visual__image"
            width="1200"
            height="1489"
            loading="lazy"
            decoding="async"
            fetchpriority="low"
          />
          <div class="director-visual__overlay"></div>

          <div class="director-visual__caption">
            <p class="director-visual__name">Сергей Светлаков</p>
            <p class="director-visual__role">личный контроль проектных решений</p>
          </div>
        </div>

        <div class="director-content">
          <div class="director-content__identity director-reveal director-reveal--identity">
            <h3 class="director-content__name">Сергей Светлаков</h3>
            <p class="director-content__role">директор «Строй Проект»</p>
          </div>

          <blockquote class="director-content__quote director-reveal director-reveal--quote">
            «Хороший проект — это не красивая картинка, а решение, которое можно построить без хаоса, лишних затрат и
            постоянных переделок».
          </blockquote>

          <p class="director-content__lead director-reveal director-reveal--lead">
            Личный контроль нужен не для формальности. Он позволяет удерживать связь архитектурной идеи с реальностью участка,
            бюджета и строительного процесса на ключевых этапах.
          </p>

          <div class="director-controls director-reveal director-reveal--controls">
            <article
              v-for="(control, index) in controls"
              :key="control.index"
              class="director-control"
              :style="{ '--director-delay': `${340 + index * 90}ms` }"
            >
              <p class="director-control__meta">{{ control.index }} · контроль</p>
              <h4 class="director-control__title">{{ control.title }}</h4>
              <p class="director-control__text">{{ control.text }}</p>
            </article>
          </div>
        </div>
      </div>

      <div class="director__footer director-reveal director-reveal--footer">
        <p class="director__footer-text">
          После знакомства с персональным подходом можно закрыть оставшиеся практические вопросы по срокам, формату работы и
          деталям взаимодействия.
        </p>

        <a href="#faq" class="director__faq-cta">
          <span>Перейти к FAQ</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
            <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.director-section {
  position: relative;
  isolation: isolate;
  overflow: clip;
  padding: 120px 32px;
  background:
    radial-gradient(circle at 30% 24%, rgba(201, 169, 110, 0.05), transparent 30%),
    radial-gradient(circle at 72% 52%, rgba(0, 196, 180, 0.025), transparent 36%),
    linear-gradient(180deg, #0a1428 0%, #101c33 52%, #0a1428 100%);
}

.director-section__decor {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.16;
  background-image:
    linear-gradient(to right, rgba(167, 176, 193, 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(167, 176, 193, 0.04) 1px, transparent 1px);
  background-size: 58px 58px, 58px 58px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.22), rgba(0, 0, 0, 0.86) 24%, rgba(0, 0, 0, 0.2));
}

.director {
  width: min(100%, 1320px);
  margin: 0 auto;
}

.director__header {
  max-width: 860px;
}

.director__eyebrow {
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

.director__title {
  margin: 20px 0 0;
  max-width: 1000px;
  font-family: 'Montserrat', 'Manrope', sans-serif;
  font-size: clamp(2.5rem, 5vw, 3.75rem);
  line-height: 1.04;
  letter-spacing: -0.02em;
  font-weight: 760;
  color: #e0e0e0;
  text-wrap: balance;
}

.director__title span {
  color: #c9a96e;
}

.director__scene {
  margin-top: 34px;
  display: grid;
  grid-template-columns: minmax(0, 1.06fr) minmax(0, 1fr);
  gap: 24px;
  align-items: stretch;
}

.director-visual {
  position: relative;
  border-radius: 32px;
  overflow: hidden;
  min-height: 680px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 24px 54px rgba(0, 0, 0, 0.28);
}

.director-visual__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: brightness(0.78) saturate(0.88) contrast(1.04);
}

.director-visual__overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(7, 19, 34, 0.2) 0%, rgba(7, 19, 34, 0.42) 48%, rgba(7, 19, 34, 0.82) 100%),
    radial-gradient(circle at 20% 84%, rgba(201, 169, 110, 0.14), transparent 44%);
}

.director-visual__caption {
  position: absolute;
  left: 20px;
  right: 20px;
  bottom: 20px;
  z-index: 2;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(20, 30, 50, 0.42);
  backdrop-filter: blur(11px);
  padding: 14px 16px;
}

.director-visual__name {
  margin: 0;
  font-size: 18px;
  line-height: 1.2;
  font-weight: 650;
  color: #e0e0e0;
}

.director-visual__role {
  margin: 6px 0 0;
  font-size: 13px;
  line-height: 1.4;
  color: #a7b0c1;
}


.director-content {
  display: flex;
  flex-direction: column;
}

.director-content__identity {
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(22, 35, 61, 0.66);
  padding: 18px 20px;
}

.director-content__name {
  margin: 0;
  font-size: 26px;
  line-height: 1.15;
  font-weight: 690;
  color: #e0e0e0;
}

.director-content__role {
  margin: 8px 0 0;
  font-size: 15px;
  line-height: 1.5;
  color: #a7b0c1;
}

.director-content__quote {
  margin: 18px 0 0;
  border-radius: 24px;
  border: 1px solid rgba(201, 169, 110, 0.2);
  background: linear-gradient(180deg, rgba(22, 35, 61, 0.82), rgba(17, 28, 51, 0.9));
  padding: 22px;
  font-size: clamp(1.45rem, 2.2vw, 2.1rem);
  line-height: 1.3;
  font-weight: 560;
  color: #e0e0e0;
  text-wrap: balance;
}

.director-content__lead {
  margin: 18px 0 0;
  font-size: 17px;
  line-height: 1.65;
  color: #a7b0c1;
}

.director-controls {
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.director-control {
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(22, 35, 61, 0.68);
  padding: 18px;
  transition:
    border-color 260ms ease,
    background-color 260ms ease,
    transform 260ms ease;
}

.director-control:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.15);
  background: rgba(22, 35, 61, 0.82);
}

.director-control__meta {
  margin: 0;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: #c9a96e;
}

.director-control__title {
  margin: 10px 0 0;
  font-size: 18px;
  line-height: 1.3;
  font-weight: 630;
  color: #e0e0e0;
}

.director-control__text {
  margin: 8px 0 0;
  font-size: 14px;
  line-height: 1.56;
  color: #a7b0c1;
}

.director__footer {
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

.director__footer-text {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  color: #a7b0c1;
}

.director__faq-cta {
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

.director__faq-cta svg {
  width: 15px;
  height: 15px;
  transition: transform 220ms ease;
}

.director__faq-cta:hover {
  border-color: rgba(0, 196, 180, 0.38);
  background: rgba(0, 196, 180, 0.16);
  box-shadow: 0 0 16px rgba(0, 196, 180, 0.12);
}

.director__faq-cta:hover svg {
  transform: translateX(3px);
}

.director-reveal {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 760ms ease-out,
    transform 760ms ease-out;
}

.director-reveal--eyebrow {
  transition-delay: 0ms;
}

.director-reveal--title {
  transition-delay: 90ms;
}

.director-reveal--visual {
  transition-delay: 200ms;
}

.director-reveal--visual .director-visual__image {
  transform: scale(1.03);
  transition: transform 900ms ease-out;
}

.director-reveal--identity {
  transition-delay: 260ms;
}

.director-reveal--quote {
  transition-delay: 340ms;
}

.director-reveal--lead {
  transition-delay: 420ms;
}

.director-reveal--controls {
  transition-delay: 500ms;
}

.director-reveal--footer {
  transition-delay: 620ms;
}

.director-section.is-visible .director-reveal {
  opacity: 1;
  transform: translateY(0);
}

.director-section.is-visible .director-reveal--visual .director-visual__image {
  transform: scale(1);
}

@media (max-width: 1279px) {
  .director__scene {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .director-visual {
    min-height: 560px;
  }

  .director-controls {
    grid-template-columns: 1fr;
  }

  .director__footer {
    grid-template-columns: 1fr;
  }

  .director__faq-cta {
    justify-self: start;
  }
}

@media (max-width: 1023px) {
  .director-section {
    padding: 72px 20px;
  }

  .director__title {
    font-size: clamp(2rem, 8.8vw, 2.5rem);
    line-height: 1.08;
  }

  .director__scene {
    margin-top: 22px;
    gap: 12px;
  }

  .director-visual {
    min-height: 420px;
    border-radius: 24px;
  }

  .director-visual__caption {
    left: 12px;
    right: 12px;
    bottom: 12px;
    border-radius: 14px;
    padding: 12px;
  }

  .director-visual__name {
    font-size: 16px;
  }

  .director-visual__role {
    margin-top: 4px;
    font-size: 12px;
  }

  .director-content__identity {
    border-radius: 18px;
    padding: 16px;
  }

  .director-content__name {
    font-size: 24px;
  }

  .director-content__role {
    margin-top: 6px;
    font-size: 14px;
  }

  .director-content__quote {
    margin-top: 12px;
    border-radius: 20px;
    padding: 18px;
    font-size: clamp(1.4rem, 6vw, 1.75rem);
    line-height: 1.32;
  }

  .director-content__lead {
    margin-top: 12px;
    font-size: 15px;
    line-height: 1.58;
  }

  .director-controls {
    margin-top: 12px;
    gap: 10px;
  }

  .director-control {
    border-radius: 18px;
    padding: 16px;
  }

  .director-control__title {
    margin-top: 8px;
    font-size: 18px;
  }

  .director-control__text {
    margin-top: 7px;
    font-size: 14px;
  }

  .director__footer {
    margin-top: 12px;
    border-radius: 20px;
    padding: 16px;
    gap: 10px;
  }

  .director__footer-text {
    font-size: 14px;
    line-height: 1.58;
  }

  .director__faq-cta {
    width: 100%;
    min-height: 50px;
  }

  .director-reveal {
    transition:
      opacity 560ms ease-out,
      transform 560ms ease-out;
  }
}

@media (prefers-reduced-motion: reduce) {
  .director-reveal,
  .director-control,
  .director-visual__image,
  .director__faq-cta,
  .director__faq-cta svg {
    transition: none;
  }
}
</style>
