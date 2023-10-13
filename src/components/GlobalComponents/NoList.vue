<template>
  <div
    :style="{
      width: `${width}px`,
      height: `${height}px`,
    }"
    class="noList"
  >
    <span>{{ content }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  content: string;
  width: number;
  height: number;
}>();
</script>

<style scoped lang="less">
.noList {
  margin-top: 20px;
  padding: 9px 14px;
  background-color: #eeeeee;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    height: 18px;
    font-family: SourceHanSansCN-Regular;
    font-size: 16px;
    font-weight: normal;
    line-height: 20px;
    color: #3d3d3d;
  }
}
</style>
