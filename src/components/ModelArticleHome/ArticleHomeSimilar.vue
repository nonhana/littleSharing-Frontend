<template>
  <div
    class="articlehomesimilar-wrap"
    :style="{
      maxHeight: presentHeight
    }"
    ref="articlehomesimilar"
  >
    <el-row>
      <span class="title">相似推荐</span>
    </el-row>
    <el-row v-if="similar_article_list.length !== 0">
      <div
        style="position: relative; transition: all 0.5s"
        :style="{ top: listTopHeight }"
      >
        <div class="note">
          <span>再次点击可以展开哦！</span>
        </div>
        <LittleArticleItem
          v-for="(_, index) in similar_article_list"
          :similar-item="similar_article_list[index]"
          :key="index"
        />
      </div>
      <el-row type="flex" justify="center" style="width: 100%">
        <div
          style="position: relative; cursor: pointer; transition: all 0.5s"
          :style="{ transform: rorate, top: topHeight }"
          @click="foldList"
        >
          <img src="@/assets/svgs/FoldList.svg" />
        </div>
      </el-row>
    </el-row>
    <el-row
      v-if="similar_article_list.length === 0"
      type="flex"
      justify="center"
      v-loading="loadingStatus"
      element-loading-text="少女祈祷中..."
    >
      <no-list :width="220" :height="100" content="暂无推荐文章"></no-list>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { getSimilarArticles, getArticleMain } from '@/api/article'
import type { ArticleSimple } from '@/api/article/types'
import LittleArticleItem from '@/components/Little/Item/LittleArticleItem.vue'

const route = useRoute()

const articlehomesimilar = ref<HTMLDivElement>()
const totalHeight = ref<number>(0)
const loadingStatus = ref<boolean>(false)
const similar_article_list = ref<ArticleSimple[]>([])
const presentHeight = ref<string>('520px')
const rorate = ref<string>('rotate(180deg)')
const topHeight = ref<string>('0px')
const listTopHeight = ref<string>('0px')

// 折叠展示栏
const foldList = () => {
  if (presentHeight.value !== '100px') {
    presentHeight.value = '100px'
    rorate.value = 'rotate(0)'
    topHeight.value = 125 - totalHeight.value + 'px'
    listTopHeight.value =
      1023 + (3 - similar_article_list.value.length) * 134 + 'px'
  } else {
    presentHeight.value =
      1023 + (3 - similar_article_list.value.length) * 134 + 'px'
    rorate.value = 'rotate(180deg)'
    topHeight.value = '0px'
    listTopHeight.value = '0px'
  }
}

onMounted(async () => {
  loadingStatus.value = true
  // 获取到当前文章的标签列表，并处理成以逗号分隔的字符串
  const { article_labels } = (
    await getArticleMain({
      article_id: Number(route.params.id)
    })
  ).result
  const articleLabels = article_labels.join(',')

  // 获取到相似文章列表
  const similarArticleList = (
    await getSimilarArticles({
      labels: articleLabels,
      article_id: Number(route.params.id)
    })
  ).result
  similar_article_list.value = similarArticleList.slice(0, 3) // 只取前三个

  loadingStatus.value = false
  await nextTick()
  totalHeight.value = articlehomesimilar.value?.offsetHeight as number
})
</script>

<style scoped lang="less">
.articlehomesimilar-wrap {
  // overflow: hidden;
  padding: 10px;
  width: 250px;
  background: #fff;
  border-radius: 20px;
  transition: 0.5s all;

  .title {
    height: 35px;
    font-size: 24px;
    font-family: SourceHanSansCN-Bold, sans-serif;
    color: #3d3d3d;
    font-weight: bold;
  }

  .note {
    position: absolute;
    bottom: 1420px;
    display: flex;
    justify-content: center;
    width: 100%;
    font-size: 18px;
    font-family: SourceHanSansCN-Regular, sans-serif;
    color: #3d3d3d;
  }
}
</style>
