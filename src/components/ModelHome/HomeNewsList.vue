<template>
  <div class="HomeNewsList-wrap">
    <el-row>
      <span class="title">最新发布</span>
    </el-row>
    <el-row style="min-height: 100px" v-loading="loadingStatus">
      <el-col :span="0.5">
        <NewHomeItem
          v-for="(_, index) in news_list"
          :newsItem="news_list[index]"
          :key="index"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ArticleInfo } from "@/utils/types";
import { getArticleList } from "@/api/article";
import NewHomeItem from "@/components/Little/Item/NewHomeItem.vue";

const loadingStatus = ref<boolean>(false);
const news_all_list = ref<ArticleInfo[]>([]);
const news_list = ref<ArticleInfo[]>([]);

onMounted(async () => {
  loadingStatus.value = true;
  const res = await getArticleList();
  if (res.data.result_code === 0) {
    res.data.result.forEach((item: ArticleInfo) => {
      news_all_list.value.push(item);
    });
    //确保返回的文章按发布先后顺序进行排序
    news_all_list.value.sort((a, b) => {
      return a.article_id - b.article_id;
    });
    news_list.value = news_all_list.value.reverse().slice(0, 5);
  }
  loadingStatus.value = false;
});
</script>

<style scoped lang="less">
.HomeNewsList-wrap {
  margin-top: 20px;
  padding: 10px;
  width: 300px;
  border-radius: 20px;
  background: #ffffff;

  .title {
    height: 35px;
    font-family: SourceHanSansCN-Bold;
    font-size: 24px;
    font-weight: bold;
    color: #3d3d3d;
  }
}
</style>
