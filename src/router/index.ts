import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home/index.vue"),
  },
  {
    path: "/articleHome/:id",
    name: "articleHome",
    component: () => import("@/views/articleHome/index.vue"),
  },
  {
    path: "/postArticle",
    name: "postArticle",
    component: () => import("@/views/post/index.vue"),
  },
  {
    path: "/personalCenter/:id",
    name: "personalCenter",
    redirect: (to) => {
      return `/MyArticles/${to.params.id}`;
    },
    component: () => import("@/views/personalCenter/index.vue"),
    children: [
      {
        path: "/MyArticles/:id",
        name: "MyArticles",
        component: () =>
          import("@/components/ModelPersonalCenter/MyArticle/ArticlePost.vue"),
      },
      {
        path: "/MyCollection/:id",
        name: "MyCollection",
        component: () =>
          import(
            "@/components/ModelPersonalCenter/MyCollection/ArticleCollection.vue"
          ),
      },
      {
        path: "/MyInfo/:id",
        name: "MyInfo",
        component: () =>
          import("@/components/ModelPersonalCenter/MyInfo/InfoMain.vue"),
      },
      {
        path: "/MyFocus/:id",
        name: "MyFocus",
        redirect: "/MyFocusList/:id",
        component: () =>
          import("@/components/ModelPersonalCenter/MyFocus/FocusIndex.vue"),
        children: [
          {
            path: "/MyFocusList/:id",
            name: "MyFocusList",
            component: () =>
              import(
                "@/components/ModelPersonalCenter/MyFocus/MyFocusList.vue"
              ),
          },
          {
            path: "/MyFansList/:id",
            name: "MyFansList",
            component: () =>
              import("@/components/ModelPersonalCenter/MyFocus/MyFansList.vue"),
          },
        ],
      },
      {
        path: "/MyData/:id",
        name: "MyData",
        component: () =>
          import("@/components/ModelPersonalCenter/MyData/GraphInfo.vue"),
      },
    ],
  },
  {
    path: "/message/:id",
    name: "message",
    redirect: (to) => {
      return `/messageReplies/${to.params.id}`;
    },
    component: () => import("@/views/messages/index.vue"),
    children: [
      {
        path: "/messageReplies/:id",
        name: "messageReplies",
        component: () =>
          import("@/components/ModelMessages/MessageReplies.vue"),
      },
      {
        path: "/messageCollections/:id",
        name: "messageCollections",
        component: () =>
          import("@/components/ModelMessages/MessageCollections.vue"),
      },
      {
        path: "/messageLikes/:id",
        name: "messageLikes",
        component: () => import("@/components/ModelMessages/MessageLikes.vue"),
      },
      {
        path: "/messageUsers/:id",
        name: "messageUsers",
        component: () => import("@/components/ModelMessages/MessageUsers.vue"),
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
