// src/utils/types.ts
// 用于定义组件中使用的公共类型

// Md目录树
export interface MdCatalogTree {
  id: string
  text: string
  level: number
  children?: MdCatalogTree[]
}
