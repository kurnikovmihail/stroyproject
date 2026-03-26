<script setup>
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'

const formRef = ref(null)
const sectionRef = ref(null)
const isSubmitted = ref(false)
const isSubmitting = ref(false)
const submitError = ref('')
const isVisible = ref(false)
let observer

const formState = reactive({
  name: '',
  phone: '',
  objectType: '',
  firstStep: '',
  comment: '',
  consent: false,
})

const submitForm = async () => {
  if (isSubmitting.value) return

  isSubmitting.value = true
  isSubmitted.value = false
  submitError.value = ''

  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formState.name,
        phone: formState.phone,
        objectType: formState.objectType,
        firstStep: formState.firstStep,
        comment: formState.comment,
        consent: formState.consent,
      }),
    })

    const payload = await response.json().catch(() => ({}))

    if (!response.ok) {
      throw new Error(payload.message || 'Не удалось отправить заявку. Попробуйте ещё раз.')
    }

    isSubmitted.value = true

    formState.name = ''
    formState.phone = ''
    formState.objectType = ''
    formState.firstStep = ''
    formState.comment = ''
    formState.consent = false

    formRef.value?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  } catch (error) {
    submitError.value = error instanceof Error ? error.message : 'Произошла ошибка при отправке формы.'
  } finally {
    isSubmitting.value = false
  }
}

