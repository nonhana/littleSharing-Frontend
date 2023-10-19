<template>
  <div class="index">
    <FilterBar
      :article-list-all="article_list_all"
      @sendArticleList="sendArticleList"
    />
    <el-row type="flex" justify="center" style="margin-top: 5px">
      <div style="margin-right: 25px">
        <el-row>
          <HomeTrend />
        </el-row>
        <el-row>
          <HomeNewsList />
        </el-row>
      </div>
      <div class="loading-mask" v-loading="articleListLoading">
        <div v-if="article_list.length !== 0">
          <ul
            v-infinite-scroll="load"
            v-if="articleListShow"
            class="HomeArticleList-warp"
          >
            <li
              v-for="index in articleNum > article_list.length
                ? article_list.length
                : articleNum"
            >
              <ArticleHomeItem :article-list="article_list[index - 1]" />
            </li>
          </ul>
        </div>
        <div v-if="article_list.length === 0">
          <el-empty
            style="width: 1003px"
            description="暂未搜索到该分类的文章哦......"
          ></el-empty>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue";
import { ArticleInfo } from "@/types";
import { getArticleList } from "@/api/article";
import FilterBar from "@/components/Little/Tool/FilterBar.vue";
import HomeNewsList from "@/components/ModelHome/HomeNewsList.vue";
import HomeTrend from "@/components/ModelHome/HomeTrend.vue";
import ArticleHomeItem from "@/components/Little/Item/ArticleHomeItem.vue";

const article_list = ref<ArticleInfo[]>([]);
const article_list_all = ref<ArticleInfo[]>([]);
const articleListShow = ref<boolean>(true);
const articleListLoading = ref<boolean>(false);
const articleNum = ref<number>(5);

const sendArticleList = async (arr: ArticleInfo[]) => {
  articleListLoading.value = true;
  articleListShow.value = false;
  article_list.value = arr;
  await nextTick();
  articleListLoading.value = false;
  articleListShow.value = true;
};
const load = () => {
  if (articleNum.value < article_list.value.length) {
    articleNum.value += 5;
  }
};

onMounted(async () => {
  articleListLoading.value = true;
  const res = await getArticleList();
  if (res.data.result_code === 0) {
    article_list_all.value = res.data.result;
    article_list.value = article_list_all.value;
  }
  await nextTick();
  articleListLoading.value = false;
});
</script>

<style scoped lang="less">
.index {
  width: 100%;
  .HomeArticleList-warp {
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .loading-mask {
    position: relative;
    margin-top: 20px;
    border-radius: 20px;
    overflow: hidden;
  }
}
</style>
