<template>
  <nav class="w-100 h-16 shadow bg-white dark:bg-neutral-900 dark:text-neutral-200 transition-all">
    <div class="pl-4 pr-4 lg:pl-8 lg:pr-8 flex items-center h-full justify-between">
      <div class="flex items-center h-full">
        <router-link to="/" class="flex items-center h-full">
          <img id="logo" src="../assets/logo.svg" alt="woodshed logo" class="h-5/6 dark:invert transition-all">
          <div class="text-xl font-bold tracking-tight flex flex-col md:flex-row">
            <span>The WoodShed</span>
            <span class="hidden md:block">&nbsp; - &nbsp;</span> 
            <span class="hidden sm:block">Texas Sports Authority</span>
          </div>
        </router-link>
      </div>
      <div class="flex items-center h-full">
        <router-link to="/login" class="pr-4" v-if="!isLoginPage() && !store.user">
          <span class="text-neutral-900 dark:text-neutral-200 font-semibold hover:underline transition-all">Login</span>
        </router-link>
        <div class="pr-4" v-if="store.user">
          <span class="text-neutral-900 dark:text-neutral-200 font-semibold hover:underline hover:cursor-pointer transition-all" @click="logout(store, router)">Logout</span>
        </div>
        <!-- <router-link to="/signup" class="pr-4">
          <span class="text-neutral-900 dark:text-neutral-200 font-bold hover:underline transition-all">Signup</span>
        </router-link> -->
        <div @click="toggleMode()">
          <span id="moon" class="transition-all text-black cursor-pointer" v-if="!isDark()">
            <!-- 🌙 -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </span>
          <span id="sun" class="transition-all text-neutral-200 cursor-pointer" v-if="isDark()">
            <!-- ☀️ -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  </nav>
</template>


<script setup lang="ts">
import useStore from '../store'
import { useRoute, useRouter } from 'vue-router'
import { logout, setTweetTheme } from '../helpers';

const store = useStore()
const route = useRoute()
const router = useRouter()
const isDark = () => store.theme == 'dark'
const isLoginPage = () => route.path == '/login'

if(isDark()) {
  const app = document.querySelector('#app')
  app!.classList.add('dark')
}

const toggleMode = () => {
  let prevTheme = ''
  const app = document.querySelector('#app')
  if (app!.classList.contains('dark')) {
    prevTheme = 'dark'
    app!.classList.remove('dark')
    store.theme = 'light'
  } else {
    prevTheme = 'light'
    app!.classList.add('dark')
    store.theme = 'dark'
  }
  setTweetTheme(store.theme, prevTheme)
}
</script>