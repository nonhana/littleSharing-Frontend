<template>
  <div class="CommentContent-wrap">
    <el-row>
      <el-col :span="0.5">
        <img @click="useEnterSpace(userid)" :src="pictureurl" alt="" />
      </el-col>

      <el-col :span="0.5" style="margin-left: 15px">
        <el-row>
          <div class="username">
            <span
              >{{ username }}
              <span v-if="userid == authorId">（作者）</span>
            </span>
            <span
              v-if="
                responseList && responseList.response_to.id != commentatorId
              "
            >
              <img src="@/statics/svg/CommentSvg.svg" />
            </span>
            <span
              v-if="
                responseList && responseList.response_to.id != commentatorId
              "
              >{{ response_to }}
              <span v-if="responseList.response_to.id === authorId"
                >（作者）</span
              >
            </span>
          </div>
        </el-row>

        <el-row style="width: 100%; margin-bottom: 10px">
          <span class="details">{{ details }}</span>
        </el-row>

        <el-row type="flex">
          <div class="dataAbout">
            <el-col :span="0.5">
              <span class="date">{{ date }}</span>
            </el-col>
            <el-col :span="0.5">
              <div class="response">
                <label>
                  <!-- disabled阻止input响应，纯靠isShow控制状态 -->
                  <input
                    class="responseInput"
                    type="checkbox"
                    :checked="isShow"
                    disabled
                  />
                  <div @click="openComment" style="cursor: pointer">
                    <img src="@/statics/svg/CommentContentSvg.svg" />
                    <span>{{ responsenum }}</span>
                  </div>
                </label>
              </div>
            </el-col>

            <el-col :span="0.5">
              <div class="likes" @click="addlike(comment_id)">
                <like style="transform: scale(0.9, 0.9)" :likemark="likemark" />
                <span>{{ likenum }}</span>
              </div>
            </el-col>
          </div>
          <div v-if="deleteshow" style="margin-left: 30px">
            <span class="delete" @click="deleteComment">删除</span>
          </div>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import {
  CommentActionAPI,
  CommentLikeActionAPI,
  getCommentLikeListAPI,
} from "@/api/other";
import { getArticleMainAPI } from "@/api/articles";
import useEnterSpace from "@/utils/useEnterSpace";
// import router from "@/router";
import { useRoute } from "vue-router";
import { ElNotification, ElMessage } from "element-plus";
import like from "@/components/little/like.vue";

const props = defineProps<{
  commentList?: any;
  responseList?: any;
  index?: number;
  indexNext?: number;
  isShow?: boolean;
  commentatorId?: number;
}>();

const emits = defineEmits<{
  (
    e: "openComment",
    index: number | undefined,
    indexNext: number | undefined
  ): void;
  (e: "refreshComment", flag: boolean, status: any, comment_id: number): void;
}>();

const route = useRoute();

const message_send = ref<boolean>(true);
const deleteshow = ref<boolean>(false);
const likemark = ref<number>(0);
const likenum = ref<number>(
  props.commentList ? props.commentList.likes : props.responseList.likes
);
const authorId = ref<number | null>(null);

const userid = computed(() => {
  if (props.commentList) {
    return props.commentList.commentator.id;
  } else {
    return props.responseList.respondent.id;
  }
});
const username = computed(() => {
  if (props.commentList) {
    return props.commentList.commentator.name;
  } else {
    return props.responseList.respondent.name;
  }
});
const date = computed(() => {
  if (props.commentList) {
    return props.commentList.create_date;
  } else {
    return props.responseList.response_date;
  }
});
const details = computed(() => {
  if (props.commentList) {
    return props.commentList.content;
  } else {
    return props.responseList.content;
  }
});
const responsenum = computed(() => {
  if (props.commentList) {
    return props.commentList.response.length;
  } else {
    return "回复";
  }
});
const pictureurl = computed(() => {
  if (props.commentList) {
    return props.commentList.commentator.header_photo;
  } else {
    return props.responseList.respondent.header_photo;
  }
});
const response_to = computed(() => {
  if (props.responseList) {
    return props.responseList.response_to.name;
  } else {
    return "";
  }
});
const comment_id = computed(() => {
  if (props.commentList) {
    return props.commentList.comment_id;
  } else {
    return props.responseList.comment_id;
  }
});

