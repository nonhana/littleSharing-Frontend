<template>
  <div class="postarticle-wrap">
    <!-- 上传图片、上传文章时的el全局加载 -->
    <div v-loading.fullscreen.lock="loading" />

    <el-row
      style="margin: 10px 0 50px 50px"
      type="flex"
      justify="space-between"
    >
      <span class="title" v-if="!editStatus"
        >上传文章&emsp;<span>~您的分享是本站最本质的意义~</span></span
      >
      <span class="title" v-else
        >编辑文章&emsp;<span>~您的分享是本站最本质的意义~</span></span
      >
      <el-button
        @click="changeStep()"
        v-if="present_step === 0"
        style="
          margin: 0 0 0 400px;
          width: 150px;
          height: 60px;
          border-radius: 30px;
        "
      >
        <span style="font-size: 18px; line-height: 18px; color: #3d3d3d"
          >下一步</span
        >
      </el-button>
      <el-button
        @click="changeStep()"
        v-else
        style="
          margin: 0 0 0 400px;
          width: 150px;
          height: 60px;
          border-radius: 30px;
        "
      >
        <span style="font-size: 18px; line-height: 18px; color: #3d3d3d"
          >上一步</span
        >
      </el-button>
      <div
        class="button"
        v-if="editStatus"
        @click="exitEdit()"
        style="position: absolute; right: 440px"
      >
        <span>退出编辑</span>
      </div>
      <div class="button" @click="submitArticle()">
        <span>提交文章</span>
      </div>
    </el-row>

    <el-form :model="ruleForm" :rules="rules">
      <div class="forms">
        <div
          style="position: relative; transition: all, 0.5s"
          :style="{
            top: part1_top
          }"
        >
          <el-row
            type="flex"
            justify="space-between"
            style="align-items: center; margin: 0 0 30px; width: 600px"
          >
            <span>是否为转载文章？</span>
            <el-radio-group
              style="
                display: flex;
                justify-content: space-between;
                width: 400px;
              "
              v-model="ruleForm.article_status"
            >
              <el-radio style="width: 100px" :label="1" border>是</el-radio>
              <el-radio style="width: 100px" :label="2" border>否</el-radio>
            </el-radio-group>
          </el-row>

          <el-row
            v-if="ruleForm.article_status === 1"
            type="flex"
            justify="space-between"
            style="align-items: center; margin: 0 0 30px; width: 600px"
          >
            <span><span>*&nbsp;</span>转载网址：</span>
            <el-form-item prop="article_link">
              <el-input
                style="width: 400px; height: 50px"
                class="public-uncheck"
                v-model="ruleForm.article_link"
                placeholder="请输入发表本文的原网址(转载其他网站的文章需填入)"
                clearable
              ></el-input>
            </el-form-item>
          </el-row>

          <el-row
            type="flex"
            justify="space-between"
            style="align-items: center; margin: 0 0 30px; width: 600px"
          >
            <span><span>*&nbsp;</span>文章标题：</span>
            <el-form-item prop="article_title">
              <el-input
                style="width: 400px; height: 50px"
                class="public-uncheck"
                v-model="ruleForm.article_title"
                placeholder="请输入文章标题"
                clearable
                :maxlength="100"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-row>

          <el-row
            type="flex"
            justify="space-between"
            style="align-items: center; margin: 0 0 30px; width: 600px"
          >
            <span><span>*&nbsp;</span>文章所属专业：</span>
            <el-cascader
              style="width: 400px; height: 50px"
              v-model="ruleForm.article_major"
              placeholder="请选择文章所属的专业类别"
              :options="optionChoices"
              :props="{ expandTrigger: 'hover' }"
              :value="value"
            ></el-cascader>
          </el-row>

          <el-row
            type="flex"
            justify="space-between"
            style="align-items: center; margin: 0 0 30px; width: 600px"
          >
            <span style="margin: 0 0 0 13px">文章标签：</span>
            <el-select
              v-model="ruleForm.article_labels"
              ref="labelSelect"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请输入文章标签(自定义)"
              style="width: 400px; height: 50px"
              @change="bindChange"
            >
              <el-option
                v-for="item in optionsSubject"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-row>

          <el-row
            type="flex"
            justify="space-between"
            style="align-items: center; margin: 0 0 30px; width: 900px"
          >
            <span><span>*&nbsp;</span>文章内容简介：</span>
            <el-form-item prop="article_introduce">
              <el-input
                type="textarea"
                style="width: 700px"
                class="public-uncheck"
                v-model="ruleForm.article_introduce"
                placeholder="请简短的介绍一下你的文章内容(如果文章标题已经概括，那么直接用标题也可)"
                clearable
                :autosize="{ minRows: 2 }"
                :maxlength="200"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-row>
        </div>
        <div
          style="position: absolute; left: 0; transition: all, 0.5s"
          :style="{
            top: part2_top
          }"
        >
          <el-row type="flex" justify="space-between">
            <el-form-item prop="article_md">
              <MdEditor
                style="width: 1350px; height: 630px"
                @on-upload-img="onUploadImg"
                v-model="ruleForm.article_md"
              />
            </el-form-item>
          </el-row>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
