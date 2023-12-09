<template>
  <div class="messagecollectionsitem-wrap">
    <el-row type="flex" justify="space-between">
      <div class="part1">
        <div class="img">
          <img :src="collectMessageInfo.user_img" />
        </div>
        <div class="details">
          <el-row type="flex">
            <span class="details-content">
              <span class="clickable">{{ collectMessageInfo.user_name }}</span>
              收藏了您的文章：
              <span class="clickable">{{
                collectMessageInfo.article_title
              }}</span>
            </span>
          </el-row>
          <el-row style="margin-top: 10px" type="flex">
            <span class="details-date">
              {{ collectMessageInfo.collect_date }}
            </span>
          </el-row>
        </div>
      </div>
      <div class="part2">
        <div class="content">
          <span>{{ collectMessageInfo.article_info }}</span>
        </div>
        <div class="button">
          <img src="@/assets/svgs/MessageActions.svg" />
        </div>
      </div>
    </el-row>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  collectMessageInfo: {
    user_id: number
    user_name: string
    user_img: string
    article_id: number
    article_title: string
    article_info: string
    collect_date: string
  }
}>()
</script>

<style scoped lang="less">
.messagecollectionsitem-wrap {
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

        .clickable {
          font-weight: 700;
          cursor: pointer;

          &:hover {
            color: #76fff5;
          }
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
