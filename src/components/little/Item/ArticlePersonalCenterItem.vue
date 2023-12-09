<template>
  <div class="articlepersonalcenteritem-wrap">
    <el-row type="flex" justify="space-between">
      <div style="display: flex">
        <div class="title" @click="push(1)">
          <span>{{ article_title }}</span>
        </div>
        <div
          v-if="article_status == 1"
          class="copied"
          style="margin: 0 0 0 10px"
        >
          <span>转载</span>
        </div>
        <div
          v-if="article_status == 2"
          class="original"
          style="margin: 0 0 0 10px"
        >
          <span>原创</span>
        </div>
      </div>

      <el-dropdown @command="articlechoices">
        <div class="more">
          <img src="@/assets/svgs/More.svg" />
        </div>
        <template #dropdown>
          <el-dropdown-menu v-if="routeStatus == 0">
            <el-dropdown-item command="1" style="display: flex">
              <div style="margin: 6px 6px 0 0">
                <img src="@/assets/svgs/ReEdit.svg" />
              </div>
              <span>重新编辑</span></el-dropdown-item
            >
            <el-dropdown-item command="2" style="display: flex">
              <div style="margin: 6px 6px 0 0">
                <img src="@/assets/svgs/DeleteArticle.svg" />
              </div>
              <span>删除文章</span></el-dropdown-item
            >
          </el-dropdown-menu>
          <el-dropdown-menu v-if="routeStatus == 1">
            <el-dropdown-item command="3" style="display: flex">
              <div style="margin: 6px 6px 0 0">
                <img src="@/assets/svgs/CancelCollect.svg" />
              </div>
              <span>取消收藏</span></el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-row>
    <el-row type="flex" style="margin-top: 10px">
      <div class="article-major">
        <span>{{ major }}</span>
      </div>
      <div
        class="article-labels"
        v-for="(_, index) in article_labels"
        :key="index"
      >
        <span>{{ article_labels[index] }}</span>
      </div>
    </el-row>
    <el-row>
      <div @click="push(1)">
        <span class="article-introduce">{{ article_introduce }}</span>
      </div>
    </el-row>
    <el-row type="flex" justify="start">
      <div>
        <el-row type="flex" class="action-list">
          <div>
            <img src="@/assets/svgs/LittleLike.svg" />
            <span>{{ like_num }}</span>
          </div>
          <div>
            <img src="@/assets/svgs/LittleCollection.svg" />
            <span>{{ collection_num }}</span>
          </div>
          <div>
            <img src="@/assets/svgs/LittleShare.svg" />
            <span>{{ share_num }}</span>
          </div>
          <div>
            <img src="@/assets/svgs/LittleComment.svg" />
            <span>{{ comment_num }}</span>
          </div>
        </el-row>
        <el-row type="flex" style="margin-top: 10px">
          <span class="article-date"
            >文章发表时间：{{ article_uploaddate }}</span
          >
          <span class="article-date" style="margin: 0 0 0 20px"
            >最后更新时间：{{ article_updatedate }}</span
          >
        </el-row>
      </div>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import type { Article } from '@/api/article/types'
import { deleteArticle } from '@/api/article'
import { addCollection } from '@/api/user'
import { ElMessageBox, ElNotification } from 'element-plus'
import { formatDate } from '@/utils'

const props = defineProps<{
  articleList: Article
}>()

const emits = defineEmits<{
  (e: 'getArticleList', data: boolean): void
}>()

const router = useRouter()

const { userStore } = useStore()

const routeStatus = ref<number>(0)
const id = ref<number>(props.articleList.article_id)
const article_status = ref<number>(props.articleList.article_status)
const article_link = ref<string>(props.articleList.article_link ?? '')
const article_title = ref<string>(props.articleList.article_title)
const article_major = ref<any[]>(props.articleList.article_major)
const article_labels = ref<any[]>(props.articleList.article_labels)
const article_introduce = ref<string>(props.articleList.article_introduce)
const article_uploaddate = ref<string>(
  formatDate(props.articleList.article_uploaddate)
)
const article_updatedate = ref<string>(
  formatDate(props.articleList.article_updatedate)
)
const author_id = ref<number>(props.articleList.author_id)
const author_head = ref<string>(props.articleList.author_headphoto)
const author_name = ref<string>(props.articleList.author_name)
const author_signature = ref<string>(props.articleList.author_signature)
const author_university = ref<string>(props.articleList.author_university)
const author_article_num = ref<number>(props.articleList.author_article_num)
const like_num = ref<number>(props.articleList.like_num)
const collection_num = ref<number>(props.articleList.collection_num)
const share_num = ref<number>(props.articleList.share_num)
const comment_num = ref<number>(props.articleList.comment_num)

const major = computed(() => article_major.value.join('-'))

