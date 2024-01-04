<template>
  <div v-loading="gettingData" class="personalheader-wrap">
    <div class="background">
      <img :src="background_photo" />
    </div>
    <el-row class="part-one">
      <el-row style="margin-top: 20px">
        <div>
          <div class="userhead">
            <img :src="header_photo" />
          </div>
        </div>
        <div>
          <el-row type="flex" style="margin: 0 0 15px">
            <span class="username"
              >{{ username }}&emsp;<span>UID:{{ user_id }}</span>
            </span>
          </el-row>
          <el-row style="margin-top: 7px">
            <span class="selfintroduce">{{ selfintroduce }}</span>
          </el-row>
          <el-row
            type="flex"
            justify="space-between"
            style="align-items: center; width: 1100px"
          >
            <div class="part-two">
              <div @click="push(6)">
                <span class="title">关注数</span>
                <el-row type="flex" justify="center">
                  <span class="num">{{ focus }}</span>
                </el-row>
              </div>
              <div @click="push(6)">
                <span class="title">粉丝数</span>
                <el-row type="flex" justify="center">
                  <span class="num">{{ fans }}</span>
                </el-row>
              </div>
              <div>
                <span class="title">文章点赞量</span>
                <el-row type="flex" justify="center">
                  <span class="num">{{ user.total_like }}</span>
                </el-row>
              </div>
              <div>
                <span class="title">文章收藏量</span>
                <el-row type="flex" justify="center">
                  <span class="num">{{ user.total_collect }}</span>
                </el-row>
              </div>
              <div>
                <span class="title">文章发布数</span>
                <el-row type="flex" justify="center">
                  <span class="num">{{ article_num }}</span>
                </el-row>
              </div>
            </div>
            <div
              @click="focusAction(0)"
              v-if="!isMyCenter && !isMyFocus"
              class="button"
            >
              <span>关注</span>
            </div>
            <div
              @click="focusAction(1)"
              v-if="!isMyCenter && isMyFocus"
              class="button"
            >
              <span>取消关注</span>
            </div>
          </el-row>
        </div>
      </el-row>
    </el-row>

    <el-row class="part-three" type="flex" justify="start">
      <div
        @mouseenter="moveline(1)"
        @mouseleave="moveline(lineCnt)"
        @click="push(1)"
      >
        <img :src="MyArticles" alt="MyArticles" />
        <span :class="className[0]"
          >{{ isMyCenter ? '我的' : 'ta的' }}文章</span
        >
      </div>
      <div
        @mouseenter="moveline(2)"
        @mouseleave="moveline(lineCnt)"
        @click="push(2)"
      >
        <img :src="MyCollections" alt="MyCollections" />
        <span :class="className[1]"
          >{{ isMyCenter ? '我的' : 'ta的' }}收藏</span
        >
      </div>
      <div
        @mouseenter="moveline(3)"
        @mouseleave="moveline(lineCnt)"
        @click="push(3)"
      >
        <img :src="MyFocus" alt="MyFocus" />
        <span :class="className[2]"
          >{{ isMyCenter ? '我的' : 'ta的' }}关注</span
        >
      </div>
      <div
        @mouseenter="moveline(4)"
        @mouseleave="moveline(lineCnt)"
        @click="push(4)"
      >
        <img :src="MyData" alt="MyData" />
        <span :class="className[3]"
          >{{ isMyCenter ? '我的' : 'ta的' }}数据</span
        >
      </div>
      <div
        v-if="isMyCenter"
        @mouseenter="moveline(5)"
        @mouseleave="moveline(lineCnt)"
        @click="push(5)"
      >
        <img :src="MyInfo" alt="MyInfo" />
        <span :class="className[4]">个人资料</span>
      </div>
      <div class="line" :style="{ left: `${linePosition}px` }"></div>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '@/store'
import {
  getUserInfo,
  getUserLikeNum,
  getUserCollectionNum,
  focusUserActions,
  getUserFocusList
} from '@/api/user'
import { ElMessage } from 'element-plus'
import MyArticles from '@/assets/svgs/MyArticles.svg'
import MyCollections from '@/assets/svgs/MyCollections.svg'
import MyFocus from '@/assets/svgs/MyFocus.svg'
import MyData from '@/assets/svgs/MyData.svg'
import MyInfo from '@/assets/svgs/MyInfo.svg'

const router = useRouter()
const route = useRoute()

const { userStore } = useStore()

const gettingData = ref<boolean>(false)
const isMyCenter = ref<boolean>(false)
const isMyFocus = ref<boolean>(false)
const user = ref({
  background_photo: '',
  header_photo: '',
  user_name: '',
  sign: '',
  follow_count: 0,
  follower_count: 0,
  total_like: 0,
  total_collect: 0,
  total_artcile: 0
})
const user_id = ref<number>(0)
const linePosition = ref<number>(0)
const positionArray = ref<number[]>([14, 144, 274, 414, 544])
const lineCnt = ref<number>(1)
const routeMenu = ref<string[]>([
  'MyArticles',
  'MyCollection',
  'MyFocusList',
  'MyData',
  'MyInfo'
])
const className = ref<string[]>([
  'behovered',
  'behovered',
  'behovered',
  'behovered',
  'behovered'
])
const initClassName = ref<string[]>([
  'behovered',
  'behovered',
  'behovered',
  'behovered',
  'behovered'
])

const background_photo = computed(() => user.value.background_photo)
const header_photo = computed(() => user.value.header_photo)
const username = computed(() => user.value.user_name)
const selfintroduce = computed(() => user.value.sign)
const focus = computed(() => user.value.follow_count)
const fans = computed(() => user.value.follower_count)
const article_num = computed(() => user.value.total_artcile)

