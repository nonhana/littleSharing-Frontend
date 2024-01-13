<template>
  <div class="index">
    <div class="content">
      <img
        src="https://common-1319721118.cos.ap-shanghai.myqcloud.com/picgo/114393320.png"
        alt="successImg"
      />
      <span>发布文章成功~~</span>
      <span>感谢您为本站做出的小小贡献！期待您的更多作品哦</span>
      <span> 奖励一只可爱的普拉娜！(> w &lt;) </span>
      <el-button type="primary" @click="$router.push('home')"
        >点击返回首页</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({
  title: '发布成功~'
})
</script>

<style scoped lang="less">
.index {
  position: relative;
  width: 100%;

  .content {
    position: relative;
    padding: 20px 0;
    width: 100%;
    text-align: center;
    background-color: #fff;
    border-radius: 20px;

    img {
      width: 50%;
    }

    span {
      display: block;
      margin-top: 20px;
      font-size: 20px;
    }

    button {
      margin-top: 20px;
    }
  }
}
</style>
