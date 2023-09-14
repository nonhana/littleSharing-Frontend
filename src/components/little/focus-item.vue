<template>
  <div name="FocusItem" class="FocusItem-wrap">
    <el-row type="flex" justify="space-between" style="align-items: center">
      <div style="display: flex; align-items: center">
        <div>
          <div @click="useEnterSpace(user_id)">
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
      <div>
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
import useEnterSpace from "@/utils/useEnterSpace";
import { useRoute } from "vue-router";
import {
  getUserinfoAPI,
  focusUserActionsAPI,
  getUserFocusListAPI,
} from "@/api/user";
import { ElMessage } from "element-plus";

const props = defineProps<{
  user_id: number;
}>();

const route = useRoute();

let username = ref<string>("用户名称");
let details = ref<string>("用户签名");
let headphoto = ref<string>("https://dummyimage.com/400X400");
let isMyFocus = ref<boolean>(false);
let isMyCenter = ref<boolean>(false);

const follow = (num: number) => {
  switch (num) {
    case 0: {
      focusUserActionsAPI({
        first_user_id: JSON.parse(localStorage.getItem("user_info") as string)
          .id,
        second_user_id: props.user_id,
        action_type: num,
      }).then((res) => {
        if (res.data.result_code == 0) {
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
      });
      break;
    }
    case 1: {
      focusUserActionsAPI({
        first_user_id: JSON.parse(localStorage.getItem("user_info") as string)
          .id,
        second_user_id: props.user_id,
        action_type: num,
      }).then((res) => {
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
      });
      break;
    }
  }
};

watch(
  route,
  (newV, _) => {
    if (
      newV.params.id ==
      JSON.parse(localStorage.getItem("user_info") as string).id
    ) {
      isMyCenter.value = true;
    }
  },
  { immediate: true, deep: true }
);

onMounted(async () => {
  const res = await getUserinfoAPI({ user_id: props.user_id });
  if (res.data.result_code == 0) {
    username.value = res.data.user_info.name;
    details.value = res.data.user_info.signature;
    headphoto.value = res.data.user_info.headphoto;
    const userFocusListRes = await getUserFocusListAPI({
      user_id: JSON.parse(localStorage.getItem("user_info") as string).id,
    });
    if (userFocusListRes.data.user_focus_list) {
      userFocusListRes.data.user_focus_list.forEach((item: any) => {
        if (item == props.user_id) {
          isMyFocus.value = true;
        }
      });
    }
  }
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
