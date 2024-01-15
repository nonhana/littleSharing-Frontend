<template>
  <div class="commentcontent-wrap">
    <el-row>
      <div>
        <img
          class="headphoto"
          @click="enterSpace(userId)"
          :src="pictureurl"
          alt="headphoto"
        />
      </div>

      <div style="margin-left: 15px; max-width: 600px">
        <el-row>
          <div class="username">
            <span
              >{{ username }}
              <span v-if="userId === authorId">（作者）</span>
            </span>
            <span v-if="responseList && response_to">
              => {{ response_to }}
              <span v-if="responseList.response_to.user_id === authorId"
                >（作者）</span
              >
            </span>
          </div>
        </el-row>

        <el-row style="margin-bottom: 10px; width: 600px">
          <span class="details">{{ details }}</span>
        </el-row>

        <el-row type="flex">
          <div class="data-about">
            <div>
              <span class="date">{{ date }}</span>
            </div>
            <div>
              <div class="response">
                <input
                  class="response-input"
                  type="checkbox"
                  :checked="isShow"
                  disabled
                />
                <div class="info" @click="openComment">
                  <CommentBtn />
                  <span>{{ responsenum }}</span>
                </div>
              </div>
            </div>

            <div>
              <div class="info" @click="addlike(comment_id)">
                <LikeBtn :likemark="likemark" />
                <span>{{ likenum }}</span>
              </div>
            </div>
          </div>
          <div v-if="deleteshow" style="margin-left: 30px">
            <span class="delete" @click="deleteComment">删除</span>
          </div>
        </el-row>
      </div>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
import {
  commentAction,
  commentLikeAction,
  getCommentLikeList
} from '@/api/comment'
import { getArticleMain } from '@/api/article'
import { postMessage } from '@/api/message'
import { formatDate } from '@/utils'
import type { Level0Comment, Level1Comment } from '@/api/comment/types'
import { ElMessage } from 'element-plus'
import LikeBtn from '@/components/Little/Button/LikeBtn.vue'
import CommentBtn from '@/components/Little/Button/CommentBtn.vue'

const props = defineProps<{
  commentList?: Level0Comment
  responseList?: Level1Comment
  index?: number
  indexNext?: number
  isShow?: boolean
  commentatorId?: number
}>()

const emits = defineEmits<{
  (
    e: 'openComment',
    index: number | undefined,
    indexNext: number | undefined
  ): void
  (e: 'refreshComment'): void
}>()

const route = useRoute()
const router = useRouter()

const { userStore } = useStore()

const message_send = ref<boolean>(true)
const deleteshow = ref<boolean>(false)
const likemark = ref<number>(0)
const likenum = ref<number>(
  props.commentList ? props.commentList.likes : props.responseList!.likes
)
const authorId = ref<number | null>(null)

const userId = computed(() => {
  if (props.commentList) {
    return props.commentList.commentator.user_id
  } else {
    return props.responseList!.respondent.user_id
  }
})
const username = computed(() => {
  if (props.commentList) {
    return props.commentList.commentator.name
  } else {
    return props.responseList!.respondent.name
  }
})
const date = computed(() => {
  if (props.commentList) {
    return formatDate(props.commentList.create_date)
  } else {
    return formatDate(props.responseList!.response_date)
  }
})
const details = computed(() => {
  if (props.commentList) {
    return props.commentList.comment_content
  } else {
    return props.responseList!.comment_content
  }
})
const responsenum = computed(() => {
  if (props.commentList) {
    return props.commentList.response.length
  } else {
    return '回复'
  }
})
const pictureurl = computed(() => {
  if (props.commentList) {
    return props.commentList.commentator.header_photo
  } else {
    return props.responseList!.respondent.header_photo
  }
})
const response_to = computed(() => {
  return props.responseList?.response_to?.name || ''
})
const comment_id = computed(() => {
  if (props.commentList) {
    return props.commentList.comment_id
  } else {
    return props.responseList!.comment_id
  }
})