const openCallibriCall = () => {
  const launchers = [
    window.callibriCallbackWidgetStart,
    window.callibriWidgetStart,
    window.callibriOnlineChatStart,
    window.callibriPopupWidgetStart,
  ]

  for (const launcher of launchers) {
    if (typeof launcher === 'function') {
      launcher()
      return
    }
  }

  window.location.href = 'tel:+79667722280'
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
    id="contacts"
    ref="sectionRef"
    class="contact-section"
    :class="{ 'is-visible': isVisible }"
    aria-labelledby="contact-title"
  >
    <span id="contact" class="contact-section__anchor" aria-hidden="true"></span>
    <div class="contact-section__decor" aria-hidden="true"></div>

    <div class="contact">
      <div class="contact__intro">
        <span class="contact__eyebrow contact-reveal contact-reveal--eyebrow">Старт проекта</span>
        <h2 id="contact-title" class="contact__title contact-reveal contact-reveal--title">
          Оставьте короткий запрос — поможем понять <span>следующий шаг</span> по проекту
        </h2>
        <p class="contact__lead contact-reveal contact-reveal--lead">
          Можно написать даже с минимальными вводными: тип объекта, примерная площадь и ключевые ограничения участка или
          задачи.
        </p>
      </div>

      <div class="contact__grid contact-reveal contact-reveal--grid">
        <form ref="formRef" class="contact-form" @submit.prevent="submitForm">
          <div class="contact-form__row contact-form__row--half">
            <label class="contact-form__field">
              <span class="contact-form__label">Имя</span>
              <input v-model="formState.name" class="contact-form__control" type="text" name="name" placeholder="Как к вам обращаться" required />
            </label>

            <label class="contact-form__field">
              <span class="contact-form__label">Телефон</span>
              <input v-model="formState.phone" class="contact-form__control" type="tel" name="phone" placeholder="+7 (___) ___-__-__" required />
            </label>
          </div>

          <div class="contact-form__row contact-form__row--half">
            <label class="contact-form__field">
              <span class="contact-form__label">Тип объекта</span>
              <select v-model="formState.objectType" class="contact-form__control contact-form__control--select" name="object-type" required>
                <option value="" disabled>Выберите вариант</option>
                <option value="private-house">Частный дом</option>
                <option value="villa">Вилла / резиденция</option>
                <option value="hotel">Гостиничный объект</option>
                <option value="commercial">Коммерческий объект</option>
                <option value="reconstruction">Реконструкция</option>
              </select>
            </label>

            <label class="contact-form__field">
              <span class="contact-form__label">Что важно получить в первую очередь</span>
              <select v-model="formState.firstStep" class="contact-form__control contact-form__control--select" name="first-step" required>
                <option value="" disabled>Выберите вариант</option>
                <option value="budget">Ориентир по стоимости</option>
                <option value="analysis">Разбор участка и ограничений</option>
                <option value="scope">Подходящий формат проекта</option>
                <option value="consultation">Экспертную консультацию</option>
              </select>
            </label>
          </div>

          <div class="contact-form__row">
            <label class="contact-form__field">
              <span class="contact-form__label">Комментарий</span>
              <textarea
                v-model="formState.comment"
                class="contact-form__control contact-form__control--textarea"
                name="comment"
                placeholder="Кратко опишите задачу: участок, площадь, сроки или ограничения"
              ></textarea>
            </label>
          </div>

          <div class="contact-form__row">
            <label class="contact-form__consent">
              <input
                v-model="formState.consent"
                class="contact-form__consent-input"
                type="checkbox"
                name="consent"
                required
              />
              <span class="contact-form__consent-box" aria-hidden="true"></span>
              <span class="contact-form__consent-text">
                Я соглашаюсь на обработку персональных данных и принимаю условия
                <a href="#privacy-policy">политики конфиденциальности</a> и
                <a href="#consent-agreement">согласия на обработку данных</a>.
              </span>
            </label>
          </div>

          <div class="contact-form__row contact-form__row--submit">
            <button type="submit" class="contact-form__submit" :disabled="isSubmitting">
              <span>{{ isSubmitting ? 'Отправляем заявку…' : 'Узнать стоимость проекта' }}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
                <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>

            <p class="contact-form__note">Ответим в рабочее время обычно в течение 10–15 минут.</p>
          </div>

          <transition name="contact-success">
            <div v-if="submitError" class="contact-form__error" role="alert" aria-live="polite">
              {{ submitError }}
            </div>
          </transition>

          <transition name="contact-success">
            <div v-if="isSubmitted" class="contact-form__success" role="status" aria-live="polite">
              Заявка принята. Сергей увидит её в течение 10–15 минут в рабочее время.
            </div>
          </transition>
        </form>

        <aside class="contact-panel">
          <div class="contact-panel__identity">
            <h3 class="contact-panel__title">Если удобнее — напишите напрямую</h3>
            <a href="tel:+79667722280" class="contact-panel__phone">+7 (966) 772-22-80</a>
            <br>
            <a href="mailto:proekt@12393.ru" class="contact-panel__email">proekt@12393.ru</a>
          </div>

          <div class="contact-panel__office">
            <p class="contact-panel__subtitle">Офис и география</p>
            <p class="contact-panel__text">35400, Сочи, Советская 40, этаж 6. Работаем дистанционно по всей России и СНГ.</p>
          </div>

          <div class="contact-panel__response">Обычно отвечаем в рабочее время до 15 минут</div>

          <button type="button" class="contact-panel__callback" @click="openCallibriCall">
            Заказать звонок
          </button>

          <div class="contact-panel__messengers">
            <a href="https://wa.me/79667722280" target="_blank" rel="noopener noreferrer" class="contact-panel__messenger">
              <span class="contact-panel__messenger-icon" aria-hidden="true">W</span>
              <span>WhatsApp</span>
            </a>
            <a href="https://t.me/stroyproject_arch" target="_blank" rel="noopener noreferrer" class="contact-panel__messenger">
              <span class="contact-panel__messenger-icon" aria-hidden="true">T</span>
              <span>Telegram</span>
            </a>
          </div>
        </aside>
      </div>

      <div class="contact__reassurance contact-reveal contact-reveal--reassurance">
        Даже если пока не хватает всех данных по объекту — достаточно коротко описать задачу, а детали уточним в разговоре.
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  position: relative;
  isolation: isolate;
  overflow: clip;
  padding: 120px 32px 100px;
  background:
    radial-gradient(circle at 34% 26%, rgba(201, 169, 110, 0.04), transparent 32%),
    radial-gradient(circle at 72% 56%, rgba(0, 196, 180, 0.03), transparent 36%),
    linear-gradient(180deg, #0a1428 0%, #111c33 52%, #0a1428 100%);
}

.contact-section__anchor {
  position: absolute;
  top: 0;
}

.contact-section__decor {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.12;
  background-image:
    linear-gradient(to right, rgba(167, 176, 193, 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(167, 176, 193, 0.04) 1px, transparent 1px);
  background-size: 62px 62px, 62px 62px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.85) 24%, rgba(0, 0, 0, 0.2));
}