import { getUserFansList } from '@/api/user'
import {
  postArticle,
  addArticleLabel,
  getArticleMain,
  editArticle,
  uploadArticleImg
} from '@/api/article'
import { postMessage } from '@/api/message'
import type { IPostMessageParams } from '@/api/message/types'
import { optionChoices } from '@/utils/constants'
import type { IPostArticleParams } from '@/api/article/types'
import { ElMessageBox, ElMessage, ElNotification } from 'element-plus'
import { MdEditor } from 'md-editor-v3' // 引入md编辑器
import 'md-editor-v3/lib/style.css' // 编辑器的样式
import { ElSelect } from 'element-plus'
import type { FormRules, CascaderValue } from 'element-plus'

// 通过ref拿到dom
const labelSelect = ref<InstanceType<typeof ElSelect> | null>(null)

const route = useRoute()
const router = useRouter()

const { userStore, articleLabelStore } = useStore()

const present_step = ref<number>(0)
const part1_top = ref<string>('0px')
const part2_top = ref<string>('-1000px')
const editStatus = ref<boolean>(false)
const optionsSubject = ref<{ value: string; label: string }[]>([])
const value = ref<{ value: string; label: string }[]>([])
const ruleForm = ref<IPostArticleParams>({
  article_status: 1, //默认为转载，1-转载，2-原创
  article_link: '',
  article_title: '',
  article_major: [],
  article_labels: [],
  article_introduce: '',
  article_md: '',
  article_md_link: '',
  author_id: userStore.userInfo.user_id
})
const loading = ref<boolean>(false)
interface RuleForm {
  article_title: string
  article_md: string
  article_introduce: string
  article_link: string
}
const rules = ref<FormRules<RuleForm>>({
  article_title: [
    { required: true, message: '请输入文章标题', trigger: 'blur' }
  ],
  article_md: [
    { required: true, message: '请输入文章详细内容', trigger: 'blur' }
  ],
  article_introduce: [
    {
      required: true,
      message: '请简要写一下这篇文章的简介',
      trigger: 'blur'
    }
  ],
  article_link: [
    {
      required: true,
      message: '转载文章请务必填写原文地址！',
      trigger: 'blur'
    }
  ]
})

const changeStep = () => {
  if (present_step.value === 0) {
    part1_top.value = '-1000px'
    part2_top.value = '120px'
    present_step.value = 1
  } else {
    part1_top.value = '0px'
    part2_top.value = '-1000px'
    present_step.value = 0
  }
}
const exitEdit = () => {
  ElMessageBox.confirm(
    '注：编辑模式下退出编辑的内容将不会被保存！',
    '是否退出编辑？',
    {
      distinguishCancelAndClose: true,
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    }
  ).then(() => {
    router.back()
  })
}
const bindChange = (e: CascaderValue[]) => {
  if (e.length > 5) {
    ElMessage.warning('最多只能添加五个文章标签哦~')
    ruleForm.value.article_labels.splice(-1)
  }
}
// 在编辑器里面上传图片时，会自动传给后端进行保存，然后返回url地址。
const onUploadImg = async (
  files: Array<File>,
  callback: (res: Array<string>) => void
) => {
  loading.value = true
  const res = await Promise.all(
    files.map((file) => {
      return uploadArticleImg({
        articleImg: file
      })
    })
  )
  callback(res.map((item) => item.result))
  loading.value = false
}
// 上传文章
const submitArticle = async () => {
  if (
    (ruleForm.value.article_status === 1 &&
      ruleForm.value.article_link &&
      ruleForm.value.article_title &&
      ruleForm.value.article_major &&
      ruleForm.value.article_introduce &&
      ruleForm.value.article_md) ||
    (ruleForm.value.article_status === 2 &&
      ruleForm.value.article_title &&
      ruleForm.value.article_major &&
      ruleForm.value.article_introduce &&
      ruleForm.value.article_md)
  ) {
    loading.value = true
    // 将所有的标签一并提交给后端数据库
    await addArticleLabel({ label_list: ruleForm.value.article_labels })

    // 发布文章
    if (!editStatus.value) {
      const { result: article_id } = await postArticle(ruleForm.value)
      // 文章发布之后，给所有关注了当前用户的用户发送消息
      const { result: fansList } = await getUserFansList({
        user_id: userStore.userInfo.user_id
      })
      fansList.forEach((item) => {
        const params: IPostMessageParams = {
          type: 2,
          content:
            '<span> 您关注的用户' +
            `<a href="${import.meta.env.VITE_SITE_URL}/personalCenter/${
              userStore.userInfo.user_id
            }" target="_blank"> ${userStore.userInfo.name} </a>` +
            '发布了一篇新文章，快去看看吧！</span>',
          abstract: `<a href="${
            import.meta.env.VITE_SITE_URL
          }/articleHome/${article_id}" target="_blank"> ${
            ruleForm.value.article_title
          } </a>`,
          receiver_id: item.first_user_id
        }
        postMessage(params)
      })
    } else {
      await editArticle({
        article_id: Number(route.query.article_id),
        ...ruleForm.value
      })
    }
    // 将表单初始化
    ruleForm.value = {
      article_status: 1,
      article_link: '',
      article_title: '',
      article_major: [],
      article_labels: [],
      article_introduce: '',
      article_md: '',
      article_md_link: '',
      author_id: userStore.userInfo.user_id
    }
    loading.value = false
    router.push('postFinished')
  } else {
    ElNotification({
      title: '发布文章失败！',
      message: '必填项未填满！',
      type: 'error'
    })
  }
}

