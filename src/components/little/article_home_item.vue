<template>
  <div class="articleHomeItem-wrap">
    <div
      :style="{
        width: cover_status,
      }"
    >
      <el-row type="flex" justify="space-between">
        <div style="display: flex">
          <div class="title" @click="push(1)">
            <span>{{ article_title }}</span>
          </div>
          <div
            v-if="article_status == '1'"
            class="copied"
            style="margin: 0 0 0 10px"
          >
            <span>转载</span>
          </div>
          <div
            v-if="article_status == '2'"
            class="original"
            style="margin: 0 0 0 10px"
          >
            <span>原创</span>
          </div>
        </div>

        <el-dropdown @command="articlechoices">
          <div class="el-dropdown-link more">
            <img src="@/statics/svg/More.svg" />
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="1" style="display: flex">
                <div style="margin: 6px 6px 0 0">
                  <img src="@/statics/svg/Report.svg" />
                </div>
                <span>举报</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-row>

      <el-row type="flex" style="margin-top: 10px">
        <div class="article_major">
          <span>{{ major }}</span>
        </div>
        <div
          class="article_labels"
          v-for="(_, index) in article_labels"
          :key="index"
        >
          <span>{{ article_labels[index] }}</span>
        </div>
      </el-row>

      <el-row>
        <div class="article_introduce" @click="push(1)">
          <span>{{ article_introduce }}</span>
        </div>
      </el-row>

      <el-row type="flex" justify="space-between" style="width: 100%">
        <el-col :span="0.5" style="display: flex">
          <el-col :span="0.5">
            <el-tooltip
              class="item"
              effect="light"
              content="点击前往个人主页"
              placement="left"
            >
              <div class="author_head" @click="push(2)">
                <img :src="author_head" alt="" />
              </div>
            </el-tooltip>
          </el-col>
          <el-col :span="0.5" style="margin-left: 20px">
            <el-row type="flex">
              <span class="author_name">{{ author_name }}</span>
              <div class="article_num" style="margin-left: 10px">
                <span>该用户已发表{{ article_num }}篇文章</span>
              </div>
              <div class="author_university" style="margin-left: 10px">
                <span>{{ author_university }}</span>
              </div>
            </el-row>
            <el-row style="margin: 5px 0 0 0">
              <span class="author_signature">{{ author_signature }}</span>
            </el-row>
          </el-col>
        </el-col>
        <el-col :span="0.5">
          <el-row type="flex" class="action_list">
            <div>
              <div @click="addlike()">
                <like :likemark="likemark" />
              </div>
              <div style="margin: 3px 0 0 0">
                <span>{{ like_num }}</span>
              </div>
            </div>
            <div>
              <div @click="addcollection()">
                <collection :collectionmark="collectionmark" />
              </div>
              <div style="margin: 3px 0 0 0">
                <span>{{ collection_num }}</span>
              </div>
            </div>
            <div>
              <div @click="addshare()">
                <share />
              </div>
              <div style="margin: 3px 0 0 0">
                <span>{{ share_num }}</span>
              </div>
            </div>
            <div>
              <div>
                <comment />
              </div>
              <div style="margin: 3px 0 0 0">
                <span>{{ comment_num }}</span>
              </div>
            </div>
          </el-row>
          <el-row style="margin: 10px 0 0 0" type="flex">
            <span class="article_uploaddate"
              >最后更新时间：{{ article_updatedate }}</span
            >
          </el-row>
        </el-col>
      </el-row>
    </div>

    <div v-if="cover_image">
      <el-popover placement="left" :width="400" trigger="hover">
        <template #reference>
          <el-image
            slot="reference"
            :src="cover_image"
            :alt="cover_image"
            style="max-height: 150px; max-width: 200px"
          ></el-image>
        </template>
        <el-image :src="cover_image"></el-image>
      </el-popover>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, onMounted, computed, ref } from "vue";
import { ArticleInfo } from "@/types";
import router from "@/router";
import {
  likeActionAPI,
  getUserLikeList,
  collectActionAPI,
  getUserCollectList,
} from "@/api/other";
import like from "./like.vue";
import collection from "./collection.vue";
import share from "./share.vue";
import comment from "./comment.vue";
import { ElMessage, ElMessageBox } from "element-plus";

const props = defineProps<{
  articleList: ArticleInfo;
}>();

