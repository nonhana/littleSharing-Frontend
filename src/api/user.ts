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

// 用户登录
export function userLoginAPI(paramsList: {
  account: string;
  password: string;
}) {
  return myAxios({
    url: "/user/login",
    method: "GET",
    params: paramsList,
  });
}

// 用户注册
export function userRegisterAPI(paramsList: RegUserInfo) {
  return myAxios({
    url: "/user/register",
    method: "POST",
    data: paramsList,
  });
}

// 获取用户信息
export function getUserinfoAPI(paramsList: { user_id: number }) {
  return myAxios({
    url: "/user/getuserinfo",
    method: "GET",
    params: paramsList,
  });
}

// 更新用户个人资料
export function editUserInfoAPI(paramsList: UserInfo) {
  return myAxios({
    url: "/user/edituserinfo",
    method: "POST",
    data: paramsList,
  });
}

// 获取用户点赞总数
export function getUserLikeNumAPI(paramsList: { user_id: number }) {
  return myAxios({
    url: "/user/getuserlikenum",
    method: "GET",
    params: paramsList,
  });
}

// 获取用户收藏总数
export function getUserCollectionNumAPI(paramsList: { user_id: number }) {
  return myAxios({
    url: "/user/getusercollectionnum",
    method: "GET",
    params: paramsList,
  });
}

// 获取用户的点赞文章数据
export function getUserAddLike(paramsList: { user_id: number }) {
  return myAxios({
    url: "/user/getlikedarticles",
    method: "GET",
    params: paramsList,
  });
}

// 获取用户的收藏文章数据
export function getUserAddCollection(paramsList: { user_id: number }) {
  return myAxios({
    url: "/user/getcollectedarticles",
    method: "GET",
    params: paramsList,
  });
}

// 用户关注操作
export function focusUserActionsAPI(paramsList: FocusInfo) {
  return myAxios({
    url: "/user/focususeractions",
    method: "POST",
    data: paramsList,
  });
}

// 获取用户的关注列表
export function getUserFocusListAPI(paramsList: { user_id: number }) {
  return myAxios({
    url: "/user/getuserfocuslist",
    method: "GET",
    params: paramsList,
  });
}

// 获取用户的粉丝列表
export function getUserFansListAPI(paramsList: { user_id: number }) {
  return myAxios({
    url: "/user/getuserfanslist",
    method: "GET",
    params: paramsList,
  });
}

// 获取用户发布的文章标签列表
export function getUserArticleTagsAPI(paramsList: { user_id: number }) {
  return myAxios({
    url: "/user/getuserarticletags",
    method: "GET",
    params: paramsList,
  });
}
