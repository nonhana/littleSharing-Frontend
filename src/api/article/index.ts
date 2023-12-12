import request from '@/service'
import type { IArticleId } from '@/api/types'
import type {
  Article,
  Bookmark,
  ArticleTrend,
  ArticleSimple,
  IGetArticleListParams,
  IIploadArticleImgParams,
  IPostArticleParams,
  IAddArticleLabelParams,
  IAddBookMarkParams,
  IEditArticleParams,
  IPostArticleTrendParams,
  ISearchArticleParams,
  IGetSimilarArticlesParams
} from './types'

// 上传文章图片
export const uploadArticleImg = (data: IIploadArticleImgParams) => {
  return request<IIploadArticleImgParams, string>({
    url: '/article/upload-article-img',
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 获取文章列表
export const getArticleList = (params: IGetArticleListParams) => {
  return request<IGetArticleListParams, Article[]>({
    url: '/article/article-list',
    method: 'GET',
    params
  })
}

// 上传文章
export const postArticle = (data: IPostArticleParams) => {
  return request<IPostArticleParams, number>({
    url: '/article/post-article',
    method: 'POST',
    data
  })
}

// 新增文章标签
export const addArticleLabel = (data: IAddArticleLabelParams) => {
  return request<IAddArticleLabelParams, undefined>({
    url: '/article/add-labels',
    method: 'POST',
    data
  })
}

// 获取文章详情内容
export const getArticleMain = (params: IArticleId) => {
  return request<IArticleId, Article>({
    url: '/article/article-main',
    method: 'GET',
    params
  })
}

// 添加文章书签
export const addBookMark = (data: IAddBookMarkParams) => {
  return request<IAddBookMarkParams, undefined>({
    url: '/article/post-bookmark',
    method: 'POST',
    data
  })
}

// 获取指定用户的文章书签
export const getBookMark = () => {
  return request<undefined, Bookmark[]>({
    url: '/article/get-bookmark',
    method: 'GET'
  })
}

// 删除指定用户的指定文章书签
export const removeBookMark = (data: IArticleId) => {
  return request<IArticleId, undefined>({
    url: '/article/remove-bookmark',
    method: 'POST',
    data
  })
}

// 删除文章
export const deleteArticle = (data: IArticleId) => {
  return request({
    url: '/article/delete-article',
    method: 'POST',
    data
  })
}

// 编辑文章
export const editArticle = (paramsList: IEditArticleParams) => {
  return request<IEditArticleParams, undefined>({
    url: '/article/edit-article',
    method: 'POST',
    data: paramsList
  })
}

// 提交浏览趋势
export const postArticleTrend = (data: IPostArticleTrendParams) => {
  return request<IPostArticleTrendParams, undefined>({
    url: '/article/add-article-trend',
    method: 'POST',
    data
  })
}

// 增加文章浏览量
export const increaseArticleViews = (data: IArticleId) => {
  return request<IArticleId, undefined>({
    url: '/article/increase-view',
    method: 'POST',
    data
  })
}

// 获取最近的文章趋势
export const getArticleTrend = () => {
  return request<undefined, ArticleTrend[]>({
    url: './article/get-article-trend',
    method: 'GET'
  })
}

// 查询文章
export const searchArticle = (params: ISearchArticleParams) => {
  return request<ISearchArticleParams, Article[]>({
    url: './article/search-article',
    method: 'GET',
    params
  })
}

// 根据文章的label获取相似文章
export const getSimilarArticles = (params: IGetSimilarArticlesParams) => {
  return request<IGetSimilarArticlesParams, ArticleSimple[]>({
    url: './article/get-similar-articles',
    method: 'GET',
    params
  })
}
