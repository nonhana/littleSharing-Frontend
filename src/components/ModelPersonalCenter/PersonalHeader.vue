<template>
  <div v-loading="gettingData" class="PersonalHeader-wrap">
    <div class="background">
      <img :src="background_photo" />
    </div>
    <el-row class="partOne">
      <el-row style="margin-top: 20px">
        <div>
          <div class="userhead">
            <img :src="header_photo" />
          </div>
        </div>
        <div>
          <el-row type="flex" style="margin: 0 0 15px 0">
            <span class="username"
              >{{ username }}&emsp;<span>UID:{{ user_id }}</span>
            </span>
          </el-row>
          <el-row style="margin-top: 7px">
            <span class="selfintroduce">{{ selfintroduce }}</span>
          </el-row>
          <el-row
            type="flex"
            justify="space-between"
            style="width: 1100px; align-items: center"
          >
            <div class="partTwo">
              <div @click="push(6)">
                <span class="title">关注数</span>
                <el-row type="flex" justify="center">
                  <span class="num">{{ focus }}</span>
                </el-row>
              </div>
              <div @click="push(6)">
                <span class="title">粉丝数</span>
                <el-row type="flex" justify="center">
                  <span class="num">{{ fans }}</span>
                </el-row>
              </div>
              <div>
                <span class="title">文章点赞量</span>
                <el-row type="flex" justify="center">
                  <span class="num">{{ user.total_like }}</span>
                </el-row>
              </div>
              <div>
                <span class="title">文章收藏量</span>
                <el-row type="flex" justify="center">
                  <span class="num">{{ user.total_collect }}</span>
                </el-row>
              </div>
              <div>
                <span class="title">文章发布数</span>
                <el-row type="flex" justify="center">
                  <span class="num">{{ article_num }}</span>
                </el-row>
              </div>
            </div>
            <div
              @click="focusAction(0)"
              v-if="!isMyCenter && !isMyFocus"
              class="button"
            >
              <span>关注</span>
            </div>
            <div
              @click="focusAction(1)"
              v-if="!isMyCenter && isMyFocus"
              class="button"
            >
              <span>取消关注</span>
            </div>
          </el-row>
        </div>
      </el-row>
    </el-row>

    <el-row class="partThree" type="flex" justify="start">
      <div
        @mouseenter="moveline(1)"
        @mouseleave="moveline(lineCnt)"
        @click="push(1)"
      >
        <img src="@/statics/svg/MyArticles.svg" />
        <span :class="className[0]">我的文章</span>
      </div>
      <div
        @mouseenter="moveline(2)"
        @mouseleave="moveline(lineCnt)"
        @click="push(2)"
      >
        <img src="@/statics/svg/MyCollections.svg" />
        <span :class="className[1]">我的收藏</span>
      </div>
      <div
        @mouseenter="moveline(3)"
        @mouseleave="moveline(lineCnt)"
        @click="push(3)"
      >
        <img src="@/statics/svg/MyInfo.svg" />
        <span :class="className[2]">个人资料</span>
      </div>
      <div
        @mouseenter="moveline(4)"
        @mouseleave="moveline(lineCnt)"
        @click="push(4)"
      >
        <img src="@/statics/svg/MyFocus.svg" />
        <span :class="className[3]">我的关注</span>
      </div>
      <div
        @mouseenter="moveline(5)"
        @mouseleave="moveline(lineCnt)"
        @click="push(5)"
      >
        <img src="@/statics/svg/MyData.svg" />
        <span :class="className[4]">我的数据</span>
      </div>
      <div class="line" :style="{ left: `${linePosition}px` }"></div>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/store/user";
import { HeaderUserInfo } from "@/utils/types";
import {
  getUserInfo,
  getUserLikeNum,
  getUserCollectionNum,
  focusUserActions,
  getUserFocusList,
} from "@/api/user";
import { ElMessage } from "element-plus";

const router = useRouter();
const route = useRoute();

const userStore = useUserStore();

const gettingData = ref<boolean>(false);
const isMyCenter = ref<boolean>(false);
const isMyFocus = ref<boolean>(false);
const user = ref<HeaderUserInfo>({
  background_photo: "",
  header_photo: "",
  user_name: "",
  sign: "",
  follow_count: 0,
  follower_count: 0,
  total_like: 0,
  total_collect: 0,
  total_artcile: 0,
});
const user_id = ref<number>(0);
const linePosition = ref<number>(0);
const positionArray = ref<number[]>([14, 144, 274, 404, 544]);
const lineCnt = ref<number>(1);
const routeMenu = ref<string[]>([
  "MyArticles",
  "MyCollection",
  "MyInfo",
  "MyFocusList",
  "MyData",
]);
const className = ref<string[]>([
  "behovered",
  "behovered",
  "behovered",
  "behovered",
  "behovered",
]);
const initClassName = ref<string[]>([
  "behovered",
  "behovered",
  "behovered",
  "behovered",
  "behovered",
]);

const background_photo = computed(() => user.value.background_photo);
const header_photo = computed(() => user.value.header_photo);
const username = computed(() => user.value.user_name);
const selfintroduce = computed(() => user.value.sign);
const focus = computed(() => user.value.follow_count);
const fans = computed(() => user.value.follower_count);
const article_num = computed(() => user.value.total_artcile);

