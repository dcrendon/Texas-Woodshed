import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { ref } from 'vue'


const useStore = defineStore('main', {
  state: () => ({
    theme: useLocalStorage('theme', 'light'),
    user: useLocalStorage('user', ref<any>(null)),
    jwt: useLocalStorage('jwt', ref<any>(null)),
  }),
})

export default useStore
