import { defineStore } from "pinia";
import { KeywordInfo } from "@/utils/types";

export const useKeywordStore = defineStore("keyword", {
  state: () => ({
    keywordInfo: <KeywordInfo[]>[],
  }),
  actions: {
    setKeywordList(keywords: KeywordInfo[]) {
      this.keywordInfo = keywords;
    },
  },
  persist: true,
});