let cover_image = props.articleList.cover_image;
let likemark = ref<number>(0);
let collectionmark = ref<number>(0);
let id = props.articleList.article_id;
let article_status = props.articleList.article_status;
let article_title = props.articleList.article_title;
let article_major = props.articleList.article_major;
let article_labels = props.articleList.article_labels;
let article_introduce = props.articleList.article_introduce;
let article_updatedate = props.articleList.article_updatedate;
let author_id = props.articleList.author_id;
let author_head = props.articleList.author_headphoto;
let author_name = props.articleList.author_name;
let author_signature = props.articleList.author_signature;
let author_university = props.articleList.author_university;
let article_num = props.articleList.article_num;
let like_num = ref<number>(props.articleList.like_num);
let collection_num = ref<number>(props.articleList.collection_num);
let share_num = ref<number>(props.articleList.share_num);
let comment_num = props.articleList.comment_num;

watch(
  () => props.articleList,
  (newV, _) => {
    id = newV.article_id;
    article_status = newV.article_status;
    article_title = newV.article_title;
    article_major = newV.article_major;
    article_labels = newV.article_labels;
    article_introduce = newV.article_introduce;
    article_updatedate = newV.article_updatedate;
    author_head = newV.author_headphoto;
    author_name = newV.author_name;
    author_signature = newV.author_signature;
    author_university = newV.author_university;
    like_num.value = newV.like_num;
    collection_num.value = newV.collection_num;
    share_num.value = newV.share_num;
    comment_num = newV.comment_num;
    article_num = newV.article_num;
  },
  { immediate: true, deep: true }
);

const present_date = computed(() => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const monthStr = month > 9 ? month : "0" + month;
  const dayStr = day < 10 ? "0" + day : day;
  return year + "-" + monthStr + "-" + dayStr;
});
const cover_status = computed(() => {
  if (cover_image) {
    return "80%";
  } else {
    return "100%";
  }
});
const major = computed(() => {
  return article_major.join("-");
});

const articlechoices = (num: number) => {
  if (num === 1) {
    console.log("123");
  }
};
const push = (num: number) => {
  if (num === 1) {
    const routeUrl = router.resolve({
      path: "/articleHome/" + id,
    });
    window.open(routeUrl.href, "_blank");
  }
  if (num === 2) {
    router.push({
      path: "/personalCenter/" + author_id,
    });
  }
};
const addlike = () => {
  if (likemark.value !== 1) {
    likemark.value = 1;
    like_num.value++;
    const paramsList = {
      article_id: id,
      user_id: JSON.parse(localStorage.getItem("user_info") as string).id,
      update_date: present_date.value,
      action_type: 0,
    };
    likeActionAPI(paramsList).then((res) => {
      console.log(res.data);
      ElMessage({
        message: "点赞成功",
      });
    });
  } else {
    likemark.value = 0;
    like_num.value--;
    const paramsList = {
      article_id: id,
      action_type: 1,
      user_id: JSON.parse(localStorage.getItem("user_info") as string).id,
    };
    likeActionAPI(paramsList).then((res) => {
      console.log(res.data);
      ElMessage({
        message: "取消点赞",
      });
    });
  }
};
const addcollection = () => {
  if (collectionmark.value !== 1) {
    collectionmark.value = 1;
    collection_num.value++;
    const paramsList = {
      article_id: id,
      user_id: JSON.parse(localStorage.getItem("user_info") as string).id,
      update_date: present_date.value,
      action_type: 0,
    };
    collectActionAPI(paramsList).then((res) => {
      console.log(res.data);
      ElMessage({
        message: "收藏成功",
      });
    });
  } else {
    collectionmark.value = 0;
    collection_num.value--;
    const paramsList = {
      article_id: id,
      action_type: 1,
      user_id: JSON.parse(localStorage.getItem("user_info") as string).id,
    };
    collectActionAPI(paramsList).then((res) => {
      console.log(res.data);
      ElMessage({
        message: "取消收藏",
      });
    });
  }
};
const addshare = () => {
  ElMessageBox.alert(
    window.location.origin + "/articleHome/" + id,
    "点击确定复制链接",
    {
      confirmButtonText: "确定",
      callback: () => {
        share_num.value++;
        // 复制url到用户的剪切板
        navigator.clipboard
          .writeText(window.location.origin + "/articleHome/" + id)
          .then(() => {
            ElMessage({
              type: "info",
              message: "复制成功！请尽快转发哦~",
            });
          });
      },
    }
  );
};

