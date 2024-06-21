import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'

import { fetchNewsList } from '@/api/index'
import type { News } from '@/common/types'

export const useNewsStore = defineStore('news', () => {
  //   const newsList: News[] = reactive([])
  const newsList = reactive([] as News[])
  //   const newsList = ref<News[]>([])

  const getNewsList = computed(() => newsList)

  async function fetchNews(page: number) {
    if (page == 1) {
      newsList.length = 0
    }
    const { data } = await fetchNewsList(page)
    for (const newsInfo of data as News[]) {
      newsList.push(newsInfo)
    }
  }

  return { newsList, getNewsList, fetchNews }
})
