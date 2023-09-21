<template>
  <div class="index">
    <FilterBar
      :message-list="messageList"
      :article-list-all="article_list_all"
      @sendArticleList="getArticleList"
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
      <div v-if="article_list.length !== 0">
        <ul
          v-loading="articleListLoading"
          v-infinite-scroll="load"
          v-if="articleListShow"
          class="HomeArticleList-warp"
        >
          <li
            v-for="index in articleNum > article_list.length
              ? article_list.length
              : articleNum"
          >
            <ArticleHomeItem
              style="margin-top: 20px"
              :article-list="article_list[index - 1]"
            />
          </li>
        </ul>
      </div>
      <div v-if="article_list.length === 0">
        <el-empty
          style="width: 1003px"
          description="暂未搜索到该分类的文章哦......"
        ></el-empty>
      </div>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue";
import { ArticleInfo } from "@/types";
import useShuffle from "@/utils/useShuffle";
import { getArticleListAPI } from "@/api/articles";
import FilterBar from "@/components/FilterBar.vue";
import HomeNewsList from "@/components/ModelHome/HomeNewsList.vue";
import HomeTrend from "@/components/ModelHome/HomeTrend.vue";
import ArticleHomeItem from "@/components/little/article_home_item.vue";

type KeyWordInfo = {
  keywords_name: string;
  keywords_count: number;
};

let messageList = ref<string[]>([]);
let article_list = ref<ArticleInfo[]>([]);
let article_recommond = ref<ArticleInfo[]>([]);
let article_list_all = ref<ArticleInfo[]>([]);
let articleListShow = ref<boolean>(true);
let articleListLoading = ref<boolean>(true);
let articleNum = ref<number>(5);

const getArticleList = async (arr: ArticleInfo[]) => {
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
  const res = await getArticleListAPI();
  if (res.data) {
    const articleList = res.data.result.articleList;
    article_list_all.value = articleList;
    messageList.value = articleList.map(
      (item: ArticleInfo) =>
        `${item.article_introduce}/${item.article_title}/${item.article_major}/${item.article_labels}/${item.author_name}`
    );
    article_list_all.value.reverse();
    messageList.value.reverse();

    const keywordsList = JSON.parse(
      localStorage.getItem("keywords_list") as string
    );
    if (keywordsList.length >= 2) {
      const [max1, max2] = keywordsList
        .sort(
          (a: KeyWordInfo, b: KeyWordInfo) =>
            b.keywords_count - a.keywords_count
        )
        .map((item: KeyWordInfo) => item.keywords_name);

      messageList.value.forEach((item, index) => {
        if (item.toLowerCase().includes(max1.toLowerCase())) {
          article_recommond.value.push(article_list_all.value[index]);
        }
      });
      article_recommond.value = useShuffle(article_recommond.value);
      messageList.value.forEach((item, index) => {
        if (!item.toLowerCase().includes(max1.toLowerCase())) {
          if (item.toLowerCase().includes(max2.toLowerCase())) {
            article_recommond.value.push(article_list_all.value[index]);
          }
        }
      });
      article_recommond.value = useShuffle(article_recommond.value);
      messageList.value.forEach((item, index) => {
        if (!item.toLowerCase().includes(max1.toLowerCase())) {
          if (!item.toLowerCase().includes(max2.toLowerCase())) {
            article_recommond.value.push(article_list_all.value[index]);
          }
        }
      });
      article_list.value = article_recommond.value;
    } else if (keywordsList.length === 1) {
      const max1 = keywordsList[0].keywords_name;
      messageList.value.forEach((item, index) => {
        if (item.toLowerCase().includes(max1.toLowerCase())) {
          article_recommond.value.push(article_list_all.value[index]);
        }
      });
      article_recommond.value = useShuffle(article_recommond.value);
      messageList.value.forEach((item, index) => {
        if (!item.toLowerCase().includes(max1.toLowerCase())) {
          article_recommond.value.push(article_list_all.value[index]);
        }
      });
      article_list.value = article_recommond.value;
    } else {
      article_list.value = article_list_all.value;
    }
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
}
</style>
@/api/article
