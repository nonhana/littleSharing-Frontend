<template>
  <div class="newhomeitem-wrap">
    <el-row type="flex" justify="space-between">
      <div>
        <el-tooltip
          class="item"
          effect="light"
          content="点击前往个人主页"
          placement="left"
        >
          <div class="author-head" @click="push(2)">
            <img :src="author_head" alt="author_head" />
          </div>
        </el-tooltip>
      </div>
      <div style="width: 235px">
        <el-row>
          <div class="article-title" @click="push(1)" style="margin: -3px 0 0">
            <span>{{ article_title }}</span>
          </div>
        </el-row>
        <el-row>
          <div
            class="article-introduce"
            @click="push(1)"
            style="margin: 3px 0 0"
          >
            <span>{{ article_introduce }}</span>
          </div>
        </el-row>
      </div>
    </el-row>
    <el-row type="flex">
      <div>
        <el-row style="margin-top: 5px" type="flex">
          <span class="author-name">{{ author_name }}</span>
          <div class="author-university" style="margin-left: 10px">
            <span>{{ author_university }}</span>
          </div>
        </el-row>
        <el-row
          style="margin-top: 5px; flex-flow: row wrap"
          type="flex"
          class="article-labels"
        >
          <span>标签：</span>
          <div v-for="(_, index) in article_labels" :key="index">
            <span class="label-font">{{ article_labels[index] }}</span>
          </div>
          <span v-if="article_labels.length === 0">暂无相关标签</span>
        </el-row>
      </div>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Article } from '@/api/article/types'

const router = useRouter()

const props = defineProps<{
  newsItem: Article
}>()

const {
  article_id: id,
  author_id,
  author_name,
  author_headphoto: author_head,
  author_university,
  article_title,
  article_labels,
  article_introduce
} = props.newsItem

const push = (num: number) => {
  switch (num) {
    case 1: {
      const routeUrl = router.resolve({
        path: `/articleHome/${id}`
      })
      window.open(routeUrl.href, '_blank')
      break
    }
    case 2: {
      router.push({
        path: '/personalCenter/' + author_id
      })
      break
    }
  }
}
</script>

<style scoped lang="less">
.newhomeitem-wrap {
  position: relative;
  padding: 10px;
  margin: 10px 0;
  width: 280px;
  border: 0.5px solid #00ead8;
  border-radius: 20px;

  .author-head {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 36px;
    height: 36px;
    background-color: #76fff5;
    border-radius: 50%;
    cursor: pointer;

    img {
      width: 36px;
    }
  }

  .article-title span {
    display: -webkit-box;
    overflow: hidden;
    font-size: 16px;
    font-family: SourceHanSansCN-Medium, sans-serif;
    text-overflow: ellipsis;
    color: #3d3d3d;
    cursor: pointer;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;

    &:hover {
      color: #00ead8;
    }
  }

  .article-introduce {
    display: -webkit-box;
    overflow: hidden;
    font-size: 12px;
    font-family: SourceHanSansCN-Medium, sans-serif;
    text-overflow: ellipsis;
    color: #9e9e9e;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    cursor: pointer;
  }

  .author-name {
    height: 17px;
    font-size: 12px;
    font-family: SourceHanSansCN-Regular, sans-serif;
    color: #3d3d3d;
  }

  .article-labels > div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    margin: 0 5px;
    width: max-content;
    height: 20px;
    font-size: 12px;
    font-family: SourceHanSansCN-Regular, sans-serif;
    color: #3d3d3d;
    background: #d9fe32;
    border-radius: 10px;
  }

  .author-university {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    width: max-content;
    height: 20px;
    font-size: 12px;
    font-family: SourceHanSansCN-Regular, sans-serif;
    color: #fff;
    background: #bb76ff;
    border-radius: 10px;
  }

  .label-font {
    font-size: 12px;
    font-family: SourceHanSansCN-Regular, sans-serif;
    color: #3d3d3d;
  }
}
</style>
