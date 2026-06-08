<template>
  <div class="mentor-sidebar">
    <!-- Brand Section -->
    <div class="mentor-sidebar__top">
      <div class="mentor-sidebar__brand">
        <LogoIcon class="mentor-sidebar__logo" />
        <h1 class="mentor-sidebar__title">NewBee</h1>
        <p class="mentor-sidebar__subtitle">ISMP Portal</p>
      </div>

      <!-- Pending Questions Card -->
      <div class="mentor-sidebar__pending" @click="$emit('navigate-pending')">
        <div class="mentor-sidebar__pending-header">
          <span class="mentor-sidebar__pending-label">Pending questions</span>
          <span class="mentor-sidebar__pending-arrow">›</span>
        </div>
        <span class="mentor-sidebar__pending-count">{{ pendingCount }}</span>
      </div>
    </div>

    <!-- Quick Links -->
    <div class="mentor-sidebar__links">
      <h3 class="mentor-sidebar__links-title">
        <OpenInNewIcon class="mentor-sidebar__links-icon" />
        Quick Links
      </h3>

      <a
        v-for="link in quickLinks"
        :key="link.label"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        class="mentor-sidebar__link"
      >
        <component :is="link.icon" class="mentor-sidebar__link-icon" />
        <span>{{ link.label }}</span>
      </a>

      <button class="mentor-sidebar__add-btn" @click="$emit('add-link')">
        Add
        <span class="mentor-sidebar__add-plus">+</span>
      </button>
    </div>
  </div>
</template>

<script setup>
/**
 * MentorSidebar.vue
 *
 * Purpose:
 *   Left sidebar for the Mentor Portal matching Figma specs exactly.
 *   width: 21.75rem, padding: 1.875rem, border-radius: 1.875rem
 *
 * Props:
 *   - pendingCount (Number): pending questions count (dynamic from API)
 *
 * Events:
 *   - navigate-pending: emitted when pending card is clicked
 *   - add-link: emitted when "Add +" is clicked
 *
 * Dependencies:
 *   Logo.svg, whatsapp-icon.svg, email.svg, web.svg, Insta.svg
 */
import LogoIcon from '@/components/icons/Logo.svg'
import WhatsAppIcon from '@/components/icons/whatsapp-icon.svg'
import EmailIcon from '@/components/icons/email.svg'
import GlobeIcon from '@/components/icons/globe.svg'
import InstaIcon from '@/components/icons/Insta.svg'
import OpenInNewIcon from '@/components/icons/open_in_new.svg'

const props = defineProps({
  pendingCount: {
    type: Number,
    default: 0,
  },
})

defineEmits(['navigate-pending', 'add-link'])

const quickLinks = [
  { label: 'Whatsapp Group', url: 'https://chat.whatsapp.com/', icon: WhatsAppIcon },
  { label: 'SMP Email', url: 'mailto:smpcs2024@gmail.com', icon: EmailIcon },
  { label: 'SMP Website', url: 'https://smp.gymkhana.iitb.ac.in/', icon: GlobeIcon },
  { label: 'SMP Instagram', url: 'https://www.instagram.com/smp.iitb/', icon: InstaIcon },
]
</script>

<style scoped>
/* Figma: width 21.75rem, padding 1.875rem, border-radius 1.875rem,
   flex-direction column, justify-content space-between,
   align-items flex-start, align-self stretch,
   background var(--Less-Priority) */
.mentor-sidebar {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 6.25rem;
  align-items: flex-start;
  align-self: stretch;
  width: 100%;
  height: 100%;
  padding: 1.875rem;
  border-radius: 1.875rem;
  background: var(--mentor-bg-cream);
}

/* ── Top group: Brand + Pending ── */
.mentor-sidebar__top {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  width: 100%;
}

/* ── Brand Section ── */
.mentor-sidebar__brand {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.125rem;
}

.mentor-sidebar__logo {
  width: 3rem;
  height: 3rem;
  margin-bottom: 0.375rem;
}

.mentor-sidebar__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--mentor-text-primary);
  margin: 0;
  line-height: 1.2;
}

.mentor-sidebar__subtitle {
  font-size: 0.875rem;
  color: var(--mentor-text-secondary);
  margin: 0;
  line-height: 1.4;
}

/* ── Pending Questions Card ── */
.mentor-sidebar__pending {
  background: var(--mentor-bg-white);
  border-radius: 0.75rem;
  padding: 0.875rem 1rem;
  cursor: pointer;
  width: 100%;
  transition: box-shadow var(--mentor-transition-fast);
}

.mentor-sidebar__pending:hover {
  box-shadow: var(--mentor-shadow-card);
}

.mentor-sidebar__pending-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.125rem;
}

.mentor-sidebar__pending-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--mentor-text-primary);
}

.mentor-sidebar__pending-arrow {
  font-size: 1.25rem;
  color: var(--mentor-text-secondary);
  font-weight: 600;
}

.mentor-sidebar__pending-count {
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--mentor-text-primary);
  line-height: 1;
}

/* ── Quick Links ── */
.mentor-sidebar__links {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
}

.mentor-sidebar__links-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--mentor-text-primary);
  margin: 0 0 0.375rem 0;
}

.mentor-sidebar__links-icon {
  width: 1.125rem;
  height: 1.125rem;
  flex-shrink: 0;
  color: var(--mentor-text-primary);
}

.mentor-sidebar__link {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.5rem 0.625rem;
  border-radius: 0.5rem;
  text-decoration: none;
  color: var(--mentor-text-primary);
  font-size: 0.8125rem;
  font-weight: 500;
  transition: background var(--mentor-transition-fast);
}

.mentor-sidebar__link:hover {
  background: var(--mentor-primary-light);
}

.mentor-sidebar__link-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

/* ── Add Button ── */
.mentor-sidebar__add-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  background: transparent;
  border: 1px solid var(--mentor-text-primary);
  border-radius: 100px;
  padding: 0.125rem 0.5rem;
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--mentor-text-emphasis);
  cursor: pointer;
  width: fit-content;
  margin-top: 0.375rem;
  transition: background var(--mentor-transition-fast);
}

.mentor-sidebar__add-btn:hover {
  background: var(--mentor-primary-hover);
}

.mentor-sidebar__add-plus {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 0.875rem;
  height: 0.875rem;
  border-radius: 50%;
  background: transparent;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--mentor-text-primary);
}
</style>
