
<template>
  <Navbar></Navbar>
  <main class="pt-4 pb-4 dark:bg-neutral-800 bg-neutral-100 transition-colors grow main">
    <router-view></router-view>
  </main>
  <Footer></Footer>
</template>

<script setup lang="ts">
  import Navbar from './components/Navbar.vue'
  import Footer from './components/Footer.vue'
</script>