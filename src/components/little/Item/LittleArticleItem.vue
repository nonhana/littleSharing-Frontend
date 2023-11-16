<template>
  <div name="similarArticleItem" class="similarArticleItem-wrap">
    <el-row>
      <div>
        <div class="title" @click="push(1)" style="margin: 0 0 5px 0">
          <span>{{ article_title }}</span>
        </div>
      </div>
    </el-row>
    <el-row type="flex" style="flex-wrap: nowrap">
      <div
        class="article_labels"
        v-for="(_, index) in article_labels.slice(0, 3)"
        :key="index"
      >
        <span>{{ article_labels[index] }}</span>
      </div>
    </el-row>
    <el-row>
      <div @click="push(1)">
        <p class="article_introduce">{{ article_introduce }}</p>
      </div>
    </el-row>
    <el-row type="flex" justify="space-between">
      <el-tooltip
        class="item"
        effect="light"
        content="点击前往个人主页"
        placement="right"
      >
        <div @click="push(2)">
          <span class="author_name">{{ author_name }}</span>
        </div>
      </el-tooltip>
      <div>
        <span class="article_uploaddate">{{ article_uploaddate }}</span>
      </div>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { formatDate } from "@/utils";

const props = defineProps<{
  similarItem: any;
}>();

const router = useRouter();

const id = ref<number>(props.similarItem.article_id);
const article_title = ref<string>(props.similarItem.article_title);
const article_labels = ref<string[]>(props.similarItem.article_labels);
const article_introduce = ref<string>(props.similarItem.article_introduce);
const author_id = ref<number>(props.similarItem.author_id);
const author_name = ref<string>(props.similarItem.author_name);

const article_uploaddate = computed(() => {
  return formatDate(props.similarItem.article_uploaddate);
});

const push = (num: number) => {
  if (num == 1) {
    const routeUrl = router.resolve({
      path: "/articleHome/" + id.value,
    });
    window.open(routeUrl.href, "_blank");
  }
  if (num == 2) {
    router.push({
      path: "/personalCenter/" + author_id,
    });
  }
};
</script>

<style scoped lang="less">
.similarArticleItem-wrap {
  border: 0.5px solid #00ead8;
  border-radius: 20px;
  margin: 10px 0;
  padding: 10px;
  width: 230px;
  .title {
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

  .article_introduce {
    font-family: SourceHanSansCN-Regular;
    font-size: 12px;
    font-weight: normal;
    color: #3d3d3d;
    cursor: pointer;
    transition: all 0.2s;
    /* 以下是显示固定行数的文字的css，多余文字用省略号表示 */
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    word-break: break-all;
  }

  .article_introduce:hover {
    color: #00ead8;
  }

  .article_labels {
    width: max-content;
    overflow: hidden;
    margin: 5px 5px 0;
    padding: 0 10px;
    height: 20px;
    border-radius: 10px;
    background: #d9fe32;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: row wrap;
    span {
      font-family: SourceHanSansCN-Regular;
      font-size: 12px;
      font-weight: normal;
      color: #3d3d3d;
    }
  }

  .author_name {
    font-family: SourceHanSansCN-Regular;
    font-size: 12px;
    font-weight: bold;
    color: #3d3d3d;
    cursor: pointer;
    transition: all 0.2s;
  }

  .author_name:hover {
    color: #00ead8;
  }

  .article_uploaddate {
    font-family: SourceHanSansCN-Regular;
    font-size: 12px;
    font-weight: normal;
    color: #aeaeae;
  }
}
</style>
