<script setup>
import { openCallibriCall } from '../../utils/openCallibriCall'

const microLine = [
  '15+ лет экспертизы',
  '70+ реализованных объектов',
  'Работаем по всей России',
  'Личный контроль директора',
]
</script>

<template>
  <section id="hero" class="immersive-hero" aria-label="Премиальный hero экран">
    <div class="immersive-hero__media" aria-hidden="true">
      <div class="immersive-hero__bg"></div>
      <div class="immersive-hero__overlay-left"></div>
      <div class="immersive-hero__overlay-bottom"></div>
      <div class="immersive-hero__overlay-topfade"></div>
      <div class="immersive-hero__edge-blend"></div>
      <div class="immersive-hero__overlay-rightblend"></div>
      <div class="immersive-hero__overlay-film"></div>
    </div>

    <div class="immersive-hero__inner">
      <div class="immersive-hero__content">
        <div class="immersive-hero__copy">
          <div class="immersive-hero__blueprint" aria-hidden="true"></div>

          <p class="immersive-hero__eyebrow">Архитектура премиального сегмента</p>

          <h1 class="immersive-hero__title">
            <span class="immersive-hero__title-line line-1">Архитектурное проектирование</span>
            <span class="immersive-hero__title-line line-2">частных домов и коммерческих объектов</span>
          </h1>

          <p class="immersive-hero__lead">
            Создаём проекты, где планировка, конструктив и инженерная логика согласованы заранее, чтобы избежать переделок,
            лишних затрат и хаоса на стройке.
          </p>

          <p class="immersive-hero__secondary">
            Концепция, рабочая документация и сопровождение реализации. Учитываем рельеф, инсоляцию, грунты, климат и
            финансовые рамки проекта.
          </p>

          <div class="immersive-hero__actions">
            <a href="#contacts" class="immersive-hero__btn-primary">Получить консультацию</a>
            <button type="button" class="immersive-hero__btn-call" @click="openCallibriCall">Заказать звонок</button>
            <a href="#portfolio" class="immersive-hero__btn-secondary">Посмотреть реализованные проекты</a>
          </div>

          <p class="immersive-hero__techline">
            BIM-подход • проверка узлов до стройки • понятный комплект рабочей документации
          </p>
        </div>

        <aside class="immersive-hero__floating-card">
          <div class="min-w-0 flex-1">
            <p class="text-sm font-medium text-[#eaf0f8]">Запросить консультацию</p>
            <p class="mt-1 text-xs leading-relaxed text-[#aebdd1]">
              Предварительная оценка задачи, состава документации и сроков проектирования.
            </p>
            <p class="mt-2 text-[11px] text-[#9fafc5]">Ответ в рабочее время: 10–15 минут</p>
          </div>

          <a href="#contacts" class="immersive-hero__floating-action" aria-label="Открыть форму консультации">
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </a>
        </aside>

        <div class="immersive-hero__mobile-card">
          <p class="text-sm font-medium text-[#eaf0f8]">Запросить консультацию</p>
          <p class="mt-1 text-xs leading-relaxed text-[#aebdd1]">Разберём задачу и предложим оптимальный состав проекта.</p>
          <a href="#contacts" class="immersive-hero__mobile-btn">Получить консультацию</a>
        </div>
      </div>

      <div class="immersive-hero__microline">
        <span
          v-for="(item, index) in microLine"
          :key="item"
          class="immersive-hero__micro-item"
        >
          {{ item }}
          <span v-if="index !== microLine.length - 1" class="immersive-hero__dot">•</span>
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.immersive-hero {
  position: relative;
  min-height: 100svh;
  isolation: isolate;
  overflow: hidden;
}

.immersive-hero__media {
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
}

.immersive-hero__bg {
  position: absolute;
  inset: 0;
  background-image: image-set(
    url('/images/hero-premium-bg.png') 1x,
    url('/images/hero-premium-bg.png') 2x
  );
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 76% center;
  transform: scale(1.025);
  transform-origin: center center;
  will-change: transform;
  backface-visibility: hidden;
}

