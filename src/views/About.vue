<template>
  <div class="flex flex-col items-center">
    <div class="glass text-center flex flex-col items-center p-4 transition-all">
      <h1 class="text-neutral-700 dark:text-neutral-300 font-bold">About us</h1>
      <img src="../assets/logo.svg" class="dark:invert" style="margin-top: 3rem; margin-bottom: 3rem; max-height: 8rem;">
      <p class="text-center text-neutral-700 dark:text-neutral-300 mb-4">
        The Woodshed ~ Texas Sports Authority ~ News & Commentary
      </p>
      <p class="text-neutral-700 dark:text-neutral-300 text-center mb-4">
        The best news, bets, and 2¢ for sports all over the world. Live and direct from the lone star state.
      </p>
      <p class="text-center text-neutral-700 dark:text-neutral-300">
        <span style="text-decoration: underline;">Manifesto:</span>
        <br>
        Ahoy the Rio Grande Valley to the Pan Handle
        <br>
        From the Big Thicket to Mt. Guadalupe
        <br>
        All places in between & All walks of Life
        <br>
        ~
        <br>
        This site is a tribute to:
        <br>
        The Sport 
        <br>
        The Athletes
        <br>
        The Coaching/training staff
        <br>
        The governing bodies
        <br>
        The Communities
        <br>
        The Fan
        <br>
        <br>
        <br>
        <a class="hover:underline" href="mailto:info@txwoodshed.net">info@txwoodshed.net</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'

useHead({
  title: `About | Texas Woodshed`,
})
</script>

<style scoped>
.glass{
  backdrop-filter: blur( 3px );
  -webkit-backdrop-filter: blur( 3px );
}
</style>