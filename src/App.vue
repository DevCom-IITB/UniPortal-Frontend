<template>
  <div class="container">
    <Navbar />
    <Sidebar />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Sidebar
  }
}
</script>

<style>
* {
  background: white;
}

</style>