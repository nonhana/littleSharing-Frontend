<template>
  <div class="commonheader-wrap">
    <div class="part1">
      <div class="logo" @click="push(0)">
        <img src="@/assets/svgs/Logo.svg" />
      </div>
      <span>兴趣使然的学术资源分享小站</span>
    </div>

    <div class="search-box">
      <img src="@/assets/svgs/Search.svg" />
      <el-input
        v-model="keyvalue"
        placeholder="输入关键字进行检索~"
        style="margin-left: 10px; width: 250px"
      ></el-input>
    </div>

    <div class="part2">
      <el-badge v-if="" :value="unreadCount" :max="99">
        <div
          class="button"
          @click="push(4)"
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
              <img src="@/assets/svgs/Message_1.svg" />
            </div>
            <div
              style="position: relative; transition: all 0.3s"
              :style="{
                top: `${MessageSvgTop2}px`,
                transform: svgChange
              }"
            >
              <img src="@/assets/svgs/Message_2.svg" />
            </div>
          </div>

          <span>消息中心</span>
        </div>
      </el-badge>
      <div
        class="button"
        @click="push(1)"
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
            <img src="@/assets/svgs/PostArticle_1.svg" />
          </div>
          <div
            style="position: relative; transition: all 0.3s"
            :style="{
              top: `${PostSvgTop2}px`,
              transform: svgChange
            }"
          >
            <img src="@/assets/svgs/PostArticle_2.svg" />
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
                <img src="@/assets/svgs/PersonalCenter.svg" />
              </div>
              <span>个人主页</span>
            </el-dropdown-item>
            <el-dropdown-item command="2" style="display: flex">
              <div style="margin: 6px 6px 0 0">
                <img src="@/assets/svgs/ExitLogin.svg" />
              </div>
              <span>退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import { getUnreadMessageCount } from '@/api/message'

const router = useRouter()

const { userStore, unreadCountStore } = useStore()

const PostSvgTop1 = ref(15)
const PostSvgTop2 = ref(65)
const MessageSvgTop1 = ref(13)
const MessageSvgTop2 = ref(70)
const svgChange = ref('scale(1,1)')
const keyvalue = ref('')
const user_head = ref('')
const user_id = ref<number>(0)
const unreadCount = ref<number>(0)

const push = (num: number) => {
  let route_path = ''
  switch (num) {
    case 0:
      route_path = '/home'
      break
    case 1:
      route_path = '/postArticle'
      break
    case 2:
      route_path = `/personalCenter/${user_id.value}`
      break
    case 3:
      route_path = '/login'
      break
    case 4:
      route_path = '/message'
      break
  }
  router.push({
    path: route_path
  })
}
const loginchoices = (num: string) => {
  switch (num) {
    case '1':
      push(2)
      break
    case '2':
      window.localStorage.clear()
      push(3)
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
  if (userStore.userInfo) {
    user_head.value = userStore.userInfo.headphoto
    user_id.value = userStore.userInfo.user_id
  }
  const { result } = await getUnreadMessageCount()
  unreadCountStore.setUnreadCount(result)
  unreadCount.value = result.total
})
</script>

<style scoped lang="less">
.commonheader-wrap {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  margin: 0 auto;
  width: 1290px;
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

    .login {
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      width: 40px;
      height: 40px;
      background: #fa5d34;
      border-radius: 50%;
      transition: all 0.5s;
      cursor: pointer;

      &:hover {
        background: #c4492a;
      }

      span {
        position: absolute;
        top: 6px;
        left: 3px;
        width: 40px;
        height: 40px;
        font-size: 12px;
        font-family: SourceHanSansCN-Medium, sans-serif;
        color: #fff;
      }

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
  }
}
</style>
