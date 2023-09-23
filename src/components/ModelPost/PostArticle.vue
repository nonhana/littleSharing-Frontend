<template>
  <div class="PostArticle-wrap">
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
        v-if="present_step == 0"
        style="
          margin: 0 0 0 400px;
          border-radius: 15px;
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
          border-radius: 15px;
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
        style="margin: 0"
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
            top: part1_top,
          }"
        >
          <el-row
            type="flex"
            justify="space-between"
            style="align-items: center; width: 600px; margin: 0 0 30px 0"
          >
            <span>是否为转载文章？</span>
            <el-radio-group
              style="
                display: flex;
                width: 400px;
                justify-content: space-between;
              "
              v-model="ruleForm.article_status"
            >
              <el-radio style="width: 100px" label="1" border>是</el-radio>
              <el-radio style="width: 100px" label="2" border>否</el-radio>
            </el-radio-group>
          </el-row>

          <el-row
            v-if="ruleForm.article_status === '1'"
            type="flex"
            justify="space-between"
            style="align-items: center; width: 600px; margin: 0 0 30px 0"
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
            style="align-items: center; width: 600px; margin: 0 0 30px 0"
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
            style="align-items: center; width: 600px; margin: 0 0 30px 0"
          >
            <span><span>*&nbsp;</span>文章所属专业：</span>
            <el-cascader
              style="width: 400px; height: 50px"
              v-model="ruleForm.article_major"
              placeholder="请选择文章所属的专业类别"
              :options="options"
              :props="{ expandTrigger: 'hover' }"
              :value="value"
            ></el-cascader>
          </el-row>

          <el-row
            type="flex"
            justify="space-between"
            style="align-items: center; width: 600px; margin: 0 0 30px 0"
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
              @input.native="filterData"
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
            style="align-items: center; width: 900px; margin: 0 0 30px 0"
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
          style="position: absolute; transition: all, 0.5s; left: 5px"
          :style="{
            top: part2_top,
          }"
        >
          <el-row type="flex" justify="space-between">
            <el-form-item prop="article_details">
              <mavon-editor
                style="height: 630px; width: 1340px"
                ref="md"
                @change="change"
                @imgAdd="imgAdd"
                v-model="ruleForm.article_details"
              />
            </el-form-item>
          </el-row>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import useCurrentDate from "@/utils/useCurrentDate";
import {
  postArticle,
  addArticleLabel,
  getArticleMain,
  editArticle,
  uploadArticleImg,
} from "@/api/article";
import { ElMessageBox, ElMessage, ElNotification } from "element-plus";

interface ArticleInfo {
  article_status: "1" | "2"; // 默认为转载，1-转载，2-原创
  article_link?: string;
  article_title: string;
  article_major: string[];
  article_labels: string[];
  article_introduce: string;
  article_details: string;
  article_md: string;
  article_uploaddate?: string;
  article_updatedate?: string;
  author_id: number;
}

// 通过ref拿到dom
const md = ref<any>();
const labelSelect = ref<any>();

const route = useRoute();
const router = useRouter();

const present_step = ref<number>(0);
const part1_top = ref<string>("0px");
const part2_top = ref<string>("-1000px");
const editStatus = ref<boolean>(false);
const optionsSubject = ref<any[]>([]);
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
const ruleForm = ref<ArticleInfo>({
  // 文章信息
  article_status: "1", //默认为转载，1-转载，2-原创
  article_link: "",
  article_title: "",
  article_major: [],
  article_labels: [],
  article_introduce: "",
  article_details: "",
  article_md: "",
  article_uploaddate: "",
  article_updatedate: "",
  // 作者id
  author_id: localStorage.getItem("user_info")
    ? JSON.parse(localStorage.getItem("user_info") as string).id
    : null,
});
const html = ref<string>(""); // 通过markdown及时转的html
const rules = ref<any>({
  article_title: [
    { required: true, message: "请输入文章标题", trigger: "blur" },
  ],
  article_details: [
    { required: true, message: "请输入文章详细内容", trigger: "blur" },
  ],
  article_introduce: [
    {
      required: true,
      message: "请简要写一下这篇文章的简介",
      trigger: "blur",
    },
  ],
  article_link: [
    {
      required: true,
      message: "转载文章请务必填写原文地址！",
      trigger: "blur",
    },
  ],
});

