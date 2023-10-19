<template>
  <el-row type="flex" justify="center">
    <div class="tasksheader">
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item class="title" style="cursor: default"
          >课程选择：
          <el-divider direction="vertical"></el-divider>
        </el-menu-item>
        <el-tooltip
          class="item"
          effect="light"
          content="重复点击可以刷新文章列表哦~"
          placement="top"
          :open-delay="300"
        >
          <el-menu-item index="1">全部</el-menu-item>
        </el-tooltip>
        <el-menu-item index="2">文学</el-menu-item>
        <el-menu-item index="3">理学</el-menu-item>
        <el-menu-item index="4">工学</el-menu-item>
        <el-menu-item index="5">艺术学</el-menu-item>
        <el-menu-item index="6">农学</el-menu-item>
        <el-menu-item index="7">其他学科</el-menu-item>

        <el-menu-item v-if="searchchoicenum != 0">
          <el-cascader
            v-if="searchchoicenum == 1"
            v-model="searchchoice"
            placeholder="请选择具体类别"
            :options="options1"
            :props="{ expandTrigger: 'hover' }"
            style="width: 200px"
            :value="value"
            @change="searchItem(searchchoice)"
          ></el-cascader>

          <el-cascader
            v-if="searchchoicenum == 2"
            v-model="searchchoice"
            placeholder="请选择具体类别"
            :options="options2"
            :props="{ expandTrigger: 'hover' }"
            style="width: 200px"
            :value="value"
            @change="searchItem(searchchoice)"
          ></el-cascader>

          <el-cascader
            v-if="searchchoicenum == 3"
            v-model="searchchoice"
            placeholder="请选择具体类别"
            :options="options3"
            :props="{ expandTrigger: 'hover' }"
            style="width: 200px"
            :value="value"
            @change="searchItem(searchchoice)"
          ></el-cascader>

          <el-cascader
            v-if="searchchoicenum == 4"
            v-model="searchchoice"
            placeholder="请选择具体类别"
            :options="options4"
            :props="{ expandTrigger: 'hover' }"
            style="width: 200px"
            :value="value"
            @change="searchItem(searchchoice)"
          ></el-cascader>

          <el-cascader
            v-if="searchchoicenum == 5"
            v-model="searchchoice"
            placeholder="请选择具体类别"
            :options="options5"
            :props="{ expandTrigger: 'hover' }"
            style="width: 200px"
            :value="value"
            @change="searchItem(searchchoice)"
          ></el-cascader>
        </el-menu-item>

        <el-menu-item style="cursor: default; position: absolute; right: 10px">
          <el-button v-if="searchStatus" @click="handleSelect('1')"
            >还原
          </el-button>
          <el-input
            placeholder="请输入你想要搜索的内容"
            v-model="keywords"
            style="width: 200px"
            @keyup.enter.native="search(keywords)"
          >
          </el-input>
          <el-button v-loading="searching" @click="search(keywords)"
            >搜索</el-button
          >
        </el-menu-item>
      </el-menu>
    </div>
  </el-row>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import {
  options1,
  options2,
  options3,
  options4,
  options5,
} from "@/utils/constants";
import { searchArticle } from "@/api/article";
import { ArticleInfo } from "@/utils/types";
import { ElNotification } from "element-plus";

const props = defineProps<{
  articleListAll: ArticleInfo[];
}>();

watch(
  () => props.articleListAll,
  () => {
    if (props.articleListAll.length > 0) {
      article_list_all = props.articleListAll;
    }
  }
);

const emit = defineEmits<{
  (e: "sendArticleList", arr: ArticleInfo[]): void;
}>();

const searchStatus = ref<boolean>(false);
const searching = ref<boolean>(false);
const keywords = ref<string>("");
const activeIndex = ref<string>("1");
const searchchoicenum = ref<number>(0);
const searchchoice = ref<string[]>([]);
const value = ref<string[]>([]);

let article_list_all: ArticleInfo[] = [];
let article_list: ArticleInfo[] = [];

const searchItem = (value: string[]) => {
  const resultStr = value.join("/");
  article_list = [];
  article_list_all.forEach((item: ArticleInfo) => {
    if (item.article_major.indexOf(resultStr) != -1) {
      article_list.push(item);
    }
  });
};
const handleSelect = (key: string) => {
  const filterArticleList = (keyword: string) => {
    return article_list_all.filter((item: ArticleInfo) =>
      item.article_major.includes(keyword)
    );
  };
  // 1.全部 2.文学 3.理学 4.工学 5.艺术学 6.农学 7.其他学科
  if (key === "1") {
    activeIndex.value = "1";
    keywords.value = "";
    searchStatus.value = false;
    article_list = [];
    searchchoicenum.value = 0;
    searchchoice.value = [];
    article_list = article_list_all;
  } else if (key >= "2" && key <= "7") {
    searchStatus.value = true;
    keywords.value = "";
    article_list = [];
    searchchoicenum.value = parseInt(key) - 1;
    searchchoice.value = [];
    const keywordsMap = new Map<string, string>([
      ["2", "文学"],
      ["3", "理学"],
      ["4", "工学"],
      ["5", "艺术学"],
      ["6", "农学"],
      ["7", "其他学科"],
    ]);
    const keyword = keywordsMap.get(key) as string;
    article_list = filterArticleList(keyword);
  }
  emit("sendArticleList", article_list);
};
// 查询文章
const search = async (keywords: string) => {
  if (!keywords) {
    ElNotification({
      title: "请输入搜索内容",
      type: "error",
    });
  } else {
    searchStatus.value = true;
    searching.value = true;
    article_list.splice(0);
    const searchRes = await searchArticle({ keyword: keywords });
    if (searchRes.data.result_code === 0) {
      // 搜索成功
      article_list = searchRes.data.result;

      emit("sendArticleList", article_list); // 发送文章列表给父组件

      if (article_list.length == 0) {
        // 提示总共搜索到几篇文章
        ElNotification({
          title: "未找到相关文章",
          type: "error",
        });
      } else {
        // 提示总共搜索到几篇文章
        ElNotification({
          title: "搜索成功！",
          message: `总共搜索到${article_list.length}篇文章`,
          type: "success",
        });
      }
    }
    searching.value = false;
  }
};
</script>

<style scoped lang="less">
.tasksheader {
  position: relative;
  width: 1350px;
}

:deep(.el-menu) {
  width: 100%;
  background-color: #ffffff !important;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  align-items: center;
  border: 0.5px solid #00ead8;
}

:deep(.el-menu-item):hover {
  color: #00ead8 !important;
}

:deep(.el-menu-item.is-active) {
  color: #00ead8 !important;
}
</style>
