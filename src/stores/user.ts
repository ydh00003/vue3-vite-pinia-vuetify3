import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'

import { fetchUserInfo } from '@/api/index'
import type { User } from '@/common/ts/types'

// const setValue = <T>(obj: T, key: keyof T, value: T[keyof T]) => {
//   obj[key] = value
// }

export const useUserStore = defineStore('user', () => {
  // const userInfo = reactive(<User>{})
  const userInfo = reactive<Partial<User>>({})

  const getUserInfo = computed(() => userInfo)

  async function fetchUser(userName: string | undefined) {
    if (userName === undefined) {
      throw new Error('userNma is undefined')
    }
    const { data } = await fetchUserInfo(userName)
    // const userData = data as User
    const userData: User = data

    // for (const key of Object.keys(userData)) {
    //   const userKey = key as keyof User
    //   setValue<User>(userInfo, userKey, userData[userKey])
    // }

    for (const [key, value] of Object.entries(userData)) {
      userInfo[key as keyof User] = value
    }
  }

  function clearUser() {
    // const clearData = <User>{}
    // for (const key of Object.keys(userInfo)) {
    //   const userKey = key as keyof User
    //   setValue<User>(userInfo, userKey, clearData[userKey])
    // }
    for (const key of Object.keys(userInfo)) {
      delete userInfo[key as keyof User]
    }
  }

  return { userInfo, getUserInfo, fetchUser, clearUser }
})
