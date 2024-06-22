import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'

import { fetchItemInfo } from '@/api'
import type { Item } from '@/common/ts/types'

export const useItemStore = defineStore('item', () => {
  // const itemInfo = reactive({} as Item)
  const itemInfo = reactive<Partial<Item>>({} as Item)

  const getItemInfo = computed(() => itemInfo)

  async function fetchItem(itemId: string | undefined) {
    if (itemId === undefined) {
      throw new Error('itemId is undefined')
    }
    try {
      const itemData = (await fetchItemInfo(itemId)).data as Item

      for (const [key, value] of Object.entries(itemData)) {
        itemInfo[key as keyof Item] = value
      }
    } catch (error) {
      console.log('fetchItem Error :>> ', error)
    }
  }

  function clearItem() {
    for (const key of Object.keys(itemInfo)) {
      delete itemInfo[key as keyof Item]
    }
  }

  return { itemInfo, getItemInfo, fetchItem, clearItem }
})
