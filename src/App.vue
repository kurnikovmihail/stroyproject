<script setup>
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
import FooterSection from './components/sections/footer/FooterSection.vue'

const navLinks = [
  { label: 'Главная', href: '#hero' },
  { label: 'Преимущества', href: '#advantages' },
  { label: 'Услуги', href: '#services' },
  { label: 'Портфолио', href: '#portfolio' },
  { label: 'Контакты', href: '#contacts' },
]
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
    <FooterSection />
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
</style>
