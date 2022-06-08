<template>
  <div class="flex justify-center">
    <div class="flex items-center w-5/6 lg:w-2/4 flex flex-col p-4 lg:p-12 bg-white rounded-md border-2 border-neutral-400 shadow-sm dark:bg-neutral-900 dark:border-neutral-400 dark:shadow-neutral-900 transition-all">
        <p class=" text-3xl font-bold mb-8 text-neutral-900 dark:text-neutral-200 transition-all">Sign Up</p>
        <div v-if="formErrors.length" class="mb-4">
          <ul class="text-red-500 text-sm text-center">
            <li v-for="formError in formErrors">{{formError.message}}</li>
          </ul>
        </div>
        <div v-if="signupSuccess">
          <p class="text-center text-neutral-900 dark:text-neutral-200 transition-all">
            Sign-up was successful!
            <br>
            A confirmation email has been sent to {{signupFormData.email}}.
            <br>
            Once you confirm your email, you will be able to login.
          </p>
          <p class="text-center text-neutral-900 dark:text-neutral-200 transition-all mt-4 text-sm">
            If you did not receive an email, <span @click="resendConfirmationEmail()" class="underline hover:text-neutral-500 cursor-pointer">please click here to resend</span>.
            <br>
            <span v-if="resend" class="text-xs">Confirmation email has be resent to {{signupFormData.email}}</span>
          </p>
        </div>
        <div v-else class="grid grid-cols-1 gap-4 w-5/6 lg:w-1/2">
          <label class="block">
            <span class="text-neutral-900 dark:text-neutral-200 transition-all">Username:</span>
            <input type="email" name="username" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="" v-model="signupFormData.username">
          </label>
          <label class="block">
            <span class="text-neutral-900 dark:text-neutral-200 transition-all">Email:</span>
            <input type="email" name="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="" v-model="signupFormData.email">
          </label>
          <label class="block">
            <span class="text-neutral-900 dark:text-neutral-200 transition-all">Password:</span>
            <input type="password" name="password" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="" v-model="signupFormData.password">
          </label>
          <label class="block">
            <span class="text-neutral-900 dark:text-neutral-200 transition-all">Confirm password:</span>
            <input type="password" name="confirm password" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="" v-model="confirmPassword">
          </label>
          <label class="block w-max">
            <button  class="flex items-center bg-neutral-900 disabled:hover: hover:bg-gradient-to-r hover:from-green-400 hover:to-blue-500 disabled:hover:from-neutral-900 disabled:hover:to-neutral-900 dark:disabled:hover:from-neutral-100 dark:disabled:hover:to-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 text-white font-semibold py-2 px-4 rounded mt-1 transition-all cursor-pointer disabled:cursor-not-allowed" @click="signup()" :disabled="loading">
              <svg v-if="loading" class="animate-spin h-5 w-5 mr-3 transition-all invert dark:invert-0" width="16" viewBox="0 0 16 16">
                <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
              </svg>
              Sign Up
            </button>
          </label>
          <p class="transition-all text-sm text-neutral-900 dark:text-neutral-200 text-left mt-4">If you already have an account <router-link to="/login" class="underline hover:text-neutral-500">click here to login</router-link>.</p>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useHead } from '@vueuse/head'

useHead({
  title: 'Signup | Texas Woodshed',
})

const signupFormData = ref({
  username: '',
  email: '',
  password: '',
});
const confirmPassword = ref('')
const formErrors:any = ref([])
const loading = ref(false)
const signupSuccess = ref(false)
const resend = ref(false)



const signup = () => {
  formErrors.value = []
  loading.value = true

  if(signupFormData.value.password.length < 7){
    formErrors.value = [{message: "Password must be at least 7 characters"}]
    loading.value = false
    return
  }

  if(signupFormData.value.password != confirmPassword.value){
    formErrors.value = [{message: "Passwords don't match"}]
    loading.value = false
    return
  }

  axios.post(`${import.meta.env.VITE_API_URL}/api/auth/local/register`, signupFormData.value)
    .then(response => {
        // handle success
        console.log(response.data)
        loading.value = false
        signupSuccess.value = true
    })
    .catch(error => {
      console.log(error.response);
      if(error.response.data.error.details.errors){
        formErrors.value = error.response.data.error.details.errors
      }else{
        formErrors.value = [{message: error.response.data.error.message}]
      }
      loading.value = false
    })
}

const resendConfirmationEmail = () => {
  axios.post(`${import.meta.env.VITE_API_URL}/api/auth/send-email-confirmation`, {
      email: signupFormData.value.email,
    })
    .then(response => {
      resend.value = true
    })
    .catch(error => {
      formErrors.value = [{message: error.response.data.error.message}]
    });
}
</script>