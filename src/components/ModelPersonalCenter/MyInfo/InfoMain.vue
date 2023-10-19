<template>
  <div class="InfoMain-wrap">
    <el-row>
      <div style="display: flex; margin: 20px 0 20px 100px">
        <div class="titleline"></div>
        <div style="margin: 10px 0 0 10px">
          <span class="title">&nbsp;个人资料信息设置</span>
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
            :options="options"
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
          style="width: 897px; margin: 20px 0 0 0"
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
import { ref } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { editUserInfo } from "@/api/user";
import { ElNotification, ElMessageBox } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import ImgCropper from "@/components/Little/Tool/ImgCropper.vue";

const originUserInfo = ref<any>({
  ...JSON.parse(localStorage.getItem("user_info") as string),
});
const value = ref<any[]>([]);
const options = ref<any[]>([
  {
    value: "文学",
    label: "文学",
    children: [
      {
        value: "中国语言文学类",
        label: "中国语言文学类",
      },
      {
        value: "新闻传播学类",
        label: "新闻传播学类",
      },
      {
        value: "外国语言文学类",
        label: "外国语言文学类",
      },
      {
        value: "其他类别",
        label: "其他类别",
      },
    ],
  },
  {
    value: "艺术学",
    label: "艺术学",
    children: [
      {
        value: "音乐",
        label: "音乐",
      },
      {
        value: "舞蹈",
        label: "舞蹈",
      },
      {
        value: "影视学类",
        label: "影视学类",
      },
      {
        value: "戏剧学类",
        label: "戏剧学类",
      },
      {
        value: "美术学类",
        label: "美术学类",
      },
      {
        value: "设计学类",
        label: "设计学类",
      },
      {
        value: "其他类别",
        label: "其他类别",
      },
    ],
  },
  {
    value: "理学",
    label: "理学",
    children: [
      {
        value: "信息与计算科学",
        label: "信息与计算科学",
      },
      {
        value: "数学与应用数学",
        label: "数学与应用数学",
      },
      {
        value: "应用化学",
        label: "应用化学",
      },
      {
        value: "生物技术",
        label: "生物技术",
      },
      {
        value: "生物科学",
        label: "生物科学",
      },
      {
        value: "应用物理学",
        label: "应用物理学",
      },
      {
        value: "应用心理学",
        label: "应用心理学",
      },
      {
        value: "统计学",
        label: "统计学",
      },
      {
        value: "化学",
        label: "化学",
      },
      {
        value: "物理学",
        label: "物理学",
      },
      {
        value: "其他类别",
        label: "其他类别",
      },
    ],
  },
  {
    value: "工学",
    label: "工学",
    children: [
      {
        value: "土木工程",
        label: "土木工程",
      },
      {
        value: "机械类专业",
        label: "机械类专业",
      },
      {
        value: "电气工程及其智能化",
        label: "电气工程及其智能化",
      },
      {
        value: "计算机科学与技术",
        label: "计算机科学与技术",
      },
      {
        value: "车辆工程",
        label: "车辆工程",
      },
      {
        value: "软件工程",
        label: "软件工程",
      },
      {
        value: "交通运输工程",
        label: "交通运输工程",
      },
      {
        value: "自动化",
        label: "自动化",
      },
      {
        value: "其他类别",
        label: "其他类别",
      },
    ],
  },
  {
    value: "农学",
    label: "农学",
    children: [
      {
        value: "园艺",
        label: "园艺",
      },
      {
        value: "种子科学与工程",
        label: "种子科学与工程",
      },
      {
        value: "设施农业科学与工程",
        label: "设施农业科学与工程",
      },
      {
        value: "农业资源与环境",
        label: "农业资源与环境",
      },
      {
        value: "动物科学",
        label: "动物科学",
      },
      {
        value: "林学",
        label: "林学",
      },
      {
        value: "水产养殖学",
        label: "水产养殖学",
      },
      {
        value: "草业学科",
        label: "草业学科",
      },
      {
        value: "茶学",
        label: "茶学",
      },
      {
        value: "烟草",
        label: "烟草",
      },
      {
        value: "农艺教育",
        label: "农艺教育",
      },
      {
        value: "园艺教育",
        label: "园艺教育",
      },
      {
        value: "其他类别",
        label: "其他类别",
      },
    ],
  },
  {
    value: "其他学科",
    label: "其他学科",
  },
]);
const ruleForm = ref<any>({
  ...JSON.parse(localStorage.getItem("user_info") as string),
});
const rules = ref<any>({
  name: [{ required: true, message: "用户名是必填项！", trigger: "blur" }],
  major: [{ required: true, message: "专业设置是必填项！", trigger: "blur" }],
  university: [
    { required: true, message: "学校设置是必填项！", trigger: "blur" },
  ],
  introduce: [
    { required: true, message: "个人简介是必填项！", trigger: "blur" },
  ],
});

