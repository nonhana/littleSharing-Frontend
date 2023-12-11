<template>
  <div class="messagecommon-wrap">
    <div class="head">
      <div>
        <img :src="MessageCommon" />
        <span>互动消息</span>
      </div>
      <el-button
        @click="router.push({ name: 'home' })"
        style="margin-right: 30px"
        >返回</el-button
      >
    </div>

    <div v-if="messageList.length > 0 || loading" class="message-list">
      <ul v-loading="loading" v-infinite-scroll="load">
        <li
          v-for="index in messageNum > messageList.length
            ? messageList.length
            : messageNum"
          :key="index"
        >
          <MessageCommonItem
            :message="messageList[index - 1]"
            @delete-message="deleteMessage"
          />
        </li>
      </ul>
    </div>

    <div v-else class="empty">
      <img :src="MessageEmpty" alt="MessageEmpty" />
      <span>暂无数据</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getMessage } from '@/api/message'
import type { Message } from '@/api/message/types'
import MessageCommonItem from '@/components/Little/Item/MessageCommonItem.vue'
import MessageCommon from '@/assets/svgs/MessageCommon.svg'
import MessageEmpty from '@/assets/svgs/MessageEmpty.svg'

const router = useRouter()

const messageNum = ref<number>(7)
const loading = ref<boolean>(false)
const messageList = ref<Message[]>([])

// 每次滚动到列表底部时，加载5条数据
const load = () => {
  if (messageNum.value < messageList.value.length) {
    messageNum.value += 5
  }
}

// 剔除掉messageList中的message_id为message_id的消息
const deleteMessage = (message_id: number) => {
  messageList.value = messageList.value.filter(
    (message) => message.message_id !== message_id
  )
}

onMounted(async () => {
  loading.value = true
  const res = await getMessage({ type: 1 })
  messageList.value = res.result.reverse()
  loading.value = false
})
</script>

<style scoped lang="less">
.messagecommon-wrap {
  position: relative;
  width: 960px;

  ul {
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 20px;
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

    div {
      display: flex;
      align-items: center;
    }

    &:hover {
      opacity: 1;
    }

    img {
      margin-left: 30px;
      width: 24px;
      height: 24px;
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

  .empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px 0;
    margin-top: 20px;
    width: 950px;
    background: #fff;
    border-radius: 10px;
    opacity: 0.7;
    transition: all 0.5s ease;

    &:hover {
      opacity: 1;
    }

    img {
      width: 200px;
      height: 200px;
    }

    span {
      margin-top: 20px;
      font-size: 14px;
      font-family: 'Microsoft YaHei', sans-serif;
      color: #3d3d3d;
    }
  }
}
</style>
