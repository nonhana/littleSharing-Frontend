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
export interface CommentLikeActionInfo {
  action_type: number;
  comment_id: number;
  user_id: number;
}

// 将file文件上传到服务器
export function uploadImageAPI(paramsList: { image: File }) {
  return myAxios({
    url: "/uploadimg",
    method: "POST",
    data: paramsList,
    // 上传文件时，需要指定请求头的Content-Type为multipart/form-data
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

// 删除图片
export function deleteImageAPI(paramsList: { imgURL: string }) {
  return myAxios({
    url: "/deleteimg",
    method: "POST",
    data: paramsList,
  });
}

// 点赞操作
export function likeActionAPI(paramsList: LikeActionInfo) {
  return myAxios({
    url: "/likeaction",
    method: "POST",
    data: paramsList,
  });
}

// 获取用户点赞列表
export function getUserLikeList(paramsList: { user_id: number }) {
  return myAxios({
    url: "/userlikelist",
    method: "GET",
    params: paramsList,
  });
}

// 收藏操作
export function collectActionAPI(paramsList: CollectActionInfo) {
  return myAxios({
    url: "/collectaction",
    method: "POST",
    data: paramsList,
  });
}

// 获取用户收藏列表
export function getUserCollectList(paramsList: { user_id: number }) {
  return myAxios({
    url: "/usercollectlist",
    method: "GET",
    params: paramsList,
  });
}

// 获取评论列表
export function getCommentListAPI(paramsList: { article_id: number }) {
  return myAxios({
    url: "/commentlist",
    method: "GET",
    params: paramsList,
  });
}

// 评论操作
export function CommentActionAPI(paramsList: CommentActionInfo) {
  return myAxios({
    url: "/commentaction",
    method: "POST",
    data: paramsList,
  });
}

// 评论点赞操作
export function CommentLikeActionAPI(paramsList: CommentLikeActionInfo) {
  return myAxios({
    url: "/commentlikeaction",
    method: "POST",
    data: paramsList,
  });
}

// 获取评论的点赞列表
export function getCommentLikeListAPI(paramsList: { user_id: number }) {
  return myAxios({
    url: "/commentlikelist",
    method: "GET",
    params: paramsList,
  });
}
