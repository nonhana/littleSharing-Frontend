<template>
  <div class="CommentInput-wrap">
    <el-row>
      <textarea
        type="text"
        class="inputarea"
        placeholder="写点什么吧"
        v-model="commentContent"
        @keyup="handleKeyCode($event)"
      />
    </el-row>
    <el-row type="flex" justify="end">
      <div class="submit" @click="inputComment">
        <span>评论</span>
      </div>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useCurrentDate from "@/utils/useCurrentDate";
import { useRoute } from "vue-router";
import { CommentActionAPI } from "@/api/other";
import { ElNotification } from "element-plus";

interface extendObject {
  [key: string]: any;
}

const props = defineProps<{
  responseTo?: extendObject;
  commentId?: number;
  responserId?: number;
  commentatorId?: number;
  objectName?: string;
  origincontent?: string;
  responsecontent?: string;
  posterId?: string;
  objectId?: string;
  action_type?: number;
}>();

const emits = defineEmits<{
  (
    e: "refreshComment",
    flag: boolean,
    comment_list: any,
    comment_id: number
  ): void;
}>();

const route = useRoute();
const presentDate = useCurrentDate();

const commentContent = ref<string>("");

const inputComment = async () => {
  if (!localStorage.getItem("user_info")) {
    ElNotification({
      title: "操作失败",
      message: "您还未登录，无法进行此操作",
      type: "error",
    });
    return;
  }
  if (commentContent.value) {
    // 发送评论
    let paramsList: extendObject = {
      action_type: 0,
      article_id: Number(route.params.id), //要传值
      user_id: JSON.parse(localStorage.getItem("user_info") as string).id,
      comment_content: commentContent.value,
      create_date: presentDate,
    };
    // 如果是给一级评论评论，给paramslist添加评论id属性
    if (props.commentId) {
      paramsList.response_to_comment_id = props.commentId;
    }
    // 如果是给二级评论评论，给paramslist添加评论对象id、评论id属性
    if (props.responseTo) {
      paramsList.response_to_user_id = props.responseTo.respondent.id;
      paramsList.response_to_comment_id = props.commentId;
    }
    console.log("评论参数", JSON.stringify(paramsList));
    const res = await CommentActionAPI(paramsList);
    console.log("评论成功", res.data);
    //如果添加成功，通知父组件加入评论
    emits(
      "refreshComment",
      true,
      res.data.result.comment_list[0],
      res.data.result.thisID
    );
    commentContent.value = "";
  }
};
const handleKeyCode = (event: KeyboardEvent) => {
  const keyCode = event.key;
  const altKey = event.ctrlKey || event.metaKey;
  if (keyCode === "Enter" && altKey) {
    commentContent.value = commentContent.value + "\n";
  } else if (keyCode === "Enter") {
    event.preventDefault();
    inputComment();
  }
};
</script>

<style scoped lang="less">
.CommentInput-wrap {
  display: block;
  position: relative;
  width: 92%;
  .inputarea {
    width: 100%;
    height: 97px;
    resize: none;
    border-radius: 10px;
    background: #ffffff;
    box-sizing: border-box;
    border: 1.5px solid #ffc180;
    font-family: SourceHanSansCN-Medium;
    font-size: 16px;
    font-weight: 500;
    color: #000;
    outline: none;
    padding: 5px 0 0 10px;
  }
  .submit {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 75px;
    height: 34px;
    border-radius: 17px;
    background: #ffc180;
    cursor: pointer;
    margin: 15px 0 0 0;
    transition: all 0.3s;
  }
  .submit:hover {
    background: #ff8200;
  }
  .submit font {
    font-family: SourceHanSansCN-Bold;
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
  }
}
</style>
@/api/comment
