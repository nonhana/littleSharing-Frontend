<template>
  <div class="focusitem-wrap" v-loading="loading">
    <el-row type="flex" justify="space-between" style="align-items: center">
      <div style="display: flex; align-items: center">
        <div>
          <div @click="enterSpace(user_id)">
            <img :src="headphoto" />
          </div>
        </div>
        <div style="margin: 20px 0 0 20px">
          <el-row style="margin: 0 0 10px">
            <span class="username">{{ username }}</span>
          </el-row>
          <el-row>
            <span class="details">自我介绍：{{ details }}</span>
          </el-row>
        </div>
      </div>
      <div v-loading="execFollow">
        <div
          v-if="isMyFocus && isMyCenter"
          class="is-my-focus"
          @click="follow(1)"
        >
          <span>已关注</span>
        </div>
        <div
          v-if="!isMyFocus && isMyCenter"
          class="is-my-focus"
          @click="follow(0)"
        >
          <span>未关注</span>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
import { getUserInfo, focusUserActions, getUserFocusList } from '@/api/user'
import { ElMessage } from 'element-plus'

const props = defineProps<{
  user_id: number
}>()

const route = useRoute()
const router = useRouter()

const { userStore } = useStore()

const loading = ref<boolean>(false)
const execFollow = ref<boolean>(false)
const username = ref<string>('')
const details = ref<string>('')
const headphoto = ref<string>('')
const isMyFocus = ref<boolean>(false)
const isMyCenter = ref<boolean>(false)

const follow = async (num: number) => {
  switch (num) {
    case 0: {
      execFollow.value = true
      const res = await focusUserActions({
        first_user_id: userStore.userInfo.user_id,
        second_user_id: props.user_id,
        action_type: num
      })
      execFollow.value = false
      if (res.result_code == 0) {
        isMyFocus.value = !isMyFocus.value
        ElMessage({
          type: 'success',
          message: '关注成功'
        })
      }
      break
    }
    case 1: {
      execFollow.value = true
      const res = await focusUserActions({
        first_user_id: userStore.userInfo.user_id,
        second_user_id: props.user_id,
        action_type: num
      })
      execFollow.value = false
      if (res.result_code == 0) {
        isMyFocus.value = !isMyFocus.value
        ElMessage({
          type: 'success',
          message: '取消关注成功'
        })
      }
      break
    }
  }
}
// 点击进入他人主页
const enterSpace = (id: number): void => {
  router.push({
    path: '/MyArticles/' + id
  })
}

watch(
  () => route.params,
  (newV, _) => {
    if (Number(newV.id) === userStore.userInfo.user_id) {
      isMyCenter.value = true
    }
  },
  { immediate: true }
)

onMounted(async () => {
  loading.value = true
  const res = await getUserInfo({ user_id: props.user_id })
  if (res.result_code == 0) {
    username.value = res.result.name
    details.value = res.result.signature
    headphoto.value = res.result.headphoto
    const userFocusListRes = await getUserFocusList({
      user_id: userStore.userInfo.user_id
    })
    if (userFocusListRes.result_code === 0) {
      userFocusListRes.result.forEach((item) => {
        if (item.second_user_id === props.user_id) {
          isMyFocus.value = true
        }
      })
    }
  }
  loading.value = false
})
</script>

<style scoped lang="less">
.focusitem-wrap {
  position: relative;
  width: 1024px;
  height: 71px;
  background-color: #fff;
  border-radius: 10px;

  img {
    position: relative;
    margin: 20px 0 0 10px;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    cursor: pointer;
  }

  .username {
    height: 17px;
    font-size: 14px;
    font-family: SourceHanSansCN-Regular, sans-serif;
    color: #3d3d3d;
    line-height: 17px;
  }

  .details {
    width: 473px;
    font-size: 12px;
    font-family: SourceHanSansCN-Regular, sans-serif;
    color: #9e9e9e;
    word-break: break-all;
    line-height: 17px;
  }

  .is-my-focus {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 31px;
    font-size: 12px;
    font-family: SourceHanSansCN-Regular, sans-serif;
    color: #ff8200;
    border: 1.5px solid #ffc180;
    border-radius: 10px;
    box-sizing: border-box;
    cursor: pointer;
    line-height: 17px;
  }
}
</style>
