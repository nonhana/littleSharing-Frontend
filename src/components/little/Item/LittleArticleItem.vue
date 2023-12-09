<template>
  <div class="littlearticleitem-wrap">
    <el-row>
      <div>
        <div class="title" @click="push(1)" style="margin: 0 0 5px">
          <span>{{ article_title }}</span>
        </div>
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
      <div @click="push(1)">
        <p class="article-introduce">{{ article_introduce }}</p>
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
          <span class="author-name">{{ author_name }}</span>
        </div>
      </el-tooltip>
      <div>
        <span class="article-uploaddate">{{ article_uploaddate }}</span>
      </div>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { ArticleSimple } from '@/api/article/types'
import { formatDate } from '@/utils'

const props = defineProps<{
  similarItem: ArticleSimple
}>()

const router = useRouter()

const id = ref<number>(props.similarItem.article_id)
const article_title = ref<string>(props.similarItem.article_title)
const article_labels = ref<string[]>(props.similarItem.article_labels)
const article_introduce = ref<string>(props.similarItem.article_introduce)
const author_id = ref<number>(props.similarItem.author_id)
const author_name = ref<string>(props.similarItem.author_name)

const article_uploaddate = computed(() => {
  return formatDate(props.similarItem.article_uploaddate)
})

const push = (num: number) => {
  if (num == 1) {
    const routeUrl = router.resolve({
      path: '/articleHome/' + id.value
    })
    window.open(routeUrl.href, '_blank')
  }
  if (num == 2) {
    router.push({
      path: '/personalCenter/' + author_id.value
    })
  }
}
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
