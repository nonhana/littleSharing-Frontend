<template>
  <div class="index">
    <el-row type="flex" justify="center">
      <transition name="side-bar-left">
        <div v-if="showSideBar" class="side-bar">
          <el-row>
            <ArticleHomeSimilar />
          </el-row>
          <el-row style="margin: 30px 0 0">
            <ArticleHomeData :article-data="article_data" />
          </el-row>
        </div>
      </transition>

      <div>
        <ArticleHomeMain />
        <Comment />
      </div>

      <transition name="side-bar-right">
        <div v-if="showSideBar" class="side-bar">
          <el-row>
            <ArticleHomeAuthor />
          </el-row>
          <el-row style="margin: 30px 0 0">
            <ArticleHomeMdCatalog />
          </el-row>
        </div>
      </transition>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { increaseArticleViews } from '@/api/article'
import ArticleHomeMain from '@/components/ModelArticleHome/ArticleHomeMain.vue'
import ArticleHomeSimilar from '@/components/ModelArticleHome/ArticleHomeSimilar.vue'
import ArticleHomeAuthor from '@/components/ModelArticleHome/ArticleHomeAuthor.vue'
import ArticleHomeMdCatalog from '@/components/ModelArticleHome/ArticleHomeMdCatalog.vue'
import ArticleHomeData from '@/components/ModelArticleHome/ArticleHomeData.vue'
import Comment from '@/components/Little/Comment/Comment.vue'

const route = useRoute()

const article_data = ref({
  like_num: 0,
  collection_num: 0,
  share_num: 0,
  comment_num: 0
})
const comment_id = ref<string>('') // 评论id
const showSideBar = ref<boolean>(true)

const windoWidthChanged = () => {
  if (window.innerWidth < 1350) {
    showSideBar.value = false
  } else {
    showSideBar.value = true
  }
}

onMounted(async () => {
  // 加上全局对浏览器窗口宽度的监听
  window.addEventListener('resize', windoWidthChanged)

  const articleId = Number(route.params.id)
  await increaseArticleViews({
    article_id: articleId
  })
  // 把路由的#后面的数字拿到，赋给comment_id
  comment_id.value = route.hash.slice(1)
  // 滚动到评论id为comment_id的位置
  if (comment_id.value) {
    setTimeout(() => {
      const commentElement = document.getElementById(comment_id.value)
      if (commentElement) {
        commentElement.scrollIntoView()
      }
    }, 3000)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', windoWidthChanged)
})
</script>

<style scoped lang="less">
.index {
  width: 100%;

  .side-bar {
    position: fixed;
    top: 94px;
    z-index: 100;

    &:nth-child(1) {
      left: calc(100vw / 2 - 680px);
    }

    &:nth-child(3) {
      right: calc(100vw / 2 - 680px);
    }
  }
}

/* 当左侧栏消失时，动画为向左移出界面 */
.side-bar-left-enter-active {
  animation: side-bar-left-enter 0.3s;
}

.side-bar-left-leave-active {
  animation: side-bar-left-leave 0.3s;
}

@keyframes side-bar-left-enter {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(0);
  }
}

@keyframes side-bar-left-leave {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-100%);
  }
}

/* 当右侧栏消失时，动画为向右移出界面 */

.side-bar-right-enter-active {
  animation: side-bar-right-enter 0.3s;
}

.side-bar-right-leave-active {
  animation: side-bar-right-leave 0.3s;
}

@keyframes side-bar-right-enter {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
}

@keyframes side-bar-right-leave {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(100%);
  }
}
</style>
