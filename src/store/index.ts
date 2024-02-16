import { useUserStore } from './modules/user'
import { useKeywordStore } from './modules/keywords'
import { useUnreadCountStore } from './modules/unreadCount'

export function useStore() {
  return {
    userStore: useUserStore(),
    keywordStore: useKeywordStore(),
    unreadCountStore: useUnreadCountStore()
  }
}
