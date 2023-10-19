<template>
  <div class="MessageRepliesItem-wrap">
    <el-row type="flex" justify="space-between">
      <div class="part1">
        <div class="img">
          <img :src="commentMessageInfo.user_img" />
        </div>
        <div class="details">
          <el-row type="flex">
            <span
              class="details-content"
              v-if="commentMessageInfo.comment_status === 0"
            >
              <span class="clickable">{{ commentMessageInfo.user_name }}</span>
              评论了您的文章：
              <span class="clickable">{{
                commentMessageInfo.article_title
              }}</span>
            </span>
            <span class="details-title" v-else>
              <span class="clickable">{{ commentMessageInfo.user_name }}</span>
              回复了您在
              <span class="clickable">{{
                commentMessageInfo.article_title
              }}</span>
              下方的评论：
            </span>
          </el-row>
          <el-row type="flex">
            <span class="details-inner">
              {{ commentMessageInfo.comment_content }}
            </span>
          </el-row>
          <el-row style="margin-top: 10px" type="flex">
            <span class="details-date">
              {{ commentMessageInfo.comment_date }}
            </span>
          </el-row>
        </div>
      </div>
      <div class="part2">
        <div class="content">
          <span>{{ commentMessageInfo.comment_content }}</span>
        </div>
        <div class="button">
          <img src="@/statics/svg/MessageActions.svg" />
        </div>
      </div>
    </el-row>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  commentMessageInfo: {
    user_id: number;
    user_name: string;
    user_img: string;
    article_id: number;
    article_title: string;
    comment_id: number;
    comment_status: number;
    comment_content: string;
    comment_date: string;
  };
}>();
</script>

<style scoped lang="less">
.MessageRepliesItem-wrap {
  position: relative;
  width: 950px;
  padding: 10px;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: #fff;
  opacity: 0.7;
  transition: all 0.5s ease;

  .part1 {
    display: flex;
    justify-content: start;
    align-items: center;
    .img {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      border: 0.5px solid #3d3d3d;
      border-radius: 20px;
      overflow: hidden;
      cursor: pointer;
      img {
        width: 40px;
        height: 40px;
      }
    }
    .details {
      margin-left: 10px;
      &-content {
        width: 400px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-family: Microsoft YaHei;
        font-size: 14px;
        font-weight: normal;
        color: #3d3d3d;
        .clickable {
          font-weight: 700;
          cursor: pointer;
        }
        .clickable:hover {
          color: #76fff5;
        }
      }
      &-inner {
        width: 400px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-family: Microsoft YaHei;
        font-size: 14px;
        font-weight: normal;
        color: #3d3d3d;
        cursor: pointer;
      }
      &-inner:hover {
        color: #76fff5;
      }
      &-date {
        font-family: Microsoft YaHei;
        font-size: 12px;
        font-weight: normal;
        color: #9e9e9e;
      }
    }
  }
  .part2 {
    display: flex;
    align-items: start;
    .content {
      margin-right: 10px;
      width: 120px;
      font-family: Microsoft YaHei;
      font-size: 12px;
      font-weight: normal;
      color: #9e9e9e;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
    }
    .content:hover {
      color: #76fff5;
    }
    .button {
      width: 16px;
      height: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      cursor: pointer;
      img {
        width: 16px;
        height: 16px;
      }
    }
  }
}
.MessageRepliesItem-wrap:hover {
  opacity: 1;
}
</style>
