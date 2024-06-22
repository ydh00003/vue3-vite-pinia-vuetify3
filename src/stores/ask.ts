import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'

import { fetchAskList } from '@/api/index'
import type { Ask } from '@/common/ts/types'

export const useAskStore = defineStore('ask', () => {
  const askList: Ask[] = reactive([])

  const getAskList = computed(() => askList)

  async function fetchAsk(page: number) {
    try {
      if (page === 1) {
        askList.length = 0
      }

      const { data } = await fetchAskList(page)
      for (const askInfo of data as Ask[]) {
        askList.push(askInfo)
      }
    } catch (error) {
      console.log('fetchAsk error :>> ', error)
    }
  }

  return { askList, getAskList, fetchAsk }
})
