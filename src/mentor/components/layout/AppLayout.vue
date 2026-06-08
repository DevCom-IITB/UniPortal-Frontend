<template>
  <div class="app-layout">
    <!-- Top Navbar — full width -->
    <header class="app-layout__navbar">
      <slot name="navbar" />
    </header>

    <!-- Body: Sidebar + Main Content -->
    <div class="app-layout__body">
      <aside class="app-layout__sidebar">
        <slot name="sidebar" />
      </aside>

      <main class="app-layout__content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
/**
 * AppLayout.vue
 *
 * Purpose:
 *   Three-layer page layout for the Mentor Portal.
 *   Dark outer background → cream sidebar → white content area.
 *   Figma dimensions applied exactly.
 *
 * Slots:
 *   - navbar:  TopNavbar component
 *   - sidebar: MentorSidebar component
 *   - default: Main content (router-view / page content)
 *
 * Props: none
 * Events: none
 * Dependencies: none (pure layout)
 */
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background: var(--mentor-bg-dark);
  font-family: var(--mentor-font-family);
  overflow-x: hidden;
}

.app-layout__navbar {
  width: 100%;
  flex-shrink: 0;
}

.app-layout__body {
  display: flex;
  flex: 1;
  padding: 1.5rem 2rem;
  gap: 1.5rem;
  align-items: flex-start;
  align-self: stretch;
}

.app-layout__sidebar {
  width: 21.75rem;
  min-width: 21.75rem;
  flex-shrink: 0;
  align-self: stretch;
}

.app-layout__content {
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
  align-self: stretch;
  padding: 1.5rem 1.25rem;
  gap: 1.5rem;
  background: var(--mentor-bg-white);
  border-radius: 0;
  overflow-y: auto;
}
</style>
