<template>
  <div class="index">
    <el-row type="flex" justify="center">
      <div
        class="window"
        :style="{
          opacity: window_opacity
        }"
      >
        <LoginWindow />
      </div>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import LoginWindow from '@/components/ModelLogin/LoginWindow.vue'
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

const window_opacity = ref('0%')

onMounted(() => {
  setTimeout(() => {
    window_opacity.value = '100%'
  }, 600)
})
</script>

<style scoped lang="less">
.index {
  width: 100%;

  .window {
    transition: all 0.5s;
  }
}
</style>