onMounted(async () => {
  if (articleLabelStore.articleLabelInfo) {
    for (var i = 0; i < articleLabelStore.articleLabelInfo.length; i++) {
      optionsSubject.value.push(articleLabelStore.articleLabelInfo[i])
    }
  }
  if (route.query.article_id) {
    editStatus.value = true
    const res = await getArticleMain({
      article_id: Number(route.query.article_id)
    })
    if (res.result_code === 0) {
      const sourceArticle = res.result

      ruleForm.value.article_md =
        sourceArticle.article_md_link !== ''
          ? await fetch(sourceArticle.article_md_link).then((res) => res.text())
          : sourceArticle.article_md
      ruleForm.value.article_md_link = sourceArticle.article_md_link
      ruleForm.value.article_introduce = sourceArticle.article_introduce
      ruleForm.value.article_labels = sourceArticle.article_labels
      ruleForm.value.article_link = sourceArticle.article_link
      ruleForm.value.article_major = sourceArticle.article_major
      ruleForm.value.article_status = sourceArticle.article_status
      ruleForm.value.article_title = sourceArticle.article_title
      ruleForm.value.author_id = sourceArticle.author_id
    }
  }
})
</script>

<style scoped lang="less">
.postarticle-wrap {
  padding: 20px;
  margin-bottom: 30px;
  width: 1310px;
  min-height: 710px;
  background: #fff;
  border-radius: 20px;

  .title {
    font-size: 36px;
    font-family: 'AlibabaPuHuiTi-3-65-Medium', sans-serif;
    color: #3d3d3d;

    span {
      font-size: 16px;
      font-family: 'AlibabaPuHuiTi-3-65-Medium', sans-serif;
      color: #9e9e9e;
    }
  }

  .forms {
    margin: 0 0 0 100px;

    span {
      font-size: 18px;
      font-family: 'AlibabaPuHuiTi-3-55-Regular', sans-serif;
      color: #3d3d3d;

      span {
        color: #ff8200;
      }
    }
  }

  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 60px;
    font-size: 18px;
    font-family: 'AlibabaPuHuiTi-3-55-Regular', sans-serif;
    color: #3d3d3d;
    background: #76fff5;
    border-radius: 30px;
    transition: all 0.5s;
    cursor: pointer;

    &:hover {
      background-color: #00ead8;

      span {
        color: #fff;
      }
    }
  }

  /* stylelint-disable-next-line selector-class-pattern */
  :deep(.el-textarea__inner) {
    display: block;
    padding: 5px 15px;
    width: 100%;
    font-size: inherit;
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
      'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
    color: #606266;
    background-color: #fff;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    resize: vertical;
    transition: border 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    line-height: 1.5;
    box-sizing: border-box;
    background-image: none;
  }

  :deep(.el-form-item) {
    margin: 0;
  }

  :deep(.el-cascader .el-input) {
    height: 50px;
  }

  /* stylelint-disable-next-line selector-class-pattern */
  :deep(.el-select .el-input__wrapper) {
    padding: 0 11px;
    height: 50px;
  }
}
</style>
