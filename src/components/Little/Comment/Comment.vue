<template>
  <div id="comment" class="comment-wrap">
    <el-row>
      <div class="comment-tag">
        <div class="line" />
        <span>评论列表：</span>
        <span v-if="comment_list.length === 0">暂无评论</span>
      </div>
    </el-row>

    <el-row
      v-if="userStore.isLogin"
      type="flex"
      justify="space-between"
      style="padding: 20px 0 0"
    >
      <img :src="user_head_photo" alt="user_head_photo" />
      <CommentInput
        @refreshComment="refreshComment"
        :objectName="object_name"
        :posterId="poster_id"
        :objectId="now_object_id"
      />
    </el-row>

    <ul v-loading="loading" class="comments">
      <li
        v-for="(_, index) in comment_list"
        :id="String(comment_list[index].comment_id)"
        :key="index"
      >
        <CommentContent
          @refreshComment="refreshComment"
          @openComment="openComment"
          :commentList="comment_list[index]"
          :index="index"
          :isShow="showInput[index]"
        />
        <el-row type="flex" justify="end">
          <CommentInput
            @refreshComment="refreshComment"
            v-if="showInput[index]"
            :commentId="comment_list[index].comment_id"
            :commentatorId="comment_list[index].commentator.user_id"
            :origincontent="comment_list[index].comment_content"
          />
        </el-row>
        <ul class="comment-next" v-if="response_list[index]">
          <li v-if="isShow[index] && total[index]">
            <span class="more">共{{ total[index] }}条回复，</span>
            <span class="more-click" @click="showmore(index)">点击查看</span>
          </li>
          <div v-if="!isShow[index]">
            <li
              v-for="(_, indexNext) in response_list[index]"
              :id="String(response_list[index][indexNext].comment_id)"
              :key="indexNext"
            >
              <CommentContent
                @refreshComment="refreshComment"
                @openComment="openComment"
                :responseList="response_list[index][indexNext]"
                :commentatorId="comment_list[index].commentator.user_id"
                :index="index"
                :indexNext="indexNext"
                :isShow="showInputNext[index][indexNext]"
              />
              <el-row type="flex" justify="end">
                <CommentInput
                  @refreshComment="refreshComment"
                  v-if="showInputNext[index][indexNext]"
                  :responseTo="response_list[index][indexNext]"
                  :responserId="
                    response_list[index][indexNext].respondent.user_id
                  "
                  :responsecontent="
                    response_list[index][indexNext].comment_content
                  "
                  :commentId="comment_list[index].comment_id"
                  :commentatorId="comment_list[index].commentator.user_id"
                  :origincontent="comment_list[index].comment_content"
                />
              </el-row>
            </li>
          </div>
          <li v-if="!isShow[index]">
            <span class="limit" @click="showmore(index)">收起</span>
          </li>
        </ul>
        <div class="base-line" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import { getCommentList } from '@/api/comment'
import { getArticleMain } from '@/api/article'
import type { Level0Comment, Level1Comment } from '@/api/comment/types'
import CommentContent from './CommentContent.vue'
import CommentInput from './CommentInput.vue'

const route = useRoute()
const { userStore } = useStore()

const loading = ref<boolean>(false) // 加载中
const user_head_photo = ref<string>('') // 用户头像
const isShow = ref<boolean[]>([])
const showInput = ref<boolean[]>([])
const showInputNext = ref<boolean[][]>([])
const initShowInput = ref<boolean[]>([])
const initShowInputNext = ref<boolean[][]>([])
const comment_list = ref<Level0Comment[]>([])
const response_list = ref<Level1Comment[][]>([])
const total = ref<number[]>([])
const object_name = ref<string>('')
const poster_id = ref<number>(0)
const now_object_id = ref<number>(0)

