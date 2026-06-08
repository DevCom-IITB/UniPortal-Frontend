<template>
  <AppLayout>
    <!-- Top Navbar -->
    <template #navbar>
      <TopNavbar />
    </template>

    <!-- Sidebar -->
    <template #sidebar>
      <MentorSidebar
        :pendingCount="pendingCount"
        @navigate-pending="handleNavigatePending"
        @add-link="handleAddLink"
      />
    </template>

    <!-- Main Content (router-view) -->
    <router-view />
  </AppLayout>
</template>

<script setup>
/**
 * MentorApp.vue
 *
 * Purpose:
 *   Root layout component for the Mentor Portal.
 *   Assembles AppLayout + TopNavbar + MentorSidebar and renders
 *   the child route view in the main content area.
 *
 * On mount, adds 'mentor-portal-active' class to <body> to override
 * global student portal styles (background: white, height: 5px).
 * Removes the class on unmount so student portal is unaffected.
 */
import { ref, onMounted, onUnmounted } from 'vue'
import '@/mentor/assets/mentor-tokens.css'
import AppLayout from '@/mentor/components/layout/AppLayout.vue'
import TopNavbar from '@/mentor/components/layout/TopNavbar.vue'
import MentorSidebar from '@/mentor/components/layout/MentorSidebar.vue'
import { getPendingCount } from '@/mentor/services/mentorApi'

const pendingCount = ref(0)

onMounted(async () => {
  // Override global student portal styles
  document.body.classList.add('mentor-portal-active')
  pendingCount.value = await getPendingCount()
})

onUnmounted(() => {
  // Clean up when leaving mentor portal
  document.body.classList.remove('mentor-portal-active')
})

function handleNavigatePending() {
  console.log('[MentorApp] Navigate to pending questions')
}

function handleAddLink() {
  console.log('[MentorApp] Add quick link')
}
</script>

<style scoped>
/* No additional styles needed — AppLayout handles the layout */
</style>
