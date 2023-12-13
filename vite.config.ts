import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname)
  return {
    base: '/',
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    resolve: {
      // 配置路径别名@
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    server: {
      port: env.VITE_PORT as unknown as number, // 端口号
      open: false // 是否自动打开浏览器
    },
    ssr: {
      noExternal: ['element-plus']
    }
  }
})
