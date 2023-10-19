import { defineStore } from "pinia";
import { Names } from "./store-name";

export const useStore = defineStore(Names.User, {
  state: () => {
    return {
      username: "non_hana",
      useraccount: "1209220829",
    };
  },
});
