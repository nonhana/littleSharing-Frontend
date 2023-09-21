<template>
  <div class="ArticleCollection-wrap">
    <FilterBar
      :message-list="messageList"
      :article-list-all="article_list_all"
      @sendArticleList="getArticleList"
    />
    <el-row style="margin-top: 30px">
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
import router from "@/router";
import { getUserCollectList } from "@/api/other";
import { getArticleMainAPI } from "@/api/articles";
import FilterBar from "@/components/FilterBar.vue";
import ArticlePersonalcenterItem from "@/components/little/article_personalcenter_item.vue";

let messageList = ref<any[]>([]);
let article_list = ref<any>([]);
let article_list_all = ref<any[]>([]);
let articleListShow = ref<number>(0);

const collect_article_num = computed(() => article_list_all.value.length);

const getArticleList = async (arr: any[]) => {
  articleListShow.value = 1;
  article_list.value = arr;
  await nextTick();
  articleListShow.value = 0;
};

onMounted(async () => {
  const UserCollectListRes = await getUserCollectList({
    user_id: Number(router.currentRoute.value.params.id),
  });
  if (UserCollectListRes.data.collect_list) {
    UserCollectListRes.data.collect_list.forEach(async (item: any) => {
      const res = await getArticleMainAPI({
        article_id: item,
      });
      if (res.data.result.article_main) {
        article_list_all.value.push(res.data.result.article_main);
        messageList.value.push(
          `${res.data.result.article_main.article_introduce}/${res.data.result.article_main.article_title}/${res.data.result.article_main.article_major}/${res.data.result.article_main.article_labels}/${res.data.result.article_main.author_name}`
        );
      }
    });
    article_list_all.value.reverse();
    messageList.value.reverse();
    article_list.value = article_list_all.value;
  }
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