.contact {
  width: min(100%, 1240px);
  margin: 0 auto;
}

.contact__intro {
  max-width: 800px;
}

.contact__eyebrow {
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

.contact__title {
  margin: 20px 0 0;
  max-width: 980px;
  font-family: 'Montserrat', 'Manrope', sans-serif;
  font-size: clamp(2.45rem, 5vw, 3.625rem);
  line-height: 1.06;
  letter-spacing: -0.02em;
  font-weight: 760;
  color: #e0e0e0;
  text-wrap: balance;
}

.contact__title span {
  color: #c9a96e;
}

.contact__lead {
  margin: 22px 0 0;
  max-width: 760px;
  font-size: 18px;
  line-height: 1.65;
  color: #a7b0c1;
}

.contact__grid {
  margin-top: 30px;
  display: grid;
  grid-template-columns: minmax(0, 1.38fr) minmax(0, 1fr);
  gap: 22px;
  align-items: stretch;
}

.contact-form {
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(22, 35, 61, 0.84), rgba(17, 28, 51, 0.94));
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.22);
  padding: 30px 32px;
}

.contact-form__row + .contact-form__row {
  margin-top: 14px;
}

.contact-form__row--half {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.contact-form__field {
  display: grid;
  gap: 8px;
}

.contact-form__consent {
  position: relative;
  display: grid;
  grid-template-columns: 18px minmax(0, 1fr);
  gap: 10px;
  align-items: start;
}

.contact-form__consent-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.contact-form__consent-box {
  margin-top: 1px;
  width: 18px;
  height: 18px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.04);
  transition:
    border-color 200ms ease,
    background-color 200ms ease,
    box-shadow 200ms ease;
}

.contact-form__consent-box::after {
  content: '';
  display: block;
  width: 5px;
  height: 9px;
  border-right: 2px solid transparent;
  border-bottom: 2px solid transparent;
  transform: translate(5px, 2px) rotate(45deg);
}

.contact-form__consent-input:checked + .contact-form__consent-box {
  border-color: rgba(0, 196, 180, 0.68);
  background: rgba(0, 196, 180, 0.18);
}

.contact-form__consent-input:checked + .contact-form__consent-box::after {
  border-right-color: #dffaf7;
  border-bottom-color: #dffaf7;
}

.contact-form__consent-input:focus-visible + .contact-form__consent-box {
  box-shadow: 0 0 0 3px rgba(0, 196, 180, 0.14);
}

.contact-form__consent-text {
  font-size: 13px;
  line-height: 1.58;
  color: #a7b0c1;
}

.contact-form__consent-text a {
  color: #e0e0e0;
  text-decoration-color: rgba(201, 169, 110, 0.5);
  text-underline-offset: 2px;
}

.contact-form__label {
  font-size: 14px;
  line-height: 1.3;
  font-weight: 520;
  color: #a7b0c1;
}

.contact-form__control {
  width: 100%;
  height: 56px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  padding: 0 16px;
  font-size: 15px;
  line-height: 1.3;
  color: #e0e0e0;
  transition:
    border-color 200ms ease,
    background-color 200ms ease,
    box-shadow 200ms ease;
}

.contact-form__control--select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding-right: 48px;
  cursor: pointer;
  background-image:
    linear-gradient(45deg, transparent 50%, rgba(224, 224, 224, 0.9) 50%),
    linear-gradient(135deg, rgba(224, 224, 224, 0.9) 50%, transparent 50%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1));
  background-position:
    calc(100% - 21px) calc(50% - 2px),
    calc(100% - 15px) calc(50% - 2px),
    calc(100% - 42px) 50%;
  background-size: 6px 6px, 6px 6px, 1px 22px;
  background-repeat: no-repeat;
}

