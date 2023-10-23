<template>
  <div class="ArticleHomeItem-wrap">
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
        <div class="more">
          <img src="@/statics/svg/More.svg" />
        </div>
        <template #dropdown>
          <el-dropdown-menu v-if="routeStatus == 0">
            <el-dropdown-item command="1" style="display: flex">
              <div style="margin: 6px 6px 0 0">
                <img src="@/statics/svg/ReEdit.svg" />
              </div>
              <span>重新编辑</span></el-dropdown-item
            >
            <el-dropdown-item command="2" style="display: flex">
              <div style="margin: 6px 6px 0 0">
                <img src="@/statics/svg/DeleteArticle.svg" />
              </div>
              <span>删除文章</span></el-dropdown-item
            >
          </el-dropdown-menu>
          <el-dropdown-menu v-if="routeStatus == 1">
            <el-dropdown-item command="3" style="display: flex">
              <div style="margin: 6px 6px 0 0">
                <img src="@/statics/svg/CancelCollect.svg" />
              </div>
              <span>取消收藏</span></el-dropdown-item
            >
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
      <div @click="push(1)">
        <span class="article_introduce">{{ article_introduce }}</span>
      </div>
    </el-row>
    <el-row type="flex" justify="start">
      <el-col :span="0.5">
        <el-row type="flex" class="action_list">
          <div>
            <img src="@/statics/svg/LittleLike.svg" />
            <span>{{ like_num }}</span>
          </div>
          <div>
            <img src="@/statics/svg/LittleCollection.svg" />
            <span>{{ collection_num }}</span>
          </div>
          <div>
            <img src="@/statics/svg/LittleShare.svg" />
            <span>{{ share_num }}</span>
          </div>
          <div>
            <img src="@/statics/svg/LittleComment.svg" />
            <span>{{ comment_num }}</span>
          </div>
        </el-row>
        <el-row type="flex" style="margin-top: 10px">
          <span class="article_date"
            >文章发表时间：{{ article_uploaddate }}</span
          >
          <span class="article_date" style="margin: 0 0 0 20px"
            >最后更新时间：{{ article_updatedate }}</span
          >
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";
import { deleteArticle } from "@/api/article";
import { addCollection } from "@/api/user";
import { ElMessageBox, ElNotification } from "element-plus";
import { formatDate } from "@/utils";

const props = defineProps<{
  articleList: any;
}>();

const emits = defineEmits<{
  (e: "getArticleList", data: boolean): void;
}>();

const router = useRouter();

const userStore = useUserStore();

const routeStatus = ref<number>(0);
const id = ref<number>(props.articleList.article_id);
const article_status = ref<string>(props.articleList.article_status);
const article_link = ref<string>(props.articleList.article_link);
const article_title = ref<string>(props.articleList.article_title);
const article_major = ref<any[]>(props.articleList.article_major);
const article_labels = ref<any[]>(props.articleList.article_labels);
const article_introduce = ref<string>(props.articleList.article_introduce);
const article_uploaddate = ref<string>(
  formatDate(props.articleList.article_uploaddate)
);
const article_updatedate = ref<string>(
  formatDate(props.articleList.article_updatedate)
);
const author_id = ref<number>(props.articleList.author_id);
const author_head = ref<string>(props.articleList.author_headphoto);
const author_name = ref<string>(props.articleList.author_name);
const author_signature = ref<string>(props.articleList.author_signature);
const author_university = ref<string>(props.articleList.author_university);
const article_num = ref<number>(props.articleList.article_num);
const like_num = ref<number>(props.articleList.like_num);
const collection_num = ref<number>(props.articleList.collection_num);
const share_num = ref<number>(props.articleList.share_num);
const comment_num = ref<number>(props.articleList.comment_num);

const major = computed(() => article_major.value.join("-"));

