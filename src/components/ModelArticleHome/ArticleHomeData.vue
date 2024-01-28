<template>
  <div class="articlehomedata-wrap">
    <el-row>
      <span class="title">文章数据栏</span>
    </el-row>
    <div style="display: flex; justify-content: center; margin: 10px 0 0">
      <div @click="addlike">
        <like-btn :likemark="likemark" />
      </div>
      <span class="datafont">{{ article_data.like_num }}</span>
      <div @click="addcollection">
        <collection-btn :collectionmark="collectionmark" />
      </div>
      <span class="datafont">{{ article_data.collection_num }}</span>

      <div @click="addshare">
        <share-btn />
      </div>
      <span class="datafont">{{ article_data.share_num }}</span>

      <div @click="jumpToComment">
        <comment-btn />
      </div>
      <span class="datafont">{{ article_data.comment_num }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import {
  addLike,
  addCollection,
  getUserLikeList,
  getUserCollectList
} from '@/api/user'
import { getArticleMain } from '@/api/article'
import { postMessage } from '@/api/message'
import LikeBtn from '@/components/Little/Button/LikeBtn.vue'
import CollectionBtn from '@/components/Little/Button/CollectionBtn.vue'
import ShareBtn from '@/components/Little/Button/ShareBtn.vue'
import CommentBtn from '@/components/Little/Button/CommentBtn.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const route = useRoute()
const { userStore } = useStore()

const currentArticleId: number = Number(route.params.article_id)

const author_id = ref<number>(0)
const article_id = ref<number>(0)
const article_title = ref<string>('')
const article_data = ref<{
  like_num: number
  collection_num: number
  share_num: number
  comment_num: number
}>({
  like_num: 0,
  collection_num: 0,
  share_num: 0,
  comment_num: 0
})
const likemark = ref<number>(0)
const collectionmark = ref<number>(0)

const addlike = async () => {
  if (userStore.isLogin) {
    if (likemark.value !== 1) {
      likemark.value = 1
      article_data.value.like_num++
      await addLike({
        article_id: currentArticleId,
        action_type: 0,
        user_id: userStore.userInfo.user_id
      })
      ElMessage({
        message: '点赞成功'
      })
      if (author_id.value !== userStore.userInfo.user_id) {
        await postMessage({
          receiver_id: author_id.value,
          type: 1,
          content:
            '<span> 您的文章' +
            `<a href="${import.meta.env.VITE_SITE_URL}/articleHome/${
              article_id.value
            }" target="_blank"> ${article_title.value} </a>` +
            '被点赞了 </span>'
        })
      }
    } else {
      likemark.value = 0
      article_data.value.like_num--
      await addLike({
        article_id: currentArticleId,
        action_type: 1,
        user_id: userStore.userInfo.user_id
      })
      ElMessage({
        message: '取消点赞'
      })
    }
  } else {
    ElMessage({
      message: '请先进行登录哦~'
    })
  }
}
const addcollection = async () => {
  if (userStore.isLogin) {
    if (collectionmark.value !== 1) {
      collectionmark.value = 1
      article_data.value.collection_num++
      await addCollection({
        article_id: currentArticleId,
        action_type: 0,
        user_id: userStore.userInfo.user_id
      })
      ElMessage({
        message: '收藏成功'
      })
      if (author_id.value !== userStore.userInfo.user_id) {
        await postMessage({
          receiver_id: author_id.value,
          type: 1,
          content:
            '<span> 您的文章' +
            `<a href="${import.meta.env.VITE_SITE_URL}/articleHome/${
              article_id.value
            }" target="_blank"> ${article_title.value} </a>` +
            '被收藏了 </span>'
        })
      }
    } else {
      collectionmark.value = 0
      article_data.value.collection_num--
      await addCollection({
        article_id: currentArticleId,
        action_type: 1,
        user_id: userStore.userInfo.user_id
      })

      ElMessage({
        message: '取消收藏'
      })
    }
  } else {
    ElMessage({
      message: '请先进行登录哦~'
    })
  }
}
const addshare = () => {
  ElMessageBox.alert(window.location.href, '点击确定复制链接', {
    confirmButtonText: '确定',
    callback: async () => {
      article_data.value.share_num++
      await navigator.clipboard.writeText(window.location.href)
      ElMessage({
        type: 'info',
        message: '复制成功！请尽快转发哦~'
      })
    }
  })
}
// 点击跳转到评论区
const jumpToComment = () => {
  const element = document.getElementById('comment')
  if (element) {
    const top = element.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

onMounted(async () => {
  const articleDataRes = await getArticleMain({
    article_id: Number(route.params.article_id)
  })
  const article_main = articleDataRes.result
  author_id.value = article_main.author_id
  article_title.value = article_main.article_title
  article_data.value = {
    like_num: article_main.like_num,
    collection_num: article_main.collection_num,
    share_num: article_main.share_num,
    comment_num: article_main.comment_num
  }

  article_id.value = Number(route.params.article_id)

  if (userStore.isLogin) {
    const likeListRes = await getUserLikeList()
    const hasLiked = likeListRes.result.includes(article_id.value)
    likemark.value = hasLiked ? 1 : 0

    const collectListRes = await getUserCollectList({
      user_id: userStore.userInfo.user_id
    })
    const hasCollected = collectListRes.result.includes(article_id.value)
    collectionmark.value = hasCollected ? 1 : 0
  }
})
</script>

<style scoped lang="less">
.articlehomedata-wrap {
  padding: 10px;
  width: 250px;
  background: #fff;
  border-radius: 20px;

  .title {
    height: 35px;
    font-size: 24px;
    font-family: 'AlibabaPuHuiTi-3-65-Medium', sans-serif;
    color: #3d3d3d;
  }

  .datafont {
    margin: 0 10px;
    font-size: 16px;
    font-family: 'AlibabaPuHuiTi-3-55-Regular', sans-serif;
    color: #3d3d3d;
  }
}
</style>
