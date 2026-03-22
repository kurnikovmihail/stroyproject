<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  navLinks: {
    type: Array,
    required: true,
  },
})

const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const compactNavLinks = computed(() => props.navLinks.slice(0, 2))
</script>

<template>
  <header class="main-header">
    <div class="main-header__shell">
      <div class="main-header__left">


        <a href="#hero" class="main-header__brand" @click="closeMobileMenu">
          <span class="main-header__logo" aria-hidden="true">
            <img class="main-header__logo-image" src="/images/logo.png" alt="" loading="eager" decoding="async" />
          </span>
          <span class="min-w-0">
            <span class="block truncate text-sm font-medium text-[#e8edf4]">Stroy Project</span>
            <span class="hidden truncate text-[11px] text-[#9eb0c9] sm:block">Архитектурное проектирование</span>
          </span>
        </a>
      </div>

      <nav class="main-header__nav hidden xl:flex" aria-label="Основная навигация">
        <a
          v-for="item in props.navLinks"
          :key="item.label"
          :href="item.href"
          class="main-header__nav-link"
        >
          {{ item.label }}
        </a>
      </nav>

      <nav class="main-header__nav main-header__nav--compact hidden lg:flex xl:hidden" aria-label="Короткая навигация">
        <a
          v-for="item in compactNavLinks"
          :key="`compact-${item.label}`"
          :href="item.href"
          class="main-header__nav-link"
        >
          {{ item.label }}
        </a>
      </nav>

      <div class="main-header__right">


        <a href="#contacts" class="main-header__cta hidden sm:inline-flex">Получить консультацию</a>

      </div>
    </div>

    <transition name="menu-drop">
      <nav v-if="mobileMenuOpen" id="site-mobile-nav" class="main-header__mobile-nav lg:hidden">
        <a
          v-for="item in props.navLinks"
          :key="`mobile-${item.label}`"
          :href="item.href"
          class="main-header__mobile-link"
          @click="closeMobileMenu"
        >
          {{ item.label }}
        </a>
      </nav>
    </transition>
  </header>
</template>

<style scoped>
.main-header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 60;
  padding: 16px clamp(14px, 2.2vw, 28px) 0;
}

.main-header__shell {
  max-width: 1420px;
  margin: 0 auto;
  min-height: 64px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 16px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background:
    linear-gradient(to bottom, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02)),
    rgba(20, 30, 50, 0.35);
  backdrop-filter: blur(12px);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    0 12px 34px rgba(4, 11, 21, 0.28);
  padding: 10px 12px;
}

.main-header__left {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.main-header__burger,
.main-header__icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.05);
  color: rgba(232, 237, 244, 0.9);
  font-size: 11px;
  font-weight: 600;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.main-header__burger:hover,
.main-header__icon-btn:hover {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
}

.main-header__brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.main-header__logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 62px;
  height: 62px;
  border-radius: 15px;
  background:
    radial-gradient(circle at 34% 30%, rgba(212, 175, 122, 0.24) 0%, rgba(212, 175, 122, 0.1) 44%, rgba(0, 196, 180, 0.05) 100%),
    rgba(18, 30, 51, 0.56);
  box-shadow:
    0 0 12px rgba(212, 175, 122, 0.14),
    0 0 18px rgba(0, 196, 180, 0.06);
  overflow: hidden;
}

.main-header__logo-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  border-radius: 15px;
  transform: scale(1.28);
  transform-origin: center;
  filter: drop-shadow(0 0 6px rgba(212, 175, 122, 0.1));
}

.main-header__nav {
  justify-self: center;
  align-items: center;
  gap: 24px;
}

.main-header__nav--compact {
  gap: 18px;
}

.main-header__nav-link {
  font-size: 14px;
  font-weight: 400;
  color: rgba(204, 214, 228, 0.8);
  transition: color 0.2s ease, opacity 0.2s ease;
}

.main-header__nav-link:hover {
  color: rgba(240, 245, 252, 0.95);
}

.main-header__right {
  justify-self: end;
  display: inline-flex;
  align-items: center;
  gap: 12px;
}

.main-header__search {
  align-items: center;
  gap: 8px;
  min-width: 176px;
  height: 41px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(20, 30, 50, 0.45);
  padding: 0 12px;
  transition: border-color 0.22s ease, background-color 0.22s ease, box-shadow 0.22s ease;
}

.main-header__search:hover,
.main-header__search:focus-within {
  border-color: rgba(255, 255, 255, 0.24);
  background: rgba(27, 41, 64, 0.62);
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.045);
}

.main-header__search-input {
  width: 100%;
  background: transparent;
  border: 0;
  outline: 0;
  font-size: 12px;
  color: rgba(224, 224, 224, 0.9);
}

.main-header__search-input::placeholder {
  color: rgba(160, 173, 193, 0.85);
}

.main-header__cta {
  align-items: center;
  justify-content: center;
  height: 40px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.26);
  background: rgba(255, 255, 255, 0.12);
  padding: 0 16px;
  font-size: 12px;
  font-weight: 500;
  color: rgba(238, 243, 251, 0.96);
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.main-header__cta:hover {
  border-color: rgba(255, 255, 255, 0.42);
  background: rgba(255, 255, 255, 0.18);
}

.main-header__icons {
  align-items: center;
  gap: 12px;
}

.main-header__mobile-nav {
  max-width: 1420px;
  margin: 10px auto 0;
  display: grid;
  gap: 6px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(10, 20, 36, 0.82);
  backdrop-filter: blur(10px);
  padding: 10px;
  overflow: hidden;
}

.main-header__mobile-link {
  border-radius: 10px;
  padding: 9px 11px;
  font-size: 14px;
  color: rgba(204, 213, 227, 0.9);
  transition: background-color 0.2s ease, color 0.2s ease;
}

.main-header__mobile-link:hover {
  background: rgba(255, 255, 255, 0.08);
  color: rgba(236, 242, 249, 0.98);
}

.menu-drop-enter-active,
.menu-drop-leave-active {
  transition: opacity 0.24s ease, transform 0.24s ease;
}

.menu-drop-enter-from,
.menu-drop-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 1023px) {
  .main-header__shell {
    grid-template-columns: auto 1fr;
  }
}

@media (max-width: 1279px) {
  .main-header__shell {
    grid-template-columns: auto auto 1fr;
  }

  .main-header__right {
    gap: 10px;
  }
}
</style>
