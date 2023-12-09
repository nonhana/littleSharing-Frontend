import { defineStore } from 'pinia'
import { User } from '@/api/user/types'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: <User>{}
  }),
  actions: {
    setUserInfo(userInfo: User) {
      this.userInfo = userInfo
    },
    reset() {
      this.userInfo = <User>{}
    }
  },
  persist: true
})
