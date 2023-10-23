import { defineStore } from "pinia";
import { UserInfo } from "@/utils/types";

export const useUserStore = defineStore("user", {
  state: () => ({
    userInfo: <UserInfo>{},
  }),
  actions: {
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo;
    },
  },
  persist: {
    enabled: true,
  },
});
