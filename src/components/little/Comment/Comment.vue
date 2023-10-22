<template>
  <div
    class="Comment-wrap"
    :style="{ height: `${limitli * 108 + initheight}px+200` }"
  >
    <el-row>
      <div class="commentTag">
        <div class="line"></div>
        <span>评论：</span>
      </div>
    </el-row>
    <el-row
      type="flex"
      justify="space-between"
      style="padding: 20px 0px 0px 0px"
    >
      <img :src="user_head_photo" alt="" />
      <CommentInput
        @refreshComment="refreshComment"
        :objectName="object_name"
        :posterId="poster_id"
        :objectId="now_object_id"
      />
    </el-row>

    <ul v-loading="gettingComments" class="comments" ref="comments">
      <li v-for="(_, index) in comment_list" :key="index" style="width: 100%">
        <CommentContent
          @refreshComment="refreshComment"
          @openComment="openComment"
          :commentList="comment_list[index]"
          :index="index"
          :isShow="showInput[index]"
        />
        <el-row type="flex" justify="end">
          <CommentInput
            @refreshComment="refreshComment"
            v-if="showInput[index]"
            :commentId="comment_list[index].comment_id"
            :commentatorId="comment_list[index].commentator.user_id"
            :origincontent="comment_list[index].content"
          />
        </el-row>
        <ul class="commentNext" v-if="response_list[index]">
          <li v-if="isShow[index] && total[index]">
            <span class="more">共{{ total[index] }}条回复，</span>
            <span class="more-click" @click="showmore(index)">点击查看</span>
          </li>
          <div v-if="!isShow[index]">
            <li v-for="(_, indexNext) in response_list[index]" :key="indexNext">
              <CommentContent
                @refreshComment="refreshComment"
                @openComment="openComment"
                :responseList="response_list[index][indexNext]"
                :commentatorId="comment_list[index].commentator.user_id"
                :index="index"
                :indexNext="indexNext"
                :isShow="showInputNext[index][indexNext]"
              />
              <el-row type="flex" justify="end">
                <CommentInput
                  @refreshComment="refreshComment"
                  v-if="showInputNext[index][indexNext]"
                  :responseTo="response_list[index][indexNext]"
                  :responserId="
                    response_list[index][indexNext].respondent.user_id
                  "
                  :responsecontent="response_list[index][indexNext].content"
                  :commentId="comment_list[index].comment_id"
                  :commentatorId="comment_list[index].commentator.user_id"
                  :origincontent="comment_list[index].content"
                />
              </el-row>
            </li>
          </div>
          <li v-if="!isShow[index]">
            <span class="limit" @click="showmore(index)">收起</span>
          </li>
        </ul>
        <div class="baseLine"></div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getCommentList } from "@/api/comment";
import { getArticleMain } from "@/api/article";
import CommentContent from "./CommentContent.vue";
import CommentInput from "./CommentInput.vue";

const comments = ref<HTMLUListElement>();

const route = useRoute();

const gettingComments = ref<boolean>(false);
const user_head_photo = ref<string>("");
const isShow = ref<any[]>([]);
const showInput = ref<any[]>([]);
const showInputNext = ref<any[]>([]);
const initShowInput = ref<any[]>([]);
const initShowInputNext = ref<any[]>([]);
const limitli = ref<number>(0);
const comment_list = ref<any[]>([]);
const response_list = ref<any[]>([]);
const total = ref<any[]>([]);
const initheight = ref<number>(0);
const object_name = ref<string>("");
const poster_id = ref<number>(0);
const now_object_id = ref<number>(0);