.contact-form__control--select:invalid {
  color: #a7b0c1;
}

.contact-form__control--select option {
  color: #e0e0e0;
  background: #16233d;
}

.contact-form__control--select option[value=''] {
  color: #a7b0c1;
}

.contact-form__control::placeholder {
  color: #a7b0c1;
}

.contact-form__control:focus {
  outline: none;
  border-color: rgba(0, 196, 180, 0.42);
  background: rgba(255, 255, 255, 0.06);
  box-shadow: 0 0 0 3px rgba(0, 196, 180, 0.14);
}

.contact-form__control--textarea {
  height: auto;
  min-height: 126px;
  padding: 14px 16px;
  resize: vertical;
}

.contact-form__row--submit {
  margin-top: 18px;
  display: grid;
  gap: 10px;
}

.contact-form__submit {
  width: 100%;
  min-height: 56px;
  border-radius: 16px;
  border: 1px solid rgba(255, 107, 53, 0.5);
  background: #ff6b35;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 15px;
  line-height: 1.2;
  font-weight: 680;
  color: #122134;
  transition:
    transform 220ms ease,
    background-color 220ms ease,
    box-shadow 220ms ease;
}

.contact-form__submit svg {
  width: 16px;
  height: 16px;
  transition: transform 220ms ease;
}

.contact-form__submit:hover {
  transform: translateY(-1px);
  background: #ff5a1d;
  box-shadow: 0 8px 24px rgba(255, 107, 53, 0.3);
}

.contact-form__submit:hover svg {
  transform: translateX(3px);
}

.contact-form__submit:disabled {
  cursor: not-allowed;
  opacity: 0.72;
  transform: none;
  box-shadow: none;
}

.contact-form__note {
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: #a7b0c1;
}

.contact-form__error {
  margin-top: 12px;
  border-radius: 14px;
  border: 1px solid rgba(255, 107, 53, 0.38);
  background: rgba(255, 107, 53, 0.12);
  padding: 12px 14px;
  font-size: 14px;
  line-height: 1.55;
  color: #ffe6dc;
}

.contact-form__success {
  margin-top: 12px;
  border-radius: 14px;
  border: 1px solid rgba(0, 196, 180, 0.28);
  background: rgba(0, 196, 180, 0.1);
  padding: 12px 14px;
  font-size: 14px;
  line-height: 1.55;
  color: #dffaf7;
}

.contact-success-enter-active,
.contact-success-leave-active {
  transition: opacity 220ms ease;
}

.contact-success-enter-from,
.contact-success-leave-to {
  opacity: 0;
}

.contact-panel {
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(17, 28, 51, 0.76);
  padding: 30px 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.contact-panel__title {
  margin: 0;
  font-size: clamp(1.35rem, 2.2vw, 1.95rem);
  line-height: 1.25;
  font-weight: 680;
  color: #e0e0e0;
  text-wrap: balance;
}

.contact-panel__phone {
  margin-top: 14px;
  display: inline-flex;
  font-size: clamp(1.5rem, 2.3vw, 2rem);
  line-height: 1.1;
  font-weight: 730;
  color: #e0e0e0;
}

.contact-panel__email {
  margin-top: 8px;
  display: inline-flex;
  font-size: 17px;
  line-height: 1.4;
  color: #a7b0c1;
}

.contact-panel__subtitle {
  margin: 0;
  font-size: 12px;
  line-height: 1.2;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 600;
  color: #c9a96e;
}

.contact-panel__text {
  margin: 9px 0 0;
  font-size: 15px;
  line-height: 1.6;
  color: #a7b0c1;
}

.contact-panel__response {
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  padding: 12px 14px;
  font-size: 14px;
  line-height: 1.5;
  color: #d5dce9;
}

.contact-panel__callback {
  min-height: 50px;
  border-radius: 16px;
  border: 1px solid rgba(201, 169, 110, 0.34);
  background: rgba(201, 169, 110, 0.12);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 14px;
  font-size: 15px;
  line-height: 1.2;
  font-weight: 640;
  color: #e0e0e0;
  transition:
    transform 220ms ease,
    border-color 220ms ease,
    background-color 220ms ease,
    box-shadow 220ms ease;
}

.contact-panel__callback:hover {
  transform: translateY(-1px);
  border-color: rgba(201, 169, 110, 0.5);
  background: rgba(201, 169, 110, 0.2);
  box-shadow: 0 0 14px rgba(201, 169, 110, 0.14);
}

.contact-panel__messengers {
  display: grid;
  gap: 10px;
}

.contact-panel__messenger {
  min-height: 52px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 0 14px;
  font-size: 15px;
  line-height: 1.2;
  font-weight: 560;
  color: #e0e0e0;
  transition:
    border-color 220ms ease,
    background-color 220ms ease,
    box-shadow 220ms ease;
}

.contact-panel__messenger:hover {
  border-color: rgba(0, 196, 180, 0.28);
  background: rgba(0, 196, 180, 0.09);
  box-shadow: 0 0 14px rgba(0, 196, 180, 0.11);
}

.contact-panel__messenger-icon {
  width: 24px;
  height: 24px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.08);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
}