.immersive-hero__overlay-left {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      to right,
      rgba(10, 20, 35, 0.78) 0%,
      rgba(10, 20, 35, 0.58) 34%,
      rgba(10, 20, 35, 0.24) 58%,
      rgba(10, 20, 35, 0.04) 74%,
      rgba(10, 20, 35, 0) 84%
    ),
    radial-gradient(at 20% 40%, rgba(0, 0, 0, 0.25), transparent 60%);
}

.immersive-hero__overlay-bottom {
  position: absolute;
  inset: auto 0 0;
  height: 34%;
  background: linear-gradient(
    180deg,
    rgba(7, 16, 30, 0) 0%,
    rgba(7, 16, 30, 0.4) 42%,
    rgba(7, 16, 30, 0.72) 100%
  );
}

.immersive-hero__overlay-topfade {
  position: absolute;
  inset: 0 0 auto;
  height: 16%;
  background: linear-gradient(180deg, rgba(5, 12, 22, 0.62) 0%, rgba(5, 12, 22, 0) 100%);
}

.immersive-hero__edge-blend {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      130% 100% at 8% 52%,
      rgba(7, 19, 34, 0.9) 0%,
      rgba(7, 19, 34, 0.62) 28%,
      rgba(7, 19, 34, 0.2) 50%,
      transparent 70%
    ),
    linear-gradient(
      to right,
      rgba(6, 16, 29, 0.84) 0%,
      rgba(6, 16, 29, 0.56) 24%,
      rgba(6, 16, 29, 0.2) 46%,
      transparent 64%
    ),
    linear-gradient(
      to bottom,
      rgba(8, 18, 33, 0.46) 0%,
      rgba(8, 18, 33, 0.12) 16%,
      rgba(8, 18, 33, 0) 38%,
      rgba(6, 12, 22, 0.58) 100%
    );
}

.immersive-hero__overlay-rightblend {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to left, rgba(10, 20, 35, 0.24), transparent 40%),
    radial-gradient(circle at 84% 90%, rgba(8, 15, 27, 0.34), transparent 48%),
    radial-gradient(circle at 79% 34%, rgba(255, 202, 140, 0.08), transparent 38%);
}

.immersive-hero__overlay-film {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 76% 24%, rgba(255, 224, 176, 0.08), transparent 44%),
    linear-gradient(rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.06));
}

.immersive-hero__inner {
  max-width: 1440px;
  margin: 0 auto;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  padding: 108px clamp(14px, 2.4vw, 30px) 22px;
}

.immersive-hero__content {
  flex: 1;
  display: grid;
  grid-template-columns: minmax(420px, 610px) 1fr;
  align-items: end;
  gap: clamp(20px, 4vw, 84px);
}

.immersive-hero__copy {
  position: relative;
  max-width: 610px;
}

.immersive-hero__blueprint {
  position: absolute;
  left: -10px;
  bottom: -10px;
  width: min(96%, 560px);
  height: 196px;
  pointer-events: none;
  opacity: 0.2;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.38) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.28) 1px, transparent 1px),
    linear-gradient(145deg, rgba(255, 255, 255, 0.34) 0%, transparent 58%);
  background-size: 22px 22px, 22px 22px, 100% 100%;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.84), transparent 80%);
  filter: blur(0.8px);
  transform: scale(1.04);
}

.immersive-hero__eyebrow {
  position: relative;
  z-index: 1;
  font-size: 13px;
  font-weight: 500;
  color: rgba(212, 190, 154, 0.9);
}

.immersive-hero__title {
  position: relative;
  z-index: 1;
  margin-top: 14px;
  font-family: 'Montserrat', 'Manrope', sans-serif;
  font-size: clamp(2.1rem, 4.85vw, 4.05rem);
  line-height: 1.03;
  letter-spacing: -0.02em;
  font-weight: 600;
  color: rgba(243, 246, 251, 0.97);
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.25);
  text-wrap: balance;
}

.immersive-hero__title-line {
  display: block;
  max-width: 100%;
}

