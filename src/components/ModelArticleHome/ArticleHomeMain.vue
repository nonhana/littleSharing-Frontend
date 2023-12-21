<template>
  <div class="articlehomemain-wrap">
    <el-row type="flex" style="flex-flow: row wrap">
      <div class="title">
        <span>{{ article_title }}</span>
      </div>
      <div
        v-if="article_status === 1"
        class="copied"
        style="margin: 3px 0 5px 10px"
      >
        <span>转载文章</span>
      </div>
      <div
        v-if="article_status === 2"
        class="original"
        style="margin: 3px 0 5px 10px"
      >
        <span>原创文章</span>
      </div>
    </el-row>

    <el-divider><span style="color: #9e9e9e">文章标签</span></el-divider>

    <el-row type="flex">
      <div
        class="article-labels"
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
      <div v-if="!loading" class="markdown-body">
        <MdPreview
          style="width: 710px"
          editorId="md-preview"
          :modelValue="article_md"
          show-code-row-number
        />
      </div>
      <div
        style="width: 100%; height: 100px"
        class="loading"
        v-else
        v-loading="loading"
        element-loading-text="少女折寿中..."
      />
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { getArticleMain, postArticleTrend } from '@/api/article'
import { formatDate } from '@/utils'
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'

const route = useRoute()

const article_status = ref<number>(1) // 默认为转载文章
const article_link = ref<string>('')
const article_labels = ref<string[]>([])
const article_title = ref<string>('')
const article_md = ref<string>('')
const loading = ref<boolean>(false)

onMounted(async () => {
  loading.value = true
  const res = await getArticleMain({
    article_id: Number(route.params.id)
  })
  const article_main = res.result
  article_status.value = article_main.article_status
  article_link.value = article_main.article_link || ''
  article_labels.value.push(...article_main.article_labels)
  article_title.value = article_main.article_title
  // 使用fetch来获取article_md_link的内容
  article_md.value =
    article_main.article_md_link !== ''
      ? await fetch(article_main.article_md_link).then((res) => res.text())
      : article_main.article_md

  await nextTick()

  const trend_params = {
    present_date: formatDate(new Date(), 'yyyy-MM-dd'),
    label_list: article_labels.value
  }

  await postArticleTrend(trend_params)
  loading.value = false
})
</script>

<style scoped lang="less">
.articlehomemain-wrap {
  position: relative;
  padding: 20px;
  margin-bottom: 25px;
  width: 710px;
  background: #fff;
  border-radius: 20px;

  .title {
    font-size: 30px;
    font-family: SourceHanSansCN-Bold, sans-serif;
    color: #3d3d3d;
    word-break: break-all;
    font-weight: bold;
  }

  .copied {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    width: 80px;
    height: 36px;
    font-size: 16px;
    font-family: SourceHanSansCN-Regular, sans-serif;
    color: #fff;
    background: #ff6c6c;
    border-radius: 18px;
  }

  .original {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    width: 80px;
    height: 36px;
    font-size: 16px;
    font-family: SourceHanSansCN-Regular, sans-serif;
    color: #fff;
    background: #ff8200;
    border-radius: 18px;
  }

  .article-labels {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 15px;
    width: max-content;
    height: 36px;
    font-size: 16px;
    font-family: SourceHanSansCN-Regular, sans-serif;
    color: #3d3d3d;
    background: #4aff98;
    border-radius: 18px;
  }

  .markdown-body :deep(img) {
    position: relative;
    margin: 0 auto;
  }

  .link {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 9px 14px;
    margin-top: 20px;
    width: 680px;
    background-color: #eee;
    border-radius: 10px;

    a {
      font-size: 14px;
      font-family: SourceHanSansCN-Regular, sans-serif;
      color: #0098b3;
      word-break: break-all;
      line-height: 20px;
      letter-spacing: 0;
    }
  }
}
</style>
