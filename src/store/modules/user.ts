import { defineStore } from 'pinia'
import { User } from '@/api/user/types'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: <User>{},
    isLogin: false
  }),
  actions: {
    setUserInfo(userInfo: User) {
      this.userInfo = userInfo
    },
    setLogin(isLogin: boolean) {
      this.isLogin = isLogin
    },
    reset() {
      this.userInfo = <User>{}
      this.isLogin = false
    }
  },
  persist: true
})
