<template>
  <div class="infomain-wrap">
    <el-row>
      <div style="display: flex; margin: 20px 0 20px 100px">
        <div class="titleline"></div>
        <div style="margin: 10px 0 0 10px">
          <span class="title">个人资料信息设置</span>
        </div>
      </div>
    </el-row>

    <el-form :model="ruleForm" :rules="rules">
      <div class="forms">
        <el-row
          type="flex"
          justify="space-between"
          style="align-items: center; width: 620px"
        >
          <span>用户名称：</span>
          <el-form-item prop="name">
            <el-input
              style="width: 400px; height: 50px"
              class="public-uncheck"
              v-model="ruleForm.name"
              placeholder="请设置您的名称"
              clearable
            ></el-input>
          </el-form-item>
        </el-row>

        <el-row
          type="flex"
          justify="space-between"
          style="align-items: center; width: 620px"
        >
          <span>用户所学专业：</span>
          <el-cascader
            style="width: 400px; height: 50px"
            v-model="ruleForm.major"
            placeholder="请选择您目前所在的/擅长的专业类别"
            :options="optionChoices"
            :props="{ expandTrigger: 'hover' }"
            :value="value"
          ></el-cascader>
        </el-row>

        <el-row
          type="flex"
          justify="space-between"
          style="align-items: center; width: 620px"
        >
          <span>所在院校：</span>
          <el-form-item prop="university">
            <el-input
              style="width: 400px; height: 50px"
              class="public-uncheck"
              placeholder="请设置您所在的学校"
              v-model="ruleForm.university"
              clearable
            ></el-input>
          </el-form-item>
        </el-row>

        <el-row
          type="flex"
          justify="space-between"
          style="align-items: center; width: 620px"
        >
          <span>用户签名：</span>
          <el-form-item prop="sign">
            <el-input
              style="width: 400px; height: 50px"
              class="public-uncheck"
              placeholder="请设置您的个性签名"
              v-model="ruleForm.signature"
              clearable
            ></el-input>
          </el-form-item>
        </el-row>

        <el-row
          type="flex"
          justify="space-between"
          style="align-items: center; width: 620px"
        >
          <span>用户个人简介：</span>
          <el-form-item prop="introduce">
            <el-input
              style="width: 400px; height: 50px"
              class="public-uncheck"
              placeholder="请设置您的个人简介(有关于自身能力的介绍)"
              v-model="ruleForm.introduce"
              clearable
            ></el-input>
          </el-form-item>
        </el-row>

        <!-- 头像裁剪 -->
        <el-row type="flex" justify="space-between" style="width: 422px">
          <span>个人头像：</span>
          <el-upload
            class="head-avatar-uploader"
            :show-file-list="false"
            :on-change="handlehead"
          >
            <img
              v-if="ruleForm.headphoto"
              :src="ruleForm.headphoto"
              class="head-avatar"
            />
            <el-icon v-else class="head-avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-row>
        <ImgCropper
          :type="0"
          :sourceFile="headerSourceFile"
          :croppedFileType="headerCroppedFileType"
          :dialogVisible="header_dialogFormVisible"
          @upload-image="uploadImage"
          @close-dialog="closeDialog"
        />

        <!-- 背景裁剪 -->
        <el-row
          type="flex"
          justify="space-between"
          style="margin: 20px 0 0; width: 897px"
        >
          <span>背景图片：</span>
          <el-upload
            class="back-avatar-uploader"
            :show-file-list="false"
            :on-change="handlebg"
          >
            <img
              v-if="ruleForm.backgroundphoto"
              :src="ruleForm.backgroundphoto"
              class="back-avatar"
            />
            <el-icon v-else class="back-avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-row>
        <ImgCropper
          :type="1"
          :sourceFile="bgSourceFile"
          :croppedFileType="bgCroppedFileType"
          :dialogVisible="background_dialogFormVisible"
          @upload-image="uploadImage"
          @close-dialog="closeDialog"
        />

        <el-row type="flex" justify="end" style="margin: 30px 60px 0 0">
          <div class="button" @click="submit()">
            <span>确认提交</span>
          </div>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { useStore } from '@/store'
import { optionChoices } from '@/utils/constants'
import { editUserInfo } from '@/api/user'
import type { User } from '@/api/user/types'
import { Plus } from '@element-plus/icons-vue'
import { ElNotification, ElMessageBox } from 'element-plus'
import ImgCropper from '@/components/Little/Tool/ImgCropper.vue'
import type { FormRules, UploadFile } from 'element-plus'

const { userStore } = useStore()

const originUserInfo = ref<User>({
  ...userStore.userInfo
})
const value = ref<
  {
    value: string
    label: string
  }[]
>([])

