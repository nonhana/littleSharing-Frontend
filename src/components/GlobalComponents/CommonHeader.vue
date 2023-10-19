<template>
  <div class="CommonHeader-wrap">
    <div class="title">
      <div style="cursor: pointer" @click="push(0)">
        <img src="@/statics/svg/Logo.svg" />
      </div>
      <span>&nbsp;&nbsp;兴趣使然的学术资源分享小站</span>
    </div>

    <div class="search_box">
      <img src="@/statics/svg/Search.svg" />
      <el-input
        v-model="keyvalue"
        placeholder="输入关键字进行检索~"
        style="width: 250px; margin-left: 10px"
      ></el-input>
    </div>

    <div
      class="button"
      style="margin-left: 180px"
      @click="push(4)"
      @mouseenter="moveMessageSvg(1)"
      @mouseleave="moveMessageSvg(2)"
    >
      <div>
        <div
          style="position: relative; transition: all 0.3s"
          :style="{
            top: `${MessageSvgTop1}px`,
          }"
        >
          <img src="@/statics/svg/Message_1.svg" />
        </div>
        <div
          style="position: relative; transition: all 0.3s"
          :style="{
            top: `${MessageSvgTop2}px`,
            transform: svgChange,
          }"
        >
          <img src="@/statics/svg/Message_2.svg" />
        </div>
      </div>

      <span>消息中心</span>
    </div>

    <div
      class="button"
      style="margin-left: 50px"
      @click="push(1)"
      @mouseenter="movePostSvg(1)"
      @mouseleave="movePostSvg(2)"
    >
      <div>
        <div
          style="position: relative; transition: all 0.3s"
          :style="{
            top: `${PostSvgTop1}px`,
          }"
        >
          <img src="@/statics/svg/PostArticle_1.svg" />
        </div>
        <div
          style="position: relative; transition: all 0.3s"
          :style="{
            top: `${PostSvgTop2}px`,
            transform: svgChange,
          }"
        >
          <img src="@/statics/svg/PostArticle_2.svg" />
        </div>
      </div>

      <span>上传文章</span>
    </div>

    <el-dropdown class="login" @command="loginchoices">
      <div>
        <img :src="user_head" alt="" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="1" style="display: flex">
            <div style="margin: 6px 6px 0 0">
              <img src="@/statics/svg/PersonalCenter.svg" />
            </div>
            <span>个人主页</span>
          </el-dropdown-item>
          <el-dropdown-item command="2" style="display: flex">
            <div style="margin: 6px 6px 0 0">
              <img src="@/statics/svg/ExitLogin.svg" />
            </div>
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const PostSvgTop1 = ref(15);
const PostSvgTop2 = ref(65);
const MessageSvgTop1 = ref(13);
const MessageSvgTop2 = ref(70);
const svgChange = ref("scale(1,1)");
const keyvalue = ref("");
const user_head = ref("");
const user_id = ref<number>(0);

const push = (num: number) => {
  let route_path = "";
  switch (num) {
    case 0:
      route_path = "/home";
      break;
    case 1:
      route_path = "/postArticle";
      break;
    case 2:
      route_path = `/personalCenter/${user_id.value}`;
      break;
    case 3:
      route_path = "/login";
      break;
    case 4:
      route_path = `/message/${user_id.value}`;
      break;
  }
  console.log(route_path);
  router.push({
    path: route_path,
  });
};
const loginchoices = (num: string) => {
  switch (num) {
    case "1":
      push(2);
      break;
    case "2":
      window.localStorage.clear();
      push(3);
      break;
  }
};
const movePostSvg = (num: number) => {
  if (num === 1) {
    PostSvgTop1.value = -85;
    PostSvgTop2.value = -12;
    setTimeout(() => {
      svgChange.value = "scale(1.4,1.4)";
    }, 300);
    setTimeout(() => {
      svgChange.value = "scale(1,1)";
    }, 900);
  } else {
    PostSvgTop1.value = 15;
    PostSvgTop2.value = 65;
    svgChange.value = "scale(1,1)";
  }
};
const moveMessageSvg = (num: number) => {
  if (num === 1) {
    MessageSvgTop1.value = -85;
    MessageSvgTop2.value = -9;
    setTimeout(() => {
      svgChange.value = "scale(1.4,1.4)";
    }, 300);
    setTimeout(() => {
      svgChange.value = "scale(1,1)";
    }, 900);
  } else {
    MessageSvgTop1.value = 13;
    MessageSvgTop2.value = 70;
    svgChange.value = "scale(1,1)";
  }
};

onMounted(() => {
  if (localStorage.getItem("user_info")) {
    user_head.value = JSON.parse(
      localStorage.getItem("user_info") as string
    ).headphoto;
    user_id.value = JSON.parse(
      localStorage.getItem("user_info") as string
    ).user_id;
  }
});
</script>

<style scoped lang="less">
.CommonHeader-wrap {
  position: relative;
  margin: 0 auto;
  width: 100%;
  min-width: 1350px;
  max-width: 1350px;
  height: 64px;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 20px;
}

.title {
  margin: 0 250px 0 40px;
  height: 100%;
  display: flex;
  align-items: center;

  span {
    height: 20px;
    font-family: SourceHanSansCN-Regular;
    font-size: 14px;
    font-weight: normal;
    color: #3d3d3d;
  }
}

.search_box {
  display: flex;
  height: 100%;
  align-items: center;
}

.button {
  width: 110px;
  height: 40px;
  border-radius: 20px;
  background: #76fff5;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
  overflow: hidden;

  span {
    height: 17px;
    font-family: YouYuan;
    font-size: 14px;
    font-weight: 500;
    color: #3d3d3d;
  }
}

.button:hover {
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.3);
}

.login {
  margin: 0 0 0 45px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fa5d34;
  transition: all 0.5s;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  span {
    position: absolute;
    left: 3px;
    top: 6px;
    width: 40px;
    height: 40px;
    font-family: SourceHanSansCN-Medium;
    font-size: 12px;
    font-weight: 500;
    color: #ffffff;
  }

  img {
    margin-top: 2px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}

.login :hover {
  background: #c4492a;
}
</style>