watch(
  () => route.name,
  async (newV, _) => {
    className.value = initClassName.value.slice(0)
    // 当name=MyFocusList或name=MyFansList时，cnt=2
    let cnt: number
    if (newV === 'MyFocusList' || newV === 'MyFansList') {
      cnt = 2
    } else {
      cnt = routeMenu.value.indexOf(String(newV))
    }
    className.value[cnt] = 'behovered beclicked'
    linePosition.value = positionArray.value[cnt]
    lineCnt.value = cnt + 1
  },
  { immediate: true }
)

watch(
  () => route.params.id,
  async (newV, oldV) => {
    if (newV !== oldV) {
      gettingData.value = true
      user_id.value = Number(newV)
      if (user_id.value === userStore.userInfo.user_id) {
        isMyCenter.value = true
      } else {
        isMyCenter.value = false
      }
      const focusListRes = await getUserFocusList({
        user_id: user_id.value
      })
      if (focusListRes.result_code === 0) {
        if (focusListRes.result.length > 0) {
          focusListRes.result.forEach((item: any) => {
            if (item.second_user_id === user_id.value) {
              isMyFocus.value = true
            }
          })
        }
      }
      const userInfoRes = await getUserInfo({ user_id: user_id.value })
      user.value.user_name = userInfoRes.result.name
      user.value.sign = userInfoRes.result.signature
      user.value.header_photo = userInfoRes.result.headphoto
      user.value.background_photo = userInfoRes.result.backgroundphoto
      user.value.total_artcile = userInfoRes.result.article_num
      const likeNumRes = await getUserLikeNum({ user_id: user_id.value })
      if (likeNumRes.result_code === 0) {
        user.value.total_like = likeNumRes.result
      }
      const collectionNumRes = await getUserCollectionNum({
        user_id: user_id.value
      })
      if (collectionNumRes.result_code === 0) {
        user.value.total_collect = collectionNumRes.result
      }
      gettingData.value = false
    }
  },
  { immediate: true }
)

const push = (num: number) => {
  router.push({ name: routeMenu.value[num - 1] })
}
const moveline = (num: number) => {
  linePosition.value = positionArray.value[num - 1]
}
const focusAction = async (num: 0 | 1) => {
  if (num === 0) {
    const res = await focusUserActions({
      first_user_id: userStore.userInfo.user_id,
      second_user_id: user_id.value,
      action_type: num
    })
    if (res.result_code === 0) {
      isMyFocus.value = !isMyFocus.value
      ElMessage({
        type: 'success',
        message: '关注成功'
      })
    } else {
      ElMessage({
        type: 'error',
        message: res.result_msg
      })
    }
  } else {
    const res = await focusUserActions({
      first_user_id: userStore.userInfo.user_id,
      second_user_id: user_id.value,
      action_type: num
    })
    if (res.result_code === 0) {
      isMyFocus.value = !isMyFocus.value
      ElMessage({
        type: 'success',
        message: '取消关注成功'
      })
    } else {
      ElMessage({
        type: 'error',
        message: res.result_msg
      })
    }
  }
}
</script>

<style scoped lang="less">
.personalheader-wrap {
  position: relative;
  overflow: hidden;
  width: 100%;
  background: #fff;
  border-radius: 10px;

  .beclicked {
    color: #ff5900 !important;
  }

  .behovered:hover {
    color: #ff5900 !important;
  }

  .background {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 100%;
    height: 240px;

    img {
      width: 100%;
    }
  }

  .part-one {
    position: relative;
    display: flex;
  }

  .userhead {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin: 0 30px 17px 56px;
    width: 120px;
    height: 120px;
    border-radius: 50%;

    img {
      width: 120px;
    }
  }

  .username {
    margin-right: 5px;
    font-size: 14px;
    font-family: SourceHanSansCN-Bold, sans-serif;
    color: #9e9e9e;
    font-weight: bold;
    line-height: 17px;
  }

  .selfintroduce {
    height: 17px;
    font-size: 17px;
    font-family: SourceHanSansCN-Regular, sans-serif;
    color: #3d3d3d;
    line-height: 17px;
  }

  .part-two {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    width: 450px;
    height: 40px;

    & > * {
      height: 40px;
      cursor: pointer;
    }
  }

  .title {
    font-size: 12px;
    font-family: SourceHanSansCN-Medium, sans-serif;
    color: #ff5900;
    line-height: 17px;
  }

  .num {
    height: 17px;
    font-size: 16px;
    font-family: SourceHanSansCN-Medium, sans-serif;
    color: #3d3d3d;
    line-height: 17px;
  }

  .part-three {
    position: relative;
    width: 100%;
    height: 66px;
    background: #fff;
    border-radius: 0 0 10px 10px;
    border-top: 1px solid #76fff5;

    & > * {
      display: flex;
      align-items: center;
      margin: 27px 0 0 55px;
      height: 20px;
      cursor: pointer;
      font-size: 14px;
      font-family: SourceHanSansCN-Medium, sans-serif;
      color: #3d3d3d;
      line-height: 17px;

      span {
        margin: 0 0 0 5px;
      }
    }
  }

  .line {
    position: absolute;
    top: 34px;
    width: 53px;
    height: 4px;
    background-color: #ffc180;
    transition: all 0.3s;
  }

  .button {
    padding: 8px 16px;
    font-size: 16px;
    font-family: SourceHanSansCN-Medium, sans-serif;
    color: #3d3d3d;
    background-color: #76fff5;
    border-radius: 8px;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .button:hover {
    color: #fff;
    background-color: #00ead8;
  }
}
</style>
