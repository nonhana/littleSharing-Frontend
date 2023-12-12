import request from '@/service'
import type {
  Message,
  UnreadMessageCount,
  IGetMessageParams,
  IDeleteMessageParams,
  IPostMessageParams,
  IReadMessageParams
} from './types'

// 获取消息列表
export const getMessage = (params: IGetMessageParams) => {
  return request<IGetMessageParams, Message[]>({
    url: '/message/get',
    method: 'GET',
    params
  })
}

// 删除消息
export const deleteMessage = (data: IDeleteMessageParams) => {
  return request<IDeleteMessageParams, undefined>({
    url: '/message/delete',
    method: 'POST',
    data
  })
}

// 发送消息
export const postMessage = (data: IPostMessageParams) => {
  return request<IPostMessageParams, undefined>({
    url: '/message/post',
    method: 'POST',
    data
  })
}

// 获取所有类型的未读消息的数量
export const getUnreadMessageCount = () => {
  return request<undefined, UnreadMessageCount>({
    url: '/message/unread',
    method: 'GET'
  })
}

// 更改指定类型的所有未读消息为已读
export const readMessage = (data: IReadMessageParams) => {
  return request<IReadMessageParams, undefined>({
    url: '/message/read',
    method: 'POST',
    data
  })
}
