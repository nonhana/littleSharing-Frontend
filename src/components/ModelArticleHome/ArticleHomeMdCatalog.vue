<template>
  <div v-loading="loading" class="ArticleHomeMdCatalog-wrap">
    <el-row>
      <span class="title">文章目录结构</span>
    </el-row>
    <div v-if="catalogItems.length !== 0" class="menu">
      <ul>
        <ArticleHomeMdCatalogItem
          v-for="(item, index) in catalogItems"
          :key="index"
          :item="item"
          :level="0"
          :active-id="activeId"
          @set-active-id="setActiveId"
        />
      </ul>
    </div>
    <div v-else>
      <no-list :width="220" :height="100" content="暂无目录"></no-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { debounce } from 'lodash'
import { marked } from 'marked'
import { getArticleMain } from '@/api/article'
import type { MdCatalogTree } from '@/utils/types'
import ArticleHomeMdCatalogItem from '@/components/Little/Item/ArticleHomeMdCatalogItem.vue'
import NoList from '../Global/NoList.vue'

const route = useRoute()

const activeId = ref<string | null>(null)
const article_md = ref<string>('')

const catalogItems = computed(() => {
  const tokens = marked.lexer(article_md.value)
  const headings = tokens.filter((token) => token.type === 'heading')
  return buildTree(headings)
})

// 设置当前激活的目录项
const setActiveId = (id: string | null) => {
  activeId.value = id
}

/* ----------构建目录树相关---------- */
const loading = ref<boolean>(false)
// 构建 Markdown 目录树
const buildTree = (nodes: any[], currentLevel = null) => {
  const tree = []
  while (nodes.length > 0) {
    const node = nodes[0]

    if (currentLevel === null) {
      // 初始化当前级别为第一个标题的级别
      currentLevel = node.depth
    }

    if (node.depth === currentLevel) {
      // 同级标题，直接添加
      tree.push({
        id: node.text,
        text: node.text,
        level: node.depth,
        children: [] as MdCatalogTree[]
      })
      nodes.shift() // 移除已处理的节点
    } else if (node.depth > currentLevel!) {
      // 子标题，递归构建子树
      const lastItem = tree[tree.length - 1]
      if (lastItem) {
        lastItem.children = lastItem.children.concat(
          buildTree(nodes, node.depth)
        )
      } else {
        // 如果没有上一个项，则忽略这个子标题
        nodes.shift() // 跳过这个孤立的子标题
      }
    } else {
      // 如果标题级别小于当前级别，意味着返回到了上一级
      return tree
    }
  }
  return tree
}
// 检查目录是否在顶部来决定是否激活目录项
const updateActiveIdOnScroll = () => {
  let closestId = null // 最近的标题的id
  let closestDistance = Infinity // 默认距离顶部无限远

  for (const item of catalogItems.value) {
    const element = document.getElementById(item.id)
    if (element) {
      const distance = Math.abs(element.getBoundingClientRect().top) // 计算距离浏览器顶部的距离
      if (distance < closestDistance) {
        closestDistance = distance
        closestId = item.id
      }

      // 递归检查子元素
      const checkChildren = (children: MdCatalogTree[]) => {
        for (const child of children) {
          const childElement = document.getElementById(child.id)
          if (childElement) {
            const childDistance = Math.abs(
              childElement.getBoundingClientRect().top
            )
            if (childDistance < closestDistance) {
              closestDistance = childDistance
              closestId = child.id
            }
          }
          if (child.children) {
            checkChildren(child.children)
          }
        }
      }

      if (item.children) {
        checkChildren(item.children)
      }
    }
  }

  activeId.value = closestId
}

onMounted(async () => {
  const debouncedScrollListener = debounce(updateActiveIdOnScroll, 100) // 100ms防抖
  window.addEventListener('scroll', debouncedScrollListener)

  loading.value = true
  const { result } = await getArticleMain({
    article_id: Number(route.params.article_id)
  })
  article_md.value = await fetch(result.article_md_link).then((res) =>
    res.text()
  )
  loading.value = false
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveIdOnScroll)
})
</script>

<style scoped lang="scss">
.ArticleHomeMdCatalog-wrap {
  position: relative;
  overflow: hidden;
  padding: 10px;
  width: 250px;
  background: #fff;
  border-radius: 20px;
  z-index: 1;
  .title {
    height: 35px;
    font-size: 24px;
    font-family: AlibabaPuHuiTi-3-65-Medium, sans-serif;
    color: #3d3d3d;
  }
  .menu {
    position: relative;
    .img-button {
      margin-bottom: 20px;
      width: 24px;
      height: 24px;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: calc(100vh - 420px);
    overflow-y: scroll;
  }
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 0;
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 4px;
  height: 4px;
}

::-webkit-scrollbar-thumb {
  cursor: pointer;
  border-radius: 2px;
  background: rgba(0, 0, 0, 0.3);
  transition: color 0.2s ease;
}
</style>
