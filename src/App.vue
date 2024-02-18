<template>
  <div :class="curClass">
    <el-row
      :class="curClass === 'article-home' ? 'article-home-header' : 'header'"
      style="margin: 0 auto"
      v-if="curClass !== 'login' && curClass !== 'messages'"
    >
      <CommonHeader />
    </el-row>
    <div
      class="logo"
      v-if="curClass === 'login'"
      :style="{
        opacity: logo_opacity
      }"
    >
      <img
        src="https://littlesharing-1319721118.cos.ap-shanghai.myqcloud.com/images/Logo.png"
        alt="Logo"
      />
    </div>
    <el-row style="margin: 30px 0 0">
      <router-view />
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import CommonHeader from './components/Global/CommonHeader.vue'

const route = useRoute()

const curClass = ref<string>('app')
const logo_opacity = ref<string>('0%')

watch(
  () => route.name,
  (newV, _) => {
    switch (newV) {
      case 'home':
        curClass.value = 'home'
        break
      case 'articleHome':
        curClass.value = 'article-home'
        break
      case 'login':
        curClass.value = 'login'
        break
      case 'messageCommon':
      case 'messageUsers':
      case 'messageSystem':
        curClass.value = 'messages'
        break
      default:
        curClass.value = 'app'
        break
    }
  },
  { immediate: true }
)

onMounted(() => {
  setTimeout(() => {
    logo_opacity.value = '100%'
  }, 100)
})
</script>

<style scoped>
@import url('./assets/fonts/f.css');

.app {
  position: relative;
  width: 100%;
}

.home,
.article-home,
.login,
.messages {
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100vh;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

.home {
  background: linear-gradient(#a6ffa6, #76fff5);
}

.article-home {
  background-image: url('https://littlesharing-1319721118.cos.ap-shanghai.myqcloud.com/images/articleBack.png');
}

.login {
  background-image: url('https://littlesharing-1319721118.cos.ap-shanghai.myqcloud.com/images/loginBack.jpg');
}

.messages {
  background-image: url('https://littlesharing-1319721118.cos.ap-shanghai.myqcloud.com/images/messageBack.png');
}

.logo {
  position: absolute;
  top: 50px;
  left: 105px;
  transition: all 1s;
}

.logo img {
  width: 500px;
}

.header {
  width: 1350px;
}

.article-home-header {
  min-width: 740px;
  max-width: 1350px;
}
</style>
