import myAxios from "./axios";

export interface LikeActionInfo {
  action_type: number;
  article_id: number;
  user_id: number;
}
export interface CollectActionInfo {
  action_type: number;
  article_id: number;
  user_id: number;
}
export interface CommentActionInfo {
  action_type?: number;
  article_id?: number;
  comment_content?: string;
  create_date?: string;
  delete_comment_id?: number;
  response_to_comment_id?: number;
  response_to_user_id?: number;
  user_id?: number;
}

// 获取评论列表
export const getCommentList = (paramsList: { article_id: number }) => {
  return myAxios({
    url: "/comment/get-comment-list",
    method: "GET",
    params: paramsList,
  });
};

// 评论操作
export const commentAction = (paramsList: CommentActionInfo) => {
  return myAxios({
    url: "/comment/comment-action",
    method: "POST",
    data: paramsList,
  });
};

// 获取评论的点赞列表
export const getCommentLikeList = () => {
  return myAxios({
    url: "/comment/comment-like-list",
    method: "GET",
  });
};

// 评论点赞操作
export const commentLikeAction = (paramsList: {
  action_type: number;
  comment_id: number;
}) => {
  return myAxios({
    url: "/comment/comment-like-action",
    method: "POST",
    data: paramsList,
  });
};
