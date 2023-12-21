<template>
  <div :class="curClass">
    <el-row v-if="curClass !== 'login' && curClass !== 'messages'">
      <CommonHeader />
    </el-row>
    <div
      class="logo"
      v-if="curClass === 'login'"
      :style="{
        opacity: logo_opacity
      }"
    >
      <img :src="Logo" />
    </div>
    <el-row style="margin: 25px 0 0">
      <router-view />
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Logo from '@/assets/imgs/Logo.png'

useHead({
  title: 'littleSharing~☆',
  meta: [
    {
      name: 'description',
      content: '兴趣使然的学术资源分享小站'
    },
    {
      name: 'keywords',
      content:
        '学术资源,资源分享,学术交流,学术论文,学术论坛,学术资源分享,学术资源共享,学术资源下载,学术资源网站,学术资源网,学术资源分享网站,学术资源共享网站,学术资源下载网站,学术资源网站大全,学术资源网站推荐,学术资源网站分享,学术资源网站导航,学术资源网站收藏,学术资源网站推荐,学术资源网站大全,学术资源网站分享,学术资源网站导航,学术资源网站收藏,学术资源网站推荐,学术资源网站大全,学术资源网站分享,学术资源网站导航,学术资源网站收藏,学术资源网站推荐,学术资源网站大全,学术资源网站分享,学术资源网站导航,学术资源网站收藏,学术资源网站推荐,学术资源网站大全,学术资源网站分享,学术资源网站导航,学术资源网站收藏,学术资源网站推荐,学术资源网站大全,学术资源网站分享,学术资源网站导航,学术资源网站收藏,学术资源网站推荐,学术资源网站大全,学术资源网站分享,学术资源网站导航,学术资源网站收藏'
    },
    {
      name: 'author',
      content: 'nonhana'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0'
    }
  ]
})
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
  width: 100%;
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
  background-image: url('assets/imgs/articleBack.png');
}

.login {
  background-image: url('assets/imgs/loginBack.jpg');
}

.messages {
  background-image: url('assets/imgs/messageBack.png');
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
</style>
