<template>
  <div class="messagecommonitem-wrap">
    <el-row type="flex" justify="space-between">
      <div class="part1">
        <div class="headphoto" @click="enterspace">
          <img :src="message.user_info!.user_headphoto" />
        </div>
        <div class="details">
          <el-row type="flex">
            <span class="details-content">
              <span class="clickable">{{ message.user_info!.user_name }}</span>
            </span>
          </el-row>
          <el-row type="flex">
            <span class="details-inner" v-html="message.content" />
          </el-row>
          <el-row style="margin-top: 10px" type="flex">
            <span class="details-date">
              {{ date }}
            </span>
          </el-row>
        </div>
      </div>
      <div class="part2">
        <div v-if="message.abstract" class="content">
          <span v-html="message.abstract" />
        </div>
        <el-dropdown @command="handleCommand">
          <div class="button">
            <img :src="MessageActions" />
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="delete">删除消息</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { formatDate } from '@/utils'
import { deleteMessage } from '@/api/message'
import type { Message } from '@/api/message/types'
import MessageActions from '@/assets/svgs/MessageActions.svg'
import { ElMessageBox, ElMessage } from 'element-plus'

const router = useRouter()

const props = defineProps<{
  message: Message
}>()

const emits = defineEmits<{
  (e: 'deleteMessage', message_id: number): void
}>()

const date = computed(() => {
  return formatDate(props.message.createdAt)
})

const handleCommand = async (command: string) => {
  if (command === 'delete') {
    ElMessageBox.confirm('此操作将永久删除该消息, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      const res = await deleteMessage({
        message_id: props.message.message_id
      })
      if (res.result_code === 0) {
        ElMessage.success('删除成功!')
        emits('deleteMessage', props.message.message_id)
      } else {
        ElMessage.error('删除失败!')
      }
    })
  }
}
const enterspace = () => {
  router.push({
    name: 'personalCenter',
    params: {
      id: props.message.user_info!.user_id
    }
  })
}
</script>

<style scoped lang="less">
.messagecommonitem-wrap {
  position: relative;
  padding: 10px;
  width: 950px;
  background-color: #fff;
  border-radius: 10px;
  opacity: 0.7;
  transition: all 0.5s ease;
  box-sizing: border-box;

  &:hover {
    opacity: 1;
  }

  .part1 {
    display: flex;
    justify-content: start;
    align-items: center;

    .headphoto {
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      width: 40px;
      height: 40px;
      border: 0.5px solid #3d3d3d;
      border-radius: 20px;
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .details {
      margin-left: 10px;

      &-content {
        overflow: hidden;
        width: 400px;
        font-size: 14px;
        font-family: 'Microsoft YaHei', sans-serif;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #3d3d3d;
      }

      .clickable {
        font-weight: 700;
        cursor: pointer;

        &:hover {
          color: #76fff5;
        }
      }

      &-inner {
        overflow: hidden;
        width: 100%;
        font-size: 14px;
        font-family: 'Microsoft YaHei', sans-serif;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #3d3d3d;
      }

      &-date {
        font-size: 12px;
        font-family: 'Microsoft YaHei', sans-serif;
        color: #9e9e9e;
      }
    }
  }

  .part2 {
    display: flex;
    align-items: start;

    .content {
      display: -webkit-box;
      overflow: hidden;
      margin-right: 10px;
      width: 120px;
      font-size: 14px;
      font-family: 'Microsoft YaHei', sans-serif;
      text-overflow: ellipsis;
      color: #9e9e9e;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }

    .button {
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      width: 16px;
      height: 16px;
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
