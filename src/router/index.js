import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import SearchResult from '@/pages/SearchResult.vue'
import AnimeInfo from '@/pages/AnimeInfo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/search',
      name: 'search',
      component: SearchResult,
    },
    {
      path: '/anime/:id',
      name: 'anime',
      component: AnimeInfo,
    },
  ],
})

export default router
