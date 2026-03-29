<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import MainHeaderLayout from './layouts/MainHeaderLayout.vue'
import HeroBlock from './components/hero/HeroBlock.vue'
import ProblemSection from './components/sections/problem/ProblemSection.vue'
import ApproachSection from './components/sections/approach/ApproachSection.vue'
import BenefitsSection from './components/sections/benefits/BenefitsSection.vue'
import AudienceSection from './components/sections/audience/AudienceSection.vue'
import ServicesSection from './components/sections/services/ServicesSection.vue'
import PortfolioSection from './components/sections/portfolio/PortfolioSection.vue'
import ProcessSection from './components/sections/process/ProcessSection.vue'
import ScopeSection from './components/sections/scope/ScopeSection.vue'
import PricingSection from './components/sections/pricing/PricingSection.vue'
import TrustSection from './components/sections/trust/TrustSection.vue'
import DirectorSection from './components/sections/director/DirectorSection.vue'
import FaqSection from './components/sections/faq/FaqSection.vue'
import ReviewsSection from './components/sections/reviews/ReviewsSection.vue'
import LeadMagnetsSection from './components/sections/lead-magnets/LeadMagnetsSection.vue'
import ContactsSection from './components/sections/contacts/ContactsSection.vue'
import LegalSection from './components/sections/legal/LegalSection.vue'
import FooterSection from './components/sections/footer/FooterSection.vue'

const navLinks = [
  { label: 'Преимущества', href: '#advantages' },
  { label: 'Услуги', href: '#services' },
  { label: 'Портфолио', href: '#portfolio' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Контакты', href: '#contacts' },
]

const isTopButtonVisible = ref(false)

const onScroll = () => {
  isTopButtonVisible.value = window.scrollY > 520
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div class="page-root">
    <MainHeaderLayout :nav-links="navLinks" />
    <HeroBlock />
    <ProblemSection />
    <ApproachSection />
    <BenefitsSection />
    <AudienceSection />
    <ServicesSection />
    <PortfolioSection />
    <ProcessSection />
    <ScopeSection />
    <PricingSection />
    <TrustSection />
    <DirectorSection />
    <FaqSection />
    <ReviewsSection />
    <LeadMagnetsSection />
    <ContactsSection />
    <LegalSection />
    <FooterSection />

    <button
      v-show="isTopButtonVisible"
      type="button"
      class="scroll-top-button"
      aria-label="Прокрутить наверх"
      @click="scrollToTop"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true">
        <path d="M12 19V5M6 11l6-6 6 6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.page-root {
  min-height: 100svh;
  background:
    radial-gradient(circle at 50% 35%, rgba(16, 46, 60, 0.34) 0%, rgba(7, 17, 32, 0.08) 50%, rgba(6, 13, 24, 0) 74%),
    radial-gradient(circle at 50% 50%, rgba(6, 14, 24, 0.34) 0%, rgba(4, 10, 18, 0.68) 74%, rgba(3, 8, 14, 0.9) 100%),
    linear-gradient(180deg, #071525 0%, #081a2c 40%, #06111f 100%);
}

.scroll-top-button {
  position: fixed;
  right: 18px;
  bottom: calc(104px + env(safe-area-inset-bottom, 0px));
  z-index: 60;
  width: 52px;
  height: 52px;
  border-radius: 999px;
  border: 1px solid rgba(0, 196, 180, 0.34);
  background: rgba(17, 28, 51, 0.92);
  color: #e0e0e0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.32);
  backdrop-filter: blur(6px);
  transition:
    transform 220ms ease,
    background-color 220ms ease,
    border-color 220ms ease,
    box-shadow 220ms ease;
}

.scroll-top-button svg {
  width: 20px;
  height: 20px;
}

.scroll-top-button:hover {
  transform: translateY(-2px);
  border-color: rgba(0, 196, 180, 0.5);
  background: rgba(22, 39, 64, 0.98);
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.36), 0 0 18px rgba(0, 196, 180, 0.16);
}

@media (max-width: 1023px) {
  .scroll-top-button {
    right: 14px;
    bottom: calc(132px + env(safe-area-inset-bottom, 0px));
    width: 48px;
    height: 48px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .scroll-top-button {
    transition: none;
  }
}
</style>
