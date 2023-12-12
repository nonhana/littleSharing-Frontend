<template>
  <div class="index">
    <FilterBar
      :article-list-all="article_list_all"
      @sendArticleList="sendArticleList"
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
      <div class="loading-mask" v-loading="loading">
        <div v-if="article_list.length !== 0">
          <ul
            v-infinite-scroll="load"
            v-if="articleListShow"
            class="homearticlelist-warp"
          >
            <li
              v-for="index in articleNum > article_list.length
                ? article_list.length
                : articleNum"
              :key="index"
            >
              <ArticleHomeItem :article-list="article_list[index - 1]" />
            </li>
          </ul>
        </div>
        <div v-if="article_list.length === 0">
          <el-empty
            style="width: 1003px"
            description="暂未搜索到该分类的文章哦......"
          ></el-empty>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import type { Article } from '@/api/article/types'
import { getArticleList } from '@/api/article'
import FilterBar from '@/components/Little/Tool/FilterBar.vue'
import HomeNewsList from '@/components/ModelHome/HomeNewsList.vue'
import HomeTrend from '@/components/ModelHome/HomeTrend.vue'
import ArticleHomeItem from '@/components/Little/Item/ArticleHomeItem.vue'
import { ElMessage } from 'element-plus'

const article_list = ref<Article[]>([])
const article_list_all = ref<Article[]>([])
const articleListShow = ref<boolean>(true)
const loading = ref<boolean>(false) // 初次加载时的loading
const articleNum = ref<number>(5)
const page = ref<number>(1) // 当前页数
const isEnd = ref<boolean>(false) // 是否到底了

const sendArticleList = async (arr: Article[]) => {
  loading.value = true
  articleListShow.value = false
  article_list.value = arr
  await nextTick()
  loading.value = false
  articleListShow.value = true
}
const load = async () => {
  if (isEnd.value) return
  loading.value = true
  page.value += 1
  const res = await getArticleList({ page: page.value })
  if (res.result_code === 0) {
    if (res.result.length === 0) {
      ElMessage.info('没有更多文章了哦~')
      loading.value = false
      isEnd.value = true
      return
    }
    article_list.value = article_list.value.concat(res.result)
    articleNum.value = article_list.value.length
  }
  await nextTick()
  loading.value = false
}

onMounted(async () => {
  loading.value = true
  const res = await getArticleList({})
  if (res.result_code === 0) {
    article_list_all.value = res.result
    article_list.value = article_list_all.value
  }
  await nextTick()
  loading.value = false
})
</script>

<style scoped lang="less">
.index {
  width: 100%;

  .homearticlelist-warp {
    padding: 0;
    margin: 0;
    width: 100%;
    list-style: none;
  }

  .loading-mask {
    position: relative;
    overflow: hidden;
    margin-top: 20px;
    border-radius: 20px;
  }
}
</style>
