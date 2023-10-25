/* src/utils/types.ts */
// 存放公共类型

// 文章信息
export interface ArticleInfo {
  article_id: number;
  article_introduce: string;
  article_labels: Array<string>;
  article_link?: string;
  article_major: Array<string>;
  article_md: string;
  article_num: number;
  article_status: "1" | "2";
  article_title: string;
  article_updatedate: string;
  article_uploaddate: string;
  author_headphoto: string;
  author_id: number;
  author_major: string;
  author_name: string;
  author_signature: string;
  author_university: string;
  collection_num: number;
  comment_num: number;
  cover_image: string;
  like_num: number;
  share_num: number;
  view_num: number;
}

// 编辑时的文章信息
export interface EditArticleInfo {
  article_status: "1" | "2"; // 默认为转载，1-转载，2-原创
  article_link?: string;
  article_title: string;
  article_major: string[];
  article_labels: string[];
  article_introduce: string;
  article_md: string;
  author_id: number;
}

// 用户信息
export interface UserInfo {
  account: string;
  article_num: number;
  backgroundphoto: string;
  collect_num: number;
  comment_num: number;
  headphoto: string;
  introduce: string;
  like_num: number;
  major: string[];
  name: string;
  signature: string;
  university: string;
  user_id: number;
}

// 关键词信息
export interface KeywordInfo {
  keywords_name: string;
  keywords_count: number;
}

// 文章标签信息
export interface ArticleLabelInfo {
  value: string;
  label: string;
}

// 书签信息
export interface BookMarkInfo {
  article_id: number;
  bookmark_id: number;
  topHeight: string;
  user_id: number;
}

// 个人中心用户信息
export interface HeaderUserInfo {
  background_photo: string;
  header_photo: string;
  user_name: string;
  sign: string;
  follow_count: number;
  follower_count: number;
  total_like: number;
  total_collect: number;
  total_artcile: number;
}
