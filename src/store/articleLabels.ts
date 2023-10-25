import { defineStore } from "pinia";
import { ArticleLabelInfo } from "@/utils/types";

export const useArticleLabelStore = defineStore("articleLabel", {
  state: () => ({
    articleLabelInfo: <ArticleLabelInfo[]>[],
  }),
  actions: {
    setArticleLabels(articleLabels: ArticleLabelInfo[]) {
      this.articleLabelInfo = articleLabels;
    },
  },
  persist: true,
});