// 获取评论列表
const commentListGetter = async () => {
  //清除原有内容
  isShow.value = []
  comment_list.value = []
  response_list.value = []
  total.value = []

  const res = await getCommentList({
    article_id: Number(route.params.id)
  })
  //清空input相关的数组
  showInput.value = []
  showInputNext.value = []
  initShowInput.value = []
  initShowInputNext.value = []
  if (res.result_code === 0) {
    res.result.forEach((item) => {
      // 遍历存入数据
      comment_list.value.push(item)
      response_list.value.push(item.response)
      let showArray: boolean[] = []
      // 初始化评论展示参数（一级评论和二级评论分开存储）
      if (item.response.length > 0) {
        // 存在二级评论，使用二维数组（false代表“评论”不打开）
        showArray = new Array(item.response.length).fill(false)
      }
      showInputNext.value.push(showArray)
      showInput.value.push(false)

      // 判定是否展示“二级评论下拉条”，记录每条一级评论含有二级评论的数量（为保持代码可读性，与上方代码分离）
      if (item.response.length) {
        isShow.value.push(true)
        total.value.push(item.response.length)
      } else {
        isShow.value.push(true)
        total.value.push(0)
      }
    })
  }
  //创建用于初始化“评论”不打开状态的数组
  initShowInput.value = showInput.value.slice(0)
  if (showInputNext.value) {
    showInputNext.value.forEach((item) => {
      initShowInputNext.value.push(item)
    })
  }
}
//打开/关闭 二级评论下拉框
const showmore = (num: number) => {
  isShow.value[num] = !isShow.value[num]
}
//子传父——打开评论
const openComment = (index?: number, indexNext?: number) => {
  showInput.value = initShowInput.value.slice(0) // 重置“评论”不打开状态
  let cnt = 0 // 用于遍历二维数组

  initShowInputNext.value.forEach((item) => {
    showInputNext.value[cnt++] = item.slice(0)
  })

  if (index !== undefined) {
    if (indexNext === undefined) {
      showInput.value[index] = true
    } else {
      showInputNext.value[index][indexNext] = true
    }
  }
}
//子传父——重新拉取评论
const refreshComment = async () => {
  await commentListGetter()
  openComment()
}

onMounted(async () => {
  loading.value = true
  // 获取目前用户的头像
  if (!userStore.userInfo) {
    user_head_photo.value =
      'https://cdn.staticaly.com/gh/apprehen/pciture@master/1.1rkws8wwaf9c.webp'
  } else {
    user_head_photo.value = userStore.userInfo.headphoto
  }
  // 调用获取评论方法
  await commentListGetter()
  // 获取当前评论的文章信息
  const res = await getArticleMain({
    article_id: Number(route.params.id)
  })
  object_name.value = res.result.article_title
  poster_id.value = res.result.author_id
  now_object_id.value = Number(route.params.id)

  // 如果路由中带有哈希(#)，那么把所有折叠的评论都展开
  if (route.hash) {
    for (let i = 0; i < comment_list.value.length; i++) {
      showmore(i)
    }
  }
  loading.value = false
})
</script>

<style scoped lang="less">
.comment-wrap {
  position: relative;
  padding: 20px;
  margin: 20px 0;
  width: 710px;
  background: #fff;
  border-radius: 20px;
  transition: all 0.5s;

  .comment-tag {
    display: flex;
    align-items: end;
    width: 100%;
    height: 30px;

    .line {
      margin-right: 12px;
      width: 8px;
      height: 30px;
      background-color: #76fff5;
    }

    span {
      font-size: 18px;
      font-family: SourceHanSansCN-Medium, sans-serif;
      color: #000;
    }
  }

  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }

  .comments {
    padding: 0;
    list-style: none;
  }

  .comment-next {
    list-style: none;
  }

  .more {
    position: relative;
    left: 10px;
    font-size: 14px;
    font-family: SourceHanSansCN-Regular, sans-serif;
    color: #939393;
    line-height: 17px;
  }

  .more-click {
    position: relative;
    left: 10px;
    font-size: 14px;
    font-family: SourceHanSansCN-Regular, sans-serif;
    color: #939393;
    line-height: 17px;
    cursor: pointer;

    &:hover {
      color: #76fff5;
    }
  }

  .limit {
    position: relative;
    left: 10px;
    font-size: 14px;
    font-family: SourceHanSansCN-Regular, sans-serif;
    color: #939393;
    line-height: 17px;
    cursor: pointer;

    &:hover {
      color: #76fff5;
    }
  }

  .base-line {
    width: 100%;
    height: 1px;
    transform: rotate(0deg);
    background-color: #d8d8d8;
  }
}
</style>