.contact__reassurance {
  margin-top: 14px;
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(17, 28, 51, 0.6);
  padding: 18px 22px;
  font-size: 15px;
  line-height: 1.58;
  color: #a7b0c1;
}

.contact-reveal {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 700ms ease-out,
    transform 700ms ease-out;
}

.contact-reveal--eyebrow {
  transition-delay: 0ms;
}

.contact-reveal--title {
  transition-delay: 90ms;
}

.contact-reveal--lead {
  transition-delay: 160ms;
}

.contact-reveal--grid {
  transition-delay: 240ms;
}

.contact-reveal--reassurance {
  transition-delay: 390ms;
}

.contact-section.is-visible .contact-reveal {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 1279px) {
  .contact__grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .contact-panel {
    padding: 24px;
  }
}

@media (max-width: 1023px) {
  .contact-section {
    padding: 72px 20px 80px;
  }

  .contact__title {
    font-size: clamp(2rem, 8.8vw, 2.5rem);
    line-height: 1.08;
  }

  .contact__lead {
    margin-top: 16px;
    font-size: 16px;
    line-height: 1.6;
  }

  .contact__grid {
    margin-top: 22px;
    gap: 12px;
  }

  .contact-form {
    border-radius: 22px;
    padding: 22px;
  }

  .contact-form__row--half {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .contact-form__control {
    height: 54px;
  }

  .contact-form__control--textarea {
    min-height: 116px;
  }

  .contact-form__submit {
    min-height: 54px;
  }

  .contact-panel {
    border-radius: 22px;
    padding: 22px;
    gap: 14px;
  }

  .contact-panel__messengers {
    order: 1;
  }

  .contact-panel__identity {
    order: 2;
  }

  .contact-panel__office {
    order: 3;
  }

  .contact-panel__response {
    order: 4;
  }

  .contact-panel__callback {
    order: 5;
    min-height: 48px;
  }

  .contact-panel__title {
    font-size: 24px;
  }

  .contact-panel__phone {
    margin-top: 10px;
    font-size: 28px;
  }

  .contact-panel__email {
    font-size: 16px;
  }

  .contact-panel__text {
    font-size: 14px;
    line-height: 1.56;
  }

  .contact-panel__response {
    font-size: 13px;
  }

  .contact-panel__messenger {
    min-height: 50px;
  }

  .contact__reassurance {
    margin-top: 10px;
    border-radius: 18px;
    padding: 16px;
    font-size: 14px;
    line-height: 1.56;
  }

  .contact-reveal {
    transition:
      opacity 540ms ease-out,
      transform 540ms ease-out;
  }
}

@media (prefers-reduced-motion: reduce) {
  .contact-reveal,
  .contact-form__control,
  .contact-form__consent-box,
  .contact-form__submit,
  .contact-form__submit svg,
  .contact-panel__messenger,
  .contact-success-enter-active,
  .contact-success-leave-active {
    transition: none;
  }
}
</style>