const push = (num: number) => {
  if (num === 1) {
    const routeUrl = router.resolve({
      path: "/articleHome/" + id.value,
    });
    window.open(routeUrl.href, "_blank");
  }
  if (num === 2) {
    router.push({
      path: "/personalCenter/" + author_id.value,
    });
  }
};
const articlechoices = (num: string) => {
  if (num === "1") {
    router.push({
      path: "/postArticle",
      query: {
        article_id: id.value,
      },
    });
  }
  if (num === "2") {
    ElMessageBox.confirm(
      "注：删除之后的文章无法被再次找回！",
      "是否删除该文章？",
      {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      }
    ).then(async () => {
      const res = await deleteArticle({ article_id: id.value });
      if (res.data.result_code === 0) {
        ElNotification({
          title: "文章删除成功！",
          type: "success",
        });
        emits("getArticleList", true);
      }
    });
  }
  if (num === "3") {
    ElMessageBox.confirm("您确定要取消收藏该文章吗？", "提醒", {
      distinguishCancelAndClose: true,
      confirmButtonText: "确认",
      cancelButtonText: "取消",
    }).then(async () => {
      const paramsList = {
        article_id: id.value,
        action_type: 1,
        user_id: userStore.userInfo.user_id,
      };
      const res = await addCollection(paramsList);
      if (res.data.result_code === 0) {
        ElNotification({
          title: "取消收藏成功！",
          message: "2s后刷新页面...",
          type: "success",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    });
  }
};

watch(
  routeStatus,
  () => {
    if (router.currentRoute.value.name == "MyCollection") {
      routeStatus.value = 1;
    }
  },
  {
    immediate: true,
  }
);

watch(
  () => props.articleList,
  (newV, _) => {
    id.value = newV.article_id;
    article_status.value = newV.article_status;
    article_link.value = newV.article_link;
    article_title.value = newV.article_title;
    article_major.value = newV.article_major;
    article_labels.value = newV.article_labels;
    article_introduce.value = newV.article_introduce;
    article_uploaddate.value = formatDate(newV.article_uploaddate);
    article_updatedate.value = formatDate(newV.article_updatedate);
    author_head.value = newV.author_headphoto;
    author_name.value = newV.author_name;
    author_signature.value = newV.author_signature;
    author_university.value = newV.author_university;
    like_num.value = newV.like_num;
    collection_num.value = newV.collection_num;
    share_num.value = newV.share_num;
    comment_num.value = newV.comment_num;
    article_num.value = newV.article_num;
  },
  { immediate: true, deep: true }
);
</script>

<style scoped lang="less">
.ArticleHomeItem-wrap {
  position: relative;
  width: 500px;
  border-radius: 20px;
  border: 1px solid #9e9e9e;
  background: #ffffff;
  padding: 9px 14px;
  margin: 30px;
  transition: all 0.3s;
  .title {
    height: 26px;
    width: 400px;
    font-family: SourceHanSansCN-Bold;
    font-size: 18px;
    font-weight: bold;
    color: #3d3d3d;
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
  .copied {
    padding: 0 10px;
    height: 26px;
    border-radius: 13px;
    background: #ff6c6c;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-family: SourceHanSansCN-Regular;
      font-size: 14px;
      font-weight: normal;
      color: #ffffff;
    }
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
    span {
      font-family: SourceHanSansCN-Regular;
      font-size: 14px;
      font-weight: normal;
      color: #ffffff;
    }
  }
  .article_introduce {
    width: 100%;
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
  .article_introduce:hover {
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
    img {
      width: 48px;
    }
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
    span {
      font-family: SourceHanSansCN-Regular;
      font-size: 10px;
      font-weight: normal;
      color: #ffffff;
    }
  }
  .action_list {
    width: 150px;
    height: 16px;
    display: flex;
    justify-content: space-between;
    div {
      display: flex;
      align-items: center;
    }
    > * span {
      height: 14px;
      font-family: SourceHanSansCN-Regular;
      font-size: 10px;
      font-weight: normal;
      color: #3d3d3d;
    }
    > * svg {
      cursor: pointer;
    }
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
    span {
      font-family: SourceHanSansCN-Regular;
      font-size: 12px;
      font-weight: normal;
      color: #3d3d3d;
    }
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
    span {
      font-family: SourceHanSansCN-Regular;
      font-size: 12px;
      font-weight: normal;
      color: #3d3d3d;
    }
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
    span {
      font-family: SourceHanSansCN-Regular;
      font-size: 10px;
      font-weight: normal;
      color: #ffffff;
    }
  }
  .article_date {
    font-family: SourceHanSansCN-Regular;
    font-size: 12px;
    font-weight: normal;
    color: #9e9e9e;
  }
}
.ArticleHomeItem-wrap:hover {
  box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.3);
}
</style>
@/api/comment @/api/article
