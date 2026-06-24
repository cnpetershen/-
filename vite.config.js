import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { viteMockServe } from "vite-plugin-mock";
// https://github.com/anncwb/vite-plugin-mock


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
      //enable mock plugin
    // viteMockServe({
    //   mockPath: "src/mock",//设置mock文件存储目录
    //   localEnabled: true,//设置是否启用本地mock文件
    //   prodEnabled: true,//设置打包是否启用 mock 功能
    //   watchFiles: true,//设置是否监视mockPath对应的文件夹内文件中的更改
    //   // injectCode: `
    //   //   import { setupProdMockServer } from './mockProdServer';
    //   //   setupProdMockServer();
    //   // `,//如果生产环境开启了 mock 功能,即prodEnabled=true.则该代码会被注入到injectFile对应的文件的底部。默认为main.{ts,js}
    //   logger: true,//是否在控制台显示请求日志
    // }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 配置服务器的代理设置
  server: {
    // 代理配置，用于重定向请求到其他服务器
    proxy: {
      // 定义一个代理规则，将/hello-world路径下的请求代理到指定的目标服务器
      '/chat-api': {
        // 目标服务器的地址
        target: 'http://www.tuling123.com/openapi/api',
        // 更改请求的origin为代理服务器的origin，以便与目标服务器交互
        changeOrigin: true,
        // 重写请求路径，移除/hello-world前缀
        rewrite: (path) => path.replace(/^\/chat-api/, '')
      },
      '/api':{
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path//path.replace(/^\/api/, '')
      }
    }
  }

})
