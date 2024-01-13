<template>
  <div class="articlehomeauthor-wrap">
    <el-row>
      <div style="display: flex; justify-content: center; width: 100%">
        <div class="author-head" @click="enterSpace(author_id)">
          <img :src="author_head" alt="author_head" />
        </div>
      </div>
    </el-row>

    <el-row type="flex" justify="center" style="margin: 10px 0">
      <span class="author-name">{{ author_name }}</span>
    </el-row>

    <div>
      <el-row type="flex" justify="center" style="margin: 10px 0">
        <span class="author-info">{{ author_signature }}</span>
      </el-row>

      <el-row type="flex" justify="center" style="margin: 10px 0">
        <span class="author-info">所属专业：{{ author_major }}</span>
      </el-row>

      <el-row type="flex" justify="center" style="margin: 10px 0">
        <span class="author-info">所属高校：{{ author_university }}</span>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getArticleMain } from '@/api/article'
import { getUserInfo } from '@/api/user'

const route = useRoute()
const router = useRouter()

const loading = ref<boolean>(true)
const author_id = ref<number>(0)
const author_head = ref<string>('')
const author_name = ref<string>('')
const author_major = ref<string>('')
const author_university = ref<string>('')
const author_signature = ref<string>('')

const enterSpace = (user_id: number) => {
  router.push({
    path: '/personalCenter/' + user_id
  })
}

onMounted(async () => {
  const res = await getArticleMain({
    article_id: Number(route.params.id)
  })

  if (res.result_code === 0) {
    const { author_id: articleAuthorId } = res.result
    author_id.value = articleAuthorId

    const authorInfoData = (
      await getUserInfo({
        user_id: articleAuthorId
      })
    ).result
    if (authorInfoData) {
      const { name, headphoto, major, university, signature } = authorInfoData

      author_name.value = name
      author_head.value = headphoto
      author_major.value = major.join(',')
      author_university.value = university
      author_signature.value = signature
    }
  }
  loading.value = false
})
</script>

<style scoped lang="less">
.articlehomeauthor-wrap {
  padding: 10px;
  width: 250px;
  background: #fff;
  border-radius: 20px;

  .author-head {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    cursor: pointer;

    img {
      width: 64px;
    }
  }

  .author-data > * span {
    font-size: 8px;
    font-family: SourceHanSansCN-Regular, sans-serif;
    color: #3d3d3d;
  }

  .author-name {
    font-size: 14px;
    font-family: SourceHanSansCN-Bold, sans-serif;
    color: #3d3d3d;
    font-weight: bold;
  }

  .author-info {
    font-size: 12px;
    font-family: SourceHanSansCN-Regular, sans-serif;
    color: #3d3d3d;
  }
}
</style>
@/api/article @/api/article/article @/api/user/user