const openComment = () => {
  if (!props.isShow) {
    emits("openComment", props.index, props.indexNext);
    //记录上一次传值
  } else {
    //这里传值undefined，所以comment对应的v-if参数是不存在的（如：showInput[undefined] == true）
    emits("openComment", undefined, undefined);
  }
};
const addlike = async (id: number) => {
  //判断是否登录
  if (!localStorage.getItem("user_info")) {
    ElNotification({
      title: "操作失败",
      message: "您还未登录，无法进行此操作",
      type: "error",
    });
    return;
  }
  if (likemark.value !== 1) {
    likemark.value = 1;
    likenum.value++;
    const paramsList = {
      comment_id: id,
      user_id: JSON.parse(localStorage.getItem("user_info") as string).id,
      action_type: 0,
    };
    await CommentLikeActionAPI(paramsList);
    ElMessage({
      message: "点赞成功",
    });
  } else {
    likemark.value = 0;
    likenum.value--;
    const paramsList = {
      comment_id: id,
      action_type: 1,
      user_id: JSON.parse(localStorage.getItem("user_info") as string).id,
    };
    await CommentLikeActionAPI(paramsList);
    ElMessage({
      message: "取消点赞",
    });
  }
};
const deleteComment = async () => {
  const paramsList = {
    action_type: 1,
    delete_comment_id: comment_id.value,
  };
  await CommentActionAPI(paramsList);
  //如果删除成功，通知父组件重新拉取数据
  emits("refreshComment", false, null, comment_id.value);
};

watch(
  () => props.commentList,
  () => {
    //判断是否有删除权限
    userid.value == JSON.parse(localStorage.getItem("user_info") as string).id
      ? ((deleteshow.value = true), (message_send.value = false))
      : ((deleteshow.value = false), (message_send.value = true));
  },
  { immediate: true, deep: true }
);

watch(
  route.params,
  async (newV, _) => {
    const res = await getArticleMainAPI({ article_id: Number(newV.id) });
    authorId.value = res.data.result.article_main.author_id;
  },
  { immediate: true, deep: true }
);

onMounted(async () => {
  // 获取一级评论的点赞列表
  const res = await getCommentLikeListAPI({
    user_id: JSON.parse(localStorage.getItem("user_info") as string).id,
  });
  if (res.data.result.like_comments_list.length > 0) {
    res.data.result.like_comments_list.forEach((item: any) => {
      if (item == comment_id.value) {
        likemark.value = 1;
      }
    });
  }
});
</script>

<style scoped lang="less">
.CommentContent-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  .username {
    display: flex;
    width: 100%;
    height: 20px;
    span {
      font-family: SourceHanSansCN-Medium;
      font-size: 14px;
      font-weight: 500;
      color: #f8885a;
      margin-right: 10px;
    }
    font span {
      font-family: SourceHanSansCN-Medium;
      font-size: 12px;
      font-weight: bold;
      color: #fe541bd0;
      margin-right: 10px;
    }
  }
  .username :nth-child(2) {
    color: #808080;
  }
  img {
    width: 48px;
    height: 48px;
    cursor: pointer;
    border-radius: 50%;
  }
  .details {
    margin-bottom: 10px;
    width: 80%;
    word-break: break-all;
    font-family: SourceHanSansCN-Normal;
    font-size: 14px;
    font-weight: 350;
    line-height: 24px;
    color: #3d3d3d;
  }
  .response {
    cursor: pointer;
    svg {
      position: relative;
      top: 3px;
      margin-right: 13px;
    }
    span {
      font-family: SourceHanSansCN-Regular;
      font-size: 14px;
      font-weight: normal;
      color: #808080;
      cursor: pointer;
    }
    label {
      display: block;
    }
  }
  .response:hover svg {
    stroke: #f8885a;
  }
  .responseInput {
    display: none;
  }
  .responseInput:checked ~ div svg {
    stroke: #f8885a;
  }
  .responseInput:checked ~ div span {
    color: #f8885a;
  }
  .likes {
    display: flex;
    justify-content: center;
    cursor: pointer;
    margin-top: -3px;
    span {
      margin: 5.5px 0 0 8px;
      font-family: SourceHanSansCN-Regular;
      font-size: 14px;
      font-weight: normal;
      color: #808080;
      cursor: pointer;
    }
    label {
      display: block;
    }
  }
  .likesInput {
    display: none;
  }
  .likesInput:checked ~ div svg {
    stroke: #f8885a;
  }
  .likesInput:checked ~ div span {
    color: #f8885a;
  }
  .delete {
    font-family: SourceHanSansCN-Regular;
    font-size: 14px;
    font-weight: normal;
    color: #808080;
    cursor: pointer;
  }
  .delete:hover {
    color: #f8885a;
  }
  .dataAbout {
    display: flex;
    justify-content: space-around;
    width: 317px;
  }
  .date {
    font-family: SourceHanSansCN-Regular;
    font-size: 14px;
    font-weight: normal;
    color: #808080;
  }
}
</style>