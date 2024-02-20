<template>
  <div class="articlehomeitem-wrap">
    <div
      :style="{
        width: cover_status
      }"
    >
      <el-row type="flex" justify="space-between">
        <div style="display: flex">
          <a
            class="title"
            :href="articleURL"
            target="_blank"
            :title="article_title"
          >
            <span>{{ article_title }}</span>
          </a>
          <div
            v-if="article_status === 1"
            class="copied"
            style="margin: 0 0 0 10px"
          >
            <span>转载</span>
          </div>
          <div
            v-if="article_status === 2"
            class="original"
            style="margin: 0 0 0 10px"
          >
            <span>原创</span>
          </div>
        </div>

        <el-dropdown>
          <div class="more">
            <img :src="More" alt="More" />
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="1" style="display: flex">
                <div style="margin: 6px 6px 0 0">
                  <img :src="Report" alt="Report" />
                </div>
                <span>举报</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-row>

      <el-row type="flex" style="margin-top: 10px">
        <div class="article-major">
          <span>{{ major }}</span>
        </div>
        <div
          class="article-labels"
          v-for="(_, index) in article_labels"
          :key="index"
        >
          <span>{{ article_labels[index] }}</span>
        </div>
      </el-row>

      <el-row>
        <a
          class="article-introduce"
          :href="articleURL"
          target="_blank"
          :title="article_introduce"
        >
          <span>{{ article_introduce }}</span>
        </a>
      </el-row>

      <el-row type="flex" justify="space-between" style="width: 100%">
        <div style="display: flex">
          <a class="author-head" :href="userURL">
            <img :src="author_head" alt="author_head" />
          </a>
          <div style="margin-left: 20px">
            <el-row type="flex">
              <span class="author-name">{{ author_name }}</span>
              <div class="article-num" style="margin-left: 10px">
                <span>该用户已发表{{ author_article_num }}篇文章</span>
              </div>
              <div class="author-university" style="margin-left: 10px">
                <span>{{ author_university }}</span>
              </div>
            </el-row>
            <el-row style="margin: 5px 0 0">
              <span class="author-signature">{{ author_signature }}</span>
            </el-row>
          </div>
        </div>
        <div>
          <el-row type="flex" class="action-list">
            <div>
              <div @click="addlike()">
                <LikeBtn :likemark="likemark" />
              </div>
              <div style="margin: 3px 0 0">
                <span>{{ like_num }}</span>
              </div>
            </div>
            <div>
              <div @click="addcollection()">
                <CollectionBtn :collectionmark="collectionmark" />
              </div>
              <div style="margin: 3px 0 0">
                <span>{{ collection_num }}</span>
              </div>
            </div>
            <div>
              <div @click="addshare()">
                <ShareBtn />
              </div>
              <div style="margin: 3px 0 0">
                <span>{{ share_num }}</span>
              </div>
            </div>
            <div>
              <div>
                <CommentBtn />
              </div>
              <div style="margin: 3px 0 0">
                <span>{{ comment_num }}</span>
              </div>
            </div>
          </el-row>
          <el-row style="margin: 10px 0 0" type="flex">
            <span class="article-uploaddate"
              >最后更新时间：{{ article_updatedate }}</span
            >
          </el-row>
        </div>
      </el-row>
    </div>

    <div style="margin-left: 20px" v-if="cover_image">
      <el-popover placement="left" :width="400" trigger="hover">
        <template #reference>
          <el-image
            :src="cover_image"
            :alt="cover_image"
            style="
              width: 150px;
              height: 150px;
              border: 1px solid #eee;
              border-radius: 20px;
            "
          ></el-image>
        </template>
        <el-image :src="cover_image" />
      </el-popover>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, onMounted, computed, ref } from 'vue'
import { useStore } from '@/store'
import type { Article } from '@/api/article/types'
import {
  addLike,
  getUserLikeList,
  addCollection,
  getUserCollectList
} from '@/api/user'
import { postMessage } from '@/api/message'
import { formatDate } from '@/utils'
import LikeBtn from '@/components/Little/Button/LikeBtn.vue'
import CollectionBtn from '@/components/Little/Button/CollectionBtn.vue'
import ShareBtn from '@/components/Little/Button/ShareBtn.vue'
import CommentBtn from '@/components/Little/Button/CommentBtn.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import More from '@/assets/svgs/More.svg'
import Report from '@/assets/svgs/Report.svg'