.immersive-hero__title-line.line-1 {
  opacity: 1;
}

.immersive-hero__title-line.line-2 {
  opacity: 0.92;
  color: rgba(216, 192, 146, 0.96);
  text-shadow: 0 0 12px rgba(214, 195, 161, 0.15);
}

.immersive-hero__lead {
  position: relative;
  z-index: 1;
  margin-top: 24px;
  max-width: 92%;
  font-size: clamp(15px, 1.3vw, 18px);
  line-height: 1.62;
  color: rgba(227, 233, 243, 0.82);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.22);
}

.immersive-hero__secondary {
  position: relative;
  z-index: 1;
  margin-top: 12px;
  max-width: 86%;
  font-size: 13px;
  line-height: 1.62;
  color: rgba(198, 208, 224, 0.66);
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);
}

.immersive-hero__actions {
  margin-top: 22px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.immersive-hero__btn-primary,
.immersive-hero__btn-secondary,
.immersive-hero__btn-call {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  border-radius: 999px;
  padding: 0 16px;
  font-size: 13px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.immersive-hero__btn-primary {
  border: 1px solid rgba(255, 255, 255, 0.24);
  background: rgba(255, 255, 255, 0.14);
  color: rgba(238, 243, 251, 0.96);
}

.immersive-hero__btn-primary:hover {
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.2);
}

.immersive-hero__btn-secondary {
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(10, 20, 35, 0.32);
  color: rgba(208, 218, 233, 0.9);
}

.immersive-hero__btn-secondary:hover {
  border-color: rgba(255, 255, 255, 0.25);
  background: rgba(10, 20, 35, 0.5);
}

.immersive-hero__btn-call {
  border: 1px solid rgba(201, 169, 110, 0.34);
  background: rgba(201, 169, 110, 0.12);
  color: rgba(231, 220, 195, 0.96);
}

.immersive-hero__btn-call:hover {
  border-color: rgba(201, 169, 110, 0.52);
  background: rgba(201, 169, 110, 0.2);
}

.immersive-hero__techline {
  margin-top: 14px;
  max-width: 90%;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(9, 18, 33, 0.36);
  padding: 9px 12px;
  font-size: 11px;
  line-height: 1.55;
  color: rgba(188, 201, 220, 0.8);
}

.immersive-hero__floating-card {
  justify-self: end;
  width: clamp(300px, 30vw, 370px);
  min-height: 136px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(20, 30, 50, 0.45);
  backdrop-filter: blur(16px);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 10px 30px rgba(0, 0, 0, 0.25),
    0 24px 44px rgba(4, 10, 18, 0.2);
  padding: 14px;
  transition: border-color 0.24s ease, background-color 0.24s ease;
}

.immersive-hero__floating-card:hover {
  border-color: rgba(255, 255, 255, 0.24);
  background: rgba(22, 35, 58, 0.55);
}

.immersive-hero__floating-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  border-radius: 12px;
  background: rgba(212, 175, 122, 0.94);
  color: #122134;
  transition: transform 0.2s ease, filter 0.2s ease;
}

.immersive-hero__floating-action:hover {
  transform: translateY(-1px);
  filter: brightness(1.06);
}

.immersive-hero__mobile-card {
  display: none;
  margin-top: 20px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(8, 21, 36, 0.56);
  backdrop-filter: blur(11px);
  padding: 14px;
}

.immersive-hero__mobile-btn {
  margin-top: 12px;
  display: inline-flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: rgba(212, 175, 122, 0.94);
  padding: 11px 14px;
  font-size: 13px;
  font-weight: 600;
  color: #122134;
}

.immersive-hero__microline {
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  padding: 14px 0 4px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: rgba(192, 203, 221, 0.82);
}

.immersive-hero__micro-item {
  display: inline-flex;
  align-items: center;
}

.immersive-hero__dot {
  margin-left: 8px;
  margin-right: 2px;
  color: rgba(212, 175, 122, 0.82);
}