onMounted(async () => {
  const userId = JSON.parse(localStorage.getItem("user_info") as string).id;

  const likeListRes = await getUserLikeList({ user_id: userId });
  if (likeListRes.data.like_list) {
    likemark.value = likeListRes.data.like_list.includes(id) ? 1 : 0;
  }

  const collectListRes = await getUserCollectList({ user_id: userId });
  if (collectListRes.data.collect_list) {
    collectionmark.value = collectListRes.data.collect_list.includes(id)
      ? 1
      : 0;
  }
});
</script>

<style scoped lang="less">
.articleHomeItem-wrap {
  position: relative;
  width: 975px;
  border-radius: 20px;
  background: #ffffff;
  padding: 9px 14px;
  margin-bottom: 30px;
  transition: all 0.3s;
  display: flex;
  align-items: center;

  .title {
    height: 26px;
    font-family: SourceHanSansCN-Bold;
    font-size: 18px;
    font-weight: bold;
    color: #3d3d3d;
    cursor: pointer;
  }

  .copied {
    width: max-content;
    padding: 0 10px;
    height: 26px;
    border-radius: 13px;
    background: #ff6c6c;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .copied span {
    font-family: SourceHanSansCN-Regular;
    font-size: 14px;
    font-weight: normal;
    color: #ffffff;
  }

  .original {
    width: max-content;
    padding: 0 10px;
    height: 26px;
    border-radius: 13px;
    background: #ff8200;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .original span {
    font-family: SourceHanSansCN-Regular;
    font-size: 14px;
    font-weight: normal;
    color: #ffffff;
  }

  .article_introduce span {
    word-break: break-all;
    font-family: SourceHanSansCN-Regular;
    font-size: 12px;
    line-height: 36px;
    font-weight: normal;
    color: #9e9e9e;
    cursor: pointer;
    /* 以下是显示固定行数的文字的css，多余文字用省略号表示 */
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    word-break: break-all;
    cursor: pointer;
  }

  .article_introduce font:hover {
    color: #00ead8;
  }

  .author_head {
    width: 48px;
    height: 48px;
    border-radius: 24px;
    background-color: #76fff5;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .author_head img {
    width: 48px;
  }

  .author_name {
    height: 20px;
    font-family: SourceHanSansCN-Regular;
    font-size: 14px;
    font-weight: normal;
    color: #3d3d3d;
  }

  .author_signature {
    height: 20px;
    font-family: SourceHanSansCN-Regular;
    font-size: 14px;
    font-weight: normal;
    color: #3d3d3d;
  }

  .article_num {
    width: max-content;
    padding: 0 10px;
    height: 20px;
    border-radius: 10px;
    background: #76fff5;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .article_num span {
    font-family: SourceHanSansCN-Regular;
    font-size: 10px;
    font-weight: normal;
    color: #ffffff;
  }

  .action_list {
    height: 16px;
    display: flex;
  }

  .action_list > div {
    display: flex;
  }

  .action_list > * span {
    font-family: SourceHanSansCN-Regular;
    font-size: 16px;
    font-weight: normal;
    color: #3d3d3d;
    margin: 0 10px;
  }

  .action_list > * svg {
    cursor: pointer;
  }

  .action_list > * svg path {
    transition: all 0.2s;
  }

  .action_list > * svg:hover path {
    fill: #76fff5;
  }

  .article_major {
    width: max-content;
    margin: 0 5px;
    padding: 0 10px;
    height: 20px;
    border-radius: 10px;
    background: #4aff98;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .article_major span {
    font-family: SourceHanSansCN-Regular;
    font-size: 12px;
    font-weight: normal;
    color: #3d3d3d;
  }

  .article_labels {
    width: max-content;
    margin: 0 5px;
    padding: 0 10px;
    height: 20px;
    border-radius: 10px;
    background: #d9fe32;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .article_labels span {
    font-family: SourceHanSansCN-Regular;
    font-size: 12px;
    font-weight: normal;
    color: #3d3d3d;
  }

  .more {
    margin: 0 10px 0 0;
    cursor: pointer;
  }

  .author_university {
    width: max-content;
    padding: 0 10px;
    height: 20px;
    border-radius: 10px;
    background: #bb76ff;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .author_university span {
    font-family: SourceHanSansCN-Regular;
    font-size: 10px;
    font-weight: normal;
    color: #ffffff;
  }

  .article_uploaddate {
    font-family: SourceHanSansCN-Regular;
    font-size: 12px;
    font-weight: normal;
    color: #9e9e9e;
  }
}

.articleHomeItem-wrap:hover {
  box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.3);
}
</style>
