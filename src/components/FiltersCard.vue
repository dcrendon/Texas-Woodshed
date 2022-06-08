<template>
  <div class="lg:w-1/6 mr-4 bg-white rounded-lg border border-neutral-200 h-max p-4 dark:bg-neutral-900 dark:border-neutral-700 transition-all hidden lg:block">
    <div>
      <p class="dark:text-neutral-200 font-bold">Article Filters:</p>
      <hr class="mb-2">
      <ul class="dark:text-neutral-200 flex flex-col gap-2">
        <li class="hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded hover:pl-2 transition-all pb-1">
          <router-link to="/">🔥 New Posts</router-link>
        </li>
        <li class="hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded hover:pl-2 transition-all pb-1">
          <router-link to="/filter/sport/NFL">🏈 Football</router-link>
        </li>
        <li class="hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded hover:pl-2 transition-all pb-1">
          <router-link to="/filter/sport/UFC">👊🏼 UFC</router-link>
        </li>
        <li class="hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded hover:pl-2 transition-all pb-1">
          <router-link to="/filter/sport/Futbol">⚽ Futbol</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>