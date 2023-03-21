import { defineStore } from "pinia";
import { ref, computed, reactive, toRefs } from "vue";
import staticRoutes from "@/router/staticRoutes";

//系统初始化数据
export const useSysStore = defineStore("sys", () => {
  const init = reactive({
    isCollapse: false, // 控制菜单展开与折叠
    staticRoutes: staticRoutes, //路由
    language: localStorage.getItem("lang") || "zh-CN", //语言
  });

  //监听 是否折叠菜单 动态改变左边菜单宽度
  const menuWidth = computed(() => {
    return init.isCollapse ? "64px" : "200px";
  });

  return { ...toRefs(init), menuWidth };
});
