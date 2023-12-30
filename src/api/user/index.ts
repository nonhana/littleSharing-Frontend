import request from '@/service'
import type { IUserIdOptional, IUserIdRequired } from '@/api/types'
import type {
  User,
  Like,
  Collect,
  Focus,
  Fans,
  Label,
  IUploadAvatarParams,
  IUploadBackgroundParams,
  IRegisterParams,
  ILoginParams,
  IEditUserInfoParams,
  IFocusUserActionsParams,
  IAddLikeParams,
  IAddCollectParams,
  Keyword
} from './types'
import type { Article, ArticleSimple } from '../article/types'

// 上传头像
export const uploadAvatar = (data: IUploadAvatarParams) => {
  return request<IUploadAvatarParams, string>({
    url: '/user/upload-avatar',
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 上传背景
export const uploadBackground = (data: IUploadBackgroundParams) => {
  return request<IUploadBackgroundParams, string>({
    url: '/user/upload-background',
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 用户注册
export const register = (data: IRegisterParams) => {
  return request<IRegisterParams, undefined>({
    url: '/user/register',
    method: 'POST',
    data
  })
}

// 用户登录
export const login = (data: ILoginParams) => {
  return request<ILoginParams, string>({
    url: '/user/login',
    method: 'POST',
    data
  })
}

// 获取用户的keywords
export const getUserKeywords = (params: IUserIdOptional) => {
  return request<IUserIdOptional, Keyword[]>({
    url: '/user/get-user-keywords',
    method: 'GET',
    params
  })
}

// 获取全局文章标签列表
export const getArticleLabels = () => {
  return request<undefined, Label[]>({
    url: '/user/get-article-labels',
    method: 'GET'
  })
}

// 获取用户信息
export const getUserInfo = (params: IUserIdOptional) => {
  return request<IUserIdOptional, User>({
    url: '/user/get-user-info',
    method: 'GET',
    params
  })
}

// 更新用户个人资料
export const editUserInfo = (data: IEditUserInfoParams) => {
  return request<IEditUserInfoParams, undefined>({
    url: '/user/edit-user-info',
    method: 'POST',
    data
  })
}

// 获取用户点赞总数
export const getUserLikeNum = (params: IUserIdRequired) => {
  return request<IUserIdRequired, number>({
    url: '/user/get-user-like-num',
    method: 'GET',
    params
  })
}

// 获取用户收藏总数
export const getUserCollectionNum = (params: IUserIdRequired) => {
  return request<IUserIdRequired, number>({
    url: '/user/get-user-collection-num',
    method: 'GET',
    params
  })
}

// 获取用户的被点赞文章数据
export const getLikedArticles = (params: IUserIdRequired) => {
  return request<IUserIdRequired, Like[]>({
    url: '/user/get-liked-articles',
    method: 'GET',
    params
  })
}

// 获取用户的被收藏文章数据
export const getCollectedArticles = (params: IUserIdRequired) => {
  return request<IUserIdRequired, Collect[]>({
    url: '/user/get-liked-articles',
    method: 'GET',
    params
  })
}

// 用户关注操作
export const focusUserActions = (data: IFocusUserActionsParams) => {
  return request<IFocusUserActionsParams, undefined>({
    url: '/user/focus-user-actions',
    method: 'POST',
    data
  })
}

// 获取用户的关注列表
export const getUserFocusList = (params: IUserIdRequired) => {
  return request<IUserIdRequired, Focus[]>({
    url: '/user/get-user-focus-list',
    method: 'GET',
    params
  })
}

// 获取用户的粉丝列表
export const getUserFansList = (params: IUserIdRequired) => {
  return request<IUserIdRequired, Fans[]>({
    url: '/user/get-user-fans-list',
    method: 'GET',
    params
  })
}

// 获取用户发布的文章标签列表
export const getUserArticleTags = (params: IUserIdRequired) => {
  return request<IUserIdRequired, Label[]>({
    url: '/user/get-user-article-tags',
    method: 'GET',
    params
  })
}

// 用户点赞操作
export const addLike = (data: IAddLikeParams) => {
  return request<IAddLikeParams, undefined>({
    url: '/user/like-action',
    method: 'POST',
    data
  })
}

// 获取用户的点赞列表
export const getUserLikeList = () => {
  return request<undefined, number[]>({
    url: '/user/user-like-list',
    method: 'GET'
  })
}

// 用户收藏操作
export const addCollection = (data: IAddCollectParams) => {
  return request<IAddCollectParams, undefined>({
    url: '/user/collect-action',
    method: 'POST',
    data
  })
}

// 获取用户的收藏列表
export const getUserCollectList = (params: IUserIdOptional) => {
  return request<IUserIdOptional, number[]>({
    url: '/user/user-collect-list',
    method: 'GET',
    params
  })
}

// 获取某用户发布的文章列表（简要信息）
export const getUserArticlesBasic = (params: IUserIdRequired) => {
  return request<IUserIdRequired, ArticleSimple[]>({
    url: '/user/get-user-articles-basic',
    method: 'GET',
    params
  })
}

// 获取某用户发布的文章列表（详细信息）
export const getUserArticlesDetails = (params: IUserIdRequired) => {
  return request<IUserIdRequired, Article[]>({
    url: '/user/get-user-articles-details',
    method: 'GET',
    params
  })
}
