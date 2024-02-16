<template>
  <div v-loading="logining" class="loginwindow-wrap">
    <div v-if="status">
      <div class="title">
        <span>登录</span>
      </div>
      <div class="form">
        <div style="margin: 40px 0 0">
          <div>
            <span>账号</span>
            <input
              @keydown="keyEvent($event)"
              type="text"
              placeholder="请输入您的账号"
              v-model="loginForm.account"
            />
          </div>
          <div style="margin: 20px 0 0">
            <span>密码</span>
            <input
              @keydown="keyEvent($event)"
              type="password"
              placeholder="请输入您的密码"
              v-model="loginForm.password"
            />
          </div>
        </div>
      </div>
      <div class="register" @click="turnToRegister">
        <span>还未注册？点击此处注册！</span>
      </div>
      <div class="submit" @click="useLogin()">
        <div>
          <span>登录</span>
        </div>
      </div>
    </div>

    <div v-if="!status">
      <div class="title">
        <span>注册</span>
      </div>
      <div class="form">
        <div style="margin: 40px 0 0">
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 100%;
            "
          >
            <span>用户名</span>
            <input
              type="text"
              placeholder="请填写您的用户名"
              v-model="registerForm.name"
            />
          </div>
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin: 20px 0 0;
              width: 100%;
            "
          >
            <span>账号</span>
            <input
              type="text"
              placeholder="请填写您的账号"
              v-model="registerForm.account"
            />
          </div>
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin: 20px 0 0;
              width: 100%;
            "
          >
            <span>密码</span>
            <input
              type="password"
              placeholder="请输入您的密码"
              v-model="registerForm.password"
            />
          </div>
        </div>
      </div>
      <div class="register" @click="turnToLogin">
        <span>返回</span>
      </div>
      <div class="submit" @click="useRegister()">
        <div>
          <span>注册</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import { login, register, getUserInfo, getUserKeywords } from '@/api/user'
import { ElNotification } from 'element-plus'

const router = useRouter()

const { userStore, keywordStore } = useStore()

const loginForm = ref<{
  account: string
  password: string
}>({
  account: '',
  password: ''
})
const registerForm = ref<{
  name: string
  account: string
  password: string
}>({
  name: '',
  account: '',
  password: ''
})
const status = ref<boolean>(true)
const logining = ref<boolean>(false)

// 键盘事件
const keyEvent = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    useLogin()
  }
}
// 登录
const useLogin = async () => {
  logining.value = true
  if (!loginForm.value.account || !loginForm.value.password) {
    ElNotification({
      title: '账号/密码未填好！',
      type: 'error'
    })
  } else {
    const res = await login({ ...loginForm.value })
    if (res.result_code === 0) {
      localStorage.setItem('token', res.result.token)

      // 获取用户信息
      const userInfoRes = await getUserInfo({ user_id: res.result.user_id })
      if (userInfoRes.result_code === 0) {
        userStore.setUserInfo(userInfoRes.result)
        userStore.setLogin(true)
      }

      // 获取用户关键词
      const userKeywordsRes = await getUserKeywords({
        user_id: res.result.user_id
      })
      if (userKeywordsRes.result_code === 0) {
        keywordStore.setKeywordList(userKeywordsRes.result)
      }
      ElNotification({
        title: '登录成功！',
        message: `${userInfoRes.result.name}，欢迎回来！`,
        type: 'success'
      })
      router.push({ name: 'home' })
    }
  }

  logining.value = false
}

const turnToRegister = () => {
  status.value = !status.value
  loginForm.value = {
    account: '',
    password: ''
  }
}

const useRegister = async () => {
  if (
    registerForm.value.name &&
    registerForm.value.account &&
    registerForm.value.password
  ) {
    const res = await register(registerForm.value)
    if (res.result_code === 0) {
      status.value = !status.value
      ElNotification({
        title: '注册成功！',
        message: '快去登录吧~',
        type: 'success'
      })
    }
  } else {
    ElNotification({
      title: '注册必填项未填好！',
      type: 'error'
    })
  }
}

const turnToLogin = () => {
  status.value = !status.value
  loginForm.value = {
    account: '',
    password: ''
  }
}
</script>

<style scoped lang="less">
.loginwindow-wrap {
  position: absolute;
  top: 20vh;
  right: 100px;
  overflow: hidden;
  padding: 30px;
  width: 320px;
  background-color: #fff;
  border-radius: 50px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 32px 0 rgb(0 0 0 / 32%);
  }

  .title {
    display: flex;
    justify-content: center;
    width: 100%;
    font-size: 24px;
    font-family: 'AlibabaPuHuiTi-3-55-Regular', sans-serif;
    color: #3d3d3d;
  }

  .form {
    display: flex;
    justify-content: center;
    width: 100%;
    font-size: 18px;
    font-family: 'AlibabaPuHuiTi-3-55-Regular', sans-serif;
    color: #3d3d3d;
    line-height: 17px;

    input {
      margin: 0 0 0 20px;
      width: 200px;
      height: 40px;
      background-color: #f5f5f5;
      border: 0.5px #ff8200 solid;
      border-radius: 10px;
    }
  }

  .submit {
    display: flex;
    justify-content: center;
    margin: 30px 0 0;
    width: 100%;

    & > div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 70px;
      height: 40px;
      font-size: 15px;
      font-family: 'AlibabaPuHuiTi-3-55-Regular', sans-serif;
      color: #fff;
      background-color: #ff820088;
      border-radius: 20px;
      transition: all 0.3s;
      cursor: pointer;

      &:hover {
        background-color: #ff8200;
      }

      .register {
        display: flex;
        justify-content: center;
        margin: 10px 0 0;
        width: 100%;
        cursor: pointer;
      }
    }
  }

  .register {
    display: flex;
    justify-content: center;
    margin-top: 20px;

    span {
      font-size: 12px;
      font-family: 'AlibabaPuHuiTi-3-55-Regular', sans-serif;
      color: #3d3d3d;
      transition: all 0.2s;
      line-height: 17px;
      cursor: pointer;

      &:hover {
        color: #ff8200;
      }
    }
  }
}
</style>
