<template>
  <div class="ArticleHomeAuthor-wrap">
    <el-row>
      <div style="width: 100%; display: flex; justify-content: center">
        <div class="author_head" @click="useEnterSpace(author_id)">
          <img :src="author_head" alt="" />
        </div>
      </div>
    </el-row>

    <el-row type="flex" justify="center" style="margin: 10px 0">
      <span class="author_name">{{ author_name }}</span>
    </el-row>

    <div>
      <el-row type="flex" justify="center" style="margin: 10px 0">
        <span class="author_info">{{ author_signature }}</span>
      </el-row>

      <el-row type="flex" justify="center" style="margin: 10px 0">
        <span class="author_info">所属专业：{{ author_major }}</span>
      </el-row>

      <el-row type="flex" justify="center" style="margin: 10px 0">
        <span class="author_info">所属高校：{{ author_university }}</span>
      </el-row>
    </div>

    <el-divider
      ><span style="font-size: 10px; color: #9e9e9e"
        >ta的其他文章</span
      ></el-divider
    >

    <el-row v-if="author_article_list.length != 0">
      <SimilarArticleItem
        v-for="(_, index) in author_article_list"
        :similar-item="author_article_list[index]"
        :key="index"
      />
    </el-row>

    <el-row
      v-if="author_article_list.length == 0"
      v-loading="loadingStatus"
      element-loading-background="rgba(0, 0, 0, 0.4)"
      element-loading-text="少女祈祷中..."
    >
      <no-list
        :width="220"
        :height="60"
        content="暂未找到ta发表的其他文章..."
      ></no-list>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ArticleInfo } from "@/types";
import useEnterSpace from "@/utils/useEnterSpace";
import useShuffle from "@/utils/useShuffle";
import { useRoute } from "vue-router";
import { getArticleMainAPI, getArticleListAPI } from "@/api/articles";
import { getUserinfoAPI } from "@/api/user";
import SimilarArticleItem from "../little/SimilarArticleItem.vue";

const route = useRoute();

const loadingStatus = ref<boolean>(true);
const author_id = ref<number>(0);
const author_head = ref<string>("");
const author_name = ref<string>("");
const author_major = ref<string>("");
const author_university = ref<string>("");
const author_signature = ref<string>("");
const author_article_list = ref<ArticleInfo[]>([]);

onMounted(async () => {
  const res = await getArticleMainAPI({
    article_id: Number(route.params.id),
  });

  if (res.data.result_code === 0) {
    const { author_id: articleAuthorId } = res.data.result.article_main;

    const authorInfoData = (
      await getUserinfoAPI({
        user_id: articleAuthorId,
      })
    ).data.result;
    if (authorInfoData.user_info) {
      const { name, headphoto, major, university, signature } =
        authorInfoData.user_info;

      author_name.value = name;
      author_head.value = headphoto;
      author_major.value = major;
      author_university.value = university;
      author_signature.value = signature;

      const articleListData = (await getArticleListAPI()).data.result;
      if (articleListData.article_list) {
        author_article_list.value = articleListData.article_list
          .filter(
            (item: ArticleInfo) =>
              item.author_id === articleAuthorId &&
              item.article_id !== Number(route.params.id)
          )
          .slice(0, 3);
        author_article_list.value = useShuffle(author_article_list.value);
      }
    }
  }
  loadingStatus.value = false;
});
</script>

<style scoped lang="less">
.ArticleHomeAuthor-wrap {
  padding: 10px;
  width: 250px;
  border-radius: 20px;
  background: #ffffff;
  .author_head {
    width: 64px;
    height: 64px;
    border-radius: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    overflow: hidden;
    img {
      width: 64px;
    }
  }
  .author_data > * span {
    font-family: SourceHanSansCN-Regular;
    font-size: 8px;
    font-weight: normal;
    color: #3d3d3d;
  }
  .author_name {
    font-family: SourceHanSansCN-Bold;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 0em;
    color: #3d3d3d;
  }
  .author_info {
    font-family: SourceHanSansCN-Regular;
    font-size: 10px;
    font-weight: normal;
    color: #3d3d3d;
  }
}
</style>
@/api/article
