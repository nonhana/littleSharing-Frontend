import request from '@/service'
import type { IArticleId } from '@/api/types'
import type {
  Level0Comment,
  CommentLike,
  ICommentActionParams,
  ICommentLikeActionParams
} from './types'

// 获取评论列表
export const getCommentList = (params: IArticleId) => {
  return request<IArticleId, Level0Comment[]>({
    url: '/comment/get-comment-list',
    method: 'GET',
    params
  })
}

// 评论操作
export const commentAction = (data: ICommentActionParams) => {
  return request<ICommentActionParams, undefined>({
    url: '/comment/comment-action',
    method: 'POST',
    data
  })
}

// 获取评论的点赞列表
export const getCommentLikeList = () => {
  return request<undefined, CommentLike[]>({
    url: '/comment/comment-like-list',
    method: 'GET'
  })
}

// 评论点赞操作
export const commentLikeAction = (data: ICommentLikeActionParams) => {
  return request<ICommentLikeActionParams, undefined>({
    url: '/comment/comment-like-action',
    method: 'POST',
    data
  })
}