const push = (num: number) => {
  if (num === 1) {
    const routeUrl = router.resolve({
      path: '/articleHome/' + id.value
    })
    window.open(routeUrl.href, '_blank')
  }
  if (num === 2) {
    router.push({
      path: '/personalCenter/' + author_id.value
    })
  }
}
const articlechoices = (num: string) => {
  if (num === '1') {
    router.push({
      path: '/postArticle',
      query: {
        article_id: id.value
      }
    })
  }
  if (num === '2') {
    ElMessageBox.confirm(
      '注：删除之后的文章无法被再次找回！',
      '是否删除该文章？',
      {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }
    ).then(async () => {
      const res = await deleteArticle({ article_id: id.value })
      if (res.result_code === 0) {
        ElNotification({
          title: '文章删除成功！',
          type: 'success'
        })
        emits('getArticleList', true)
      }
    })
  }
  if (num === '3') {
    ElMessageBox.confirm('您确定要取消收藏该文章吗？', '提醒', {
      distinguishCancelAndClose: true,
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    }).then(async () => {
      const res = await addCollection({
        article_id: id.value,
        action_type: 1,
        user_id: userStore.userInfo.user_id
      })
      if (res.result_code === 0) {
        ElNotification({
          title: '取消收藏成功！',
          message: '2s后刷新页面...',
          type: 'success'
        })
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      }
    })
  }
}

watch(
  routeStatus,
  () => {
    if (router.currentRoute.value.name == 'MyCollection') {
      routeStatus.value = 1
    }
  },
  {
    immediate: true
  }
)

watch(
  () => props.articleList,
  (newV, _) => {
    id.value = newV.article_id
    article_status.value = newV.article_status
    article_link.value = newV.article_link ?? ''
    article_title.value = newV.article_title
    article_major.value = newV.article_major
    article_labels.value = newV.article_labels
    article_introduce.value = newV.article_introduce
    article_uploaddate.value = formatDate(newV.article_uploaddate)
    article_updatedate.value = formatDate(newV.article_updatedate)
    author_head.value = newV.author_headphoto
    author_name.value = newV.author_name
    author_signature.value = newV.author_signature
    author_university.value = newV.author_university
    like_num.value = newV.like_num
    collection_num.value = newV.collection_num
    share_num.value = newV.share_num
    comment_num.value = newV.comment_num
    author_article_num.value = newV.author_article_num
  },
  { immediate: true }
)
</script>

<style scoped lang="less">
.articlepersonalcenteritem-wrap {
  position: relative;
  padding: 9px 14px;
  margin: 30px;
  width: 500px;
  background: #fff;
  border: 1px solid #9e9e9e;
  border-radius: 20px;
  transition: all 0.3s;

  &:hover {
    box-shadow: 4px 4px 10px 0 rgb(0 0 0 / 30%);
  }

  .title {
    display: -webkit-box;
    overflow: hidden;
    width: 400px;
    height: 26px;
    font-size: 18px;
    font-family: SourceHanSansCN-Bold, sans-serif;
    text-overflow: ellipsis;
    color: #3d3d3d;
    font-weight: bold;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    cursor: pointer;
  }

  .copied {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    height: 26px;
    font-size: 14px;
    font-family: SourceHanSansCN-Regular, sans-serif;
    color: #fff;
    background: #ff6c6c;
    border-radius: 13px;
  }

  .original {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    width: max-content;
    height: 26px;
    font-size: 14px;
    font-family: SourceHanSansCN-Regular, sans-serif;
    color: #fff;
    background: #ff8200;
    border-radius: 13px;
  }

  .article-introduce {
    display: -webkit-box;
    overflow: hidden;
    width: 100%;
    font-size: 12px;
    font-family: SourceHanSansCN-Regular, sans-serif;
    text-overflow: ellipsis;
    color: #9e9e9e;
    line-height: 36px;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    cursor: pointer;

    &:hover {
      color: #00ead8;
    }
  }

  .author-head {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 48px;
    height: 48px;
    background-color: #76fff5;
    border-radius: 24px;
    cursor: pointer;

    img {
      width: 48px;
    }
  }

  .author-name {
    height: 20px;
    font-size: 14px;
    font-family: SourceHanSansCN-Regular, sans-serif;
    color: #3d3d3d;
  }

  .author-signature {
    height: 20px;
    font-size: 14px;
    font-family: SourceHanSansCN-Regular, sans-serif;
    color: #3d3d3d;
  }

  .article-num {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    width: max-content;
    height: 20px;
    font-size: 12px;
    font-family: SourceHanSansCN-Regular, sans-serif;
    color: #fff;
    background: #76fff5;
    border-radius: 10px;
  }

  .action-list {
    display: flex;
    justify-content: space-between;
    width: 150px;
    height: 16px;

    div {
      display: flex;
      align-items: center;
    }

    > * span {
      height: 14px;
      font-size: 12px;
      font-family: SourceHanSansCN-Regular, sans-serif;
      color: #3d3d3d;
    }

    > * svg {
      cursor: pointer;
    }
  }

  .article-major {
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
    background: #4aff98;
    border-radius: 10px;
  }

  .article-labels {
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

  .more {
    margin: 0 10px 0 0;
    cursor: pointer;
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

  .article-date {
    font-size: 12px;
    font-family: SourceHanSansCN-Regular, sans-serif;
    color: #9e9e9e;
  }
}
</style>
