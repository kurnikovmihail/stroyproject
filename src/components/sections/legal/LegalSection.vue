<template>
  <section id="privacy" class="legal-section" aria-labelledby="legal-title">
    <div class="legal">
      <div class="legal__intro">
        <span class="legal__eyebrow">Правовая информация</span>
        <h2 id="legal-title" class="legal__title">Политика конфиденциальности и согласие на обработку данных</h2>
        <p class="legal__lead">
          Этот раздел описывает, какие данные мы получаем через форму, как их используем и как можно отозвать согласие.
        </p>
      </div>

      <div class="legal__grid">
        <article class="legal-card" aria-labelledby="privacy-policy">
          <h3 id="privacy-policy" class="legal-card__title">Политика конфиденциальности</h3>
          <p class="legal-card__text">
            Оператор персональных данных: «Строй Проект». Контакты для обращений: <a href="mailto:info@stroyproject.ru">info@stroyproject.ru</a>,
            <a href="tel:+79384633003">+7 (938) 463-30-03</a>.
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
          <p class="legal-card__text">
            Отправляя форму и отмечая чекбокс согласия, пользователь подтверждает, что:
          </p>
          <ul class="legal-card__list">
            <li>предоставляет достоверные и актуальные персональные данные добровольно;</li>
            <li>согласен на обработку данных для целей обратной связи и консультации по проекту;</li>
            <li>ознакомлен с условиями политики конфиденциальности;</li>
            <li>может отозвать согласие в любой момент, направив запрос на <a href="mailto:info@stroyproject.ru">info@stroyproject.ru</a>.</li>
          </ul>
          <p class="legal-card__meta">Актуально на 23 марта 2026 года.</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.legal-section {
  position: relative;
  overflow: clip;
  padding: 72px 32px 96px;
  background:
    radial-gradient(circle at 22% 10%, rgba(201, 169, 110, 0.04), transparent 34%),
    radial-gradient(circle at 74% 58%, rgba(0, 196, 180, 0.025), transparent 40%),
    linear-gradient(180deg, #0a1428 0%, #0a1325 100%);
}

.legal {
  width: min(100%, 1240px);
  margin: 0 auto;
}

.legal__intro {
  max-width: 920px;
}

.legal__eyebrow {
  display: inline-flex;
  align-items: center;
  margin: 0;
  border-radius: 999px;
  border: 1px solid rgba(201, 169, 110, 0.2);
  background: rgba(201, 169, 110, 0.08);
  padding: 7px 12px;
  font-size: 12px;
  line-height: 1.2;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  font-weight: 600;
  color: #c9a96e;
}

.legal__title {
  margin: 16px 0 0;
  font-family: 'Montserrat', 'Manrope', sans-serif;
  font-size: clamp(2rem, 3.8vw, 2.8rem);
  line-height: 1.1;
  font-weight: 760;
  letter-spacing: -0.02em;
  color: #e0e0e0;
}

.legal__lead {
  margin: 14px 0 0;
  max-width: 840px;
  font-size: 16px;
  line-height: 1.62;
  color: #a7b0c1;
}

.legal__grid {
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.legal-card {
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(17, 28, 51, 0.78);
  padding: 22px;
}

.legal-card__title {
  margin: 0;
  font-size: 22px;
  line-height: 1.22;
  font-weight: 680;
  color: #e0e0e0;
}

.legal-card__text {
  margin: 12px 0 0;
  font-size: 15px;
  line-height: 1.62;
  color: #a7b0c1;
}

.legal-card__list {
  margin: 12px 0 0;
  padding-left: 18px;
  display: grid;
  gap: 8px;
  font-size: 14px;
  line-height: 1.58;
  color: #d5dce9;
}

.legal-card__meta {
  margin: 14px 0 0;
  font-size: 13px;
  line-height: 1.4;
  color: #a7b0c1;
}

.legal-card a {
  color: #e0e0e0;
  text-decoration-color: rgba(201, 169, 110, 0.55);
  text-underline-offset: 2px;
}

@media (max-width: 1023px) {
  .legal-section {
    padding: 56px 20px 72px;
  }

  .legal__title {
    font-size: clamp(1.7rem, 7vw, 2.3rem);
  }

  .legal__lead {
    font-size: 15px;
    line-height: 1.58;
  }

  .legal__grid {
    grid-template-columns: 1fr;
  }

  .legal-card {
    border-radius: 20px;
    padding: 18px;
  }

  .legal-card__title {
    font-size: 20px;
  }
}
</style>
