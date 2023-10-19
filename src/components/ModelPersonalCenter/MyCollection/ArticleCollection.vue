<template>
  <div class="ArticleCollection-wrap">
    <FilterBar
      :article-list-all="article_list_all"
      @sendArticleList="getArticleList"
    />
    <el-row v-loading="loading" style="margin-top: 30px">
      <el-row>
        <div style="margin: 0 0 0 20px">
          <span class="title">我收藏的文章({{ collect_article_num }})</span>
        </div>
      </el-row>
      <el-row type="flex" justify="center">
        <div
          v-if="articleListShow === 0"
          style="display: flex; justify-content: center; flex-flow: row wrap"
        >
          <ArticlePersonalcenterItem
            v-for="(item, index) in article_list"
            :articleList="item"
            :key="index"
          />
          <div
            style="width: 502px; margin: 0 60px 30px 0; padding: 9px 14px"
            v-for="item in new Array(2 - (((article_list.length - 1) % 2) + 1))"
            :key="item"
          ></div>
        </div>
      </el-row>
      <el-row
        v-if="article_list.length === 0"
        type="flex"
        justify="center"
        style="width: 100%"
      >
        <el-empty description="暂未发现收藏文章~"></el-empty>
      </el-row>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from "vue";
import { getUserCollectList } from "@/api/user";
import { getArticleMain } from "@/api/article";
import FilterBar from "@/components/Little/Tool/FilterBar.vue";
import ArticlePersonalcenterItem from "@/components/Little/Item/ArticlePersonalCenterItem.vue";

const loading = ref<boolean>(false);
const article_list = ref<any>([]);
const article_list_all = ref<any[]>([]);
const articleListShow = ref<number>(0);

const collect_article_num = computed(() => article_list_all.value.length);

const getArticleList = async (arr: any[]) => {
  articleListShow.value = 1;
  article_list.value = arr;
  await nextTick();
  articleListShow.value = 0;
};

onMounted(async () => {
  loading.value = true;
  const UserCollectListRes = await getUserCollectList();
  const articlePromises = UserCollectListRes.data.result.map(
    async (item: any) => {
      const res = await getArticleMain({ article_id: item });
      if (res.data.result_code === 0) {
        return res.data.result;
      }
      return null;
    }
  );
  const articles = await Promise.all(articlePromises);
  article_list_all.value = articles
    .filter((article) => article !== null)
    .reverse();
  article_list.value = article_list_all.value;
  loading.value = false;
});
</script>

<style scoped lang="less">
.ArticleCollection-wrap {
  position: relative;
  width: 1310px;
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
  .title {
    font-family: SourceHanSansCN-Regular;
    font-size: 24px;
    font-weight: normal;
    color: #3d3d3d;
  }
}
</style>
@/api/comment @/api/article
