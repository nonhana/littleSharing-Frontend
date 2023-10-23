<template>
  <div name="FocusItem" class="FocusItem-wrap" v-loading="gettingInfo">
    <el-row type="flex" justify="space-between" style="align-items: center">
      <div style="display: flex; align-items: center">
        <div>
          <div @click="enterSpace(user_id)">
            <img :src="headphoto" />
          </div>
        </div>
        <div style="margin: 20px 0 0 20px">
          <el-row style="margin: 0 0 10px 0">
            <span class="username">{{ username }}</span>
          </el-row>
          <el-row>
            <span class="details">自我介绍：{{ details }}</span>
          </el-row>
        </div>
      </div>
      <div v-loading="execFollow">
        <div
          v-if="isMyFocus && isMyCenter"
          class="isMyFocus"
          @click="follow(1)"
        >
          <span>已关注</span>
        </div>
        <div
          v-if="!isMyFocus && isMyCenter"
          class="isMyFocus"
          @click="follow(0)"
        >
          <span>未关注</span>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/store/user";
import { getUserInfo, focusUserActions, getUserFocusList } from "@/api/user";
import { ElMessage } from "element-plus";

const props = defineProps<{
  user_id: number;
}>();

const route = useRoute();
const router = useRouter();

const userStore = useUserStore();

const gettingInfo = ref<boolean>(false);
const execFollow = ref<boolean>(false);
const username = ref<string>("用户名称");
const details = ref<string>("用户签名");
const headphoto = ref<string>("https://dummyimage.com/400X400");
const isMyFocus = ref<boolean>(false);
const isMyCenter = ref<boolean>(false);

const follow = async (num: number) => {
  switch (num) {
    case 0: {
      execFollow.value = true;
      const res = await focusUserActions({
        first_user_id: userStore.userInfo.user_id,
        second_user_id: props.user_id,
        action_type: num,
      });
      execFollow.value = false;
      if (res.data.result_code == 0) {
        isMyFocus.value = !isMyFocus.value;
        ElMessage({
          type: "success",
          message: "关注成功",
        });
      }
      break;
    }
    case 1: {
      execFollow.value = true;
      const res = await focusUserActions({
        first_user_id: userStore.userInfo.user_id,
        second_user_id: props.user_id,
        action_type: num,
      });
      execFollow.value = false;
      if (res.data.result_code == 0) {
        isMyFocus.value = !isMyFocus.value;
        ElMessage({
          type: "success",
          message: "取消关注成功",
        });
      }
      break;
    }
  }
};
// 点击进入他人主页
const enterSpace = (id: number): void => {
  router.push({
    path: "/MyArticles/" + id,
  });
};

watch(
  () => route.params,
  (newV, _) => {
    if (Number(newV.id) === userStore.userInfo.user_id) {
      isMyCenter.value = true;
    }
  },
  { immediate: true, deep: true }
);

onMounted(async () => {
  gettingInfo.value = true;
  const res = await getUserInfo({ user_id: props.user_id });
  if (res.data.result_code == 0) {
    username.value = res.data.result.name;
    details.value = res.data.result.signature;
    headphoto.value = res.data.result.headphoto;
    const userFocusListRes = await getUserFocusList({
      user_id: userStore.userInfo.user_id,
    });
    if (userFocusListRes.data.result_code === 0) {
      userFocusListRes.data.result.forEach((item: any) => {
        if (item === props.user_id) {
          isMyFocus.value = true;
        }
      });
    }
  }
  gettingInfo.value = false;
});
</script>

<style scoped lang="less">
.FocusItem-wrap {
  position: relative;
  width: 1024px;
  height: 71px;
  border-radius: 10px;
  background-color: #fff;
  img {
    position: relative;
    margin: 20px 0 0 10px;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    cursor: pointer;
  }
  .username {
    height: 17px;
    font-family: SourceHanSansCN-Regular;
    font-size: 14px;
    font-weight: normal;
    line-height: 17px;
    color: #3d3d3d;
  }
  .details {
    width: 473px;
    word-break: break-all;
    font-family: SourceHanSansCN-Regular;
    font-size: 12px;
    font-weight: normal;
    line-height: 17px;
    color: #9e9e9e;
  }
  .isMyFocus {
    width: 70px;
    height: 31px;
    border-radius: 10px;
    box-sizing: border-box;
    border: 1.5px solid #ffc180;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    span {
      height: 17px;
      font-family: SourceHanSansCN-Regular;
      font-size: 12px;
      font-weight: normal;
      line-height: 17px;
      color: #ff8200;
    }
  }
}
</style>
