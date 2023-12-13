import { defineStore } from 'pinia'
import type { Keyword } from '@/api/user/types'

export const useKeywordStore = defineStore('keyword', {
  state: () => ({
    keywordInfo: <Keyword[]>[]
  }),
  actions: {
    setKeywordList(keywords: Keyword[]) {
      this.keywordInfo = keywords
    },
    reset() {
      this.keywordInfo = <Keyword[]>[]
    }
  },
  // 如果是在浏览器端渲染，开启localStorage持久化
  persist: import.meta.env.SSR === false && {
    storage: localStorage
  }
})
