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

// 上传文章图片
export const uploadArticleImg = (paramsList: { articleImg: File }) => {
  return myAxios({
    url: "/article/upload-article-img",
    method: "POST",
    data: paramsList,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 获取文章列表
export const getArticleList = () => {
  return myAxios({
    url: "/article/article-list",
    method: "GET",
  });
};

// 上传文章
export const postArticle = (paramsList: ArticleInfo) => {
  return myAxios({
    url: "/article/post-article",
    method: "POST",
    data: paramsList,
  });
};

// 新增文章标签
export const addArticleLabel = (paramsList: { label_list: string[] }) => {
  return myAxios({
    url: "/article/add-labels",
    method: "POST",
    data: paramsList,
  });
};

// 获取文章详情内容
export const getArticleMain = (paramsList: { article_id: number }) => {
  return myAxios({
    url: "/article/article-main",
    method: "GET",
    params: paramsList,
  });
};

// 提交搜索关键词
export const submitSearchKeyword = (paramsList: { keyword: string }) => {
  return myAxios({
    url: "/article/submit-keyword",
    method: "POST",
    data: paramsList,
  });
};

// 添加文章书签
export const addBookMark = (paramsList: {
  article_id: number;
  topHeight: string;
}) => {
  return myAxios({
    url: "/article/post-bookmark",
    method: "POST",
    data: paramsList,
  });
};

// 获取指定用户的文章书签
export const getBookMark = () => {
  return myAxios({
    url: "/article/get-bookmark",
    method: "GET",
  });
};

// 删除指定用户的指定文章书签
export const removeBookMark = (paramsList: { article_id: number }) => {
  return myAxios({
    url: "/article/remove-bookmark",
    method: "POST",
    data: paramsList,
  });
};

// 删除文章
export const deleteArticle = (paramsList: { article_id: number }) => {
  return myAxios({
    url: "/article/delete-article",
    method: "POST",
    data: paramsList,
  });
};

// 编辑文章
export const editArticle = (paramsList: EditArticleInfo) => {
  return myAxios({
    url: "/article/edit-article",
    method: "POST",
    data: paramsList,
  });
};

// 获取某用户的发布文章列表
export const getUserArticleList = (paramsList: { user_id: number }) => {
  return myAxios({
    url: "/article/user-article-list",
    method: "GET",
    params: paramsList,
  });
};

// 提交浏览趋势
export const postArticleTrend = (paramsList: {
  present_date: string;
  label_list: string[];
}) => {
  return myAxios({
    url: "/article/add-article-trend",
    method: "POST",
    data: paramsList,
  });
};

// 增加文章浏览量
export const increaseArticleViews = (paramsList: { article_id: number }) => {
  return myAxios({
    url: "/article/increase-view",
    method: "POST",
    data: paramsList,
  });
};

// 获取最近的文章趋势
export const getArticleTrend = () => {
  return myAxios({
    url: "./article/get-article-trend",
    method: "GET",
  });
};

// 查询文章
export const searchArticle = (paramsList: { keyword: string }) => {
  return myAxios({
    url: "./article/search-article",
    method: "GET",
    params: paramsList,
  });
};

// 根据文章的label获取相似文章
export const getSimilarArticles = (paramsList: {
  labels: string;
  article_id: number;
}) => {
  return myAxios({
    url: "./article/get-similar-articles",
    method: "GET",
    params: paramsList,
  });
};
