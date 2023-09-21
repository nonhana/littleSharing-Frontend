import myAxios from "./axios";

export interface RegUserInfo {
  account: string;
  name: string;
  password: string;
}
export interface UserInfo {
  backgroundphoto: string;
  headphoto: string;
  id: number;
  introduce: string;
  major: string[];
  name: string;
  signature: string;
  university: string;
}
export interface FocusInfo {
  action_type: number;
  first_user_id: number;
  second_user_id: number;
}

// 上传头像
export const uploadAvatar = (paramsList: { avatar: File }) => {
  return myAxios({
    url: "/user/upload-avatar",
    method: "POST",
    data: paramsList,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 上传背景
export const uploadBackground = (paramsList: { background: File }) => {
  return myAxios({
    url: "/user/upload-background",
    method: "POST",
    data: paramsList,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 用户注册
export const register = (paramsList: RegUserInfo) => {
  return myAxios({
    url: "/user/register",
    method: "POST",
    data: paramsList,
  });
};

// 用户登录
export const login = (paramsList: { account: string; password: string }) => {
  return myAxios({
    url: "/user/login",
    method: "GET",
    params: paramsList,
  });
};

// 获取用户信息
export const getUserInfo = (paramsList: { user_id?: number }) => {
  return myAxios({
    url: "/user/get-user-info",
    method: "GET",
    params: paramsList,
  });
};

// 更新用户个人资料
export const editUserInfo = (paramsList: UserInfo) => {
  return myAxios({
    url: "/user/edit-user-info",
    method: "POST",
    data: paramsList,
  });
};

// 获取用户点赞总数
export const getUserLikeNum = (paramsList: { user_id: number }) => {
  return myAxios({
    url: "/user/get-user-like-num",
    method: "GET",
    params: paramsList,
  });
};

// 获取用户收藏总数
export const getUserCollectionNum = (paramsList: { user_id: number }) => {
  return myAxios({
    url: "/user/get-user-collection-num",
    method: "GET",
    params: paramsList,
  });
};

// 获取用户的点赞文章数据
export const getLikedArticles = () => {
  return myAxios({
    url: "/user/get-liked-articles",
    method: "GET",
  });
};

// 获取用户的收藏文章数据
export const getCollectedArticles = () => {
  return myAxios({
    url: "/user/get-liked-articles",
    method: "GET",
  });
};

// 用户关注操作
export const focusUserActions = (paramsList: FocusInfo) => {
  return myAxios({
    url: "/user/focus-user-actions",
    method: "POST",
    data: paramsList,
  });
};

// 获取用户的关注列表
export const getUserFocusList = (paramsList: { user_id: number }) => {
  return myAxios({
    url: "/user/get-user-focus-list",
    method: "GET",
    params: paramsList,
  });
};

// 获取用户的粉丝列表
export const getUserFansList = (paramsList: { user_id: number }) => {
  return myAxios({
    url: "/user/get-user-fans-list",
    method: "GET",
    params: paramsList,
  });
};

// 获取用户发布的文章标签列表
export const getUserArticleTags = (paramsList: { user_id: number }) => {
  return myAxios({
    url: "/user/get-user-article-tags",
    method: "GET",
    params: paramsList,
  });
};

// 用户点赞操作
export const addLike = (paramsList: {
  article_id: number;
  action_type: number;
}) => {
  return myAxios({
    url: "/user/like-action",
    method: "POST",
    data: paramsList,
  });
};

// 获取用户的点赞列表
export const getUserLikeList = () => {
  return myAxios({
    url: "/user/user-like-list",
    method: "GET",
  });
};

// 用户收藏操作
export const addCollection = (paramsList: {
  article_id: number;
  action_type: number;
}) => {
  return myAxios({
    url: "/user/collect-action",
    method: "POST",
    data: paramsList,
  });
};

// 获取用户的收藏列表
export const getUserCollectList = () => {
  return myAxios({
    url: "/user/user-collect-list",
    method: "GET",
  });
};