// 头像图片相关
const header_dialogFormVisible = ref<boolean>(false);
let headerSourceFile: File | null | undefined = null;
let headerCroppedFileType: string = ""; // 裁剪后的文件类型
const handlehead = (file: any) => {
  headerSourceFile = file.raw;
  headerCroppedFileType = headerSourceFile?.type ?? "";
  header_dialogFormVisible.value = true;
};

// 背景图片相关
const background_dialogFormVisible = ref<boolean>(false);
let bgSourceFile: File | null | undefined = null;
let bgCroppedFileType: string = ""; // 裁剪后的文件类型
const handlebg = (file: any) => {
  bgSourceFile = file.raw;
  bgCroppedFileType = bgSourceFile?.type ?? "";
  background_dialogFormVisible.value = true;
};

// ImgCropper子传父事件
const uploadImage = (value: { type: number; imgURL: string }) => {
  if (value.type === 0) {
    ruleForm.value.headphoto = value.imgURL;
  } else {
    ruleForm.value.backgroundphoto = value.imgURL;
  }
};
const closeDialog = (type: number) => {
  if (type === 0) {
    header_dialogFormVisible.value = false;
  } else {
    background_dialogFormVisible.value = false;
  }
};

// 提交修改个人信息
const submit = async () => {
  console.log(ruleForm.value);
  localStorage.setItem("user_info", JSON.stringify(ruleForm.value));
  const res = await editUserInfo(ruleForm.value);
  if (res.data.result_code === 0) {
    ElNotification({
      title: "更新个人资料成功！",
      message: "2s后刷新页面...",
      type: "success",
    });
  }
  setTimeout(() => {
    window.location.reload();
  }, 2000);
};

onBeforeRouteLeave((_, __, next) => {
  if (JSON.stringify(ruleForm.value) == JSON.stringify(originUserInfo.value)) {
    next(true);
  } else {
    ElMessageBox.confirm(
      "检测到未保存的内容，离开此页面后修改内容将不会被保存",
      "确认离开此页面？",
      {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      }
    )
      .then(async () => {
        next(true);
      })
      .catch(() => {
        next(false);
      });
  }
});
</script>

<style scoped lang="less">
.InfoMain-wrap {
  position: relative;
  width: 100%;
  background: #ffffff;
  border-radius: 10px;
  padding: 20px 20px 30px;
  .titleline {
    width: 10px;
    height: 50px;
    background-color: #ff5900;
  }
  .title {
    font-family: SourceHanSansCN-Bold;
    font-size: 24px;
    font-weight: bold;
    color: #3d3d3d;
  }
  .forms {
    margin: 0 0 0 150px;
    > * {
      margin: 20px 0 20px 0;
    }
    > * span {
      font-family: SourceHanSansCN-Regular;
      font-size: 18px;
      font-weight: normal;
      color: #3d3d3d;
    }
  }
  .button {
    width: 150px;
    height: 60px;
    border-radius: 30px;
    background: #76fff5;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.5s;
    span {
      font-family: SourceHanSansCN-Regular;
      font-size: 18px;
      font-weight: normal;
      line-height: 18px;
      color: #3d3d3d;
      transition: all 0.5s;
    }
  }
  .button:hover {
    background-color: #00ead8;
    span {
      color: #ffffff;
    }
  }
  .head-avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s;
  }
  .head-avatar-uploader:hover {
    border-color: #409eff;
  }
  .head-avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 198px;
    height: 198px;
    line-height: 198px;
    text-align: center;
  }
  .head-avatar {
    height: 198px;
    display: block;
  }
  .back-avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 675px;
    height: 142.5px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s;
  }
  .back-avatar-uploader:hover {
    border-color: #409eff;
  }
  .back-avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 673px;
    height: 140.5px;
    line-height: 140.5px;
    text-align: center;
  }
  .back-avatar {
    height: 140.5px;
    display: block;
  }
  :deep(.el-dialog) {
    position: relative;
    margin: 100px auto 50px;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
    box-sizing: border-box;
    width: 900px;
    height: 600px;
  }
  :deep(.el-form-item) {
    margin: 0;
  }
  :deep(.el-cascader .el-input) {
    height: 50px;
  }
}
</style>
