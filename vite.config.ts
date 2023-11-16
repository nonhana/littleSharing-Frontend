import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [vue()],
  resolve: {
    // 配置路径别名@
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 1919, // 端口号
    open: false, // 是否自动打开浏览器
  },
});
