<template>
  <div class="articlehomebookmark-wrap">
    <el-row>
      <span class="title">书签操作栏</span>
    </el-row>
    <el-row style="margin: 10px 0 0">
      <span class="bookmarknote" v-if="bookmark_exist === 0"
        >你还没有在该页面添加过书签哦</span
      >
      <span class="bookmarknote" v-if="bookmark_exist !== 0"
        >·&nbsp;当前书签所在位置：{{ presentBookMarkPosition }}</span
      >
    </el-row>

    <div
      style="display: flex; justify-content: space-between; margin: 10px 0 0"
    >
      <el-button class="button" @click="addbookmark()">添加书签</el-button>

      <el-button
        class="button"
        v-if="bookmark_exist !== 0"
        @click="bookmarkScroll()"
        >跳转书签</el-button
      >

      <el-button
        class="button"
        v-if="bookmark_exist !== 0"
        @click="deletebookmark()"
        >移除书签</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import type { Bookmark } from '@/api/article/types'
import { addBookMark, removeBookMark, getBookMark } from '@/api/article'
import { ElNotification, ElMessageBox } from 'element-plus'

const router = useRouter()

const { userStore } = useStore()

const topHeight = ref<string>('0px')
const bookmarks = ref<Bookmark[]>([])
const bookmark_exist = ref<number>(0)
const presentBookMarkPosition = ref<string>('0px')

const scroll = () => {
  topHeight.value = window.scrollY.toFixed(2) + 'px'
}
const addbookmark = async () => {
  if (topHeight.value !== '0px') {
    const res = await addBookMark({
      article_id: Number(router.currentRoute.value.params.id),
      topHeight: topHeight.value,
      user_id: userStore.userInfo.user_id
    })
    if (res.result_code === 0) {
      if (bookmark_exist.value === 1) {
        ElNotification({
          title: '更新书签成功！',
          message: `当前位置：${topHeight.value}`,
          type: 'success'
        })
      } else {
        ElNotification({
          title: '添加书签成功！',
          message: `当前位置：${topHeight.value}`,
          type: 'success'
        })
      }
      presentBookMarkPosition.value = topHeight.value
      bookmark_exist.value = 1
    }
  } else {
    ElNotification({
      title: '书签不能加在开头哦，先读一点吧~',
      type: 'error'
    })
  }
}
const bookmarkScroll = () => {
  window.scrollTo({
    top: Number(
      presentBookMarkPosition.value.slice(
        0,
        presentBookMarkPosition.value.length - 2
      )
    ),
    behavior: 'smooth'
  })
}
const deletebookmark = async () => {
  bookmark_exist.value = 0
  const paramsList = {
    article_id: Number(router.currentRoute.value.params.id),
    user_id: userStore.userInfo.user_id
  }
  const res = await removeBookMark(paramsList)
  if (res.result_code === 0) {
    ElNotification({
      title: '移除书签成功！',
      type: 'success'
    })
  }
}

onMounted(async () => {
  const userId = userStore.userInfo.user_id
  const articleId = Number(router.currentRoute.value.params.id)

  window.addEventListener('scroll', scroll)

  const bookmarkRes = await getBookMark()
  if (bookmarkRes.result) {
    bookmarkRes.result.forEach((item) => {
      bookmarks.value.push(item)

      if (item.article_id === Number(articleId) && item.user_id === userId) {
        bookmark_exist.value = 1
        presentBookMarkPosition.value = item.topHeight
        ElMessageBox.confirm(
          '是否跳转至书签位置？',
          '检测到你在这篇文章添加过书签',
          {
            distinguishCancelAndClose: true,
            confirmButtonText: '确认',
            cancelButtonText: '取消'
          }
        )
          .then(() => {
            window.scrollTo({
              top: Number(item.topHeight.slice(0, item.topHeight.length - 2)),
              behavior: 'smooth'
            })
          })
          .catch(() => {})
      }
    })
  }
})
</script>

<style scoped lang="less">
.articlehomebookmark-wrap {
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

  .bookmarknote {
    font-size: 14px;
    font-family: 'AlibabaPuHuiTi-3-65-Medium', sans-serif;
    color: #9e9e9e;
  }

  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    width: 80px;
    height: 30px;

    span {
      font-size: 14px;
      font-family: 'AlibabaPuHuiTi-3-65-Medium', sans-serif;
      color: #3d3d3d;
    }
  }
}
</style>
