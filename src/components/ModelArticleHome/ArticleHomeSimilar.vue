<template>
  <div
    class="ArticleHomeSimilar-wrap"
    :style="{
      maxHeight: presentHeight,
    }"
    ref="ArticleHomeSimilar"
  >
    <el-row>
      <span class="title">相似推荐</span>
    </el-row>
    <el-row v-if="similar_article_list.length != 0">
      <div
        style="position: relative; transition: all 0.5s"
        :style="{ top: listTopHeight }"
      >
        <div class="note">
          <span>再次点击可以展开哦！</span>
        </div>
        <SimilarArticleItem
          v-for="(_, index) in similar_article_list"
          :similar-item="similar_article_list[index]"
          :key="index"
        />
      </div>
      <el-row type="flex" justify="center" style="width: 100%">
        <div
          style="position: relative; cursor: pointer; transition: all 0.5s"
          :style="{ transform: rorate, top: topHeight }"
          @click="foldList()"
        >
          <img src="@/statics/svg/FoldList.svg" />
        </div>
      </el-row>
    </el-row>
    <el-row
      v-if="similar_article_list.length == 0"
      type="flex"
      justify="center"
      v-loading="loadingStatus"
      element-loading-text="少女祈祷中..."
    >
      <no-list :width="220" :height="100" content="暂无推荐文章"></no-list>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { ArticleInfo } from "@/types";
import useShuffle from "@/utils/useShuffle";
import { useRoute } from "vue-router";
import { getArticleList } from "@/api/article";
import SimilarArticleItem from "@/components/little/SimilarArticleItem.vue";

const ArticleHomeSimilar = ref<HTMLDivElement>();

const route = useRoute();

const totalHeight = ref<number>(0);
const loadingStatus = ref<boolean>(true);
const article_list = ref<ArticleInfo[]>([]);
const similar_article_list = ref<ArticleInfo[]>([]);
const keyword = ref<string>("");
const presentHeight = ref<string>("520px");
const rorate = ref<string>("rotate(180deg)");
const topHeight = ref<string>("0px");
const listTopHeight = ref<string>("0px");

// 折叠展示栏
const foldList = () => {
  if (presentHeight.value !== "100px") {
    presentHeight.value = "100px";
    rorate.value = "rotate(0)";
    topHeight.value = 125 - totalHeight.value + "px";
    listTopHeight.value = "1023px";
  } else {
    presentHeight.value = "1023px";
    rorate.value = "rotate(180deg)";
    topHeight.value = "0px";
    listTopHeight.value = "0px";
  }
};

onMounted(async () => {
  let res = await getArticleList();
  res.data.result.forEach((item: ArticleInfo) => {
    article_list.value.push(item);
    if (item.article_id === Number(route.params.id)) {
      keyword.value = item.article_labels[0];
    }
  });
  // 筛选类似文章：
  article_list.value.forEach((item: ArticleInfo, index: number) => {
    if (item.article_labels) {
      if (item.article_id !== Number(route.params.id)) {
        if (item.article_labels.indexOf(keyword.value) != -1) {
          similar_article_list.value.push();
          article_list.value.splice(index, 1);
        }
      }
    }
  });
  if (similar_article_list.value.length > 0) {
    similar_article_list.value = similar_article_list.value.slice(0, 3);
    while (similar_article_list.value.length < 3) {
      similar_article_list.value.push(useShuffle(article_list.value).shift());
    }
  }
  loadingStatus.value = false;
  await nextTick();
  totalHeight.value = ArticleHomeSimilar.value?.offsetHeight as number;
});
</script>

<style scoped lang="less">
.ArticleHomeSimilar-wrap {
  padding: 10px;
  width: 250px;
  border-radius: 20px;
  background: #ffffff;
  transition: 0.5s all;
  overflow: hidden;
  .title {
    height: 35px;
    font-family: SourceHanSansCN-Bold;
    font-size: 24px;
    font-weight: bold;
    color: #3d3d3d;
  }

  .note {
    position: absolute;
    width: 100%;
    bottom: 1420px;
    font-family: SourceHanSansCN-Regular;
    font-size: 18px;
    font-weight: normal;
    color: #3d3d3d;
    display: flex;
    justify-content: center;
  }
}
</style>
@/api/article
