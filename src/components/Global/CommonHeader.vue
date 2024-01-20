<template>
  <div class="commonheader-wrap">
    <div class="part1">
      <a class="logo" :href="routePaths[0]">
        <img :src="Logo" alt="Logo" />
      </a>
      <span>兴趣使然的学术资源分享小站</span>
    </div>

    <div class="part2">
      <a
        :style="{
          visibility: userStore.isLogin ? 'visible' : 'hidden'
        }"
        class="button"
        :href="routePaths[3]"
        @mouseenter="moveMessageSvg(1)"
        @mouseleave="moveMessageSvg(2)"
      >
        <div>
          <div
            style="position: relative; transition: all 0.3s"
            :style="{
              top: `${MessageSvgTop1}px`
            }"
          >
            <img :src="Message_1" alt="Message_1" />
          </div>
          <div
            style="position: relative; transition: all 0.3s"
            :style="{
              top: `${MessageSvgTop2}px`,
              transform: svgChange
            }"
          >
            <img :src="Message_2" alt="Message_2" />
          </div>
        </div>

        <span>消息中心</span>
      </a>
      <el-badge
        class="badge"
        v-if="unreadCount !== 0"
        :value="unreadCount"
        :max="99"
      />
      <a
        :style="{
          visibility: userStore.isLogin ? 'visible' : 'hidden'
        }"
        class="button"
        :href="routePaths[1]"
        @mouseenter="movePostSvg(1)"
        @mouseleave="movePostSvg(2)"
      >
        <div>
          <div
            style="position: relative; transition: all 0.3s"
            :style="{
              top: `${PostSvgTop1}px`
            }"
          >
            <img :src="PostArticle_1" alt="PostArticle_1" />
          </div>
          <div
            style="position: relative; transition: all 0.3s"
            :style="{
              top: `${PostSvgTop2}px`,
              transform: svgChange
            }"
          >
            <img :src="PostArticle_2" alt="PostArticle_2" />
          </div>
        </div>

        <span>上传文章</span>
      </a>

      <el-dropdown
        v-if="userStore.isLogin"
        class="login"
        @command="loginchoices"
      >
        <div>
          <img :src="user_head" alt="user_head" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="1" style="display: flex">
              <div style="margin: 6px 6px 0 0">
                <img :src="PersonalCenter" alt="PersonalCenter" />
              </div>
              <span>个人主页</span>
            </el-dropdown-item>
            <el-dropdown-item command="2" style="display: flex">
              <div style="margin: 6px 6px 0 0">
                <img :src="ExitLogin" alt="ExitLogin" />
              </div>
              <span>退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-tooltip v-else content="点击前往登录页" placement="right">
        <a class="login" :href="routePaths[2]">
          <span>登录</span>
        </a>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import { getUnreadMessageCount } from '@/api/message'
import Logo from '@/assets/svgs/Logo.svg'
import Message_1 from '@/assets/svgs/Message_1.svg'
import Message_2 from '@/assets/svgs/Message_2.svg'
import PostArticle_1 from '@/assets/svgs/PostArticle_1.svg'
import PostArticle_2 from '@/assets/svgs/PostArticle_2.svg'
import PersonalCenter from '@/assets/svgs/PersonalCenter.svg'
import ExitLogin from '@/assets/svgs/ExitLogin.svg'

const router = useRouter()

const { userStore, unreadCountStore } = useStore()

const PostSvgTop1 = ref(15)
const PostSvgTop2 = ref(65)
const MessageSvgTop1 = ref(13)
const MessageSvgTop2 = ref(70)
const svgChange = ref('scale(1,1)')
const user_head = ref('')
const user_id = ref<number>(0)
const unreadCount = ref<number>(0)

const routePaths: string[] = [
  window.location.origin + '/home',
  window.location.origin + '/postArticle',
  window.location.origin + '/login',
  window.location.origin + '/message'
]

const loginchoices = (num: string) => {
  switch (num) {
    case '1':
      router.push({
        path: '/personalCenter/' + user_id.value
      })
      break
    case '2':
      localStorage.clear()
      window.location.reload()
      break
  }
}
const movePostSvg = (num: number) => {
  if (num === 1) {
    PostSvgTop1.value = -85
    PostSvgTop2.value = -12
    setTimeout(() => {
      svgChange.value = 'scale(1.4,1.4)'
    }, 300)
    setTimeout(() => {
      svgChange.value = 'scale(1,1)'
    }, 900)
  } else {
    PostSvgTop1.value = 15
    PostSvgTop2.value = 65
    svgChange.value = 'scale(1,1)'
  }
}
const moveMessageSvg = (num: number) => {
  if (num === 1) {
    MessageSvgTop1.value = -85
    MessageSvgTop2.value = -9
    setTimeout(() => {
      svgChange.value = 'scale(1.4,1.4)'
    }, 300)
    setTimeout(() => {
      svgChange.value = 'scale(1,1)'
    }, 900)
  } else {
    MessageSvgTop1.value = 13
    MessageSvgTop2.value = 70
    svgChange.value = 'scale(1,1)'
  }
}

onMounted(async () => {
  if (userStore.isLogin) {
    user_head.value = userStore.userInfo.headphoto
    user_id.value = userStore.userInfo.user_id
    const { result } = await getUnreadMessageCount()
    unreadCountStore.setUnreadCount(result)
    unreadCount.value = result.total
  }
})
</script>

<style scoped lang="less">
.commonheader-wrap {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  width: 100%;
  height: 64px;
  background-color: #fff;
  border-radius: 20px;

  .part1 {
    display: flex;
    align-items: center;
    height: 100%;

    .logo {
      width: 36px;
      height: 36px;
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
      }
    }

    span {
      margin-left: 20px;
      height: 20px;
      font-size: 14px;
      font-family: SourceHanSansCN-Regular, sans-serif;
      color: #3d3d3d;
    }
  }

  .search-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    height: 100%;
  }

  .part2 {
    display: flex;
    justify-content: space-between;
    width: 320px;

    .button {
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      width: 110px;
      height: 40px;
      background: #76fff5;
      border-radius: 20px;
      transition: all 0.3s;
      cursor: pointer;

      &:hover {
        box-shadow: 2px 2px 4px 0 rgb(0 0 0 / 30%);
      }

      span {
        height: 17px;
        font-size: 14px;
        font-family: YouYuan, sans-serif;
        color: #3d3d3d;
      }
    }

    .badge {
      right: 25px;
      bottom: 6px;
    }

    .login {
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      width: 40px;
      height: 40px;
      font-size: 12px;
      font-family: SourceHanSansCN-Medium, sans-serif;
      color: #3d3d3d;
      background: #eee;
      border-radius: 50%;
      cursor: pointer;

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
  }
}
</style>
