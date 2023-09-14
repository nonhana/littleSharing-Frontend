<template>
  <div class="MessageLikes-wrap">
    <div class="head">
      <div style="display: flex; align-items: center">
        <img src="@/statics/svg/MessageLikesHead.svg" />
        <span>赞我的</span>
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
          v-for="index in messageNum > likeMessageListAll.length
            ? likeMessageListAll.length
            : messageNum"
        >
          <MessageLikesItem
            :like-message-info="likeMessageListAll[index - 1]"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import MessageLikesItem from "../little/MessageLikesItem.vue";

interface ArticleInfo {
  article_id: number;
  article_title: string;
  article_details: string;
}
interface CommentInfo {
  comment_id: number;
  comment_content: string;
}
interface LikeMessageInfo {
  user_id: number;
  user_name: string;
  user_img: string;
  like_status: number;
  article_info?: ArticleInfo;
  comment_info?: CommentInfo;
  like_date: string;
}

const router = useRouter();
const likeMessageItem1: LikeMessageInfo = {
  user_id: 1,
  user_name: "Alice",
  user_img: "https://dummyimage.com/400X400",
  like_status: 1,
  article_info: {
    article_id: 101,
    article_title: "First Article",
    article_details: "This is the content of the first article.",
  },
  like_date: "2023-07-19 09:30:00",
};
const likeMessageItem2: LikeMessageInfo = {
  user_id: 1,
  user_name: "Alice",
  user_img: "https://dummyimage.com/400X400",
  like_status: 0,
  comment_info: {
    comment_id: 1,
    comment_content:
      "评论内容评论内评论内容评论内容评论内容容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容",
  },
  like_date: "2023-07-19 09:30:00",
};
const likeMessageListAll = ref<LikeMessageInfo[]>(
  new Array(10000)
    .fill(0)
    .map((_, index) => (index % 2 === 0 ? likeMessageItem1 : likeMessageItem2))
);

let messageNum = ref<number>(7);
let loading = ref<boolean>(true);

const load = () => {
  if (messageNum.value < likeMessageListAll.value.length) {
    messageNum.value += 5;
  }
};

onMounted(async () => {
  await nextTick();
  loading.value = false;
});
</script>

<style scoped lang="less">
.MessageLikes-wrap {
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
    width: 950px;
    height: 60px;
    border-radius: 10px;
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    opacity: 0.7;
    transition: all 0.5s ease;

    img {
      margin-left: 30px;
    }

    span {
      margin-left: 10px;
      font-family: Microsoft YaHei;
      font-size: 14px;
      font-weight: normal;
      color: #3d3d3d;
    }
  }
  .head:hover {
    opacity: 1;
  }
  .message-list {
    margin-top: 20px;
    height: 600px;
    overflow-y: scroll;
  }
}
</style>
