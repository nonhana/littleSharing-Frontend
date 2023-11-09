<template>
  <div class="MessageSideBar-wrap">
    <div class="title">
      <img src="@/assets/svgs/MessageSideBar.svg" />
      <span>我的消息</span>
    </div>
    <div style="margin: 30px 0 0 0">
      <div
        :style="{
          backgroundColor: animeStyle.background[index],
        }"
        @mouseenter="changeClass(index)"
        @mouseleave="changeClass(4)"
        @click="toPage(index)"
        class="choice-item"
        v-for="(item, index) in menuList"
      >
        <svg
          :style="{
            left: `${animeStyle.svg_left_pos[index]}px`,
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
        <span
          :style="{
            color: animeStyle.color[index],
          }"
          >{{ item }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

type AnimeStyle = {
  background: string[];
  color: string[];
  svg_left_pos: number[];
};

const route = useRoute();
const router = useRouter();
const routeList: string[] = [
  "messageReplies",
  "messageCollections",
  "messageLikes",
  "messageUsers",
];
const menuList: string[] = ["回复我的", "收藏我的", "赞我的", "用户私信"];

let animeStyle = ref<AnimeStyle>({
  background: ["#fff", "#fff", "#fff", "#fff"],
  color: ["#3d3d3d", "#3d3d3d", "#3d3d3d", "#3d3d3d"],
  svg_left_pos: [10, 10, 10, 10],
});

const changeClass = (index: number) => {
  if (index < 4) {
    animeStyle.value = {
      background: ["#fff", "#fff", "#fff", "#fff"],
      color: ["#3d3d3d", "#3d3d3d", "#3d3d3d", "#3d3d3d"],
      svg_left_pos: [10, 10, 10, 10],
    };
    animeStyle.value.background[index] = "#76fff5";
    animeStyle.value.color[index] = "#fff";
    animeStyle.value.svg_left_pos[index] = 40;
  } else {
    const index = routeList.findIndex((item) => item === route.name);
    animeStyle.value = {
      background: ["#fff", "#fff", "#fff", "#fff"],
      color: ["#3d3d3d", "#3d3d3d", "#3d3d3d", "#3d3d3d"],
      svg_left_pos: [10, 10, 10, 10],
    };
    animeStyle.value.background[index] = "#76fff5";
    animeStyle.value.color[index] = "#fff";
    animeStyle.value.svg_left_pos[index] = 40;
  }
};
const toPage = (index: number) => {
  router.push({
    name: `${routeList[index]}`,
  });
};

watch(
  route,
  (newV, _) => {
    const index: number = routeList.findIndex((item) => item === newV.name);
    animeStyle.value.background[index] = "#76fff5";
    animeStyle.value.color[index] = "#fff";
    animeStyle.value.svg_left_pos[index] = 40;
  },
  { immediate: true, deep: true }
);
</script>

<style scoped lang="less">
.MessageSideBar-wrap {
  position: relative;
  width: 200px;
  height: 381px;
  border-radius: 20px;
  background: #ffffff;
  opacity: 0.7;
  transition: all 0.5s ease;

  .title {
    margin: 20px 0 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      margin-left: 10px;
      font-family: Microsoft YaHei;
      font-size: 18px;
      font-weight: normal;
      color: #3d3d3d;
    }
  }
}
.MessageSideBar-wrap:hover {
  opacity: 1;
}
.choice-item {
  width: 200px;
  height: 50px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  .svg {
    position: absolute;
    width: 16px;
    height: 16px;
    transition: all 0.3s ease;
  }
  span {
    margin: 0 auto;
    font-family: Microsoft YaHei;
    font-size: 14px;
    font-weight: normal;
  }
}
</style>
