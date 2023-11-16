<template>
  <div class="ArticleHomeAuthor-wrap">
    <el-row>
      <div style="width: 100%; display: flex; justify-content: center">
        <div class="author_head" @click="enterSpace(author_id)">
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
      ><span style="font-size: 12px; color: #9e9e9e"
        >ta的其他文章</span
      ></el-divider
    >

    <el-row v-if="author_article_list.length !== 0">
      <LittleArticleItem
        v-for="(item, index) in author_article_list"
        :similar-item="author_article_list[index]"
        :key="item.article_id"
      />
    </el-row>

    <el-row
      v-if="author_article_list.length == 0"
      v-loading="loading"
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
import { useRoute, useRouter } from "vue-router";
import { getArticleMain } from "@/api/article";
import { getUserInfo, getUserArticlesBasic } from "@/api/user";
import LittleArticleItem from "@/components/Little/Item/LittleArticleItem.vue";

const route = useRoute();
const router = useRouter();

const loading = ref<boolean>(true);
const author_id = ref<number>(0);
const author_head = ref<string>("");
const author_name = ref<string>("");
const author_major = ref<string>("");
const author_university = ref<string>("");
const author_signature = ref<string>("");
const author_article_list = ref<any[]>([]);

const enterSpace = (user_id: number) => {
  router.push({
    path: "/personalCenter/" + user_id,
  });
};

onMounted(async () => {
  const res = await getArticleMain({
    article_id: Number(route.params.id),
  });

  if (res.data.result_code === 0) {
    const { author_id: articleAuthorId } = res.data.result;
    author_id.value = articleAuthorId;

    const authorInfoData = (
      await getUserInfo({
        user_id: articleAuthorId,
      })
    ).data.result;
    if (authorInfoData) {
      const { name, headphoto, major, university, signature } = authorInfoData;

      author_name.value = name;
      author_head.value = headphoto;
      author_major.value = major;
      author_university.value = university;
      author_signature.value = signature;

      const articleListData = (
        await getUserArticlesBasic({ user_id: articleAuthorId })
      ).data.result;
      author_article_list.value = articleListData
        .filter((item: any) => item.article_id !== Number(route.params.id))
        .slice(0, 3);
    }
  }
  loading.value = false;
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
    font-size: 12px;
    font-weight: normal;
    color: #3d3d3d;
  }
}
</style>
@/api/article
