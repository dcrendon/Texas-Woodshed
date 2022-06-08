<template>
  <div class="w-5/6 flex m-auto justify-between flex-col lg:flex-row">
    <!-- filters -->
    <FiltersCard />
    <!-- articles -->
    <div class="lg:w-3/6 mb-8">
      <div v-for="article in articles" class="mb-4">
        <router-link :to="'/article/'+ article.id + '/' + titleFixer(article.title)">
          <div class=" flex p-4 bg-white rounded-lg border border-neutral-200 shadow-md hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-900 transition-all">
            <div class="h-32 w-52">
              <img v-if="article.thumbnail.formats" :src="article.thumbnail.formats.thumbnail.url" class="w-full h-full object-cover">
              <img v-if="!article.thumbnail.formats" :src="article.thumbnail.url" class="w-full h-full object-cover">
            </div>
            <div class="pl-4 w-3/4 flex flex-col justify-between">
              <div>
                <h5 class="text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-200">{{article.title}}</h5>
                <p class="font-normal text-neutral-700 dark:text-neutral-400 text-sm">
                  <span>
                    Posted By: <router-link :to="'/filter/author/'+article.author.name" class="underline hover:text-neutral-500">{{article.author.name}}</router-link>
                  </span>
                </p>
              </div>
              <p class="flex flex-col font-normal text-neutral-700 dark:text-neutral-400 text-sm">
                <span>
                  Sport: <router-link :to="'/filter/sport/'+article.sport.name" class="underline hover:text-neutral-500">{{article.sport.name}}</router-link>
                </span>
                <span>Posted: {{formatDate(article.createdAt)}}</span>
              </p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <!-- quick hitters -->
    <div class="lg:w-2/6 xl:w-1/4">
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import axios from 'axios'
import { useHead } from '@vueuse/head'
import { titleFixer, formatDate } from '../helpers';
import { useRoute } from 'vue-router';
import FiltersCard from '../components/FiltersCard.vue'

const route = useRoute()
const articles = ref<any>([])
const filterName = ref<any>(route.params.name)
const filterType = ref<any>(route.params.type)



watch(
  () => route.params.name,
  async () => {
    filterName.value = route.params.name
    filterType.value = route.params.type
    getArticles()
  }
)

useHead({
  title: `${filterName.value} | Texas Woodshed`,
})

const getArticles = () => {
  
  if(filterType.value === 'sport') {
    filterType.value = 'getBySport'
  }else{
    filterType.value = 'getByAuthor'
  }

  axios.get(`${import.meta.env.VITE_API_URL}/api/articles/${filterType.value}/${filterName.value}`)
  .then(res => {
    articles.value = res.data
  }).catch(err => {
    // console.log(err);
  });
}

getArticles()
</script>