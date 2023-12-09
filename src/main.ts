import App from './App.vue'
import { createApp } from 'vue'
import './styles/index.scss' // Element Plus自定义主题
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import 'animate.css'
import router from './router'
import NoList from '@/components/Global/NoList.vue'
import CommonHeader from '@/components/Global/CommonHeader.vue'

const app = createApp(App)

const whilelist = ['/login']

router.beforeEach((to, _, next) => {
  if (whilelist.includes(to.path) || localStorage.getItem('token')) {
    next()
  } else {
    next('/login')
  }
})

const store = createPinia()
store.use(piniaPluginPersistedstate) // 引入pinia持久化插件

app.use(store).use(router)

// 注册全局组件
app.component('NoList', NoList).component('CommonHeader', CommonHeader)

// 挂载app
app.mount('#app')
