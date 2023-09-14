<template>
  <div class="ArticlePost-wrap">
    <FilterBar
      :message-list="messageList"
      :article-list-all="article_list_all"
      @sendArticleList="getArticleList"
    />
    <el-row style="margin-top: 30px">
      <el-row>
        <div style="margin-left: 20px">
          <span class="title">我发布的文章({{ post_article_num }})</span>
        </div>
      </el-row>
      <el-row
        v-if="articleListShow === 0"
        type="flex"
        justify="center"
        style="flex-wrap: wrap"
      >
        <ArticlePersonalcenterItem
          v-for="(item, index) in article_list"
          :key="index"
          :articleList="item"
          @getArticleList="getArticleListChild"
        />
        <div
          style="width: 502px; margin: 0 60px 30px 0; padding: 9px 14px"
          v-for="item in new Array(2 - (((article_list.length - 1) % 2) + 1))"
          :key="item"
        ></div>
      </el-row>

      <el-row
        v-if="article_list.length === 0"
        type="flex"
        justify="center"
        style="width: 100%"
      >
        <el-empty
          description="该分类下ta还暂未发布过文章哦~去别处看看吧！"
        ></el-empty>
      </el-row>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import { getUserArticleList } from "@/api/articles";
import FilterBar from "@/components/FilterBar.vue";
import ArticlePersonalcenterItem from "@/components/little/article_personalcenter_item.vue";

const route = useRoute();

const messageList = ref<any[]>([]);
const article_list = ref<any[]>([]);
const article_list_all = ref<any[]>([]);
const articleListShow = ref<number>(0);

const post_article_num = computed(() => article_list_all.value.length);

const getArticleList = async (arr: any[]) => {
  articleListShow.value = 1;
  article_list.value = arr;
  await nextTick();
  articleListShow.value = 0;
};
const getArticleListChild = async (val: any) => {
  if (val) {
    article_list_all.value.splice(0);
    const res = await getUserArticleList({
      user_id: Number(route.params.id),
    });
    res.data.result.user_article_list.forEach((item: any) => {
      article_list_all.value.push(item);
    });
    article_list_all.value.reverse();
    article_list.value = article_list_all.value;
  }
};

onMounted(async () => {
  const res = await getUserArticleList({
    user_id: Number(route.params.id),
  });
  res.data.result.user_article_list.forEach((item: any) => {
    article_list_all.value.push(item);
  });
  messageList.value = res.data.result.user_article_list.map(
    (item: any) =>
      `${item.article_introduce}/${item.article_title}/${item.article_major}/${item.article_labels}/${item.author_name}`
  );
  article_list_all.value.reverse();
  messageList.value.reverse();
  article_list.value = article_list_all.value;
});
</script>

<style scoped lang="less">
.ArticlePost-wrap {
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
