<template>
  <div class="comment-input-wrap">
    <el-row>
      <textarea
        type="text"
        class="inputarea"
        placeholder="写点什么吧"
        v-model="commentContent"
        @keyup="handleKeyCode($event)"
      />
    </el-row>
    <el-row type="flex" justify="end">
      <div class="submit" @click="inputComment">
        <span>评论</span>
      </div>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import { commentAction } from '@/api/comment'
import { postMessage } from '@/api/message'
import { IPostMessageParams } from '@/api/message/types'
import type { ICommentActionParams, Level1Comment } from '@/api/comment/types'
import { ElNotification } from 'element-plus'

const props = defineProps<{
  responseTo?: Level1Comment
  commentId?: number
  responserId?: number
  commentatorId?: number
  objectName?: string
  origincontent?: string
  responsecontent?: string
  posterId?: number
  objectId?: number
  action_type?: number
}>()

const emits = defineEmits<{
  (e: 'refreshComment'): void
}>()

const { userStore } = useStore()
const route = useRoute()

const commentContent = ref<string>('')

const inputComment = async () => {
  if (!userStore.userInfo) {
    ElNotification({
      title: '操作失败',
      message: '您还未登录，无法进行此操作',
      type: 'error'
    })
    return
  }
  if (commentContent.value) {
    let comment_type = 0
    // 发送评论
    let paramsList: ICommentActionParams = {
      action_type: 0,
      article_id: Number(route.params.article_id), //要传值
      comment_content: commentContent.value,
      comment_level: 0
    }
    // 如果是给一级评论评论，给paramslist添加评论id属性
    if (props.commentId) {
      paramsList.response_to_comment_id = props.commentId
      paramsList.comment_level = 1
      comment_type = 1
    }
    // 如果是给二级评论评论，给paramslist添加评论对象id、评论id属性
    if (props.responseTo) {
      paramsList.response_to_user_id = props.responseTo.respondent!.user_id
      paramsList.response_to_comment_id = props.commentId
      paramsList.comment_level = 1
      comment_type = 2
    }
    const res = await commentAction(paramsList)

    if (res.result_code === 0) {
      ElNotification({
        title: '评论成功',
        type: 'success'
      })

      // 发送消息
      let messageBody: IPostMessageParams = {
        receiver_id: 0,
        type: 1,
        content: '',
        abstract: ''
      }

      // 给一级评论评论
      if (comment_type === 1) {
        messageBody.receiver_id = props.commentatorId!
        messageBody.content =
          '<span> 您的评论有了新的回复：' +
          `<a href="${import.meta.env.VITE_SITE_URL}/articleHome/${
            paramsList.article_id
          }/#${res.result}" target="_blank"> ${
            paramsList.comment_content
          } </a>` +
          ' </span>'
        messageBody.abstract = `<a href="${
          import.meta.env.VITE_SITE_URL
        }/articleHome/${paramsList.article_id}/#${
          props.commentId
        }" target="_blank"> ${props.origincontent} </a>`
      }
      // 给二级评论评论
      else if (comment_type === 2) {
        messageBody.receiver_id = props.responserId!
        messageBody.content =
          '<span> 您的评论有了新的回复：' +
          `<a href="${import.meta.env.VITE_SITE_URL}/articleHome/${
            paramsList.article_id
          }/#${res.result}" target="_blank"> ${
            paramsList.comment_content
          } </a>` +
          ' </span>'
        messageBody.abstract = `<a href="${
          import.meta.env.VITE_SITE_URL
        }/articleHome/${paramsList.article_id}/#${
          props.commentId
        }" target="_blank"> ${props.responsecontent} </a>`
      }
      // 给文章评论
      else {
        messageBody.receiver_id = props.posterId!
        messageBody.content =
          '<span> 您的文章有了新的评论：' +
          `<a href="${import.meta.env.VITE_SITE_URL}/articleHome/${
            paramsList.article_id
          }/#${res.result}" target="_blank"> ${
            paramsList.comment_content
          } </a>` +
          ' </span>'
        messageBody.abstract = `<a href="${
          import.meta.env.VITE_SITE_URL
        }/articleHome/${paramsList.article_id}" target="_blank"> ${
          props.objectName
        } </a>`
      }

      if (messageBody.receiver_id !== userStore.userInfo.user_id) {
        await postMessage(messageBody)
      }

      //如果添加成功，通知父组件加入评论
      emits('refreshComment')
      commentContent.value = ''
    }
  }
}
const handleKeyCode = (event: KeyboardEvent) => {
  const keyCode = event.key
  const altKey = event.ctrlKey || event.metaKey
  if (keyCode === 'Enter' && altKey) {
    commentContent.value = commentContent.value + '\n'
  } else if (keyCode === 'Enter') {
    event.preventDefault()
    inputComment()
  }
}
</script>

<style scoped lang="less">
.comment-input-wrap {
  position: relative;
  display: block;
  width: 92%;

  .inputarea {
    padding: 5px 0 0 10px;
    width: 100%;
    height: 97px;
    font-size: 16px;
    font-family: 'AlibabaPuHuiTi-3-55-Regular', sans-serif;
    color: #000;
    background: #fff;
    border: 1.5px solid #76fff5;
    border-radius: 20px;
    outline: none;
    resize: none;
    box-sizing: border-box;
  }

  .submit {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 15px 0 0;
    width: 75px;
    height: 34px;
    background: #76fff5;
    border-radius: 17px;
    transition: all 0.3s;
    cursor: pointer;
  }

  .submit:hover {
    background: #00d5cc;
  }

  .submit font {
    font-size: 16px;
    font-family: 'AlibabaPuHuiTi-3-65-Medium', sans-serif;
    color: #fff;
  }
}
</style>
@/api/comment/comment @/store/modules/user
