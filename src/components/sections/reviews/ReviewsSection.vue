<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const sectionRef = ref(null)
const isVisible = ref(false)
let observer

const featuredReview = {
  person: 'Анна и Максим',
  role: 'Частный дом на сложном рельефе',
  quote:
    '«Был страх, что красивую идею не получится построить без резкого роста бюджета. В итоге получили рабочий проект, по которому строители шли без постоянных уточнений и пересборки планировок»',
  resultTitle: 'Что особенно сработало',
  tags: ['рабочая документация', 'без хаоса на стройке', 'контроль бюджета'],
}

const secondaryReviews = [
  {
    name: 'Алексей Р.',
    role: 'Бутик-отель',
    quote:
      '«Нужен был не просто красивый проект, а рабочая схема под бизнес-задачу. В результате получили понятную логику потоков, меньше спорных решений с подрядчиками и прогнозируемую эксплуатацию»',
    tags: ['коммерческая логика', 'оптимизация потоков'],
  },
  {
    name: 'Ирина К.',
    role: 'Реконструкция исторического здания',
    quote:
      '«Самый ценный результат — аккуратное совмещение нового функционала с характером существующего объекта. Проект оказался реалистичным и не разрушил сильные стороны здания»',
    tags: ['бережная реконструкция', 'адаптация без потери характера'],
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
    id="reviews"
    ref="sectionRef"
    class="reviews-section"
    :class="{ 'is-visible': isVisible }"
    aria-labelledby="reviews-title"
  >
    <div class="reviews-section__decor" aria-hidden="true"></div>

    <div class="reviews">
      <div class="reviews__intro">
        <span class="reviews__eyebrow reviews-reveal reviews-reveal--eyebrow">Что говорят после работы с нами</span>
        <h2 id="reviews-title" class="reviews__title reviews-reveal reviews-reveal--title">
          Отзывы с <span>конкретикой по задаче</span> и результату
        </h2>
        <p class="reviews__lead reviews-reveal reviews-reveal--lead">
          Важны не общие слова, а реальные истории: с каким запросом пришли, чего опасались и какой результат получили на
          практике.
        </p>
      </div>

      <article class="reviews-featured reviews-reveal reviews-reveal--featured">
        <div class="reviews-featured__person">
          <p class="reviews-featured__label">Главная история</p>
          <h3 class="reviews-featured__name">{{ featuredReview.person }}</h3>
          <p class="reviews-featured__role">{{ featuredReview.role }}</p>
        </div>

        <blockquote class="reviews-featured__quote">{{ featuredReview.quote }}</blockquote>

        <div class="reviews-featured__result">
          <p class="reviews-featured__result-title">{{ featuredReview.resultTitle }}</p>
          <div class="reviews-featured__tags">
            <span v-for="tag in featuredReview.tags" :key="tag" class="reviews-featured__tag">{{ tag }}</span>
          </div>
        </div>
      </article>

      <div class="reviews-grid reviews-reveal reviews-reveal--grid">
        <article
          v-for="(review, index) in secondaryReviews"
          :key="review.name"
          class="review-card reviews-reveal reviews-reveal--card"
          :style="{ '--review-delay': `${420 + index * 90}ms` }"
        >
          <div class="review-card__head">
            <h3 class="review-card__name">{{ review.name }}</h3>
            <p class="review-card__role">{{ review.role }}</p>
          </div>

          <p class="review-card__quote">{{ review.quote }}</p>

          <div class="review-card__tags">
            <span v-for="tag in review.tags" :key="`${review.name}-${tag}`" class="review-card__tag">{{ tag }}</span>
          </div>
        </article>
      </div>

      <div class="reviews__footer reviews-reveal reviews-reveal--footer">
        <p class="reviews__footer-text">
          Если откликается подход и формат работы, следующий шаг — выбрать удобный мягкий вход: чек-лист, разбор задачи или
          подборку релевантных решений под ваш объект.
        </p>

        <a href="#lead-magnets" class="reviews__cta">
          <span>Перейти к полезным материалам</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
            <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reviews-section {
  position: relative;
  isolation: isolate;
  overflow: clip;
  padding: 110px 32px;
  background:
    radial-gradient(circle at 44% 22%, rgba(201, 169, 110, 0.04), transparent 30%),
    radial-gradient(circle at 62% 66%, rgba(255, 255, 255, 0.02), transparent 34%),
    linear-gradient(180deg, #0a1428 0%, #10192e 52%, #0a1428 100%);
}

.reviews-section__decor {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.12;
  background-image:
    linear-gradient(to right, rgba(167, 176, 193, 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(167, 176, 193, 0.04) 1px, transparent 1px);
  background-size: 60px 60px, 60px 60px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.86) 24%, rgba(0, 0, 0, 0.22));
}

.reviews {
  width: min(100%, 1240px);
  margin: 0 auto;
}

.reviews__intro {
  max-width: 760px;
}

.reviews__eyebrow {
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

.reviews__title {
  margin: 20px 0 0;
  max-width: 920px;
  font-family: 'Montserrat', 'Manrope', sans-serif;
  font-size: clamp(2.35rem, 4.5vw, 3.5rem);
  line-height: 1.05;
  letter-spacing: -0.02em;
  font-weight: 760;
  color: #e0e0e0;
  text-wrap: balance;
}

.reviews__title span {
  color: #c9a96e;
}

.reviews__lead {
  margin: 24px 0 0;
  max-width: 760px;
  font-size: 18px;
  line-height: 1.65;
  color: #a7b0c1;
}

.reviews-featured {
  margin-top: 30px;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(22, 35, 61, 0.82), rgba(17, 28, 51, 0.94));
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.22);
  padding: 34px 36px;
}

.reviews-featured__person {
  display: grid;
  gap: 8px;
}

.reviews-featured__label {
  margin: 0;
  font-size: 12px;
  line-height: 1.2;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: #c9a96e;
}

.reviews-featured__name {
  margin: 0;
  font-size: 28px;
  line-height: 1.2;
  font-weight: 680;
  color: #e0e0e0;
}

.reviews-featured__role {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  color: #a7b0c1;
}

.reviews-featured__quote {
  position: relative;
  margin: 24px 0 0;
  padding-left: 18px;
  font-size: clamp(1.45rem, 2.4vw, 2.1rem);
  line-height: 1.35;
  font-weight: 540;
  color: #e0e0e0;
  text-wrap: balance;
}

.reviews-featured__quote::before {
  content: '';
  position: absolute;
  left: 0;
  top: 4px;
  bottom: 4px;
  width: 2px;
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(201, 169, 110, 0.86), rgba(212, 175, 55, 0.24));
}

