import { createRouter, createWebHistory } from 'vue-router'

import NewsView from '@/views/NewsView.vue'
import AskView from '@/views/AskView.vue'

import { useLoadingStore } from '@/stores/loading'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/news'
    },
    {
      name: 'news',
      path: '/news',
      component: NewsView
    },
    {
      name: 'ask',
      path: '/ask',
      component: AskView
    }
  ]
})

router.beforeEach((to, from, next) => {
  const loadingStore = useLoadingStore()
  const { showLoading } = loadingStore

  showLoading()
  next()
})

export default router
