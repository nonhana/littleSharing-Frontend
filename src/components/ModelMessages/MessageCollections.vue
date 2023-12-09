<template>
  <div class="messagecollections-wrap">
    <div class="head">
      <div style="display: flex; align-items: center">
        <img src="@/assets/svgs/MessageCollectionsHead.svg" />
        <span>收藏我的</span>
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
          v-for="index in messageNum > collectMessageListAll.length
            ? collectMessageListAll.length
            : messageNum"
          :key="index"
        >
          <MessageCollectionsItem
            :collect-message-info="collectMessageListAll[index - 1]"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import MessageCollectionsItem from '../Little/Item/MessageCollectionsItem.vue'

const router = useRouter()

const collectMessageItem: {
  user_id: number
  user_name: string
  user_img: string
  article_id: number
  article_title: string
  article_info: string
  collect_date: string
} = {
  user_id: 1,
  user_name: 'Alice',
  user_img: 'https://dummyimage.com/400X400',
  article_id: 101,
  article_title: 'First Article',
  article_info:
    '文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介',
  collect_date: '2023-07-18 10:30:00'
}

const collectMessageListAll = ref<
  {
    user_id: number
    user_name: string
    user_img: string
    article_id: number
    article_title: string
    article_info: string
    collect_date: string
  }[]
>(new Array(10000).fill(collectMessageItem))
const messageNum = ref<number>(7)
const loading = ref<boolean>(true)

const load = () => {
  if (messageNum.value < collectMessageListAll.value.length) {
    messageNum.value += 5
  }
}

onMounted(async () => {
  await nextTick()
  loading.value = false
})
</script>

<style scoped lang="less">
.messagecollections-wrap {
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

    &:hover {
      opacity: 1;
    }

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

  .message-list {
    overflow-y: scroll;
    margin-top: 20px;
    height: 600px;
  }
}
</style>