const changeStep = () => {
  if (present_step.value == 0) {
    part1_top.value = "-1000px";
    part2_top.value = "120px";
    present_step.value = 1;
  } else {
    part1_top.value = "0px";
    part2_top.value = "-1000px";
    present_step.value = 0;
  }
};
const exitEdit = () => {
  ElMessageBox.confirm(
    "注：编辑模式下退出编辑的内容将不会被保存！",
    "是否退出编辑？",
    {
      distinguishCancelAndClose: true,
      confirmButtonText: "确认",
      cancelButtonText: "取消",
    }
  ).then(() => {
    router.back();
  });
};
const bindChange = (e: any[]) => {
  if (e.length > 5) {
    ElMessage.warning("最多只能添加五个文章标签哦~");
    ruleForm.value.article_labels.splice(-1);
  }
};
const filterData = () => {
  var str = labelSelect.value.$data.selectedLabel; // 此属性得到输入的文字
  if (str.length > 20) {
    labelSelect.value.$data.selectedLabel = str.substr(0, 21);
  }
};
// 所有操作都会被解析重新渲染
const change = (_: any, render: string) => {
  // render 为 markdown 解析后的结果[html]
  html.value = render;
};
const imgAdd = async (pos: any, file: File) => {
  const res = await uploadArticleImg({
    articleImg: file,
  });
  if (res.data.result_code === 0) {
    console.log(res.data.result);
    md.value.$img2Url(pos, res.data.result);
  }
};
const submitArticle = async () => {
  if (
    (ruleForm.value.article_status == "1" &&
      ruleForm.value.article_link &&
      ruleForm.value.article_title &&
      ruleForm.value.article_major &&
      ruleForm.value.article_introduce &&
      ruleForm.value.article_details) ||
    (ruleForm.value.article_status == "2" &&
      ruleForm.value.article_title &&
      ruleForm.value.article_major &&
      ruleForm.value.article_introduce &&
      ruleForm.value.article_details)
  ) {
    // 统一处理ruleForm
    ruleForm.value.article_md = ruleForm.value.article_details;
    ruleForm.value.article_details = html.value;
    if (!editStatus.value) {
      ruleForm.value.article_uploaddate = useCurrentDate();
      ruleForm.value.article_updatedate = useCurrentDate();
    } else {
      ruleForm.value.article_updatedate = useCurrentDate();
    }

    // 若检测到用户输入的标签还未存储，则将新标签加入本地
    let article_labels = [];
    if (localStorage.getItem("article_labels")) {
      for (
        var i = 0;
        i < JSON.parse(localStorage.getItem("article_labels") as string).length;
        i++
      ) {
        article_labels.push(
          JSON.parse(localStorage.getItem("article_labels") as string)[i]
        );
      }
    }
    let same: any[] = [];
    article_labels.forEach((item1) => {
      ruleForm.value.article_labels.forEach((item2: any) => {
        if (item1.value == item2) {
          console.log(item2);
          same.push(item2);
        }
      });
    });
    if (same.length != 0) {
      // 筛选不同词
      let result = ruleForm.value.article_labels.filter((item1: any) => {
        return same.every((item2) => {
          return item1 != item2;
        });
      });
      // result就是筛选好的不同词
      result.forEach((item: any) => {
        article_labels.push({
          label: item,
          value: item,
        });
      });
      // 将不同词提交给后端数据库
      result.forEach(async (item: any) => {
        const res = await addArticleLabel({ label_name: item });
        console.log(res.data);
      });
    } else {
      ruleForm.value.article_labels.forEach(async (item: any) => {
        article_labels.push({
          label: item,
          value: item,
        });
        const res = await addArticleLabel({ label_name: item });
        console.log(res.data);
      });
    }
    localStorage.setItem("article_labels", JSON.stringify(article_labels));
    if (!editStatus.value) {
      const res = await postArticle(ruleForm.value);
      console.log(res.data);
      if (localStorage.getItem("not_saved_article_info")) {
        localStorage.removeItem("not_saved_article_info");
      }
    } else {
      console.log({
        article_id: Number(route.query.article_id),
        ...ruleForm.value,
      });
      const res = await editArticle({
        article_id: Number(route.query.article_id),
        ...ruleForm.value,
      });
      console.log(res.data);
    }

    // 将表单初始化
    ruleForm.value = {
      article_status: "1",
      article_link: "",
      article_title: "",
      article_major: [],
      article_labels: [],
      article_introduce: "",
      article_details: "",
      article_md: "",
      article_uploaddate: "",
      article_updatedate: "",
      author_id: localStorage.getItem("user_info")
        ? JSON.parse(localStorage.getItem("user_info") as string).id
        : null,
    };
    ElNotification({
      title: "发布成功！",
      message: "快快前往首页看看吧！",
      type: "success",
    });
  } else {
    ElNotification({
      title: "发布文章失败！",
      message: "必填项未填满！",
      type: "error",
    });
  }
};

