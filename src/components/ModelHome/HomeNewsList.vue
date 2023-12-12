<template>
  <div class="homenewslist-wrap">
    <el-row>
      <span class="title">最新发布</span>
    </el-row>
    <el-row style="min-height: 100px" v-loading="loading">
      <div>
        <NewHomeItem
          v-for="(_, index) in news_list"
          :newsItem="news_list[index]"
          :key="index"
        />
      </div>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getArticleList } from '@/api/article'
import type { Article } from '@/api/article/types'
import NewHomeItem from '@/components/Little/Item/NewHomeItem.vue'

const loading = ref<boolean>(false)
const news_all_list = ref<Article[]>([])
const news_list = ref<Article[]>([])

onMounted(async () => {
  loading.value = true
  const res = await getArticleList({})
  if (res.result_code === 0) {
    res.result.forEach((item) => {
      news_all_list.value.push(item)
    })
    //确保返回的文章按发布先后顺序进行排序
    news_all_list.value.sort((a, b) => {
      return a.article_id - b.article_id
    })
    news_list.value = news_all_list.value.reverse()
  }
  loading.value = false
})
</script>

<style scoped lang="less">
.homenewslist-wrap {
  padding: 10px;
  margin-top: 20px;
  width: 300px;
  background: #fff;
  border-radius: 20px;

  .title {
    height: 35px;
    font-size: 24px;
    font-family: SourceHanSansCN-Bold, sans-serif;
    color: #3d3d3d;
    font-weight: bold;
  }
}
</style>
@/api/article/article
