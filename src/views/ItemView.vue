<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { useItemStore } from '@/stores/item'
import { useUserStore } from '@/stores/user'
import { useLoadingStore } from '@/stores/loading'
import { storeToRefs } from 'pinia'

import { utils } from '@/common/ts/utils'

import UserProfile from '@/components/UserProfile.vue'

const route = useRoute()

const itemStore = useItemStore()
const { getItemInfo } = storeToRefs(itemStore)
const { fetchItem } = itemStore

const userStore = useUserStore()
const { getUserInfo } = storeToRefs(userStore)
const { fetchUser } = userStore

const loadingStore = useLoadingStore()
const { hideLoading } = loadingStore

const { addCommas } = utils()

onMounted(() => {
  const itemId = route.query.id as string
  fetchItem(itemId).then(() => {
    fetchUser(getItemInfo.value.user).then(hideLoading)
  })
})
</script>

<template>
  <div style="max-width: 800px">
    <!-- 사용자 정보 -->
    <section>
      <UserProfile>
        <template v-slot:username>
          <div>
            User Name:
            <router-link :to="`/user/${getUserInfo.id}`">
              {{ getUserInfo.id }}
            </router-link>
          </div>
        </template>
        <template #time>
          <span>{{ 'Joined ' + getUserInfo.created }}</span>
        </template>
        <template #karma>
          <span style="margin-left: 10px">(Karma: {{ addCommas(getUserInfo.karma) }})</span>
        </template>
      </UserProfile>
    </section>

    <!-- 제목 -->
    <section style="text-align: left; padding-left: 10px">
      <h2>△ {{ getItemInfo.title }}</h2>
    </section>

    <!-- 질문 상세 정보 -->
    <section style="text-align: left; padding-left: 20px">
      <div v-html="getItemInfo.content"></div>
    </section>
  </div>
</template>

<style scoped></style>
