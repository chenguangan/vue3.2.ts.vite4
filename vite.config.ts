import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: "./", // 设置打包路径
  server: {
    host: "0.0.0.0", //配置局域网ip访问
    port: 4000, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    cors: true, // 允许跨域

    //设置代理，根据我们项目实际情况配置
    proxy: {
      "/myApi": {
        target: "http://tp6",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace("/myApi/", "/"),
      },
    },
  },
  // css:{
  //   preprocessorOptions:{
  //     scss:{
  //       additionalData: `@use "@/assets/public.scss" as *;`
  //     }
  //   }
  // }
});
