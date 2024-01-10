<template>
  <div class="index">
    <MessageSideBar style="margin-right: 30px" />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import MessageSideBar from '@/components/ModelMessages/MessageSideBar.vue'
import { useHead } from '@unhead/vue'

useHead({
  title: '消息中心'
})
</script>

<style scoped lang="less">
.index {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  width: 100%;
}
</style>
