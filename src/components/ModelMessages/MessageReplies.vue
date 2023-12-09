<template>
  <div class="messagereplies-wrap">
    <div class="head">
      <div style="display: flex; align-items: center">
        <img src="@/assets/svgs/MessageRepliesHead.svg" />
        <span>回复我的</span>
      </div>
      <el-button
        @click="router.push({ name: 'home' })"
        style="margin-right: 30px"
        >返回</el-button
      >
    </div>

    <div class="message-list">
      <ul v-loading="loading" v-infinite-scroll="load">
        <li
          style="margin-bottom: 20px"
          v-for="index in messageNum > commentMessageListAll.length
            ? commentMessageListAll.length
            : messageNum"
          :key="index"
        >
          <MessageRepliesItem
            :comment-message-info="commentMessageListAll[index - 1]"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import MessageRepliesItem from '@/components/Little/Item/MessageRepliesItem.vue'

interface CommentMessageInfo {
  user_id: number
  user_name: string
  user_img: string
  article_id: number
  article_title: string
  comment_id: number
  comment_status: number
  comment_content: string
  comment_date: string
}

const router = useRouter()
const commentMessageItem: CommentMessageInfo = {
  user_id: 1,
  user_name: 'Alice',
  user_img: 'https://dummyimage.com/400X400',
  article_id: 101,
  article_title: 'First Article',
  comment_id: 201,
  comment_status: 0,
  comment_content:
    'Great article!Great article!Great article!Great article!Great article!Great article!Great article!Great article!Great article!Great article!Great article!Great article!Great article!Great article!Great article!Great article!Great article!Great article!Great article!Great article!Great article!Great article!Great article!Great article!Great article!Great article!Great article!Great article!Great article!Great article!Great article!Great article!Great article!',
  comment_date: '2023-07-18 10:30:00'
}
const commentMessageListAll = ref<CommentMessageInfo[]>(
  new Array(10000).fill(commentMessageItem)
)
const messageNum = ref<number>(7)
const loading = ref<boolean>(true)

const load = () => {
  if (messageNum.value < commentMessageListAll.value.length) {
    messageNum.value += 5
  }
}

onMounted(async () => {
  await nextTick()
  loading.value = false
})
</script>

<style scoped lang="less">
.messagereplies-wrap {
  position: relative;
  width: 960px;

  ul {
    padding: 0;
    margin: 0;

    li {
      list-style: none;
    }
  }

  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 950px;
    height: 60px;
    background: #fff;
    border-radius: 10px;
    opacity: 0.7;
    transition: all 0.5s ease;

    img {
      margin-left: 30px;
    }

    span {
      margin-left: 10px;
      font-size: 14px;
      font-family: 'Microsoft YaHei', sans-serif;
      color: #3d3d3d;
    }
  }

  .head:hover {
    opacity: 1;
  }

  .message-list {
    overflow-y: scroll;
    margin-top: 20px;
    height: 600px;
  }
}
</style>
