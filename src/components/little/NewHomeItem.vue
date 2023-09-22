<template>
  <div class="NewHomeItem-wrap">
    <el-row type="flex" justify="space-between">
      <el-col :span="0.5">
        <el-tooltip
          class="item"
          effect="light"
          content="点击前往个人主页"
          placement="left"
        >
          <div class="author_head" @click="push(2)">
            <img :src="author_head" alt="" />
          </div>
        </el-tooltip>
      </el-col>
      <el-col :span="0.5" style="width: 235px">
        <el-row>
          <div
            class="article_title"
            @click="push(1)"
            style="margin: -3px 0 0 0"
          >
            <span>{{ article_title }}</span>
          </div>
        </el-row>
        <el-row>
          <div
            class="article_introduce"
            @click="push(1)"
            style="margin: 3px 0 0 0"
          >
            <span>{{ article_introduce }}</span>
          </div>
        </el-row>
      </el-col>
    </el-row>
    <el-row type="flex">
      <el-col :span="0.5">
        <el-row style="margin-top: 5px" type="flex">
          <span class="author_name">{{ author_name }}</span>
          <div class="author_university" style="margin-left: 10px">
            <span>{{ author_university }}</span>
          </div>
        </el-row>
        <el-row
          style="margin-top: 5px; flex-flow: row wrap"
          type="flex"
          class="article_labels"
        >
          <span>标签：</span>
          <div v-for="(_, index) in article_labels" :key="index">
            <span class="label_font">{{ article_labels[index] }}</span>
          </div>
          <span v-if="article_labels.length == 0">暂无相关标签</span>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ArticleInfo } from "@/types";

const router = useRouter();

const props = defineProps<{
  newsItem: ArticleInfo;
}>();

const {
  article_id: id,
  author_id,
  author_name,
  author_headphoto: author_head,
  author_university,
  article_title,
  article_labels,
  article_introduce,
} = props.newsItem;

const push = (num: number) => {
  switch (num) {
    case 1:
      const routeUrl = router.resolve({
        path: "/articleHome/" + id,
      });
      window.open(routeUrl.href, "_blank");
      break;
    case 2:
      router.push({
        path: "/personalCenter/" + author_id,
      });
      break;
  }
};
</script>

<style scoped lang="less">
.NewHomeItem-wrap {
  border: 0.5px solid #00ead8;
  border-radius: 20px;
  margin: 10px 0;
  padding: 10px;
  position: relative;
  width: 280px;
  .author_head {
    width: 36px;
    height: 36px;
    background-color: #76fff5;
    border-radius: 18px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    img {
      width: 36px;
    }
  }

  .article_title span {
    font-family: SourceHanSansCN-Medium;
    font-size: 16px;
    font-weight: 500;
    color: #3d3d3d;
    cursor: pointer;
    /* 以下是显示固定行数的文字的css，多余文字用省略号表示 */
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    word-break: break-all;
  }

  .article_title:hover span {
    color: #00ead8;
  }

  .article_introduce {
    font-family: SourceHanSansCN-Medium;
    font-size: 10px;
    font-weight: normal;
    color: #9e9e9e;
    /* 以下是显示固定行数的文字的css，多余文字用省略号表示 */
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    word-break: break-all;
    cursor: pointer;
  }

  .author_name {
    height: 17px;
    font-family: SourceHanSansCN-Regular;
    font-size: 12px;
    font-weight: normal;
    color: #3d3d3d;
  }

  .article_labels > div {
    width: max-content;
    margin: 0 5px;
    padding: 0 10px;
    height: 20px;
    border-radius: 10px;
    background: #d9fe32;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .article_labels > span {
    font-family: SourceHanSansCN-Regular;
    font-size: 12px;
    font-weight: normal;
    color: #3d3d3d;
  }

  .author_university {
    width: max-content;
    padding: 0 10px;
    height: 20px;
    border-radius: 10px;
    background: #bb76ff;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-family: SourceHanSansCN-Regular;
      font-size: 10px;
      font-weight: normal;
      color: #ffffff;
    }
  }

  .label_font {
    font-family: SourceHanSansCN-Regular;
    font-size: 10px;
    font-weight: normal;
    color: #3d3d3d;
  }
}
</style>
