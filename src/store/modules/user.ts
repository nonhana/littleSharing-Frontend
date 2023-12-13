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
  // 如果是在浏览器端渲染，开启localStorage持久化
  persist: import.meta.env.SSR === false && {
    storage: localStorage
  }
})
