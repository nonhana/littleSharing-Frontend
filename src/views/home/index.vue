<template>
  <div class="index">
    <el-row style="margin: 0 auto; width: 1350px">
      <FilterBar
        :article-list-all="article_list_all"
        @sendArticleList="sendArticleList"
      />
    </el-row>
    <el-row
      style="margin: 30px auto 0; width: 1350px"
      type="flex"
      justify="center"
    >
      <div style="margin-right: 30px">
        <el-row>
          <HomeTrend />
        </el-row>
        <el-row style="margin-top: 30px">
          <HomeNewsList />
        </el-row>
      </div>
      <div class="loading-mask" v-loading="loading">
        <div v-if="article_list.length !== 0">
          <ul v-if="articleListShow" class="homearticlelist-warp">
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
            style="width: 998px"
            description="暂未搜索到该分类的文章哦......"
          ></el-empty>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import type { Article } from '@/api/article/types'
import { getArticleList } from '@/api/article'
import FilterBar from '@/components/Little/Tool/FilterBar.vue'
import HomeNewsList from '@/components/ModelHome/HomeNewsList.vue'
import HomeTrend from '@/components/ModelHome/HomeTrend.vue'
import ArticleHomeItem from '@/components/Little/Item/ArticleHomeItem.vue'
import { ElMessage } from 'element-plus'
import { useHead } from '@unhead/vue'

useHead({
  title: 'littleSharing-兴趣使然的博客小站',
  meta: [
    {
      name: 'description',
      content: '一个以Markdown为主要沟通形式的知识分享社区。'
    },
    {
      name: 'keywords',
      content:
        'littleSharing,博客,小站,前端,后端,全栈,技术分享,技术博客,个人博客,个人网站,个人主页,前端博客,后端博客,全栈博客,前端技术分享,后端技术分享,全栈技术分享,前端技术博客,后端技术博客,全栈技术博客,前端个人博客,后端个人博客,全栈个人博客,前端个人网站,后端个人网站,全栈个人网站,前端个人主页,后端个人主页,全栈个人主页'
    },
    {
      name: 'author',
      content: 'nonhana'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0'
    },
    {
      name: 'charset',
      content: 'utf-8'
    }
  ]
})

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

  // 检测是否到底，距离底部为10px时加载
  const nearBottom =
    document.documentElement.scrollTop + // 滚动条距离顶部的距离，表示你已经滚动多少px了
      document.documentElement.clientHeight >= // 当前窗口的高度，也就是你浏览器的高度
    document.documentElement.scrollHeight - 10 // 整个网页的高度，这个高度是会变的，因为网页是可以拖长的

  if (nearBottom && !loading.value) {
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
}

onMounted(async () => {
  window.addEventListener('scroll', load)
  loading.value = true
  const res = await getArticleList({})
  if (res.result_code === 0) {
    article_list_all.value = res.result
    article_list.value = article_list_all.value
  }
  await nextTick()
  loading.value = false
})

onUnmounted(() => {
  window.removeEventListener('scroll', load)
})
</script>

<style scoped lang="less">
.index {
  width: 100%;

  .homearticlelist-warp {
    overflow: auto;
    padding: 0;
    margin: 0;
    width: 100%;
  }

  .loading-mask {
    position: relative;
    overflow: hidden;
    border-radius: 20px;
  }
}
</style>
