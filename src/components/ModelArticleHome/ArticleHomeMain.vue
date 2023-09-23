<template>
  <div class="ArticleHomeMain-wrap">
    <el-row type="flex" style="flex-flow: row wrap">
      <div class="title">
        <span>{{ article_title }}</span>
      </div>
      <div
        v-if="article_status == '1'"
        class="copied"
        style="margin: 3px 0 5px 10px"
      >
        <span>转载文章</span>
      </div>
      <div
        v-if="article_status == '2'"
        class="original"
        style="margin: 3px 0 5px 10px"
      >
        <span>原创文章</span>
      </div>
    </el-row>

    <el-divider><span style="color: #9e9e9e">文章标签</span></el-divider>

    <el-row type="flex">
      <div
        class="article_labels"
        style="margin: 5px 10px 0"
        v-for="(_, index) in article_labels"
        :key="index"
      >
        <span>{{ article_labels[index] }}</span>
      </div>
    </el-row>

    <el-divider v-if="article_link"
      ><span style="color: #9e9e9e">原文链接</span></el-divider
    >

    <el-row v-if="article_link">
      <div class="link">
        <a :href="article_link" target="_blank">{{ article_link }}</a>
      </div>
    </el-row>
    <el-divider><span style="color: #9e9e9e">正文</span></el-divider>
    <el-row>
      <el-image
        style="display: none"
        ref="previewImg"
        :src="activeImg"
        :preview-src-list="[activeImg]"
      ></el-image>
      <div class="markdown-body">
        <VueMarkdownIt
          style="width: 710px"
          :source="article_md"
          :plugins="plugins"
        ></VueMarkdownIt>
      </div>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from "vue";
import router from "@/router";
import { getArticleMain, postArticleTrend } from "@/api/article";
import VueMarkdownIt from "vue3-markdown-it";
import MarkdownItEmoji from "markdown-it-emoji";
import MarkdownItDeflist from "markdown-it-deflist";
import MarkdownItSub from "markdown-it-sub";
import MarkdownItSup from "markdown-it-sup";
import MarkdownItAbbr from "markdown-it-abbr";

let article_status = ref<string>("1"); // 默认为转载文章
let article_link = ref<string>("");
let article_labels = ref<string[]>([]);
let article_title = ref<string>("");
let article_md = ref<string>("");
let activeImg = ref<string>("");
let plugins = reactive([
  {
    plugin: MarkdownItAbbr,
  },
  {
    plugin: MarkdownItSub,
  },
  {
    plugin: MarkdownItSup,
  },
  {
    plugin: MarkdownItDeflist,
  },
  {
    plugin: MarkdownItEmoji,
  },
]);

onMounted(async () => {
  const res = await getArticleMain({
    article_id: Number(router.currentRoute.value.params.id),
  });
  const article_main = res.data.result;
  article_status.value = article_main.article_status;
  article_link.value = article_main.article_link || "";
  article_labels.value.push(...article_main.article_labels);
  article_title.value = article_main.article_title;
  article_md.value = article_main.article_md;

  await nextTick();
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const monthStr = month > 9 ? month : "0" + month;
  const dayStr = day < 10 ? "0" + day : day;
  const today = year + "-" + monthStr + "-" + dayStr;

  const trend_params = {
    present_date: today,
    label_list: article_labels.value,
  };

  await postArticleTrend(trend_params);
});
</script>

<style scoped lang="less">
.ArticleHomeMain-wrap {
  padding: 20px;
  margin-bottom: 25px;
  position: relative;
  width: 710px;
  border-radius: 20px;
  background: #ffffff;
  .title {
    word-break: break-all;
    font-family: SourceHanSansCN-Bold;
    font-size: 30px;
    font-weight: bold;
    color: #3d3d3d;
  }
  .copied {
    width: 80px;
    padding: 0 10px;
    height: 36px;
    border-radius: 18px;
    background: #ff6c6c;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-family: SourceHanSansCN-Regular;
      font-size: 16px;
      font-weight: normal;
      color: #ffffff;
    }
  }
  .original {
    width: 80px;
    padding: 0 10px;
    height: 36px;
    border-radius: 18px;
    background: #ff8200;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-family: SourceHanSansCN-Regular;
      font-size: 16px;
      font-weight: normal;
      color: #ffffff;
    }
  }
  .article_labels {
    width: max-content;
    padding: 0 15px;
    height: 36px;
    border-radius: 18px;
    background: #4aff98;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-family: SourceHanSansCN-Regular;
      font-size: 16px;
      font-weight: normal;
      color: #3d3d3d;
    }
  }
  .markdown-body :deep(img) {
    width: 100%;
    cursor: pointer;
  }
  .link {
    width: 680px;
    margin-top: 20px;
    padding: 9px 14px;
    background-color: #eeeeee;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      word-break: break-all;
      font-family: SourceHanSansCN-Regular;
      font-size: 14px;
      font-weight: normal;
      line-height: 20px;
      letter-spacing: 0em;
      color: #0098b3;
    }
  }
}
</style>
@/api/article
