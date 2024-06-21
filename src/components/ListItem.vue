<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

import type { News, Ask, Jobs } from '@/common/types'

import { useNewsStore } from '@/stores/news'
import { useAskStore } from '@/stores/ask'

import { useLoadingStore } from '@/stores/loading'
import { storeToRefs } from 'pinia'

const bSearching = ref(false)
const pageNum = ref(1)
const itemList: (News & Ask & Jobs)[] = reactive([])
const route = useRoute()

// News
const newsStore = useNewsStore()
const { getNewsList } = storeToRefs(newsStore)
const { fetchNews } = newsStore

// Ask
const askStore = useAskStore()
const { getAskList } = storeToRefs(askStore)
const { fetchAsk } = askStore

// Jobs

// Loading
const loadingStore = useLoadingStore()
const { showLoading, hideLoading } = loadingStore

const hideLoadingAft500ms = () => {
  setTimeout(() => {
    hideLoading()
    bSearching.value = false
  }, 500)
}

const fetchData = () => {
  showLoading()

  if (route.name === 'news') {
    fetchNews(pageNum.value)
      .then(hideLoadingAft500ms)
      .then(() => {
        itemList.length = 0
        for (const newsInfo of getNewsList.value) {
          itemList.push(newsInfo)
        }
      })
  } else if (route.name === 'ask') {
    fetchAsk(pageNum.value)
      .then(hideLoadingAft500ms)
      .then(() => {
        itemList.length = 0
        for (const askInfo of getAskList.value) {
          itemList.push(askInfo)
        }
      })
  }
}

const scrollHandler = () => {
  const elTrgt = document.getElementById('list-item') as HTMLDivElement

  const scrollY = window.scrollY
  const innerHeight = window.innerHeight
  const scrollHeight = elTrgt.scrollHeight

  if (!bSearching.value && scrollY + innerHeight >= scrollHeight + 100) {
    pageNum.value = pageNum.value + 1
    bSearching.value = true

    fetchData()
  }
}

onMounted(() => {
  pageNum.value = 1
  bSearching.value = false

  fetchData()

  document.addEventListener('scroll', scrollHandler)
})

onUnmounted(() => {
  document.removeEventListener('scroll', scrollHandler)
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
          <small class="link-text">
            {{ item.time_ago }} by
            <template v-if="item.type === 'job'">
              <a :href="item.url" target="_blank"> ***: {{ item.domain }} </a>
            </template>
            <template v-else>
              <router-link :to="`/user/${item.user}`" class="link-text">
                {{ item.user }}
              </router-link>
            </template>
          </small>
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
