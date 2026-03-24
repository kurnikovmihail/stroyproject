<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const disclosureRef = ref(null)

const openByHash = () => {
  const hash = window.location.hash.replace('#', '')
  if (!hash) return

  if (['privacy', 'privacy-policy', 'consent-agreement'].includes(hash)) {
    disclosureRef.value?.setAttribute('open', '')
  }
}

onMounted(() => {
  openByHash()
  window.addEventListener('hashchange', openByHash)
})

onBeforeUnmount(() => {
  window.removeEventListener('hashchange', openByHash)
})
</script>

<template>
  <section id="privacy" class="legal-section" aria-labelledby="legal-toggle">
    <div class="legal">
      <details ref="disclosureRef" class="legal-disclosure">
        <summary id="legal-toggle" class="legal-disclosure__summary">
          <span class="legal-disclosure__eyebrow">Правовая информация</span>
          <span class="legal-disclosure__title">Политика конфиденциальности и согласие на обработку данных</span>
          <svg class="legal-disclosure__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </summary>

        <div class="legal-disclosure__content">
          <p class="legal__lead">
            Этот раздел описывает, какие данные мы получаем через форму, как их используем и как можно отозвать согласие.
          </p>

          <div class="legal__grid">
            <article class="legal-card" aria-labelledby="privacy-policy">
              <h3 id="privacy-policy" class="legal-card__title">Политика конфиденциальности</h3>
              <p class="legal-card__text">
                Оператор персональных данных: «Строй Проект». Контакты для обращений:
                <a href="mailto:proekt@12393.ru">proekt@12393.ru</a>,
                <a href="tel:+79667722280">+7 (966) 772-22-80</a>.
              </p>
              <ul class="legal-card__list">
                <li>Собираемые данные: имя, телефон, тип объекта, приоритет запроса, комментарий из формы.</li>
                <li>Цели обработки: обратная связь по заявке, консультация по проекту, уточнение вводных по объекту.</li>
                <li>Правовое основание: добровольное согласие субъекта персональных данных.</li>
                <li>Срок хранения: до достижения цели обращения или до отзыва согласия, но не более 36 месяцев.</li>
                <li>Передача третьим лицам: только в объеме, необходимом для работы сервисов связи и CRM-системы amoCRM, либо по требованиям закона.</li>
                <li>Меры защиты: ограничение доступа к данным, организационные и технические меры защиты информации.</li>
              </ul>
            </article>

            <article class="legal-card" aria-labelledby="consent-agreement">
              <h3 id="consent-agreement" class="legal-card__title">Согласие на обработку персональных данных</h3>
              <p class="legal-card__text">Отправляя форму и отмечая чекбокс согласия, пользователь подтверждает, что:</p>
              <ul class="legal-card__list">
                <li>предоставляет достоверные и актуальные персональные данные добровольно;</li>
                <li>согласен на обработку данных для целей обратной связи и консультации по проекту;</li>
                <li>ознакомлен с условиями политики конфиденциальности;</li>
                <li>может отозвать согласие в любой момент, направив запрос на <a href="mailto:proekt@12393.ru">proekt@12393.ru</a>.</li>
              </ul>
              <p class="legal-card__meta">Актуально на 24 марта 2026 года.</p>
            </article>
          </div>
        </div>
      </details>
    </div>
  </section>
</template>

<style scoped>
.legal-section {
  position: relative;
  overflow: clip;
  padding: 24px 32px 56px;
  background: linear-gradient(180deg, rgba(10, 20, 40, 0.62) 0%, #0a1325 100%);
}

.legal {
  width: min(100%, 1240px);
  margin: 0 auto;
}

.legal-disclosure {
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(17, 28, 51, 0.72);
  overflow: hidden;
}

.legal-disclosure > summary::-webkit-details-marker {
  display: none;
}

.legal-disclosure__summary {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px 14px;
  padding: 16px 20px;
  cursor: pointer;
  align-items: center;
}

.legal-disclosure__eyebrow {
  grid-column: 1;
  display: inline-flex;
  align-items: center;
  width: fit-content;
  border-radius: 999px;
  border: 1px solid rgba(201, 169, 110, 0.2);
  background: rgba(201, 169, 110, 0.08);
  padding: 6px 10px;
  font-size: 11px;
  line-height: 1.2;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  font-weight: 600;
  color: #c9a96e;
}

.legal-disclosure__title {
  grid-column: 1;
  font-size: 18px;
  line-height: 1.35;
  font-weight: 650;
  color: #e0e0e0;
}

.legal-disclosure__chevron {
  grid-column: 2;
  grid-row: 1 / span 2;
  width: 18px;
  height: 18px;
  color: #a7b0c1;
  transition: transform 220ms ease, color 220ms ease;
}

.legal-disclosure[open] .legal-disclosure__chevron {
  transform: rotate(180deg);
  color: #e0e0e0;
}

.legal-disclosure__content {
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  padding: 18px 20px 20px;
}

.legal__lead {
  margin: 0;
  max-width: 880px;
  font-size: 15px;
  line-height: 1.6;
  color: #a7b0c1;
}

.legal__grid {
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.legal-card {
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(17, 28, 51, 0.62);
  padding: 16px;
}

.legal-card__title {
  margin: 0;
  font-size: 18px;
  line-height: 1.3;
  font-weight: 650;
  color: #e0e0e0;
}

.legal-card__text {
  margin: 10px 0 0;
  font-size: 14px;
  line-height: 1.58;
  color: #a7b0c1;
}

.legal-card__list {
  margin: 10px 0 0;
  padding-left: 18px;
  display: grid;
  gap: 7px;
  font-size: 14px;
  line-height: 1.54;
  color: #d5dce9;
}

.legal-card__meta {
  margin: 12px 0 0;
  font-size: 12px;
  line-height: 1.45;
  color: #a7b0c1;
}

.legal-card a {
  color: #e0e0e0;
  text-decoration-color: rgba(201, 169, 110, 0.55);
  text-underline-offset: 2px;
}

@media (max-width: 1023px) {
  .legal-section {
    padding: 20px 20px 44px;
  }

  .legal-disclosure__summary {
    padding: 14px 16px;
  }

  .legal-disclosure__title {
    font-size: 16px;
  }

  .legal-disclosure__content {
    padding: 14px 16px 16px;
  }

  .legal__grid {
    grid-template-columns: 1fr;
  }
}
</style>
