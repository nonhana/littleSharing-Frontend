import App from "./App.vue";
import { createApp } from "vue";
// 插件
import ElementPlus from "element-plus";
import "./styles/index.scss"; // Element Plus自定义主题
import "element-plus/dist/index.css";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "animate.css";
import router from "./router";
// 全局组件
import NoList from "@/components/GlobalComponents/NoList.vue";
import CommonHeader from "@/components/GlobalComponents/CommonHeader.vue";

const app = createApp(App);

const whilelist = ["/login"];

router.beforeEach((to, _, next) => {
  if (whilelist.includes(to.path) || localStorage.getItem("token")) {
    next();
  } else {
    next("/login");
  }
});

const store = createPinia();
store.use(piniaPluginPersistedstate); // 引入pinia持久化插件

app.use(ElementPlus);
app.use(store);
app.use(router);

// 注册全局组件
app.component("NoList", NoList).component("CommonHeader", CommonHeader);

// 挂载app
app.mount("#app");
