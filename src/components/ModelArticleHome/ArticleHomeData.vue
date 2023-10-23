<template>
  <el-col :span="0.5" class="ArticleHomeData-wrap">
    <el-row>
      <span class="title">文章数据栏</span>
    </el-row>
    <div style="display: flex; margin: 10px 0 0 0; justify-content: center">
      <div @click="addlike()">
        <like-btn :likemark="likemark" />
      </div>
      <span class="datafont">{{ article_data.like_num }}</span>
      <div @click="addcollection()">
        <collection-btn :collectionmark="collectionmark" />
      </div>
      <span class="datafont">{{ article_data.collection_num }}</span>

      <div @click="addshare()">
        <share-btn />
      </div>
      <span class="datafont">{{ article_data.share_num }}</span>

      <div @click="addcomment()">
        <comment-btn />
      </div>
      <span class="datafont">{{ article_data.comment_num }}</span>
    </div>
  </el-col>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/store/user";
import {
  addLike,
  addCollection,
  getUserLikeList,
  getUserCollectList,
} from "@/api/user";
import { getArticleMain } from "@/api/article";
import LikeBtn from "@/components/Little/Button/LikeBtn.vue";
import CollectionBtn from "@/components/Little/Button/CollectionBtn.vue";
import ShareBtn from "@/components/Little/Button/ShareBtn.vue";
import CommentBtn from "@/components/Little/Button/CommentBtn.vue";
import { ElMessage, ElMessageBox } from "element-plus";

interface articleData {
  like_num: number;
  collection_num: number;
  share_num: number;
  comment_num: number;
}

const route = useRoute();

const userStore = useUserStore();

const currentArticleId: number = Number(route.params.id);

let article_data = ref<articleData>({
  like_num: 0,
  collection_num: 0,
  share_num: 0,
  comment_num: 0,
});
let likemark = ref<number>(0);
let collectionmark = ref<number>(0);

const addlike = async () => {
  if (likemark.value != 1) {
    likemark.value = 1;
    article_data.value.like_num++;
    const paramsList = {
      article_id: currentArticleId,
      action_type: 0,
      user_id: userStore.userInfo.user_id,
    };
    const res = await addLike(paramsList);
    if (res.data.result_code === 0) {
      ElMessage({
        message: "点赞成功",
      });
    }
  } else {
    likemark.value = 0;
    article_data.value.like_num--;
    const paramsList = {
      article_id: currentArticleId,
      action_type: 1,
      user_id: userStore.userInfo.user_id,
    };
    const res = await addLike(paramsList);
    if (res.data.result_code === 0) {
      ElMessage({
        message: "取消点赞",
      });
    }
  }
};
const addcollection = async () => {
  if (collectionmark.value != 1) {
    collectionmark.value = 1;
    article_data.value.collection_num++;
    const paramsList = {
      article_id: currentArticleId,
      action_type: 0,
      user_id: userStore.userInfo.user_id,
    };
    const res = await addCollection(paramsList);
    if (res.data.result_code === 0) {
      ElMessage({
        message: "收藏成功",
      });
    }
  } else {
    collectionmark.value = 0;
    article_data.value.collection_num--;
    const paramsList = {
      article_id: currentArticleId,
      action_type: 1,
      user_id: userStore.userInfo.user_id,
    };
    const res = await addCollection(paramsList);
    if (res.data.result_code === 0) {
      ElMessage({
        message: "取消收藏",
      });
    }
  }
};
const addshare = () => {
  ElMessageBox.alert(window.location.href, "点击确定复制链接", {
    confirmButtonText: "确定",
    callback: async () => {
      article_data.value.share_num++;
      await navigator.clipboard.writeText(window.location.href);
      ElMessage({
        type: "info",
        message: "复制成功！请尽快转发哦~",
      });
    },
  });
};
const addcomment = () => {
  article_data.value.comment_num++;
};

onMounted(async () => {
  const articleDataRes = await getArticleMain({
    article_id: Number(route.params.id),
  });
  const article_main = articleDataRes.data.result;
  article_data.value = {
    like_num: article_main.like_num,
    collection_num: article_main.collection_num,
    share_num: article_main.share_num,
    comment_num: article_main.comment_num,
  };

  const articleId = Number(route.params.id);

  const likeListRes = await getUserLikeList();
  // 检查当前文章是否已经被点赞
  const hasLiked = likeListRes.data.result.includes(articleId);
  likemark.value = hasLiked ? 1 : 0;

  const collectListRes = await getUserCollectList();
  const hasCollected = collectListRes.data.result.includes(articleId);
  collectionmark.value = hasCollected ? 1 : 0;
});
</script>

<style scoped lang="less">
.ArticleHomeData-wrap {
  padding: 10px;
  width: 270px;
  border-radius: 20px;
  background: #ffffff;
  .title {
    height: 35px;
    font-family: SourceHanSansCN-Bold;
    font-size: 24px;
    font-weight: bold;
    color: #3d3d3d;
  }
  .datafont {
    font-family: SourceHanSansCN-Regular;
    font-size: 16px;
    font-weight: normal;
    color: #3d3d3d;
    margin: 0 10px;
  }
}
</style>
@/api/comment @/api/article
