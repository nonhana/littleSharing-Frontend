import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createPinia } from "pinia";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import router from "./router";
import noList from "@/components/little/NoList.vue";
import "highlight.js/styles/vs2015.css";
import "animate.css";
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

app.component("noList", noList);
app.mount("#app");
