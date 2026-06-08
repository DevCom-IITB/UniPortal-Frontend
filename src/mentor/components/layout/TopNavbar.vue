<template>
  <nav class="top-navbar">
    <!-- Left: Brand -->
    <div class="top-navbar__brand">
      <LogoIcon class="top-navbar__logo-icon" />
      <span class="top-navbar__brand-text">NewBee</span>
    </div>

    <!-- Center: DevCom logo -->
    <div class="top-navbar__center">
      <img
        src="@/components/icons/devcom-source.png"
        alt="DevCom"
        class="top-navbar__devcom-logo"
      />
    </div>

    <!-- Right: Actions + Profile -->
    <div class="top-navbar__right">
      <!-- Notification Bell -->
      <button class="top-navbar__icon-btn" aria-label="Notifications">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" fill="#1A1A1A"/>
        </svg>
      </button>

      <!-- Grid / Apps icon -->
      <button class="top-navbar__icon-btn" aria-label="Apps">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="6" cy="6" r="1.75" fill="#1A1A1A"/>
          <circle cx="12" cy="6" r="1.75" fill="#1A1A1A"/>
          <circle cx="18" cy="6" r="1.75" fill="#1A1A1A"/>
          <circle cx="6" cy="12" r="1.75" fill="#1A1A1A"/>
          <circle cx="12" cy="12" r="1.75" fill="#1A1A1A"/>
          <circle cx="18" cy="12" r="1.75" fill="#1A1A1A"/>
          <circle cx="6" cy="18" r="1.75" fill="#1A1A1A"/>
          <circle cx="12" cy="18" r="1.75" fill="#1A1A1A"/>
          <circle cx="18" cy="18" r="1.75" fill="#1A1A1A"/>
        </svg>
      </button>

      <!-- Profile Pill -->
      <div class="top-navbar__profile">
        <div class="top-navbar__avatar">
          <img
            v-if="auth.profileImage"
            :src="auth.profileImage"
            :alt="auth.name"
          />
          <span v-else class="top-navbar__avatar-fallback">
            {{ initials }}
          </span>
        </div>
        <div class="top-navbar__user-info">
          <span class="top-navbar__user-name">{{ auth.name }}</span>
          <span class="top-navbar__user-roll">{{ auth.user_ID }}</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
/**
 * TopNavbar.vue
 *
 * Purpose:
 *   Full-width top navigation bar matching Figma exactly.
 *   Figma: padding 1.25rem 1.875rem, justify-content space-between,
 *   align-items center, background var(--Less-Priority)
 *
 * Props: none (reads from auth store)
 * Events: none
 * Dependencies: Pinia auth store, Logo SVG, DevCom PNG
 */
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import LogoIcon from '@/components/icons/Logo.svg'

const auth = useAuthStore()

const initials = computed(() => {
  if (!auth.name) return '?'
  return auth.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})
</script>

<style scoped>
/* Figma: display flex, padding 1.25rem 1.875rem,
   justify-content space-between, align-items center,
   background var(--Less-Priority) */
.top-navbar {
  display: flex;
  width: 100%;
  padding: 1.25rem 1.875rem;
  justify-content: space-between;
  align-items: center;
  background: var(--mentor-bg-cream);
}

/* ── Brand (left) ── */
.top-navbar__brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.top-navbar__logo-icon {
  width: 1.75rem;
  height: 1.75rem;
}

.top-navbar__brand-text {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--mentor-text-primary);
  letter-spacing: -0.02em;
}

/* ── Center (DevCom) ── */
.top-navbar__center {
  display: flex;
  align-items: center;
}

.top-navbar__devcom-logo {
  height: 1.75rem;
  width: auto;
  object-fit: contain;
}

/* ── Right (actions + profile) ── */
.top-navbar__right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.top-navbar__icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  background: transparent;
  border-radius: 50%;
  cursor: pointer;
  transition: background var(--mentor-transition-fast);
}

.top-navbar__icon-btn:hover {
  background: var(--mentor-primary-light);
}

/* ── Profile Pill ── */
.top-navbar__profile {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--mentor-primary-light);
  padding: 0.3125rem 0.875rem 0.3125rem 0.3125rem;
  border-radius: 100px;
  cursor: pointer;
  transition: background var(--mentor-transition-fast);
}

.top-navbar__profile:hover {
  background: var(--mentor-primary-hover);
}

.top-navbar__avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  overflow: hidden;
  background: var(--mentor-bg-white);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.top-navbar__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.top-navbar__avatar-fallback {
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--mentor-text-primary);
}

.top-navbar__user-info {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.top-navbar__user-name {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--mentor-text-emphasis);
  white-space: nowrap;
}

.top-navbar__user-roll {
  font-size: 0.6875rem;
  color: var(--mentor-text-light);
}
</style>
