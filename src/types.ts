export interface ArticleInfo {
  article_id: number;
  article_details: string;
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
