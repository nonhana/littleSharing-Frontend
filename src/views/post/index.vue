<template>
  <div class="index">
    <el-row type="flex" justify="center">
      <PostArticle />
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { onBeforeRouteLeave } from 'vue-router'
import PostArticle from '@/components/ModelPost/PostArticle.vue'
import { ElMessageBox } from 'element-plus'

onBeforeRouteLeave((_, __, next) => {
  if (!localStorage.getItem('not_saved_article_info')) {
    next(true)
  } else {
    ElMessageBox.confirm(
      '检测到未保存的内容，离开页面后会保存未发布内容',
      '确认离开此页面？',
      {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }
    )
      .then(() => {
        next(true)
      })
      .catch(() => {
        next(false)
      })
  }
})
</script>

<style scoped lang="less">
.index {
  width: 100%;
}
</style>
