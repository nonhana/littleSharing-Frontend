<template>
  <div
    :style="{
      width: width + 'px',
      height: height + 'px'
    }"
    class="nolist"
  >
    <span>{{ content }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  content: string
  width: number
  height: number
}>()
</script>

<style scoped lang="less">
.nolist {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 9px 14px;
  margin-top: 20px;
  font-size: 16px;
  font-family: SourceHanSansCN-Regular, sans-serif;
  color: #3d3d3d;
  background-color: #eee;
  border-radius: 20px;
}
</style>
