<template>
  <li
    :class="{ active: activeId === item.id }"
    :style="{ paddingLeft: `${level * 10 + 5}px` }"
    @click.stop="scrollToAnchor(item.id)"
  >
    <span>{{ item.text }}</span>
    <!-- 递归渲染目录 -->
    <ul v-if="item.children && item.children.length">
      <ArticleHomeMdCatalogItem
        v-for="(child, index) in item.children"
        :key="index"
        :item="child"
        :level="level + 1"
        :active-id="activeId"
        @set-active-id="emits('setActiveId', $event)"
      />
    </ul>
  </li>
</template>

<script setup lang="ts">
import type { MdCatalogTree } from '@/utils/types'
const props = defineProps<{
  item: MdCatalogTree
  level: number
  activeId: string | null
}>()

const emits = defineEmits<{
  (e: 'setActiveId', id: string | null): void
}>()

const { item, level } = props

function scrollToAnchor(id: string) {
  emits('setActiveId', id)
  const element = document.getElementById(id)
  if (element) {
    const top = element.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
</script>

<style scoped lang="scss">
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
li {
  margin: 5px 0;
  border-top: 3px solid transparent;
  border-right: 3px solid transparent;
  border-bottom: 3px solid transparent;
  border-left: 3px solid transparent;
  transition: all 0.2s;
  cursor: pointer;
  span {
    color: #111111;
    font-size: 14px;
    line-height: 24px;
    font-weight: normal;
    text-decoration: none;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; // 显示两行
    overflow: hidden;
  }
  &:hover {
    background-color: #f7f9fa;
    border-left: 3px solid #23beff;
  }
}
.active {
  background-color: #f7f9fa;
  border-left: 3px solid #23beff;
}
</style>
