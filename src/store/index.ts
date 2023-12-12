import { useUserStore } from './modules/user'
import { useArticleLabelStore } from './modules/articleLabels'
import { useKeywordStore } from './modules/keywords'
import { useUnreadCountStore } from './modules/unreadCount'

export function useStore() {
  return {
    userStore: useUserStore(),
    articleLabelStore: useArticleLabelStore(),
    keywordStore: useKeywordStore(),
    unreadCountStore: useUnreadCountStore()
  }
}
