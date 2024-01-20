<template>
  <div class="littlearticleitem-wrap">
    <el-row>
      <div>
        <a
          class="title"
          style="margin: 0 0 5px"
          :href="articleURL"
          target="_blank"
          :title="article_title"
        >
          <span>{{ article_title }}</span>
        </a>
      </div>
    </el-row>
    <el-row type="flex" style="flex-wrap: nowrap">
      <div
        class="article-labels"
        v-for="(_, index) in article_labels.slice(0, 3)"
        :key="index"
      >
        <span>{{ article_labels[index] }}</span>
      </div>
    </el-row>
    <el-row>
      <a :href="articleURL" target="_blank" :title="article_introduce">
        <p class="article-introduce">{{ article_introduce }}</p>
      </a>
    </el-row>
    <el-row type="flex" justify="space-between">
      <a :href="userURL">
        <span class="author-name">{{ author_name }}</span>
      </a>
      <div>
        <span class="article-uploaddate">{{ article_uploaddate }}</span>
      </div>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { toRefs, computed } from 'vue'
import type { ArticleSimple } from '@/api/article/types'
import { formatDate } from '@/utils'

const props = defineProps<{
  similarItem: ArticleSimple
}>()

const {
  article_id,
  article_title,
  article_labels,
  article_introduce,
  author_id,
  author_name
} = toRefs(props.similarItem)

const article_uploaddate = computed(() => {
  return formatDate(props.similarItem.article_uploaddate)
})
const articleURL = computed(() => {
  return window.location.origin + '/articleHome/' + article_id.value
})
const userURL = computed(() => {
  return window.location.origin + '/personalCenter/' + author_id.value
})
</script>

<style scoped lang="less">
.littlearticleitem-wrap {
  padding: 10px;
  margin: 10px 0;
  width: 230px;
  border: 0.5px solid #00ead8;
  border-radius: 20px;

  .title {
    display: -webkit-box;
    overflow: hidden;
    font-size: 16px;
    font-family: SourceHanSansCN-Medium, sans-serif;
    text-overflow: ellipsis;
    color: #3d3d3d;
    cursor: pointer;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .article-introduce {
    display: -webkit-box;
    overflow: hidden;
    font-size: 12px;
    font-family: SourceHanSansCN-Regular, sans-serif;
    text-overflow: ellipsis;
    color: #3d3d3d;
    transition: all 0.2s;
    cursor: pointer;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;

    &:hover {
      color: #00ead8;
    }
  }

  .article-labels {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    padding: 0 10px;
    margin: 5px 5px 0;
    width: max-content;
    height: 20px;
    font-size: 12px;
    font-family: SourceHanSansCN-Regular, sans-serif;
    color: #3d3d3d;
    background: #d9fe32;
    border-radius: 10px;
    flex-flow: row wrap;
  }

  .author-name {
    font-size: 12px;
    font-family: SourceHanSansCN-Regular, sans-serif;
    color: #3d3d3d;
    transition: all 0.2s;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      color: #00ead8;
    }
  }

  .article-uploaddate {
    font-size: 12px;
    font-family: SourceHanSansCN-Regular, sans-serif;
    color: #aeaeae;
  }
}
</style>