const props = defineProps<{
  articleList: Article
}>()

const { userStore } = useStore()

const likemark = ref<number>(0)
const collectionmark = ref<number>(0)
const like_num = ref<number>(props.articleList.like_num)
const collection_num = ref<number>(props.articleList.collection_num)
const share_num = ref<number>(props.articleList.share_num)

let cover_image = props.articleList.article_cover
let article_id = props.articleList.article_id
let article_status = props.articleList.article_status
let article_title = props.articleList.article_title
let article_major = props.articleList.article_major
let article_labels = props.articleList.article_labels
let article_introduce = props.articleList.article_introduce
let article_updatedate = formatDate(props.articleList.article_updatedate)
let author_id = props.articleList.author_id
let author_head = props.articleList.author_headphoto
let author_name = props.articleList.author_name
let author_signature = props.articleList.author_signature
let author_university = props.articleList.author_university
let author_article_num = props.articleList.author_article_num
let comment_num = props.articleList.comment_num

watch(
  () => props.articleList,
  (newV, _) => {
    article_id = newV.article_id
    article_status = newV.article_status
    article_title = newV.article_title
    article_major = newV.article_major
    article_labels = newV.article_labels
    article_introduce = newV.article_introduce
    article_updatedate = formatDate(newV.article_updatedate)
    author_head = newV.author_headphoto
    author_name = newV.author_name
    author_signature = newV.author_signature
    author_university = newV.author_university
    like_num.value = newV.like_num
    collection_num.value = newV.collection_num
    share_num.value = newV.share_num
    comment_num = newV.comment_num
    author_article_num = newV.author_article_num
  },
  { immediate: true }
)

const present_date = computed(() => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const monthStr = month > 9 ? month : '0' + month
  const dayStr = day < 10 ? '0' + day : day
  return year + '-' + monthStr + '-' + dayStr
})
const cover_status = computed(() => {
  if (cover_image) {
    return '80%'
  } else {
    return '100%'
  }
})
const major = computed(() => {
  return article_major.join('-')
})
const articleURL = computed(() => {
  return window.location.origin + '/articleHome/' + article_id
})
const userURL = computed(() => {
  return window.location.origin + '/personalCenter/' + author_id
})

