<template>
  <div class="index">
    <el-row type="flex" justify="center">
      <div class="sideBar" style="left: 175px">
        <el-row>
          <ArticleHomeSimilar />
        </el-row>
        <el-row style="margin: 30px 0 0 0">
          <ArticleHomeBookMark />
        </el-row>
        <el-row style="margin: 30px 0 0 0">
          <ArticleHomeData :article-data="article_data" />
        </el-row>
      </div>
      <div>
        <ArticleHomeMain />
        <Comment />
      </div>
      <div class="sideBar" style="right: 175px">
        <ArticleHomeAuthor />
      </div>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { increaseArticleViews } from "@/api/article";
import ArticleHomeMain from "@/components/ModelArticleHome/ArticleHomeMain.vue";
import ArticleHomeSimilar from "@/components/ModelArticleHome/ArticleHomeSimilar.vue";
import ArticleHomeAuthor from "@/components/ModelArticleHome/ArticleHomeAuthor.vue";
import ArticleHomeBookMark from "@/components/ModelArticleHome/ArticleHomeBookMark.vue";
import ArticleHomeData from "@/components/ModelArticleHome/ArticleHomeData.vue";
import Comment from "@/components/little/Comment/Comment.vue";

interface articleData {
  like_num: number;
  collection_num: number;
  share_num: number;
  comment_num: number;
}

const route = useRoute();

const article_data = ref<articleData>({
  like_num: 0,
  collection_num: 0,
  share_num: 0,
  comment_num: 0,
});

onMounted(async () => {
  const articleId = Number(route.params.id);
  await increaseArticleViews({
    article_id: articleId,
  });
});
</script>

<style scoped lang="less">
.index {
  width: 100%;
  .sideBar {
    position: fixed;
  }
  .actionbox {
    padding: 10px;
    width: 270px;
    border-radius: 20px;
    background: #ffffff;
  }

  .datafont {
    font-family: SourceHanSansCN-Regular;
    font-size: 16px;
    font-weight: normal;
    color: #3d3d3d;
    margin: 0 10px;
  }

  .title {
    height: 35px;
    font-family: SourceHanSansCN-Bold;
    font-size: 24px;
    font-weight: bold;
    color: #3d3d3d;
  }

  .bookmarknote {
    font-family: SourceHanSansCN-Bold;
    font-size: 14px;
    font-weight: normal;
    color: #9e9e9e;
  }

  .button {
    width: 80px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    span {
      font-family: SourceHanSansCN-Bold;
      font-size: 14px;
      font-weight: normal;
      color: #3d3d3d;
    }
  }
}
</style>