const enterSpace = (user_id: number) => {
  router.push({
    path: '/personalCenter/' + user_id
  })
}
const openComment = () => {
  if (userStore.isLogin) {
    if (!props.isShow) {
      emits('openComment', props.index, props.indexNext)
      //记录上一次传值
    } else {
      //这里传值undefined，所以comment对应的v-if参数是不存在的（如：showInput[undefined] === true）
      emits('openComment', undefined, undefined)
    }
  } else {
    ElMessage({
      message: '请先进行登录哦~'
    })
  }
}
const addlike = async (id: number) => {
  if (userStore.isLogin) {
    if (likemark.value !== 1) {
      likemark.value = 1
      likenum.value++
      await commentLikeAction({
        comment_id: id,
        action_type: 0
      })
      ElMessage({
        message: '点赞成功'
      })
      if (userId.value !== userStore.userInfo.user_id) {
        await postMessage({
          receiver_id: userId.value,
          type: 1,
          content:
            '<span> 您的评论' +
            `<a href="${import.meta.env.VITE_SITE_URL}/articleHome/${
              route.params.id
            }/#${comment_id.value}" target="_blank"> ${details.value} </a>` +
            '被点赞了 </span>'
        })
      }
    } else {
      likemark.value = 0
      likenum.value--
      await commentLikeAction({
        comment_id: id,
        action_type: 1
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
const deleteComment = async () => {
  await commentAction({
    action_type: 1,
    delete_comment_id: comment_id.value
  })
  //如果删除成功，通知父组件重新拉取数据
  emits('refreshComment')
}

watch(
  () => props.commentList,
  () => {
    //判断是否有删除权限
    userId.value === userStore.userInfo.user_id
      ? ((deleteshow.value = true), (message_send.value = false))
      : ((deleteshow.value = false), (message_send.value = true))
  },
  { immediate: true }
)

watch(
  () => route.params.id,
  async (newV, _) => {
    if (newV) {
      const res = await getArticleMain({ article_id: Number(newV) })
      authorId.value = res.result.author_id
    }
  },
  { immediate: true }
)

onMounted(async () => {
  if (userStore.isLogin) {
    const res = await getCommentLikeList()
    res.result.forEach((item) => {
      if (item.comment_id === comment_id.value) {
        likemark.value = 1
      }
    })
  }
})
</script>

<style scoped lang="less">
.commentcontent-wrap {
  position: relative;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  height: 100%;

  .username {
    height: 20px;

    span {
      margin-right: 10px;
      font-size: 14px;
      font-family: SourceHanSansCN-Medium, sans-serif;
      color: #00d5cc;
    }

    font span {
      margin-right: 10px;
      font-size: 12px;
      font-family: SourceHanSansCN-Medium, sans-serif;
      color: #00d5cc;
      font-weight: bold;
    }
  }

  .username :nth-child(2) {
    color: #808080;
  }

  .headphoto {
    width: 48px;
    height: 48px;
    cursor: pointer;
    border-radius: 50%;
  }

  .details {
    margin-bottom: 10px;
    width: 100%;
    font-size: 14px;
    font-family: SourceHanSansCN-Normal, sans-serif;
    color: #3d3d3d;
    word-break: break-all;
    font-weight: 350;
    line-height: 24px;
  }

  .response {
    cursor: pointer;

    svg {
      position: relative;
      top: 3px;
      margin-right: 13px;
    }

    span {
      font-size: 14px;
      font-family: SourceHanSansCN-Regular, sans-serif;
      color: #808080;
      cursor: pointer;
    }
  }

  .response:hover svg {
    stroke: #00d5cc;
  }

  .response-input {
    display: none;

    &:checked ~ div {
      svg {
        stroke: #00d5cc;
      }

      span {
        color: #00d5cc;
      }
    }
  }

  .info {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    span {
      margin: 0 0 0 5px;
      font-size: 14px;
      font-family: SourceHanSansCN-Regular, sans-serif;
      color: #808080;
      cursor: pointer;
    }
  }

  .delete {
    font-size: 14px;
    font-family: SourceHanSansCN-Regular, sans-serif;
    color: #808080;
    cursor: pointer;

    &:hover {
      color: #00d5cc;
    }
  }

  .data-about {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 317px;
  }

  .date {
    font-size: 14px;
    font-family: SourceHanSansCN-Regular, sans-serif;
    color: #808080;
  }
}
</style>
@/api/article/article @/api/comment/comment @/store/modules/user
