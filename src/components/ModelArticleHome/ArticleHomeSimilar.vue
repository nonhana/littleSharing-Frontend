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
        <LittleArticleItem
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
import { useRoute } from "vue-router";
import { getSimilarArticles, getArticleMain } from "@/api/article";
import LittleArticleItem from "@/components/Little/Item/LittleArticleItem.vue";

const ArticleHomeSimilar = ref<HTMLDivElement>();

const route = useRoute();

const totalHeight = ref<number>(0);
const loadingStatus = ref<boolean>(false);
const similar_article_list = ref<ArticleInfo[]>([]);
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
  loadingStatus.value = true;
  // 获取到当前文章的标签列表，并处理成以逗号分隔的字符串
  const { article_labels } = (
    await getArticleMain({
      article_id: Number(route.params.id),
    })
  ).data.result;
  const articleLabels = article_labels.join(",");

  // 获取到相似文章列表
  const similarArticleList = (
    await getSimilarArticles({
      labels: articleLabels,
      article_id: Number(route.params.id),
    })
  ).data.result;
  similar_article_list.value = similarArticleList;

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
