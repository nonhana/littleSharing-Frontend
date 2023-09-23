// 插件
import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createPinia } from "pinia";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import "highlight.js/styles/vs2015.css";
import "animate.css";
import router from "./router";
// 全局组件
import NoList from "@/components/little/GlobalComponents/NoList.vue";
// app
import App from "./App.vue";

const app = createApp(App);

const whilelist = ["/login"];

router.beforeEach((to, _, next) => {
  if (whilelist.includes(to.path) || localStorage.getItem("token")) {
    next();
  } else {
    next("/login");
  }
});

app.use(ElementPlus);
app.use(createPinia());
app.use(router);
app.use(mavonEditor);

app.component("NoList", NoList);

app.mount("#app");