watch(
  ruleForm,
  (newV, _) => {
    if (!editStatus.value) {
      localStorage.setItem("not_saved_article_info", JSON.stringify(newV));
    }
  },
  { deep: true }
);

onMounted(async () => {
  if (localStorage.getItem("not_saved_article_info")) {
    ElMessageBox.confirm("是否继续上次编辑？", "上次编辑内容未发布", {
      distinguishCancelAndClose: true,
      confirmButtonText: "确认",
      cancelButtonText: "取消",
    })
      .then(() => {
        const localData = JSON.parse(
          localStorage.getItem("not_saved_article_info") as string
        );
        ruleForm.value.article_details = localData.article_md;
        ruleForm.value.article_introduce = localData.article_introduce;
        ruleForm.value.article_labels = localData.article_labels;
        ruleForm.value.article_link = localData.article_link;
        ruleForm.value.article_major = localData.article_major;
        ruleForm.value.article_status = localData.article_status;
        ruleForm.value.article_title = localData.article_title;
        ruleForm.value.article_updatedate = localData.article_updatedate;
        ruleForm.value.article_uploaddate = localData.article_uploaddate;
        ruleForm.value.author_id = localData.author_id;
      })
      .catch(() => {
        localStorage.removeItem("not_saved_article_info");
      });
  }
  if (localStorage.getItem("article_labels")) {
    for (
      var i = 0;
      i < JSON.parse(localStorage.getItem("article_labels") as string).length;
      i++
    ) {
      optionsSubject.value.push(
        JSON.parse(localStorage.getItem("article_labels") as string)[i]
      );
    }
  }
  if (route.query.article_id) {
    editStatus.value = true;
    const res = await getArticleMain({
      article_id: Number(route.query.article_id),
    });
    if (res.data.result_code === 0) {
      const {
        article_id,
        collection_num,
        comment_num,
        like_num,
        share_num,
        view_num,
        ...sourceArticle
      } = res.data.result;

      console.log(sourceArticle);
      ruleForm.value.article_details = sourceArticle.article_md;
      ruleForm.value.article_introduce = sourceArticle.article_introduce;
      ruleForm.value.article_labels = sourceArticle.article_labels;
      ruleForm.value.article_link = sourceArticle.article_link;
      ruleForm.value.article_major = sourceArticle.article_major;
      ruleForm.value.article_status = sourceArticle.article_status;
      ruleForm.value.article_title = sourceArticle.article_title;
      ruleForm.value.article_updatedate = sourceArticle.article_updatedate;
      ruleForm.value.article_uploaddate = sourceArticle.article_uploaddate;
      ruleForm.value.author_id = sourceArticle.author_id;
      console.log(ruleForm.value);
    }
  }
});
</script>

<style scoped lang="less">
.PostArticle-wrap {
  margin-bottom: 30px;
  padding: 20px;
  width: 1300px;
  border-radius: 5px;
  background: #ffffff;
  min-height: 710px;
  .title {
    font-family: SourceHanSansCN-Bold;
    font-size: 36px;
    font-weight: bold;
    color: #3d3d3d;
    span {
      font-family: SourceHanSansCN-Bold;
      font-size: 16px;
      font-weight: normal;
      color: #9e9e9e;
    }
  }
  .forms {
    margin: 0 0 0 100px;
    span {
      font-family: SourceHanSansCN-Regular;
      font-size: 18px;
      font-weight: normal;
      color: #3d3d3d;
      span {
        color: #ff8200;
      }
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
  :deep(.el-textarea__inner) {
    display: block;
    resize: vertical;
    padding: 5px 15px;
    line-height: 1.5;
    box-sizing: border-box;
    width: 100%;
    font-size: inherit;
    color: #606266;
    background-color: #ffffff;
    background-image: none;
    border: 1px solid #dcdfe6;
    transition: border 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    border-radius: 5px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
      "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
  :deep(.el-form-item) {
    margin: 0;
  }
  :deep(.el-cascader .el-input) {
    height: 50px;
  }
  :deep(.el-select .el-input__wrapper) {
    height: 50px;
    padding: 0 11px;
  }
}
</style>
@/api/comment @/api/article
