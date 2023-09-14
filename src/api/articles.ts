import myAxios from "./axios";

export interface ArticleInfo {
  article_details: string;
  article_introduce: string;
  article_labels: string[];
  article_link?: string;
  article_major: string[];
  article_status: "1" | "2";
  article_title: string;
  author_id: number;
}
export interface EditArticleInfo {
  article_id: number;
  article_details: string;
  article_introduce: string;
  article_labels: string[];
  article_link?: string;
  article_major: string[];
  article_status: "1" | "2";
  article_title: string;
  author_id: number;
  article_updatedate?: string;
}
export interface BookMarkInfo {
  article_id: number;
  topHeight: string;
  user_id: number;
}

// 获取文章列表
export function getArticleListAPI() {
  return myAxios({
    url: "/article/articlelist",
    method: "GET",
  });
}

// 获取文章详情内容
export function getArticleMainAPI(paramsList: { article_id: number }) {
  return myAxios({
    url: "/article/articlemain",
    method: "GET",
    params: paramsList,
  });
}

// 上传文章
export function postArticleAPI(paramsList: ArticleInfo) {
  return myAxios({
    url: "/article/postarticle",
    method: "POST",
    data: paramsList,
  });
}

// 删除文章
export function deleteArticleAPI(paramsList: { article_id: number }) {
  return myAxios({
    url: "/article/deletearticle",
    method: "POST",
    data: paramsList,
  });
}

// 编辑文章
export function editArticleAPI(paramsList: EditArticleInfo) {
  return myAxios({
    url: "/article/editarticle",
    method: "POST",
    data: paramsList,
  });
}

// 新增文章标签
export function addArticleLabelAPI(paramsList: { label_name: string }) {
  return myAxios({
    url: "/article/addlabels",
    method: "POST",
    data: paramsList,
  });
}

// 提交搜索关键词
export function submitSearchKeywordAPI(paramsList: {
  keyword: string;
  user_id: number;
}) {
  return myAxios({
    url: "/article/submitkeyword",
    method: "POST",
    data: paramsList,
  });
}

// 添加文章书签
export function addBookMarkAPI(paramsList: BookMarkInfo) {
  return myAxios({
    url: "/article/postbookmark",
    method: "POST",
    data: paramsList,
  });
}

// 获取指定用户的文章书签
export function getBookMarkAPI(paramsList: { user_id: number }) {
  return myAxios({
    url: "/article/getbookmark",
    method: "GET",
    params: paramsList,
  });
}

// 删除指定用户的指定文章书签
export function removeBookMarkAPI(paramsList: {
  article_id: number;
  user_id: number;
}) {
  return myAxios({
    url: "/article/removebookmark",
    method: "POST",
    data: paramsList,
  });
}

// 获取某用户的发布文章列表
export function getUserArticleList(paramsList: { user_id: number }) {
  return myAxios({
    url: "/article/userarticlelist",
    method: "GET",
    params: paramsList,
  });
}

// 提交浏览趋势
export function postArticleTrendAPI(paramsList: {
  present_date: string;
  label_list: Array<string>;
}) {
  return myAxios({
    url: "/article/addarticletrend",
    method: "POST",
    data: paramsList,
  });
}

// 增加文章浏览量
export function increaseArticleViewsAPI(paramsList: { article_id: number }) {
  return myAxios({
    url: "/article/increaseview",
    method: "POST",
    data: paramsList,
  });
}

// 获取最近的文章趋势
export function getArticleTrendAPI() {
  return myAxios({
    url: "./article/getarticletrend",
    method: "GET",
  });
}
