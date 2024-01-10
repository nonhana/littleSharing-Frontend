<template>
  <div class="index">
    <el-row type="flex" justify="center">
      <PersonalHeader />
    </el-row>
    <el-row type="flex" justify="center" style="margin: 40px 0 30px">
      <router-view />
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { getUserInfo } from '@/api/user'
import PersonalHeader from '@/components/ModelPersonalCenter/PersonalHeader.vue'
import { useHead } from '@unhead/vue'

const route = useRoute()

watch(
  () => route.params.id,
  async () => {
    const { result } = await getUserInfo({
      user_id: Number(route.params.id)
    })

    useHead({
      title: `${result.name}的个人空间`,
      meta: [
        {
          name: 'description',
          content: result.introduce
        },
        {
          name: 'author',
          content: result.name
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0'
        }
      ]
    })
  }
)
</script>

<style scoped lang="less">
.index {
  width: 100%;
}
</style>
