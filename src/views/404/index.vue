<template>
  <div class="index">
    <div class="content">
      <img
        src="https://common-1319721118.cos.ap-shanghai.myqcloud.com/picgo/115132215.jpg"
        alt="notFound"
      />
      <span>呃，你是不是故意输了别的什么url或者id，现在找不到这个页面哦</span>
      <el-button type="primary" @click="$router.push('home')"
        >返回首页</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({
  title: '找不到该页面',
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
  position: relative;
  width: 100%;

  .content {
    position: relative;
    overflow: hidden;
    padding: 20px 0;
    margin: 0 auto;
    width: 1350px;
    text-align: center;
    background-color: #fff;
    border-radius: 20px;

    img {
      max-height: calc(100vh - 266px);
      border-radius: 20px;
    }

    span {
      display: block;
      margin-top: 20px;
      font-size: 20px;
      line-height: 30px;
    }

    button {
      margin-top: 20px;
    }
  }
}
</style>
