<template>
  <div class="w-5/6 flex m-auto justify-between flex-col lg:flex-row">
    <!-- filters -->
    <FiltersCard />
    <!-- articles -->
    <div class="lg:w-3/6 mb-8">
      <div v-for="article in articles" class="mb-4">
        <router-link :to="'/article/'+ article.id + '/' + titleFixer(article.attributes.title)">
          <div class=" flex p-4 bg-white rounded-lg border border-neutral-200 shadow-md hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-900 transition-all">
            <div class="h-32 w-52">
              <img v-if="article.attributes.thumbnail.data.attributes.formats" :src="article.attributes.thumbnail.data.attributes.formats.thumbnail.url" :alt="article.attributes.thumbnail.data.attributes.alternativeText" class="w-full h-full object-cover">
              <img v-if="!article.attributes.thumbnail.data.attributes.formats" :src="article.attributes.thumbnail.data.attributes.url" :alt="article.attributes.thumbnail.data.attributes.alternativeText" class="w-full h-full object-cover">
            </div>
            <div class="pl-4 w-3/4 flex flex-col justify-between">
              <div>
                <h5 class="text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-200">{{article.attributes.title}}</h5>
                <p class="font-normal text-neutral-700 dark:text-neutral-400 text-sm">
                  <span>
                    Posted By: <router-link :to="'/filter/author/'+article.attributes.author.data.attributes.name" class="underline hover:text-neutral-500">{{article.attributes.author.data.attributes.name}}</router-link>
                  </span>
                </p>
              </div>
              <p class="flex flex-col font-normal text-neutral-700 dark:text-neutral-400 text-sm">
                <span>
                  Sport: <router-link :to="'/filter/sport/'+article.attributes.sport.data.attributes.name" class="underline hover:text-neutral-500">{{article.attributes.sport.data.attributes.name}}</router-link>
                </span>
                <span>Posted: {{formatDate(article.attributes.createdAt)}}</span>
              </p>
            </div>
          </div>
        </router-link>
      </div>
      <button class="w-full p-2 bg-white rounded border border-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-900 dark:text-neutral-200" @click="getArticles()" v-if="(meta.total > meta.start) && (meta.total > pagination)">Load more</button>
    </div>
    <!-- quick hitters -->
    <div class="lg:w-2/6 xl:w-1/4 bg-white rounded-lg border border-neutral-200 h-max p-4 lg:ml-8 dark:bg-neutral-900 dark:border-neutral-700 ">
      <h4 class="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200">Quick Hitters</h4>
      <hr>
      <div class="mt-4">
        <div v-for="hitter in hitters" class="flex pl-4 pr-4 pb-4">
          <router-link :to="'/quick-hitter/'+ hitter.id + '/' + titleFixer(hitter.attributes.title)" class="w-full">
            <div class="w-full flex p-4 justify-between bg-white rounded-lg border border-neutral-200 hover:bg-neutral-100 dark:bg-neutral-900 dark:border-neutral-700 dark:hover:bg-neutral-700 transition-all">
              <div class="w-3/4 lg:pr-4 flex flex-col justify-between">
                <h5 class=" text-base tracking-tight text-neutral-900 dark:text-neutral-200 font-semibold">{{hitter.attributes.title}}</h5>
                <p class="font-normal text-neutral-700 dark:text-neutral-400 text-sm">
                  <router-link to="/" class="underline hover:text-neutral-500">{{hitter.attributes.author.data.attributes.name}}</router-link>
                  <br>
                  {{formatDate(hitter.attributes.createdAt)}}
                </p>
              </div>
              <div class="max-h-20 max-w-20">
                <img :src="hitter.attributes.thumbnail.data.attributes.formats.thumbnail.url" :alt="hitter.attributes.thumbnail.data.attributes.alternativeText" class="object-cover aspect-square max-h-20">
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useHead } from '@vueuse/head'
import { useDateFormat } from '@vueuse/core'
import { titleFixer } from '../helpers';
import FiltersCard from '../components/FiltersCard.vue'

const pagination = ref(0);
const articles = ref<any>([])
const hitters = ref<any>([])
const meta = ref<any>({})
const formatDate = (date:number) => {
  const datef = useDateFormat(date, "MM-DD-YYYY")
  return  datef.value
}
useHead({
  title: 'Home | Texas Woodshed',
})

const getArticles = () => {
  axios.get(`${import.meta.env.VITE_API_URL}/api/articles?populate=author,sport,thumbnail&sort=createdAt:desc&pagination[start]=${pagination.value}&pagination[limit]=10`)
  .then(res => {
    meta.value = res.data.meta.pagination
    if(pagination.value == 0){
      articles.value = res.data.data
    }
    else{
      res.data.data.forEach( (element:any) => {
        articles.value.push(element)
      });
    }
    pagination.value = pagination.value + 10
    
  }).catch(err => {
    console.log(err);
  });
}

const getHitters = () => {
  axios.get(`${import.meta.env.VITE_API_URL}/api/quick-hitters?populate=author,thumbnail&sort=updatedAt:desc`)
  .then(res => {
    hitters.value = res.data.data
  })
  .catch(err => {
    console.log(err)
  })
}

getArticles()
getHitters()
</script>