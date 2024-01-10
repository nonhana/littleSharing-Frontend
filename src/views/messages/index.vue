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
  title: 'littleSharing-兴趣使然的博客小站',
  meta: [
    {
      name: 'description',
      content: '一个以Markdown为主要沟通形式的资源分享社区。'
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
</script>

<style scoped lang="less">
.index {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  width: 100%;
}
</style>
