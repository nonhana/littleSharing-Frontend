import { defineStore } from 'pinia'
import type { Label } from '@/api/user/types'

export const useArticleLabelStore = defineStore('articleLabel', {
  state: () => ({
    articleLabelInfo: <Label[]>[]
  }),
  actions: {
    setArticleLabels(articleLabels: Label[]) {
      this.articleLabelInfo = articleLabels
    },
    reset() {
      this.articleLabelInfo = <Label[]>[]
    }
  },
  // 如果是在浏览器端渲染，开启localStorage持久化
  persist: import.meta.env.SSR === false && {
    storage: localStorage
  }
})
