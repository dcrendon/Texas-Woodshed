<template>
  <div class="flex justify-center">
    <div class="flex items-center w-5/6 lg:w-2/4 flex flex-col p-4 lg:p-12 bg-white rounded-md border-2 border-neutral-400 shadow-sm dark:bg-neutral-900 dark:border-neutral-400 dark:shadow-neutral-900 transition-all">
        <p class=" text-3xl font-bold mb-8 text-neutral-900 dark:text-neutral-200 transition-all">Login</p>
        <div v-if="formErrors.length" class="mb-4">
          <!-- <p class="text-red-500 text-sm text-center">
            <strong>Please correct the following error(s):</strong>
          </p> -->
          <ul class="text-red-500 text-sm text-center">
            <li v-for="formError in formErrors">{{emailReplace(formError.message)}}</li>
          </ul>
        </div>
        <div class="grid grid-cols-1 gap-4 w-5/6 lg:w-1/2">
          <label class="block">
            <span class="text-neutral-900 dark:text-neutral-200 transition-all">Email:</span>
            <input type="email" name="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="" v-model="loginFormData.identifier">
          </label>
          <label class="block">
            <span class="text-neutral-900 dark:text-neutral-200 transition-all">Password:</span>
            <input type="password" name="password" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="" v-model="loginFormData.password">
          </label>
          <label class="block w-max">
            <button class="bg-neutral-900 hover:bg-gradient-to-r hover:from-green-400 hover:to-blue-500 dark:bg-neutral-100 dark:text-neutral-900 text-white font-semibold py-2 px-4 rounded mt-1 transition-all" @click="login()">
              Login
            </button>
          </label>
          <p class="transition-all text-sm text-neutral-900 dark:text-neutral-200 text-left mt-4">If you don't have an account yet <router-link to="/signup" class="underline hover:text-neutral-500">click here to signup</router-link>.</p>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useStore from '../store'
import axios from 'axios';
import { useRouter } from 'vue-router';
import { emailReplace } from '../helpers';
import { useHead } from '@vueuse/head'

useHead({
  title: 'Login | Texas Woodshed',
})

const store = useStore()
const router = useRouter()
const loginFormData = ref({
  identifier: '',
  password: '',
})
const formErrors:any = ref([])

const login = () => {
  console.log(loginFormData);
  axios.post(`${import.meta.env.VITE_API_URL}/api/auth/local`, loginFormData.value)
  .then(response => {
    console.log(response);
    store.user = response.data.user
    store.jwt = response.data.jwt
    router.push('/')
  })
  .catch(error => {
    console.log(error.response);
    if(error.response.data.error.details.errors){
      formErrors.value = error.response.data.error.details.errors
    }else{
      formErrors.value = [{message: error.response.data.error.message}]
    }
  })
}

</script>