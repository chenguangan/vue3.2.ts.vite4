import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import VueUeditorWrap from "vue-ueditor-wrap";
import Api from "@/common/http.ts";
import ElementPlus from "element-plus";
import { i18n } from "@/locales";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";

const app = createApp(App);

app.provide("api", Api);
app.use(createPinia());
app.use(i18n);
app.use(router);
app.use(ElementPlus);
app.use(VueUeditorWrap);
app.mount("#app");
