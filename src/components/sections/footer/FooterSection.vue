<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { openCallibriCall } from '../../../utils/openCallibriCall'

const sectionRef = ref(null)
const isVisible = ref(false)
const currentYear = new Date().getFullYear()
let observer

const quickLinks = [
  { label: 'Преимущества', href: '#advantages' },
  { label: 'Услуги', href: '#services' },
  { label: 'Кейсы', href: '#portfolio' },
  { label: 'Процесс', href: '#process' },
  { label: 'Стоимость', href: '#pricing' },
  { label: 'Контакты', href: '#contacts' },
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
  <footer id="footer" ref="sectionRef" class="footer-section" :class="{ 'is-visible': isVisible }">
    <div class="footer-section__veil" aria-hidden="true"></div>

    <div class="footer">
      <div class="footer__top footer-reveal footer-reveal--top">
        <div class="footer__brand">
          <a href="#hero" class="footer__brand-link">
            <span class="footer__mark" aria-hidden="true">
              <img class="footer__mark-image" src="/images/logo.png" alt="" loading="lazy" decoding="async" />
            </span>
            <span class="footer__brand-copy">
              <span class="footer__name">Строй Проект</span>
              <span class="footer__tagline">Архитектурное проектирование частных и коммерческих объектов</span>
            </span>
          </a>
        </div>

        <nav class="footer__nav" aria-label="Навигация по разделам">
          <p class="footer__heading">Разделы</p>
          <ul class="footer__list">
            <li v-for="link in quickLinks" :key="link.href">
              <a :href="link.href" class="footer__link">{{ link.label }}</a>
            </li>
          </ul>
        </nav>

        <div class="footer__contacts">
          <p class="footer__heading">Контакты</p>
          <a href="tel:+79667722280" class="footer__phone">+7 (966) 772-22-80</a>
          <a href="mailto:proekt@12393.ru" class="footer__email">proekt@12393.ru</a>
          <p class="footer__location">35400, Сочи, Советская 40, этаж 6</p>
        </div>

        <div class="footer__meta">
          <p class="footer__heading">Быстрая связь</p>
          <p class="footer__response">В рабочее время отвечаем обычно до 15 минут</p>
          <div class="footer__messengers">
            <button type="button" class="footer__capsule footer__capsule--callback" @click="openCallibriCall">
              Заказать звонок
            </button>
            <a href="https://t.me/StroyProekt123" target="_blank" rel="noopener noreferrer" class="footer__capsule">Telegram</a>
          </div>
        </div>
      </div>

      <div class="footer__bottom footer-reveal footer-reveal--bottom">
        <p class="footer__copyright">© {{ currentYear }} Строй Проект</p>
        <p class="footer__descriptor">
          Архитектурное проектирование частных и коммерческих объектов ·
          <a href="#privacy" class="footer__legal-link">Правовая информация</a>
        </p>
        <a href="#hero" class="footer__top-link">
          <span>Наверх</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
            <path d="M12 19V5M6 11l6-6 6 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-section {
  position: relative;
  isolation: isolate;
  overflow: clip;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding: 52px 32px 26px;
  background:
    radial-gradient(circle at 50% 0%, rgba(201, 169, 110, 0.03), transparent 36%),
    linear-gradient(180deg, rgba(10, 20, 40, 0.4) 0%, transparent 26%),
    #07111f;
}

.footer-section__veil {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image:
    linear-gradient(to right, rgba(167, 176, 193, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(167, 176, 193, 0.03) 1px, transparent 1px);
  background-size: 64px 64px, 64px 64px;
  opacity: 0.1;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.24));
}

.footer {
  width: min(100%, 1240px);
  margin: 0 auto;
}

.footer__top {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 0.9fr);
  gap: 28px;
  padding-bottom: 24px;
}

.footer__brand-link {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 14px;
  text-decoration: none;
}

.footer__mark {
  width: 92px;
  height: 92px;
  border-radius: 20px;
  background:
    radial-gradient(circle at 34% 30%, rgba(212, 175, 122, 0.24) 0%, rgba(212, 175, 122, 0.1) 44%, rgba(0, 196, 180, 0.05) 100%),
    rgba(18, 30, 51, 0.56);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 0 14px rgba(212, 175, 122, 0.14),
    0 0 22px rgba(0, 196, 180, 0.06);
  overflow: hidden;
}

.footer__mark-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  border-radius: 20px;
  transform: scale(1.28);
  transform-origin: center;
  filter: drop-shadow(0 0 7px rgba(212, 175, 122, 0.11));
}

.footer__brand-copy {
  display: grid;
  gap: 7px;
  align-content: start;
}

.footer__name {
  font-size: 22px;
  line-height: 1.15;
  font-weight: 700;
  color: #e0e0e0;
}

.footer__tagline {
  font-size: 14px;
  line-height: 1.6;
  color: #a7b0c1;
}