watch(
  () => route.name,
  async (newV, _) => {
    className.value = initClassName.value.slice(0);
    // 当name=MyFocusList或name=MyFansList时，cnt=3
    let cnt: number;
    if (newV === "MyFocusList" || newV === "MyFansList") {
      cnt = 3;
    } else {
      cnt = routeMenu.value.indexOf(String(newV));
    }
    className.value[cnt] = "behovered beclicked";
    linePosition.value = positionArray.value[cnt];
    lineCnt.value = cnt + 1;
  },
  { immediate: true, deep: true }
);

watch(
  () => route.params.id,
  async (newV, oldV) => {
    if (newV !== oldV) {
      gettingData.value = true;
      user_id.value = Number(newV);
      if (user_id.value === userStore.userInfo.user_id) {
        isMyCenter.value = true;
      } else {
        isMyCenter.value = false;
      }
      const focusListRes = await getUserFocusList({
        user_id: userStore.userInfo.user_id,
      });
      if (focusListRes.data.result_code === 0) {
        if (focusListRes.data.result.length > 0) {
          focusListRes.data.result.forEach((item: any) => {
            if (item.second_user_id === user_id.value) {
              isMyFocus.value = true;
            }
          });
        }
      }
      const userInfoRes = await getUserInfo({ user_id: user_id.value });
      user.value.user_name = userInfoRes.data.result.name;
      user.value.sign = userInfoRes.data.result.signature;
      user.value.header_photo = userInfoRes.data.result.headphoto;
      user.value.background_photo = userInfoRes.data.result.backgroundphoto;
      user.value.total_artcile = userInfoRes.data.result.article_num;
      const likeNumRes = await getUserLikeNum({ user_id: user_id.value });
      if (likeNumRes.data.result_code === 0) {
        user.value.total_like = likeNumRes.data.result;
      }
      const collectionNumRes = await getUserCollectionNum({
        user_id: user_id.value,
      });
      if (collectionNumRes.data.result_code === 0) {
        user.value.total_collect = collectionNumRes.data.result;
      }
      gettingData.value = false;
    }
  },
  { immediate: true, deep: true }
);

const push = (num: number) => {
  router.push({ name: routeMenu.value[num - 1] });
};
const moveline = (num: number) => {
  linePosition.value = positionArray.value[num - 1];
};
const focusAction = async (num: number) => {
  if (num === 0) {
    const res = await focusUserActions({
      first_user_id: userStore.userInfo.user_id,
      second_user_id: user_id.value,
      action_type: num,
    });
    if (res.data.result_code === 0) {
      isMyFocus.value = !isMyFocus.value;
      ElMessage({
        type: "success",
        message: "关注成功",
      });
    } else {
      ElMessage({
        type: "error",
        message: res.data.result_msg,
      });
    }
  } else {
    const res = await focusUserActions({
      first_user_id: userStore.userInfo.user_id,
      second_user_id: user_id.value,
      action_type: num,
    });
    if (res.data.result_code == 0) {
      isMyFocus.value = !isMyFocus.value;
      ElMessage({
        type: "success",
        message: "取消关注成功",
      });
    } else {
      ElMessage({
        type: "error",
        message: res.data.result_msg,
      });
    }
  }
};
</script>

<style scoped lang="less">
.PersonalHeader-wrap {
  position: relative;
  width: 100%;
  background: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  .beclicked {
    color: #ff5900 !important;
  }
  .behovered:hover {
    color: #ff5900 !important;
  }
  .background {
    width: 100%;
    height: 240px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .partOne {
    position: relative;
    display: flex;
  }
  .userhead {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px 30px 17px 56px;
    img {
      width: 120px;
    }
  }
  .username {
    font-family: SourceHanSansCN-Bold;
    font-size: 24px;
    font-weight: bold;
    line-height: 17px;
    letter-spacing: 0em;
    color: #3d3d3d;
    margin-right: 5px;
    span {
      font-family: SourceHanSansCN-Bold;
      font-size: 14px;
      font-weight: normal;
      line-height: 17px;
      color: #9e9e9e;
    }
  }
  .selfintroduce {
    height: 17px;
    font-family: SourceHanSansCN-Regular;
    font-size: 17px;
    font-weight: normal;
    line-height: 17px;
    color: #3d3d3d;
  }
  .partTwo {
    width: 450px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    .partTwo > * {
      height: 40px;
      cursor: pointer;
    }
  }
  .title {
    font-family: SourceHanSansCN-Medium;
    font-size: 12px;
    font-weight: 500;
    line-height: 17px;
    color: #ff5900;
  }
  .num {
    height: 17px;
    font-family: SourceHanSansCN-Medium;
    font-size: 16px;
    font-weight: 500;
    line-height: 17px;
    color: #3d3d3d;
  }
  .partThree {
    position: relative;
    width: 100%;
    height: 66px;
    border-radius: 0px 0px 10px 10px;
    background: #ffffff;
    border-top: 1px solid #76fff5;
    > * {
      margin: 27px 0 0 55px;
      height: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      span {
        margin: 0 0 0 5px;
        font-family: SourceHanSansCN-Medium;
        font-size: 14px;
        font-weight: 500;
        line-height: 17px;
        color: #3d3d3d;
      }
    }
  }
  .line {
    position: absolute;
    top: 34px;
    width: 53px;
    height: 4px;
    background-color: #ffc180;
    transition: all 0.3s;
  }
  .button {
    padding: 8px 16px;
    background-color: #76fff5;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    span {
      font-family: SourceHanSansCN-Medium;
      font-size: 16px;
      font-weight: 500;
      color: #3d3d3d;
      transition: all 0.3s ease;
    }
  }
  .button:hover {
    background-color: #00ead8;
    span {
      color: #ffffff;
    }
  }
}
</style>
