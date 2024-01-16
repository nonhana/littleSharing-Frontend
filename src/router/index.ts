import { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/articleHome/:article_id',
    name: 'articleHome',
    component: () => import('@/views/articleHome/index.vue')
  },
  {
    path: '/postArticle',
    name: 'postArticle',
    component: () => import('@/views/post/index.vue')
  },
  {
    path: '/personalCenter/:user_id',
    name: 'personalCenter',
    redirect: (to) => {
      return `/MyArticles/${to.params.user_id}`
    },
    component: () => import('@/views/personalCenter/index.vue'),
    children: [
      {
        path: '/MyArticles/:user_id',
        name: 'MyArticles',
        component: () =>
          import('@/components/ModelPersonalCenter/MyArticle/ArticlePost.vue')
      },
      {
        path: '/MyCollection/:user_id',
        name: 'MyCollection',
        component: () =>
          import(
            '@/components/ModelPersonalCenter/MyCollection/ArticleCollection.vue'
          )
      },
      {
        path: '/MyInfo/:user_id',
        name: 'MyInfo',
        component: () =>
          import('@/components/ModelPersonalCenter/MyInfo/InfoMain.vue')
      },
      {
        path: '/MyFocus/:user_id',
        name: 'MyFocus',
        redirect: '/MyFocusList/:user_id',
        component: () =>
          import('@/components/ModelPersonalCenter/MyFocus/FocusIndex.vue'),
        children: [
          {
            path: '/MyFocusList/:user_id',
            name: 'MyFocusList',
            component: () =>
              import('@/components/ModelPersonalCenter/MyFocus/MyFocusList.vue')
          },
          {
            path: '/MyFansList/:user_id',
            name: 'MyFansList',
            component: () =>
              import('@/components/ModelPersonalCenter/MyFocus/MyFansList.vue')
          }
        ]
      },
      {
        path: '/MyData/:user_id',
        name: 'MyData',
        component: () =>
          import('@/components/ModelPersonalCenter/MyData/GraphInfo.vue')
      }
    ]
  },
  {
    path: '/message',
    name: 'message',
    redirect: '/message/common',
    component: () => import('@/views/messages/index.vue'),
    children: [
      {
        path: '/message/common',
        name: 'messageCommon',
        component: () => import('@/components/ModelMessages/MessageCommon.vue')
      },
      {
        path: '/message/users',
        name: 'messageUsers',
        component: () => import('@/components/ModelMessages/MessageUsers.vue')
      },
      {
        path: '/message/system',
        name: 'messageSystem',
        component: () => import('@/components/ModelMessages/MessageSystem.vue')
      }
    ]
  },
  {
    path: '/postFinished',
    name: 'postFinished',
    component: () => import('@/views/postFinished/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/404/index.vue')
  }
]
