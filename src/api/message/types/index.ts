// src/api/message/types/index.ts

/* ----------请求体类型---------- */

/**
 * 获取消息列表的请求体
 */
export interface IGetMessageParams {
  /**
   * 消息类型。
   * 1. 基本消息（点赞、收藏消息+评论消息+被其他用户关注消息）
   * 2. 关注的用户发布新文章消息
   * 3. 系统消息
   */
  type: 1 | 2 | 3
}

/**
 * 删除消息的请求体
 */
export interface IDeleteMessageParams {
  /**
   * 消息id
   */
  message_id: number
}

/**
 * 发送消息的请求体
 */
export interface IPostMessageParams {
  /**
   * 摘要内容。
   * 可以选择是否传递。如果要传递，直接就是超链接包裹的形式。
   */
  abstract?: string
  /**
   * 消息内容。
   * 用span标签包裹，涉及到超链接的直接采用字符串拼接，把要链接的地址放到href中，并且采用target="_blank"的形式打开新窗口。
   */
  content: string
  /**
   * 接收该消息的用户id
   */
  receiver_id: number
  /**
   * 消息类型。
   * 1. 基本消息（点赞、收藏消息+评论消息+被其他用户关注消息）
   * 2. 关注的用户发布新文章消息
   * 3. 系统消息
   */
  type: number
}

/**
 * 更改指定类型的所有未读消息为已读的请求体
 */
export interface IReadMessageParams {
  /**
   * 消息类型。
   * 1. 基本消息（点赞、收藏消息+评论消息+被其他用户关注消息）
   * 2. 关注的用户发布新文章消息
   * 3. 系统消息
   */
  type: 1 | 2 | 3
}

/* ----------响应体类型---------- */

/**
 * 消息信息
 */
export interface Message {
  /**
   * 摘要内容，可传可不传，取决于消息的性质
   */
  abstract?: string
  /**
   * 消息内容，为HTML文档
   */
  content: string
  /**
   * 消息的发布时间
   */
  createdAt: string
  /**
   * 消息id
   */
  message_id: number
  /**
   * 发送该消息的用户基本信息，如果是系统消息，这个可以不用传
   */
  user_info?: UserInfo
  /**
   * 消息的已读状态，0-未读，1-已读
   */
  status: 0 | 1
}

/**
 * 发送该消息的用户基本信息，如果是系统消息，这个可以不用传
 */
export interface UserInfo {
  /**
   * 用户头像图片url
   */
  user_headphoto: string
  /**
   * 用户id
   */
  user_id: number
  /**
   * 用户名
   */
  user_name: string
}

/**
 * 所有类型消息的未读数量+全部的未读数量
 */
export interface UnreadMessageCount {
  /**
   * 全部消息的未读数量
   */
  total: number
  /**
   * 普通消息的未读数量
   */
  type_1: number
  /**
   * 关注消息的未读数量
   */
  type_2: number
  /**
   * 系统消息的未读数量
   */
  type_3: number
}
