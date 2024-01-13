<template>
  <div class="index">
    <el-row style="margin: 0 auto; width: 1350px">
      <PersonalHeader />
    </el-row>
    <el-row style="margin: 40px auto 30px; width: 1350px">
      <router-view />
    </el-row>
  </div>
</template>

<script setup lang="ts">
import PersonalHeader from '@/components/ModelPersonalCenter/PersonalHeader.vue'
</script>

<style scoped lang="less">
.index {
  width: 100%;
}
</style>