const addlike = async () => {
  if (userStore.isLogin) {
    if (likemark.value !== 1) {
      likemark.value = 1
      like_num.value++
      await addLike({
        article_id: article_id,
        user_id: userStore.userInfo.user_id,
        update_date: present_date.value,
        action_type: 0
      })
      ElMessage({
        message: '点赞成功'
      })
      if (author_id !== userStore.userInfo.user_id) {
        await postMessage({
          receiver_id: author_id,
          type: 1,
          content:
            '<span> 您的文章' +
            `<a href="${
              import.meta.env.VITE_SITE_URL
            }/articleHome/${article_id}" target="_blank"> ${article_title} </a>` +
            '被点赞了 </span>'
        })
      }
    } else {
      likemark.value = 0
      like_num.value--
      await addLike({
        article_id: article_id,
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
      collection_num.value++
      await addCollection({
        article_id: article_id,
        user_id: userStore.userInfo.user_id,
        update_date: present_date.value,
        action_type: 0
      })
      ElMessage({
        message: '收藏成功'
      })
      if (author_id !== userStore.userInfo.user_id) {
        await postMessage({
          receiver_id: author_id,
          type: 1,
          content:
            '<span> 您的文章' +
            `<a href="${
              import.meta.env.VITE_SITE_URL
            }/articleHome/${article_id}" target="_blank"> ${article_title} </a>` +
            '被收藏了 </span>'
        })
      }
    } else {
      collectionmark.value = 0
      collection_num.value--
      await addCollection({
        article_id: article_id,
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
  ElMessageBox.alert(
    window.location.origin + '/articleHome/' + article_id,
    '点击确定复制链接',
    {
      confirmButtonText: '确定',
      callback: () => {
        share_num.value++
        // 复制url到用户的剪切板
        navigator.clipboard
          .writeText(window.location.origin + '/articleHome/' + article_id)
          .then(() => {
            ElMessage({
              type: 'info',
              message: '复制成功！请尽快转发哦~'
            })
          })
      }
    }
  )
}

onMounted(async () => {
  if (userStore.isLogin) {
    const likeListRes = await getUserLikeList()
    if (likeListRes.result_code === 0) {
      likemark.value = likeListRes.result.includes(article_id) ? 1 : 0
    }

    const collectListRes = await getUserCollectList({
      user_id: userStore.userInfo.user_id
    })
    if (collectListRes.result_code === 0) {
      collectionmark.value = collectListRes.result.includes(article_id) ? 1 : 0
    }
  }
})
</script>

<style scoped lang="less">
.articlehomeitem-wrap {
  position: relative;
  display: flex;
  align-items: center;
  padding: 9px 14px;
  margin-bottom: 30px;
  width: 970px;
  background: #fff;
  border-radius: 20px;
  transition: all 0.3s;

  .title {
    height: 26px;
    font-size: 18px;
    font-family: 'AlibabaPuHuiTi-3-65-Medium', sans-serif;
    color: #3d3d3d;
    cursor: pointer;
  }

  .copied {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    width: max-content;
    height: 26px;
    font-size: 14px;
    font-family: 'AlibabaPuHuiTi-3-55-Regular', sans-serif;
    color: #fff;
    background: #ff6c6c;
    border-radius: 13px;
  }

  .original {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    width: max-content;
    height: 26px;
    font-size: 14px;
    font-family: 'AlibabaPuHuiTi-3-55-Regular', sans-serif;
    color: #fff;
    background: #ff8200;
    border-radius: 13px;
  }

  .article-introduce span {
    display: -webkit-box;
    overflow: hidden;
    font-size: 12px;
    font-family: 'AlibabaPuHuiTi-3-55-Regular', sans-serif;
    text-overflow: ellipsis;
    color: #9e9e9e;
    line-height: 36px;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    word-break: break-all;
    cursor: pointer;

    font:hover {
      color: #00ead8;
    }
  }

  .author-head {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 48px;
    height: 48px;
    background-color: #76fff5;
    border-radius: 24px;
    cursor: pointer;

    img {
      width: 48px;
    }
  }

  .author-name {
    height: 20px;
    font-size: 14px;
    font-family: 'AlibabaPuHuiTi-3-55-Regular', sans-serif;
    color: #3d3d3d;
  }

  .author-signature {
    height: 20px;
    font-size: 14px;
    font-family: 'AlibabaPuHuiTi-3-55-Regular', sans-serif;
    color: #3d3d3d;
  }

  .article-num {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    width: max-content;
    height: 20px;
    font-size: 12px;
    font-family: 'AlibabaPuHuiTi-3-55-Regular', sans-serif;
    color: #fff;
    background: #76fff5;
    border-radius: 10px;
  }

  .action-list {
    display: flex;
    height: 16px;
    font-size: 16px;
    font-family: 'AlibabaPuHuiTi-3-55-Regular', sans-serif;
    color: #3d3d3d;

    & > div {
      display: flex;
    }

    & > * span {
      margin: 0 10px;
    }

    > * svg {
      cursor: pointer;

      path {
        transition: all 0.2s;
      }

      &:hover path {
        fill: #76fff5;
      }
    }
  }

  .article-major {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    margin: 0 5px;
    width: max-content;
    height: 20px;
    font-size: 12px;
    font-family: 'AlibabaPuHuiTi-3-55-Regular', sans-serif;
    color: #3d3d3d;
    background: #4aff98;
    border-radius: 10px;
  }

  .article-labels {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    margin: 0 5px;
    width: max-content;
    height: 20px;
    font-size: 12px;
    font-family: 'AlibabaPuHuiTi-3-55-Regular', sans-serif;
    color: #3d3d3d;
    background: #d9fe32;
    border-radius: 10px;
  }

  .more {
    margin: 0 10px 0 0;
    cursor: pointer;
  }

  .author-university {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    width: max-content;
    height: 20px;
    font-size: 12px;
    font-family: 'AlibabaPuHuiTi-3-55-Regular', sans-serif;
    color: #fff;
    background: #bb76ff;
    border-radius: 10px;
  }

  .article-uploaddate {
    font-size: 12px;
    font-family: 'AlibabaPuHuiTi-3-55-Regular', sans-serif;
    color: #9e9e9e;
  }
}

.articlehomeitem-wrap:hover {
  box-shadow: 4px 4px 10px 0 rgb(0 0 0 / 30%);
}
</style>
