// src/api/types/index.ts

/* ----------公用请求体类型---------- */

/**
 * 可选用户id
 */
export interface IUserIdOptional {
  /**
   * 用户id。若不传，则默认为当前登录用户
   */
  user_id?: number
}

/**
 * 必选用户id
 */
export interface IUserIdRequired {
  /**
   * 用户id
   */
  user_id: number
}

/**
 * 文章id
 */
export interface IArticleId {
  /**
   * 文章id
   */
  article_id: number
}
