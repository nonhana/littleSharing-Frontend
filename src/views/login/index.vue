<template>
  <div class="index">
    <el-row type="flex" justify="center">
      <div
        class="window"
        :style="{
          opacity: window_opacity,
        }"
      >
        <loginWindow />
      </div>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import loginWindow from "@/components/ModelLogin/loginWindow.vue";

const window_opacity = ref("0%");

onMounted(() => {
  setTimeout(() => {
    window_opacity.value = "100%";
  }, 600);
});
</script>

<style scoped lang="less">
.index {
  width: 100%;

  .window {
    position: absolute;
    right: 175px;
    transition: all 0.5s;
  }
}
</style>
