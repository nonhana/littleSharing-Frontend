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
            @change="searchitem(searchchoice)"
          ></el-cascader>

          <el-cascader
            v-if="searchchoicenum == 2"
            v-model="searchchoice"
            placeholder="请选择具体类别"
            :options="options2"
            :props="{ expandTrigger: 'hover' }"
            style="width: 200px"
            :value="value"
            @change="searchitem(searchchoice)"
          ></el-cascader>

          <el-cascader
            v-if="searchchoicenum == 3"
            v-model="searchchoice"
            placeholder="请选择具体类别"
            :options="options3"
            :props="{ expandTrigger: 'hover' }"
            style="width: 200px"
            :value="value"
            @change="searchitem(searchchoice)"
          ></el-cascader>

          <el-cascader
            v-if="searchchoicenum == 4"
            v-model="searchchoice"
            placeholder="请选择具体类别"
            :options="options4"
            :props="{ expandTrigger: 'hover' }"
            style="width: 200px"
            :value="value"
            @change="searchitem(searchchoice)"
          ></el-cascader>

          <el-cascader
            v-if="searchchoicenum == 5"
            v-model="searchchoice"
            placeholder="请选择具体类别"
            :options="options5"
            :props="{ expandTrigger: 'hover' }"
            style="width: 200px"
            :value="value"
            @change="searchitem(searchchoice)"
          ></el-cascader>
        </el-menu-item>

        <el-menu-item style="cursor: default; position: absolute; right: 10px">
          <el-button v-if="searchCount != 0" @click="handleSelect('1')"
            >还原
          </el-button>
          <el-input
            placeholder="请输入你想要搜索的内容"
            v-model="keywords"
            style="width: 200px"
            @keyup.enter.native="search(keywords)"
          >
          </el-input>
          <el-button @click="search(keywords)">搜索</el-button>
        </el-menu-item>
      </el-menu>
    </div>
  </el-row>
</template>

<script setup lang="ts">
import { ref, toRaw, watch } from "vue";
import useShuffle from "@/utils/useShuffle";
import { submitSearchKeywordAPI } from "@/api/articles";
import { ElNotification } from "element-plus";

interface label {
  value: string;
  label: string;
}
interface ArticleInfo {
  article_id: number;
  article_details: string;
  article_introduce: string;
  article_labels: Array<string>;
  article_link?: string;
  article_major: Array<string>;
  article_md: string;
  article_num: number;
  article_status: "1" | "2";
  article_title: string;
  article_updatedate: string;
  article_uploaddate: string;
  author_headphoto: string;
  author_id: number;
  author_major: string;
  author_name: string;
  author_signature: string;
  author_university: string;
  collection_num: number;
  comment_num: number;
  cover_image: string;
  like_num: number;
  share_num: number;
  view_num: number;
}
interface KeyWordInfo {
  keywords_name: string;
  keywords_count: number;
}

const props = defineProps<{
  messageList: Array<string>;
  articleListAll: Array<ArticleInfo>;
}>();

const emit = defineEmits<{
  (e: "sendArticleList", arr: Array<ArticleInfo>): void;
}>();

let messageList = props.messageList;
let article_list_all = props.articleListAll;
let article_list: ArticleInfo[] = [];
let article_recommond: ArticleInfo[] = [];
let searchCount = ref<number>(0);
let keywords = ref<string>("");
let activeIndex = ref<string>("1");
let searchchoicenum = ref<number>(0);
let searchchoice = ref<string[]>([]);
let value = ref<string[]>([]);
let options1 = ref<label[]>([
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
]);
let options2 = ref<label[]>([
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
]);
let options3 = ref<label[]>([
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
]);
let options4 = ref<label[]>([
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
]);
let options5 = ref<label[]>([
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
]);

watch(
  () => props.articleListAll,
  () => {
    if (props.articleListAll.length > 0) {
      article_list_all = toRaw(props.articleListAll);
    }
  }
);
watch(
  () => props.messageList,
  () => {
    if (props.messageList.length > 0) {
      messageList = toRaw(props.messageList);
    }
  }
);

const searchitem = (value: string[]) => {
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

  if (key === "1") {
    activeIndex.value = "1";
    keywords.value = "";
    searchCount.value = 0;
    article_list = [];
    article_recommond = [];
    searchchoicenum.value = 0;
    searchchoice.value = [];
    const keywordsList = JSON.parse(
      localStorage.getItem("keywords_list") as string
    );
    if (keywordsList.length >= 2) {
      let [max1, max2] = [
        keywordsList[0].keywords_name,
        keywordsList[1].keywords_name,
      ];

      const pushToArticleRecommond = (index: number) => {
        article_recommond.push(article_list_all[index]);
      };

      messageList.forEach((item: string, index: number) => {
        if (item.toLowerCase().includes(max1.toLowerCase())) {
          pushToArticleRecommond(index);
        }
      });
      article_recommond = useShuffle(article_recommond);
      messageList.forEach((item: string, index: number) => {
        if (!item.toLowerCase().includes(max1.toLowerCase())) {
          if (item.toLowerCase().includes(max2.toLowerCase())) {
            pushToArticleRecommond(index);
          }
        }
      });
      article_recommond = useShuffle(article_recommond);
      messageList.forEach((item: string, index: number) => {
        if (!item.toLowerCase().includes(max1.toLowerCase())) {
          if (!item.toLowerCase().includes(max2.toLowerCase())) {
            pushToArticleRecommond(index);
          }
        }
      });
      article_list = article_recommond;
    } else if (keywordsList.length == 1) {
      const max1 = keywordsList[0].keywords_name;

      messageList.forEach((item: string, index: number) => {
        if (item.toLowerCase().includes(max1.toLowerCase())) {
          article_recommond.push(article_list_all[index]);
        }
      });
      article_recommond = useShuffle(article_recommond);
      messageList.forEach((item: string, index: number) => {
        if (!item.toLowerCase().includes(max1.toLowerCase())) {
          article_recommond.push(article_list_all[index]);
        }
      });
      article_list = article_recommond;
    } else {
      article_list = article_list_all;
    }
  } else if (key >= "2" && key <= "7") {
    searchCount.value++;
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
const search = async (keywords: string) => {
  if (!keywords) {
    ElNotification({
      title: "请输入搜索内容",
      type: "error",
    });
  } else {
    searchCount.value++;
    const paramsList = {
      keyword: keywords,
      user_id: JSON.parse(localStorage.getItem("user_info") as string).id,
    };
    await submitSearchKeywordAPI(paramsList);
    let index = 0;
    article_list.splice(0);
    messageList.forEach((item: string) => {
      if (item.toLowerCase().indexOf(keywords.toLowerCase()) != -1) {
        article_list.push(article_list_all[index]);
      }
      index++;
    });
    emit("sendArticleList", article_list);
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

      let keywords_list = [];
      let flag = 0;
      if (localStorage.getItem("keywords_list") as string) {
        JSON.parse(localStorage.getItem("keywords_list") as string).forEach(
          (item: KeyWordInfo) => {
            if (item.keywords_name.toLowerCase() == keywords.toLowerCase()) {
              flag = 1;
              item.keywords_count++;
            }
            keywords_list.push(item);
          }
        );
        if (flag == 0) {
          keywords_list.push({
            keywords_name: keywords.toLowerCase(),
            keywords_count: 1,
          });
        }
        localStorage.setItem("keywords_list", JSON.stringify(keywords_list));
      } else {
        keywords_list.push({
          keywords_name: keywords.toLowerCase(),
          keywords_count: 1,
        });
        localStorage.setItem("keywords_list", JSON.stringify(keywords_list));
      }
    }
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
