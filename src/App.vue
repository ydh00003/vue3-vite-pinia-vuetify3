<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading'
import { storeToRefs } from 'pinia'

import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ToolBar from '@/components/ToolBar.vue'

const store = useLoadingStore()
const { getLoading } = storeToRefs(store)
</script>

<template>
  <LoadingSpinner :loading="getLoading"></LoadingSpinner>
  <ToolBar></ToolBar>
  <router-view v-slot="{ Component }">
    <transition name="page" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style scoped>
body {
  padding: 0;
  margin: 0;
}
a {
  color: navy;
  text-decoration: none;
}
a:hover {
  color: #42b883;
  text-decoration: underline;
}
a.router-link-exact-active {
  text-decoration: underline;
}

/* Router Transition */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
/* .page-enter-to, */
.page-leave-to {
  opacity: 0;
}
</style>
