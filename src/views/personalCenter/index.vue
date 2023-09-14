<template>
  <div class="index">
    <el-row type="flex" justify="center">
      <PersonalHeader />
    </el-row>
    <el-row type="flex" justify="center" style="margin: 40px 0 30px 0">
      <router-view />
    </el-row>
  </div>
</template>

<script setup lang="ts">
import PersonalHeader from "@/components/ModelPersonalCenter/PersonalHeader.vue";
</script>

<style scoped lang="less">
.index {
  width: 100%;
}
</style>
