// src/api/types/index.ts

/* ----------公用请求体类型---------- */

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
