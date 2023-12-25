// src/api/article/types/index.ts

/* ----------请求体类型---------- */

/**
 * 获取文章列表的请求体
 */
export interface IGetArticleListParams {
  /**
   * 当前页数，从1开始
   */
  page?: number
  /**
   * 每页的文章数量，最大为10，最小为1
   */
  size?: number
}

/**
 * 上传文章图片请求体
 */
export interface IIploadArticleImgParams {
  /**
   * 文章图片文件，类型为jpg/jpeg/png
   */
  articleImg: File
}

/**
 * 上传文章请求体
 */
export interface IPostArticleParams {
  /**
   * 文章简介
   */
  article_introduce: string
  /**
   * 文章标签列表
   */
  article_labels: string[]
  /**
   * 文章原文链接
   */
  article_link?: string
  /**
   * 文章所属专业
   */
  article_major: string[]
  /**
   * 文章Markdown字符串
   */
  article_md: string
  /**
   * 文章MD文件链接
   */
  article_md_link: string
  /**
   * 文章状态，1-原创文章，2-转载文章
   */
  article_status: 1 | 2
  /**
   * 文章标题
   */
  article_title: string
  /**
   * 文章作者id
   */
  author_id: number
}

/**
 * 新增文章标签请求体
 */
export interface IAddArticleLabelParams {
  /**
   * 文章标签列表
   */
  label_list: string[]
}

/**
 * 新增文章书签请求体
 */
export interface IAddBookMarkParams {
  /**
   * 文章id
   */
  article_id: number
  /**
   * 距离顶部的高度，以px结尾
   */
  topHeight: string
  /**
   * 用户id
   */
  user_id: number
}

/**
 * 编辑文章请求体
 */
export interface IEditArticleParams {
  /**
   * 文章id
   */
  article_id: number
  /**
   * 文章简介
   */
  article_introduce: string
  /**
   * 文章标签列表
   */
  article_labels: string[]
  /**
   * 文章转载URL
   */
  article_link?: string
  /**
   * 文章专业
   */
  article_major: string[]
  /**
   * 文章Markdown字符串
   */
  article_md: string
  /**
   * 文章状态，1-原创文章，2-转载文章
   */
  article_status: 1 | 2
  /**
   * 文章标题
   */
  article_title: string
}

/**
 * 更新文章浏览趋势的请求体
 */
export interface IPostArticleTrendParams {
  /**
   * 该文章的标签列表
   */
  label_list: string[]
  /**
   * 当前日期
   */
  present_date: string
}

/**
 * 查询文章请求体
 */
export interface ISearchArticleParams {
  /**
   * 查询关键字
   */
  keyword: string
}

/**
 * 查询相似文章请求体
 */
export interface IGetSimilarArticlesParams {
  /**
   * 文章标签列表
   */
  labels: string
  /**
   * 文章id
   */
  article_id: number
}

/* ----------响应体类型---------- */

/**
 * 文章信息（详细）
 */
export interface Article {
  /**
   * 文章id
   */
  article_id: number
  /**
   * 文章简介
   */
  article_introduce: string
  /**
   * 文章标签列表
   */
  article_labels: string[]
  /**
   * 文章原文链接
   */
  article_link?: string
  /**
   * 文章所属专业
   */
  article_major: string[]
  /**
   * 文章md原文文档
   */
  article_md: string
  /**
   * 文章状态码，1-转载文章，2-原创文章
   */
  article_status: 1 | 2
  /**
   * 文章标题
   */
  article_title: string
  /**
   * 文章更新的日期
   */
  article_updatedate: string
  /**
   * 文章发布的日期
   */
  article_uploaddate: string
  /**
   * 文章作者id
   */
  author_id: number
  /**
   * 文章被收藏数
   */
  collection_num: number
  /**
   * 文章被评论数
   */
  comment_num: number
  /**
   * 文章被点赞数
   */
  like_num: number
  /**
   * 文章被分享数
   */
  share_num: number
  /**
   * 文章被浏览数
   */
  view_num: number
  /**
   * 文章封面图片
   */
  cover_image?: string
  /**
   * 作者所发表的文章数量
   */
  author_article_num: number
  /**
   * 作者头像图片URL
   */
  author_headphoto: string
  /**
   * 作者专业
   */
  author_major: string
  /**
   * 作者名称
   */
  author_name: string
  /**
   * 作者签名
   */
  author_signature: string
  /**
   * 作者高校
   */
  author_university: string
  /**
   * 文章MD链接
   */
  article_md_link: string
  /**
   * 文章封面图片url
   */
  article_cover: string
}
/**
 * 文章信息（简略）
 */
export interface ArticleSimple {
  /**
   * 文章id
   */
  article_id: number
  /**
   * 文章标题
   */
  article_title: string
  /**
   * 文章标签列表
   */
  article_labels: string[]
  /**
   * 文章简介
   */
  article_introduce: string
  /**
   * 文章发布日期
   */
  article_uploaddate: string
  /**
   * 文章作者id
   */
  author_id: number
  /**
   * 文章作者名称
   */
  author_name: string
}

/**
 * 文章书签信息
 */
export interface Bookmark {
  /**
   * 书签id
   */
  bookmark_id: number
  /**
   * 书签所属文章id
   */
  article_id: number
  /**
   * 距离顶部的高度，以px结尾
   */
  topHeight: string
  /**
   * 书签所属用户id
   */
  user_id: number
}

/**
 * 文章趋势信息
 */
export interface ArticleTrend {
  /**
   * 文章趋势id
   */
  id: number
  /**
   * 文章趋势名称
   */
  trend_name: string
  /**
   * 文章趋势值列表，共12个，分别代表1-12月
   */
  value_list: number[]
}