const ruleForm = ref<User>({
  ...userStore.userInfo
})
interface RuleForm {
  name: string
  major: string[]
  university: string
  signature: string
  introduce: string
}
const rules = ref<FormRules<RuleForm>>({
  name: [{ required: true, message: '用户名是必填项！', trigger: 'blur' }],
  major: [{ required: true, message: '专业设置是必填项！', trigger: 'blur' }],
  university: [
    { required: true, message: '学校设置是必填项！', trigger: 'blur' }
  ],
  introduce: [
    { required: true, message: '个人简介是必填项！', trigger: 'blur' }
  ]
})

// 头像图片相关
const header_dialogFormVisible = ref<boolean>(false)
let headerSourceFile: File | null | undefined = null
let headerCroppedFileType: string = '' // 裁剪后的文件类型
const handlehead = (file: UploadFile) => {
  headerSourceFile = file.raw
  headerCroppedFileType = headerSourceFile?.type ?? ''
  header_dialogFormVisible.value = true
}

// 背景图片相关
const background_dialogFormVisible = ref<boolean>(false)
let bgSourceFile: File | null | undefined = null
let bgCroppedFileType: string = '' // 裁剪后的文件类型
const handlebg = (file: UploadFile) => {
  bgSourceFile = file.raw
  bgCroppedFileType = bgSourceFile?.type ?? ''
  background_dialogFormVisible.value = true
}

// ImgCropper子传父事件
const uploadImage = (value: { type: number; imgURL: string }) => {
  if (value.type === 0) {
    ruleForm.value.headphoto = value.imgURL
  } else {
    ruleForm.value.backgroundphoto = value.imgURL
  }
}
const closeDialog = (type: number) => {
  if (type === 0) {
    header_dialogFormVisible.value = false
  } else {
    background_dialogFormVisible.value = false
  }
}

// 提交修改个人信息
const submit = async () => {
  userStore.setUserInfo(ruleForm.value)
  const res = await editUserInfo(ruleForm.value)
  if (res.result_code === 0) {
    ElNotification({
      title: '更新个人资料成功！',
      message: '2s后刷新页面...',
      type: 'success'
    })
  }
  setTimeout(() => {
    window.location.reload()
  }, 2000)
}

onBeforeRouteLeave((_, __, next) => {
  if (JSON.stringify(ruleForm.value) === JSON.stringify(originUserInfo.value)) {
    next(true)
  } else {
    ElMessageBox.confirm(
      '检测到未保存的内容，离开此页面后修改内容将不会被保存',
      '确认离开此页面？',
      {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }
    )
      .then(async () => {
        next(true)
      })
      .catch(() => {
        next(false)
      })
  }
})
</script>

<style scoped lang="less">
.infomain-wrap {
  position: relative;
  padding: 20px 20px 30px;
  width: 100%;
  background: #fff;
  border-radius: 20px;

  .titleline {
    width: 10px;
    height: 50px;
    background-color: #ff5900;
  }

  .title {
    font-size: 24px;
    font-family: 'AlibabaPuHuiTi-3-65-Medium', sans-serif;
    color: #3d3d3d;
  }

  .forms {
    margin: 0 0 0 150px;

    > * {
      margin: 20px 0;
    }

    > * span {
      font-size: 18px;
      font-family: 'AlibabaPuHuiTi-3-55-Regular', sans-serif;
      color: #3d3d3d;
    }
  }

  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 60px;
    background: #76fff5;
    border-radius: 30px;
    transition: all 0.5s;
    cursor: pointer;

    span {
      font-size: 18px;
      font-family: 'AlibabaPuHuiTi-3-55-Regular', sans-serif;
      color: #3d3d3d;
      transition: all 0.5s;
      line-height: 18px;
    }
  }

  .button:hover {
    background-color: #00ead8;

    span {
      color: #fff;
    }
  }

  .head-avatar-uploader {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 200px;
    height: 200px;
    border: 1px dashed #d9d9d9;
    border-radius: 20px;
    transition: all 0.2s;
    cursor: pointer;
  }

  .head-avatar-uploader:hover {
    border-color: #409eff;
  }

  .head-avatar-uploader-icon {
    width: 198px;
    height: 198px;
    font-size: 28px;
    text-align: center;
    color: #8c939d;
    line-height: 198px;
  }

  .head-avatar {
    display: block;
    height: 198px;
  }

  .back-avatar-uploader {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 675px;
    height: 142.5px;
    border: 1px dashed #d9d9d9;
    border-radius: 20px;
    transition: all 0.2s;
    cursor: pointer;
  }

  .back-avatar-uploader:hover {
    border-color: #409eff;
  }

  .back-avatar-uploader-icon {
    width: 673px;
    height: 140.5px;
    font-size: 28px;
    text-align: center;
    color: #8c939d;
    line-height: 140.5px;
  }

  .back-avatar {
    display: block;
    height: 140.5px;
  }

  :deep(.el-dialog) {
    position: relative;
    margin: 100px auto 50px;
    width: 900px;
    height: 600px;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
    box-sizing: border-box;
  }

  :deep(.el-form-item) {
    margin: 0;
  }

  :deep(.el-cascader .el-input) {
    height: 50px;
  }
}
</style>
