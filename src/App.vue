<template>
  <div name="app" :class="curClass">
    <el-row type="flex" v-if="curClass !== 'login' && curClass !== 'message'">
      <CommonHeader />
    </el-row>
    <div
      class="logo"
      v-if="curClass === 'login'"
      :style="{
        opacity: logo_opacity,
      }"
    >
      <img src="@/statics/img/logo.png" />
    </div>
    <el-row style="margin: 25px 0 0 0">
      <router-view />
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import CommonHeader from "@/components/CommonHeader.vue";

const route = useRoute();
const curClass = ref<string>("app");
const logo_opacity = ref<string>("0%");

watch(
  () => route.name,
  (newV, _) => {
    switch (newV) {
      case "home":
        curClass.value = "home";
        break;
      case "articleHome":
        curClass.value = "article-home";
        break;
      case "login":
        curClass.value = "login";
        break;
      case "messageReplies":
      case "messageCollections":
      case "messageLikes":
      case "messageUsers":
        curClass.value = "messages";
        break;
      default:
        curClass.value = "app";
        break;
    }
  },
  { immediate: true, deep: true }
);

onMounted(() => {
  setTimeout(() => {
    logo_opacity.value = "100%";
  }, 100);
});
</script>

<style scoped>
.app {
  position: relative;
  width: 100%;
}

.home,
.article-home,
.login,
.messages {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 100vh;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

.home {
  background-image: url(statics/img/homeBack.png);
}
.article-home {
  background-image: url(statics/img/articleHomeBack.png);
}
.login {
  background-image: url(statics/img/8.jpg);
}
.messages {
  background-image: url(statics/img/MessageBackImg2.png);
}
.logo {
  position: absolute;
  top: 50px;
  right: 105px;
  transition: all 1s;
}
.logo img {
  width: 500px;
}
</style>
