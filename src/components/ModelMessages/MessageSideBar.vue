<template>
  <div class="messagesidebar-wrap">
    <div class="title">
      <img src="@/assets/svgs/MessageSideBar.svg" />
      <span>我的消息</span>
    </div>
    <div style="margin: 30px 0 0">
      <div
        :style="{
          backgroundColor: animeStyle.background[index]
        }"
        @mouseenter="changeClass(index)"
        @mouseleave="changeClass(3)"
        @click="toPage(index)"
        class="choice-item"
        v-for="(item, index) in menuList"
        :key="index"
      >
        <svg
          :style="{
            left: `${animeStyle.svg_left_pos[index]}px`
          }"
          class="svg"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          fill="none"
          version="1.1"
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <defs>
            <clipPath id="master_svg0_132_5857">
              <rect x="0" y="0" width="16" height="16" rx="0" />
            </clipPath>
          </defs>
          <g clip-path="url(#master_svg0_132_5857)">
            <g>
              <path
                d="M6.10859489453125,14.0228552734375C5.88070289453125,14.0259552734375,5.66161189453125,13.9349552734375,5.50287989453125,13.7714552734375C5.16546249453125,13.4380552734375,5.16546249453125,12.8933552734375,5.50287989453125,12.5599552734375L10.01716689453125,8.0457052734375L5.50288089453125,3.5314252734375C5.16546249453125,3.1980952734375,5.16546249453125,2.6533182734375,5.50288089453125,2.3199942734375C5.83881189453125,1.9888756734375,6.37837689453125,1.9888756734375,6.71430689453125,2.3199942734375L12.42859689453125,8.034275273437501L6.71430689453125,13.7485552734375C6.55832689453125,13.9188552734375,6.33947689453125,14.0179552734375,6.10859489453125,14.0228552734375Z"
                :fill="animeStyle.color[index]"
                fill-opacity="1"
              />
            </g>
          </g>
        </svg>
        <el-badge class="badge" :value="unreadCountList[index]" :max="99">
          <span
            :style="{
              color: animeStyle.color[index]
            }"
            >{{ item }}</span
          >
        </el-badge>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
import { readMessage } from '@/api/message'

const route = useRoute()
const router = useRouter()
const { unreadCountStore } = useStore()

const routeList: string[] = ['messageCommon', 'messageUsers', 'messageSystem']
const menuList: string[] = ['互动消息', '关注动态', '系统消息']

const unreadCountList = ref<number[]>([
  unreadCountStore.unreadCount.type_1,
  unreadCountStore.unreadCount.type_2,
  unreadCountStore.unreadCount.type_3
])
const animeStyle = ref<{
  background: string[]
  color: string[]
  svg_left_pos: number[]
}>({
  background: ['#fff', '#fff', '#fff'],
  color: ['#3d3d3d', '#3d3d3d', '#3d3d3d'],
  svg_left_pos: [10, 10, 10]
})

const changeClass = (index: number) => {
  if (index < 3) {
    animeStyle.value = {
      background: ['#fff', '#fff', '#fff'],
      color: ['#3d3d3d', '#3d3d3d', '#3d3d3d'],
      svg_left_pos: [10, 10, 10]
    }
    animeStyle.value.background[index] = '#76fff5'
    animeStyle.value.color[index] = '#fff'
    animeStyle.value.svg_left_pos[index] = 40
  } else {
    const index = routeList.findIndex((item) => item === route.name)
    animeStyle.value = {
      background: ['#fff', '#fff', '#fff'],
      color: ['#3d3d3d', '#3d3d3d', '#3d3d3d'],
      svg_left_pos: [10, 10, 10]
    }
    animeStyle.value.background[index] = '#76fff5'
    animeStyle.value.color[index] = '#fff'
    animeStyle.value.svg_left_pos[index] = 40
  }
}
const toPage = (index: number) => {
  router.push({
    name: `${routeList[index]}`
  })
}

watch(
  route,
  async (newV, _) => {
    const index: number = routeList.findIndex((item) => item === newV.name)
    animeStyle.value.background[index] = '#76fff5'
    animeStyle.value.color[index] = '#fff'
    animeStyle.value.svg_left_pos[index] = 40
  },
  { immediate: true }
)

router.beforeEach(async (_, from, next) => {
  const index: number = routeList.findIndex((item) => item === from.name)
  // 根据上个路由所查看的消息类型，更新未读消息数
  unreadCountList.value[index] = 0
  unreadCountStore.clearUnreadCount(<1 | 2 | 3>(index + 1))
  await readMessage({ type: <1 | 2 | 3>(index + 1) })
  next()
})
</script>

<style scoped lang="less">
.messagesidebar-wrap {
  position: relative;
  width: 200px;
  height: 381px;
  background: #fff;
  border-radius: 20px;
  opacity: 0.7;
  transition: all 0.5s ease;

  &:hover {
    opacity: 1;
  }

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0 0;

    span {
      margin-left: 10px;
      font-size: 18px;
      font-family: 'Microsoft YaHei', sans-serif;
      color: #3d3d3d;
    }
  }

  .choice-item {
    display: flex;
    align-items: center;
    width: 200px;
    height: 50px;
    font-size: 14px;
    font-family: 'Microsoft YaHei', sans-serif;
    transition: all 0.3s ease;
    cursor: pointer;

    .svg {
      position: absolute;
      width: 16px;
      height: 16px;
      transition: all 0.3s ease;
    }

    .badge {
      margin: 0 auto;
    }
  }
}
</style>
