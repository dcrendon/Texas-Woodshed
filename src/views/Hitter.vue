<template>
  <div class="flex justify-center">
      <div class="w-5/6 lg:w-2/4 flex flex-col p-4 lg:p-12 bg-white rounded-md border-2 border-neutral-400 shadow-sm dark:bg-neutral-900 dark:border-neutral-400 dark:shadow-neutral-900 transition-all">
        <h1 class="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200">{{hitter.attributes.title}}</h1>
        <div class="mt-4 mb-4">
          <p class="tracking-tight text-neutral-900 dark:text-neutral-200">
            Author: <router-link :to="'/filter/author/'+hitter.attributes.author.data.attributes.name" class="underline hover:text-neutral-500">{{hitter.attributes.author.data.attributes.name}}</router-link>
            <br>
            Last Updated: {{formatDate(hitter.attributes.updatedAt)}}
          </p>
        </div>
        <hr>
        <div class="mt-6 mb-6">
          <p class="tracking-tight text-neutral-900 dark:text-neutral-200 text-lg" v-html="hitter.attributes.body"></p>
        </div>
        <hr>
        <div class="mt-4 tracking-tight text-neutral-900 dark:text-neutral-200" v-if="!store.user">
          <router-link to="/login" class="underline hover:text-neutral-500">Login</router-link>
           or 
          <router-link to="/signup" class="underline hover:text-neutral-500">Sign Up</router-link> to comment
        </div>
        <div class="mt-4" v-else>
          <label class="block">
            <span class="text-neutral-900 dark:text-neutral-200 text-sm font-semibold">New Comment:</span>
            <textarea name="new comment" class="w-1/2 mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" v-model="userComment"></textarea>
          </label>
          <label class="block w-max mb-4">
            <button class="bg-neutral-900 hover:bg-gradient-to-r hover:from-green-400 hover:to-blue-500 dark:bg-neutral-100 dark:text-neutral-900 text-white font-semibold py-2 px-4 rounded mt-2 transition-all text-xs" @click="postComment()">
              Post Comment
            </button>
          </label>
          <hr>
        </div>
        <div class="mt-4 tracking-tight text-neutral-900 dark:text-neutral-200" v-if="comments.length">
          <p class="font-bold mb-1">Comments:</p>
          <div v-for="comment in comments" class="mb-2  grid grid-cols-1 gap-0">
            <span class="font-semibold text-sm">{{comment.author.name}}</span>
            <span class="">{{comment.content}}</span>
            <span class="text-xs">{{useTimeAgo(comment.createdAt).value}}</span>
            <hr class="mt-4 w-1/2">
          </div>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { formatDate } from '../helpers';
import useStore from '../store';
import axios from 'axios';
import { useTimeAgo } from '@vueuse/core'

const route = useRoute()
const hitter:any = route.params.post
const store = useStore()
const comments:any = ref([])
const userComment = ref('')

const getComments = () => {
  axios.get(`${import.meta.env.VITE_API_URL}/api/comments/api::quick-hitter.quick-hitter:${route.params.id}/flat`)
    .then(response => {
      comments.value = response.data.data.reverse()
    })
    .catch(error => {
      console.log(error);
    });
}

const postComment = () => {
  const data = {
    "content": `${userComment.value}`,
  } 
  axios.post(`${import.meta.env.VITE_API_URL}/api/comments/api::quick-hitter.quick-hitter:${route.params.id}`, data, {headers: {"Authorization" : `Bearer ${store.jwt}`}})
  .then(response => {
    userComment.value = ''
    getComments()
  })
  .catch(error => {
    console.log(error.response);
  });
}

getComments()

</script>
