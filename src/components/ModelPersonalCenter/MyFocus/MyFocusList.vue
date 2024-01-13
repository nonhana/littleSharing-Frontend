<template>
  <div class="focusmain-wrap">
    <el-row class="title" type="flex" justify="space-between">
      <div>
        <span @click="push(1)" class="behovered beclicked"
          >{{ isMyCenter ? '我的' : 'ta的' }}关注</span
        >
      </div>
      <div>
        <span @click="push(2)" class="behovered"
          >{{ isMyCenter ? '我的' : 'ta的' }}粉丝</span
        >
      </div>
    </el-row>
    <el-divider />
    <div v-loading="loading">
      <el-row type="flex" justify="center">
        <div
          v-for="(item, index) in user_list"
          :key="index"
          style="margin-bottom: 10px"
        >
          <FocusItem :user_id="item" />
          <el-divider />
        </div>
      </el-row>
      <el-row type="flex" justify="center">
        <div v-if="emptyList">
          <el-empty
            v-if="isMyCenter"
            description="您还没有关注任何人哦......"
          ></el-empty>
          <el-empty v-else description="ta还没有关注任何人哦......"></el-empty>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '@/store'
import { getUserFocusList } from '@/api/user'
import FocusItem from '@/components/Little/Item/FocusItem.vue'

const router = useRouter()
const route = useRoute()

const { userStore } = useStore()

const loading = ref<boolean>(false)
const isMyCenter = ref<boolean>(false)
const user_id = ref<number>(0)
const user_list = ref<any[]>([])

const emptyList = computed(() => {
  if (user_list.value.length === 0) {
    return true
  } else {
    return false
  }
})

const push = (num: number) => {
  let route_name
  if (num === 1) {
    route_name = 'MyFocusList'
  }
  if (num === 2) {
    route_name = 'MyFansList'
  }
  router.push({
    name: route_name
  })
}

watch(
  route,
  async (newV, _) => {
    loading.value = true
    user_id.value = Number(newV.params.id)
    if (user_id.value === userStore.userInfo.user_id) {
      isMyCenter.value = true
    }
    const res = await getUserFocusList({ user_id: user_id.value })
    res.result.forEach((item: any) => {
      user_list.value.push(item.second_user_id)
    })
    loading.value = false
  },
  { immediate: true }
)
</script>

<style scoped lang="less">
.focusmain-wrap {
  position: relative;
  padding-bottom: 20px;
  width: 100%;
  background: #fff;
  border-radius: 20px;

  .beclicked {
    color: #ff5900 !important;
  }

  .behovered:hover {
    color: #ff5900 !important;
  }

  .title {
    padding: 20px 0 20px 100px;
    width: 400px;

    > * {
      height: 20px;
      font-size: 18px;
      font-family: SourceHanSansCN-Regular, sans-serif;
      color: #3d3d3d;
      cursor: pointer;
    }
  }

  ul {
    position: relative;
    top: 50px;
    width: 820px;
    list-style: none;
  }
}
</style>
