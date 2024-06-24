import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'

import { fetchJobsList } from '@/api/index'
import type { Jobs } from '@/common/ts/types'

export const useJobsStore = defineStore('jobs', () => {
  // const jobsList = reactive([] as Jobs[])
  const jobsList: Jobs[] = reactive([])

  const getJobsList = computed(() => jobsList)

  async function fetchJobs(page: number) {
    try {
      if (page === 1) {
        jobsList.length = 0
      }
      const { data } = await fetchJobsList(page)
      for (const jobsInfo of data as Jobs[]) {
        jobsList.push(jobsInfo)
      }
    } catch (error) {
      console.log('fetchJobs Error :>> ', error)
    }
  }

  return { jobsList, getJobsList, fetchJobs }
})
