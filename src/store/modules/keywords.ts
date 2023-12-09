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
  persist: true
})
