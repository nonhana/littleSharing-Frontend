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
  title: '消息中心',
  meta: [
    {
      name: 'author',
      content: 'nonhana'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0'
    },
    {
      name: 'charset',
      content: 'utf-8'
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
