import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import './styles/index.scss'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { routes } from './router'
import NoList from '@/components/Global/NoList.vue'
import CommonHeader from '@/components/Global/CommonHeader.vue'

// ViteSSG函数
export const createApp = ViteSSG(
  // 根组件
  App,
  // 路由选项
  { routes },
  // 可选的回调函数，进行更多的应用配置
  ({ app, router, initialState, isClient, onSSRAppRendered }) => {
    // 配置pinia
    const store = createPinia()
    store.use(piniaPluginPersistedstate)

    // 使用状态管理和路由
    app.use(store).use(router)

    // 注册全局组件
    app.component('NoList', NoList).component('CommonHeader', CommonHeader)

    // 服务端渲染时，将状态同步到客户端
    if (isClient) {
      store.state.value = initialState.pinia || {}
    } else {
      onSSRAppRendered(() => {
        initialState.pinia = store.state.value
      })
    }
  }
)
