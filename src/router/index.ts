import { createRouter, createWebHistory } from 'vue-router'

import { useLoadingStore } from '@/stores/loading'
import { useUserStore } from '@/stores/user'

import NewsView from '@/views/NewsView.vue'
import AskView from '@/views/AskView.vue'
import JobsView from '@/views/JobsView.vue'
import UserView from '@/views/UserView.vue'
import ItemView from '@/views/ItemView.vue'

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
    },
    {
      name: 'jobs',
      path: '/jobs',
      component: JobsView
    },
    {
      name: 'user',
      path: '/user/:id',
      component: UserView
    },
    {
      name: 'item',
      path: '/item',
      component: ItemView
    }
  ]
})

router.beforeEach((to, from, next) => {
  const loadingStore = useLoadingStore()
  const { showLoading } = loadingStore

  const userStore = useUserStore()
  const { clearUser } = userStore

  if (to.name === 'user') {
    clearUser()
  }

  showLoading()
  next()
})

export default router