@media (min-width: 1024px) {
  .immersive-hero {
    width: min(100%, 1536px);
    min-height: clamp(680px, 100svh, 980px);
    margin-inline: auto;
  }

  .immersive-hero__inner {
    min-height: clamp(680px, 100svh, 980px);
  }
}

@media (max-width: 1439px) and (min-width: 1280px) {
  .immersive-hero__inner {
    max-width: 1360px;
    padding-top: 102px;
  }

  .immersive-hero__content {
    grid-template-columns: minmax(390px, 560px) 1fr;
    gap: clamp(18px, 3vw, 56px);
  }

  .immersive-hero__copy {
    max-width: 560px;
  }

  .immersive-hero__title {
    font-size: clamp(2rem, 4vw, 3.55rem);
  }

  .immersive-hero__floating-card {
    width: clamp(280px, 27vw, 334px);
    min-height: 128px;
  }
}

@media (max-width: 1279px) and (min-width: 1024px) {
  .immersive-hero__inner {
    padding-top: 94px;
    padding-bottom: 18px;
  }

  .immersive-hero__content {
    grid-template-columns: minmax(0, 1fr) minmax(258px, 320px);
    gap: 16px;
    align-items: end;
  }

  .immersive-hero__copy {
    max-width: 520px;
  }

  .immersive-hero__title {
    font-size: clamp(2rem, 3.5vw, 2.75rem);
    line-height: 1.05;
  }

  .immersive-hero__lead {
    margin-top: 16px;
    max-width: 94%;
    font-size: 15px;
  }

  .immersive-hero__secondary,
  .immersive-hero__techline,
  .immersive-hero__btn-secondary {
    display: none;
  }

  .immersive-hero__actions {
    margin-top: 16px;
  }

  .immersive-hero__floating-card {
    width: min(300px, 100%);
    min-height: 118px;
    padding: 12px;
  }

  .immersive-hero__bg {
    background-position: 82% center;
  }

  .immersive-hero__overlay-rightblend {
    background:
      linear-gradient(to left, rgba(10, 20, 35, 0.35), transparent 36%),
      radial-gradient(circle at 84% 90%, rgba(8, 15, 27, 0.4), transparent 48%),
      radial-gradient(circle at 79% 34%, rgba(255, 202, 140, 0.06), transparent 38%);
  }
}

@media (max-width: 1023px) {
  .immersive-hero__inner {
    padding-top: 104px;
  }

  .immersive-hero__content {
    grid-template-columns: 1fr;
    align-items: start;
  }

  .immersive-hero__floating-card {
    display: none;
  }

  .immersive-hero__mobile-card {
    display: block;
  }

  .immersive-hero__secondary {
    display: none;
  }

  .immersive-hero__btn-secondary {
    display: none;
  }

  .immersive-hero__bg {
    background-position: right top;
    background-size: cover;
    transform: scale(1.015);
  }

  .immersive-hero__overlay-left {
    background:
      linear-gradient(180deg, rgba(10, 20, 35, 0.22) 0%, rgba(10, 20, 35, 0.62) 48%, rgba(10, 20, 35, 0.86) 100%),
      linear-gradient(90deg, rgba(10, 20, 35, 0.55) 0%, rgba(10, 20, 35, 0.12) 62%, rgba(10, 20, 35, 0.16) 100%);
  }

  .immersive-hero__overlay-topfade {
    height: 20%;
  }
}

@media (max-width: 639px) {
  .immersive-hero__inner {
    padding-top: 98px;
    padding-bottom: 16px;
  }

  .immersive-hero__title {
    font-size: clamp(2rem, 8.2vw, 2.55rem);
    line-height: 1.07;
  }

  .immersive-hero__lead {
    max-width: 100%;
    font-size: 15px;
    line-height: 1.58;
  }

  .immersive-hero__actions {
    margin-top: 16px;
  }

  .immersive-hero__btn-primary {
    width: 100%;
  }

  .immersive-hero__btn-call {
    width: 100%;
  }

  .immersive-hero__techline {
    max-width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .immersive-hero__bg,
  .immersive-hero__floating-action {
    transition: none;
  }
}
</style>
