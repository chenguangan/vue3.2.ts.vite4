<template>
  <h1>编辑器</h1>
  <br />
  <vue-ueditor-wrap
    v-model="msg"
    :config="editorConfig"
    editor-id="editor-demo-01"
  ></vue-ueditor-wrap>
</template>

<script setup lang="ts">
import { ref } from "vue";
const msg = ref("<h2>Hello World!</h2>");
const editorConfig = {
  UEDITOR_HOME_URL: "/UEditor/", // 访问 UEditor 静态资源的根路径，可参考常见问题1
  serverUrl: "//ueditor.szcloudplus.com/cos", // 服务端接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
};
</script>
