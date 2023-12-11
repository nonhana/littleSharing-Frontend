import request from '@/service'
import type {
  Message,
  IGetMessageParams,
  IDeleteMessageParams,
  IPostMessageParams
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
