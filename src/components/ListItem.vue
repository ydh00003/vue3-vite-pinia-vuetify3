<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import type { News } from '@/types'

import { useNewsStore } from '@/stores/news'
import { storeToRefs } from 'pinia'

const route = useRoute()
const bSearching = ref(false)
const pageNum = ref(1)
const itemList: News[] = reactive([])

// News
const newsStore = useNewsStore()
const { getNewsList } = storeToRefs(newsStore)
const { fetchNews } = newsStore

const fetchData = () => {
  if (route.name == 'news') {
    fetchNews(pageNum.value).then(() => {
      itemList.length = 0
      for (const newsInfo of getNewsList.value) {
        itemList.push(newsInfo)
      }
    })
  }
}

onMounted(() => {
  pageNum.value = 1
  bSearching.value = false

  fetchData()
})
</script>

<template>
  <div id="list-item">
    <ul class="news-list">
      <li class="post" v-for="item in itemList" :key="item.id">
        <div class="points">
          {{ item.points || 0 }}
        </div>
        <div>
          <p class="news-title">
            <template v-if="item.type === 'ask'">
              <router-link :to="item.url"> ###: {{ item.title }} </router-link>
            </template>
            <template v-else>
              <a :href="item.url" target="_blank"> {{ item.title }} </a>
            </template>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.news-list {
  margin: 0;
  padding: 0;
  border-left: 1px solid #42b883;
  border-right: 1px solid #42b883;
}
.post {
  list-style: none;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
}
.points {
  width: 80px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #42b883;
}
.news-title {
  margin: 0;
}
.link-text {
  color: #828282;
}
</style>
