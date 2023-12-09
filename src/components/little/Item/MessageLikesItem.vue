<template>
  <div class="messagelikesitem-wrap">
    <el-row type="flex" justify="space-between">
      <div class="part1">
        <div class="img">
          <img :src="likeMessageInfo.user_img" />
        </div>
        <div class="details">
          <el-row type="flex">
            <span
              class="details-content"
              v-if="likeMessageInfo.like_status === 0"
            >
              <span class="clickable">{{ likeMessageInfo.user_name }}</span>
              赞了您的评论
            </span>
            <span class="details-title" v-else>
              <span class="clickable">{{ likeMessageInfo.user_name }}</span>
              赞了您的文章
              <span class="clickable">{{
                likeMessageInfo?.article_info?.article_title
              }}</span>
            </span>
          </el-row>
          <el-row type="flex">
            <span
              v-if="likeMessageInfo.like_status === 0"
              class="details-inner"
            >
              {{ likeMessageInfo.comment_info?.comment_content }}
            </span>
            <span v-else class="details-inner">
              {{ likeMessageInfo.article_info?.article_details }}
            </span>
          </el-row>
          <el-row style="margin-top: 10px" type="flex">
            <span class="details-date">
              {{ likeMessageInfo.like_date }}
            </span>
          </el-row>
        </div>
      </div>
      <div class="part2">
        <div class="content">
          <span v-if="likeMessageInfo.like_status === 0">
            {{ likeMessageInfo.comment_info?.comment_content }}
          </span>
          <span v-else>
            {{ likeMessageInfo.article_info?.article_details }}
          </span>
        </div>
        <div class="button">
          <img src="@/assets/svgs/MessageActions.svg" />
        </div>
      </div>
    </el-row>
  </div>
</template>

<script setup lang="ts">
type ArticleInfo = {
  article_id: number
  article_title: string
  article_details: string
}
type CommentInfo = {
  comment_id: number
  comment_content: string
}
defineProps<{
  likeMessageInfo: {
    user_id: number
    user_name: string
    user_img: string
    like_status: number
    article_info?: ArticleInfo
    comment_info?: CommentInfo
    like_date: string
  }
}>()
</script>

<style scoped lang="less">
.messagelikesitem-wrap {
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

    .img {
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
        width: 400px;
        font-size: 14px;
        font-family: 'Microsoft YaHei', sans-serif;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #3d3d3d;
        cursor: pointer;

        &:hover {
          color: #76fff5;
        }
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
      font-size: 12px;
      font-family: 'Microsoft YaHei', sans-serif;
      text-overflow: ellipsis;
      color: #9e9e9e;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      cursor: pointer;

      &:hover {
        color: #76fff5;
      }
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
