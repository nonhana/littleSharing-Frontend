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
  persist: true
})