.reviews-featured__result {
  margin-top: 24px;
}

.reviews-featured__result-title {
  margin: 0;
  font-size: 13px;
  line-height: 1.2;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 620;
  color: rgba(224, 224, 224, 0.9);
}

.reviews-featured__tags {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.reviews-featured__tag {
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  padding: 8px 12px;
  font-size: 13px;
  line-height: 1.2;
  color: #d5dce9;
}

.reviews-grid {
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.review-card {
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(22, 35, 61, 0.72);
  min-height: 244px;
  padding: 22px 24px;
  transition:
    transform 260ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 260ms cubic-bezier(0.22, 1, 0.36, 1),
    background-color 260ms cubic-bezier(0.22, 1, 0.36, 1);
}

.review-card:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.14);
  background: rgba(22, 35, 61, 0.82);
}

.review-card__name {
  margin: 0;
  font-size: 22px;
  line-height: 1.2;
  font-weight: 640;
  color: #e0e0e0;
}

.review-card__role {
  margin: 7px 0 0;
  font-size: 14px;
  line-height: 1.5;
  color: #a7b0c1;
}

.review-card__quote {
  margin: 16px 0 0;
  font-size: 15px;
  line-height: 1.62;
  color: #d5dce9;
}

.review-card__tags {
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.review-card__tag {
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  padding: 7px 11px;
  font-size: 12px;
  line-height: 1.2;
  color: rgba(224, 224, 224, 0.88);
}

.reviews__footer {
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

.reviews__footer-text {
  margin: 0;
  font-size: 15px;
  line-height: 1.58;
  color: #a7b0c1;
}

.reviews__cta {
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

.reviews__cta svg {
  width: 15px;
  height: 15px;
  transition: transform 220ms ease;
}

.reviews__cta:hover {
  border-color: rgba(0, 196, 180, 0.38);
  background: rgba(0, 196, 180, 0.16);
  box-shadow: 0 0 16px rgba(0, 196, 180, 0.12);
}

.reviews__cta:hover svg {
  transform: translateX(3px);
}

.reviews-reveal {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 700ms ease-out,
    transform 700ms ease-out;
}

.reviews-reveal--eyebrow {
  transition-delay: 0ms;
}

.reviews-reveal--title {
  transition-delay: 90ms;
}

.reviews-reveal--lead {
  transition-delay: 160ms;
}

.reviews-reveal--featured {
  transition-delay: 250ms;
}

.reviews-reveal--grid {
  transition-delay: 360ms;
}

.reviews-reveal--card {
  transition-delay: var(--review-delay, 420ms);
}

.reviews-reveal--footer {
  transition-delay: 480ms;
}

.reviews-section.is-visible .reviews-reveal {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 1023px) {
  .reviews-section {
    padding: 72px 20px;
  }

  .reviews__title {
    font-size: clamp(2rem, 8vw, 2.5rem);
    line-height: 1.08;
  }

  .reviews__lead {
    margin-top: 18px;
    font-size: 16px;
    line-height: 1.6;
  }

  .reviews-featured {
    margin-top: 22px;
    border-radius: 24px;
    padding: 24px;
  }

  .reviews-featured__name {
    font-size: 22px;
  }

  .reviews-featured__role {
    font-size: 14px;
  }

  .reviews-featured__quote {
    margin-top: 16px;
    padding-left: 14px;
    font-size: clamp(1.25rem, 6vw, 1.5rem);
    line-height: 1.34;
  }

  .reviews-featured__result {
    margin-top: 18px;
  }

  .reviews-featured__tag {
    font-size: 12px;
  }

  .reviews-grid {
    margin-top: 12px;
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .review-card {
    border-radius: 20px;
    min-height: 0;
    padding: 20px;
  }

  .review-card__name {
    font-size: 20px;
  }

  .review-card__role {
    font-size: 13px;
  }

  .review-card__quote {
    margin-top: 12px;
    font-size: 14px;
    line-height: 1.56;
  }

  .review-card__tag {
    font-size: 11px;
  }

  .reviews__footer {
    margin-top: 10px;
    border-radius: 18px;
    padding: 16px;
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .reviews__footer-text {
    font-size: 14px;
    line-height: 1.56;
  }

  .reviews__cta {
    width: 100%;
    min-height: 48px;
  }

  .reviews-reveal {
    transition:
      opacity 540ms ease-out,
      transform 540ms ease-out;
  }
}

@media (prefers-reduced-motion: reduce) {
  .reviews-reveal,
  .reviews-featured,
  .review-card,
  .reviews__cta,
  .reviews__cta svg {
    transition: none;
  }
}
</style>
