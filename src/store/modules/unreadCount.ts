import { defineStore } from 'pinia'
import type { UnreadMessageCount } from '@/api/message/types'

export const useUnreadCountStore = defineStore('unreadCount', {
  state: () => ({
    unreadCount: <UnreadMessageCount>{
      type_1: 0,
      type_2: 0,
      type_3: 0,
      total: 0
    }
  }),
  actions: {
    setUnreadCount(unreadCount: UnreadMessageCount) {
      this.unreadCount = unreadCount
    },
    clearUnreadCount(type: 1 | 2 | 3) {
      switch (type) {
        case 1:
          this.unreadCount.type_1 = 0
          break
        case 2:
          this.unreadCount.type_2 = 0
          break
        case 3:
          this.unreadCount.type_3 = 0
          break
      }
    }
  },
  persist: true
})
