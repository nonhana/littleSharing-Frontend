<template>
  <div class="articlepost-wrap">
    <FilterBar
      :article-list-all="article_list_all"
      @sendArticleList="getArticleList"
    />
    <el-row v-loading="loading" style="margin-top: 30px">
      <el-row>
        <div style="margin-left: 20px">
          <span class="title">发布文章({{ post_article_num }})</span>
        </div>
      </el-row>
      <el-row
        v-if="articleListShow === 0"
        type="flex"
        justify="center"
        style="width: 100%; flex-wrap: wrap"
      >
        <ArticlePersonalcenterItem
          v-for="(item, index) in article_list"
          :key="index"
          :articleList="item"
          @getArticleList="getArticleListChild"
        />
        <div
          style="padding: 9px 14px; margin: 0 60px 30px 0; width: 502px"
          v-for="item in new Array(2 - (((article_list.length - 1) % 2) + 1))"
          :key="item"
        ></div>
      </el-row>
      <el-row
        v-if="article_list.length === 0"
        type="flex"
        justify="center"
        style="width: 100%"
      >
        <el-empty
          description="该分类下ta还暂未发布过文章哦~去别处看看吧！"
        ></el-empty>
      </el-row>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { getUserArticlesDetails } from '@/api/user'
import type { Article } from '@/api/article/types'
import FilterBar from '@/components/Little/Tool/FilterBar.vue'
import ArticlePersonalcenterItem from '@/components/Little/Item/ArticlePersonalCenterItem.vue'

const route = useRoute()

const loading = ref<boolean>(false)
const article_list = ref<Article[]>([])
const article_list_all = ref<Article[]>([])
const articleListShow = ref<number>(0)

const post_article_num = computed(() => article_list_all.value.length)

const getArticleList = async (arr: Article[]) => {
  articleListShow.value = 1
  article_list.value = arr
  await nextTick()
  articleListShow.value = 0
}
const getArticleListChild = async (val: boolean) => {
  if (val) {
    loading.value = true
    article_list_all.value.splice(0)
    const res = await getUserArticlesDetails({
      user_id: Number(route.params.id)
    })
    res.result.forEach((item) => {
      article_list_all.value.push(item)
    })
    article_list_all.value.reverse()
    article_list.value = article_list_all.value
    loading.value = false
  }
}

onMounted(async () => {
  loading.value = true
  const res = await getUserArticlesDetails({
    user_id: Number(route.params.id)
  })
  article_list_all.value = res.result
  article_list_all.value.reverse()
  article_list.value = article_list_all.value
  loading.value = false
})
</script>

<style scoped lang="less">
.articlepost-wrap {
  position: relative;
  padding: 20px;
  width: 1310px;
  background: #fff;
  border-radius: 20px;

  .title {
    font-size: 24px;
    font-family: SourceHanSansCN-Regular, sans-serif;
    color: #3d3d3d;
  }
}
</style>