// 获取评论列表
const commentListGetter = async () => {
  //清除原有内容
  isShow.value = [];
  comment_list.value = [];
  response_list.value = [];
  total.value = [];

  const res = await getCommentList({
    article_id: Number(route.params.id),
  });
  //清空input相关的数组
  showInput.value = [];
  showInputNext.value = [];
  initShowInput.value = [];
  initShowInputNext.value = [];
  if (res.data.result_code === 0) {
    res.data.result.forEach((item: any) => {
      //遍历存入数据
      comment_list.value.push(item);
      response_list.value.push(item.response);
      //初始化评论展示参数（一级评论和二级评论分开存储）
      if (item.response) {
        //存在二级评论，使用二维数组（false代表“评论”不打开）
        var showArray = new Array(item.response.length).fill(false);
      } else {
        var showArray = [];
      }
      showInputNext.value.push(showArray);
      showInput.value.push(false);

      //判定是否展示“二级评论下拉条”，记录每条一级评论含有二级评论的数量（为保持代码可读性，与上方代码分离）
      if (item.response) {
        isShow.value.push(true);
        total.value.push(item.response.length);
      } else {
        isShow.value.push(true);
        total.value.push(0);
      }
    });
  }
  //创建用于初始化“评论”不打开状态的数组
  initShowInput.value = showInput.value.slice(0);
  if (showInputNext) {
    showInputNext.value.forEach((item) => {
      initShowInputNext.value.push(item);
    });
  }
};
//打开/关闭 二级评论下拉框
const showmore = (num: number) => {
  isShow.value[num] = !isShow.value[num];
  if (!isShow.value[num]) {
    limitli.value += comment_list.value[num].response.length;
  } else {
    limitli.value -= comment_list.value[num].response.length;
  }
};
//子传父——打开评论
const openComment = (index?: any, indexNext?: any) => {
  //初始化评论展示参数
  showInput.value = initShowInput.value.slice(0);
  let cnt = 0;

  initShowInputNext.value.forEach((item) => {
    showInputNext.value[cnt++] = item.slice(0);
  });

  if (indexNext == undefined) {
    showInput.value[index] = true;
  } else {
    showInputNext.value[index][indexNext] = true;
  }
};
//子传父——重新拉取评论
const refreshComment = async () => {
  await commentListGetter();
  openComment();
};

onMounted(async () => {
  gettingComments.value = true;
  // 获取目前用户的头像
  if (!localStorage.getItem("user_info")) {
    user_head_photo.value =
      "https://cdn.staticaly.com/gh/apprehen/pciture@master/1.1rkws8wwaf9c.webp";
  } else {
    user_head_photo.value = JSON.parse(
      localStorage.getItem("user_info") as string
    ).headphoto;
  }
  // 调用获取评论方法
  await commentListGetter();
  // 获取当前评论的文章信息
  const res = await getArticleMain({
    article_id: Number(route.params.id),
  });
  object_name.value = res.data.result.article_title;
  poster_id.value = res.data.result.author_id;
  now_object_id.value = Number(route.params.id);

  // 调用ResizeObserver监听评论高度
  const myObserver1 = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      initheight.value = entry.borderBoxSize[0].blockSize;
    });
  });
  myObserver1.observe(comments.value as Element);
  setTimeout(() => {
    myObserver1.unobserve(comments.value as Element);
  });
  gettingComments.value = false;
});
</script>

<style scoped lang="less">
.Comment-wrap {
  transition: all 0.5s;
  margin: 20px 0;
  padding: 20px;
  position: relative;
  width: 710px;
  border-radius: 20px;
  background: #ffffff;
  .commentTag {
    display: flex;
    align-items: end;
    width: 100%;
    height: 30px;
    .line {
      width: 8px;
      height: 30px;
      background-color: #76fff5;
      margin-right: 12px;
    }
    span {
      width: 60px;
      font-family: SourceHanSansCN-Medium;
      font-size: 18px;
      font-weight: 500;
      line-height: 17px;
      color: #000000;
    }
  }
  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }
  .comments {
    padding: 0px;
    list-style: none;
  }
  .commentNext {
    list-style: none;
  }
  .more {
    position: relative;
    left: 10px;
    font-family: SourceHanSansCN-Regular;
    font-size: 14px;
    font-weight: normal;
    line-height: 17px;
    color: #939393;
  }
  .more-click {
    position: relative;
    left: 10px;
    font-family: SourceHanSansCN-Regular;
    font-size: 14px;
    font-weight: normal;
    line-height: 17px;
    color: #939393;
    cursor: pointer;
  }
  .more-click:hover {
    color: #76fff5;
  }
  .limit {
    position: relative;
    left: 10px;
    font-family: SourceHanSansCN-Regular;
    font-size: 14px;
    font-weight: normal;
    line-height: 17px;
    color: #939393;
    cursor: pointer;
  }
  .limit:hover {
    color: #76fff5;
  }
  .baseLine {
    width: 100%;
    height: 1px;
    transform: rotate(0deg);
    background-color: #d8d8d8;
  }
}
</style>
@/api/comment @/api/article
