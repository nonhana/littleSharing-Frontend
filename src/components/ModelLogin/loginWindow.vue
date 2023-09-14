<template>
  <div v-loading="logining" name="loginWindow" class="loginWindow-wrap">
    <div v-if="status">
      <div class="title">
        <span>登录</span>
      </div>
      <div class="form">
        <div style="margin: 40px 0 0 0">
          <div>
            <span>账号</span>
            <input
              type="text"
              placeholder="请输入您的账号"
              v-model="loginForm.account"
            />
          </div>
          <div style="margin: 20px 0 0 0">
            <span>密码</span>
            <input
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
      <div class="submit" @click="login()">
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
        <div style="margin: 40px 0 0 0">
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
              margin: 20px 0 0 0;
              display: flex;
              justify-content: space-between;
              align-items: center;
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
              margin: 20px 0 0 0;
              display: flex;
              justify-content: space-between;
              align-items: center;
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
      <div class="submit" @click="register()">
        <div>
          <span>注册</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import router from "@/router";
import { userLoginAPI, userRegisterAPI } from "@/api/user";
import { ElNotification } from "element-plus";

const loginForm = ref({
  account: "",
  password: "",
});
const registerForm = ref({
  name: "",
  account: "",
  password: "",
});
const status = ref<boolean>(true);
const logining = ref<boolean>(false);

const login = async () => {
  logining.value = true;
  if (!loginForm.value.account || !loginForm.value.password) {
    ElNotification({
      title: "账号/密码未填好！",
      type: "error",
    });
  } else {
    const res = await userLoginAPI({ ...loginForm.value });
    if (res.data.result_code === 1) {
      if (res.data.result_length === 0) {
        ElNotification({
          title: "登录失败！",
          message: "该账号还没有注册哦，请先注册！",
          type: "error",
        });
      } else {
        ElNotification({
          title: "登录失败！",
          message: res.data.result_msg,
          type: "error",
        });
      }
    } else {
      localStorage.setItem("token", res.data.result.token);
      res.data.result.user_info.major =
        res.data.result.user_info.major.split(",");
      localStorage.setItem(
        "user_info",
        JSON.stringify(res.data.result.user_info)
      );
      localStorage.setItem(
        "keywords_list",
        JSON.stringify(res.data.result.keywords_list)
      );
      localStorage.setItem(
        "article_labels",
        JSON.stringify(res.data.result.article_labels)
      );
      ElNotification({
        title: "登录成功！",
        message: `${res.data.result.user_info.name}，欢迎回来！`,
        type: "success",
      });
      router.push({ name: "home" });
    }
  }

  logining.value = false;
};

const turnToRegister = () => {
  status.value = !status.value;
  loginForm.value = {
    account: "",
    password: "",
  };
};

const register = async () => {
  if (
    registerForm.value.name &&
    registerForm.value.account &&
    registerForm.value.password
  ) {
    const res = await userRegisterAPI(registerForm.value);
    if (res.data.result_code === 1) {
      ElNotification({
        title: "注册失败！",
        message: res.data.result_msg,
        type: "error",
      });
    } else {
      status.value = !status.value;
      ElNotification({
        title: "注册成功！",
        message: "快快去登录吧~",
        type: "success",
      });
    }
  } else {
    ElNotification({
      title: "注册必填项未填好！",
      type: "error",
    });
  }
};

const turnToLogin = () => {
  status.value = !status.value;
  loginForm.value = {
    account: "",
    password: "",
  };
};
</script>

<style scoped>
.loginWindow-wrap {
  position: relative;
  padding: 30px;
  margin: 200px auto;
  width: 320px;
  background-color: #fff;
  border-radius: 50px;
  transition: all 0.3s ease;
  overflow: hidden;
}

.loginWindow-wrap:hover {
  box-shadow: 0px 8px 32px 0px rgba(0, 0, 0, 0.32);
}

.title {
  width: 100%;
  display: flex;
  justify-content: center;
}

.title span {
  font-family: SourceHanSansCN-Medium;
  font-size: 24px;
  font-weight: 500;
  color: #3d3d3d;
}

.form {
  width: 100%;
  display: flex;
  justify-content: center;
}

.form span {
  font-family: SourceHanSansCN-Medium;
  font-size: 18px;
  font-weight: 500;
  line-height: 17px;
  color: #3d3d3d;
}

.form input {
  width: 200px;
  height: 40px;
  border-radius: 10px;
  border: 0.5px #ff8200 solid;
  background-color: #f5f5f5;
  margin: 0 0 0 20px;
}

.submit {
  width: 100%;
  margin: 30px 0 0 0;
  display: flex;
  justify-content: center;
}

.submit div {
  width: 70px;
  height: 40px;
  background-color: #ff820088;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.submit div:hover {
  background-color: #ff8200;
}

.submit div span {
  font-family: SourceHanSansCN-Medium;
  font-size: 15px;
  font-weight: 500;
  color: #ffffff;
}

.register {
  width: 100%;
  margin: 10px 0 0 0;
  display: flex;
  justify-content: center;
  cursor: pointer;
}

.register span {
  font-family: SourceHanSansCN-Medium;
  font-size: 10px;
  font-weight: 500;
  line-height: 17px;
  color: #3d3d3d;
  transition: all 0.2s;
}

.register:hover span {
  color: #ff8200;
}
</style>
