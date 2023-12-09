<template>
  <div class="index">
    <MessageSideBar style="margin-right: 30px" />
    <router-view #default="{ Component }">
      <transition enter-active-class="animate__animated animate__fadeInUp">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import MessageSideBar from '@/components/ModelMessages/MessageSideBar.vue'
</script>

<style scoped lang="less">
.index {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  width: 100%;
}
</style>