.footer__heading {
  margin: 0;
  font-size: 13px;
  line-height: 1.2;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  font-weight: 600;
  color: #a7b0c1;
}

.footer__list {
  margin: 14px 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 8px;
}

.footer__link {
  display: inline-flex;
  width: fit-content;
  text-decoration: none;
  font-size: 15px;
  line-height: 1.5;
  color: #e0e0e0;
  transition:
    color 220ms ease,
    transform 220ms ease;
}

.footer__link:hover {
  color: #c9a96e;
  transform: translateX(1px);
}

.footer__phone {
  margin-top: 14px;
  display: inline-flex;
  width: fit-content;
  text-decoration: none;
  font-size: 20px;
  line-height: 1.2;
  font-weight: 650;
  color: #e0e0e0;
  transition: color 220ms ease;
}

.footer__email {
  margin-top: 8px;
  display: inline-flex;
  width: fit-content;
  text-decoration: none;
  font-size: 16px;
  line-height: 1.4;
  color: #a7b0c1;
  transition: color 220ms ease;
}

.footer__phone:hover,
.footer__email:hover {
  color: #e0e0e0;
}

.footer__location {
  margin: 10px 0 0;
  font-size: 14px;
  line-height: 1.6;
  color: #a7b0c1;
}

.footer__response {
  margin: 14px 0 0;
  font-size: 14px;
  line-height: 1.6;
  color: #a7b0c1;
}

.footer__messengers {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.footer__capsule {
  min-height: 36px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  padding: 0 12px;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-size: 14px;
  line-height: 1;
  color: #e0e0e0;
  font-family: inherit;
  cursor: pointer;
  transition:
    border-color 220ms ease,
    background-color 220ms ease,
    box-shadow 220ms ease;
}

.footer__capsule--callback {
  border-color: rgba(201, 169, 110, 0.32);
  background: rgba(201, 169, 110, 0.1);
}

.footer__capsule:hover {
  border-color: rgba(255, 255, 255, 0.22);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.08);
}

.footer__capsule--callback:hover {
  border-color: rgba(201, 169, 110, 0.46);
  background: rgba(201, 169, 110, 0.18);
  box-shadow: 0 0 12px rgba(201, 169, 110, 0.12);
}

.footer__bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 16px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: 16px;
}

.footer__copyright,
.footer__descriptor {
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: #a7b0c1;
}

.footer__descriptor {
  text-align: center;
}

.footer__legal-link {
  color: #e0e0e0;
  text-decoration-color: rgba(201, 169, 110, 0.55);
  text-underline-offset: 2px;
  transition: color 220ms ease;
}

.footer__legal-link:hover {
  color: #c9a96e;
}

.footer__top-link {
  justify-self: end;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  text-decoration: none;
  font-size: 13px;
  line-height: 1.3;
  color: #e0e0e0;
  transition:
    color 220ms ease,
    transform 220ms ease;
}

.footer__top-link svg {
  width: 14px;
  height: 14px;
  transition: transform 220ms ease;
}

.footer__top-link:hover {
  color: #c9a96e;
}

.footer__top-link:hover svg {
  transform: translateY(-2px);
}

.footer-reveal {
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 620ms ease-out,
    transform 620ms ease-out;
}

.footer-reveal--top {
  transition-delay: 0ms;
}

.footer-reveal--bottom {
  transition-delay: 120ms;
}

.footer-section.is-visible .footer-reveal {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 1279px) {
  .footer__top {
    grid-template-columns: minmax(0, 1.2fr) repeat(2, minmax(0, 1fr));
    gap: 22px;
  }

  .footer__meta {
    grid-column: 1 / -1;
  }
}

@media (max-width: 1023px) {
  .footer-section {
    padding: 44px 20px 24px;
  }

  .footer__top {
    grid-template-columns: 1fr;
    gap: 22px;
    padding-bottom: 20px;
  }

  .footer__brand {
    order: 1;
  }

  .footer__contacts {
    order: 2;
  }

  .footer__nav {
    order: 3;
  }

  .footer__meta {
    order: 4;
  }

  .footer__name {
    font-size: 21px;
  }

  .footer__phone {
    font-size: 19px;
  }

  .footer__bottom {
    grid-template-columns: 1fr;
    gap: 8px;
    align-items: start;
  }

  .footer__descriptor {
    text-align: left;
  }

  .footer__top-link {
    justify-self: start;
  }

  .footer-reveal {
    transition:
      opacity 520ms ease-out,
      transform 520ms ease-out;
  }
}

@media (prefers-reduced-motion: reduce) {
  .footer-reveal,
  .footer__link,
  .footer__phone,
  .footer__email,
  .footer__capsule,
  .footer__top-link,
  .footer__top-link svg {
    transition: none;
  }
}
</style>
