<template>
  <!-- 左边 -->
  <div class="left">
    <el-menu
      :collapse="isCollapse"
      :collapse-transition="false"
      router
      active-text-color="var(--el-color-primary)"
      background-color="#20222a"
      :default-active="$route.path"
      @select="setMenu"
      text-color="#fff"
      :default-openeds="defaultOpeneds"
    >
      <subMenu :item="staticRoutes" />
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { watch, toRefs } from "vue";
import { useSysStore } from "@/store/sys";
import { useTagsViewHook } from "@/composition/useTagViewApi";
import subMenu from "./components/sub-menu.vue";
import { useWindowSize } from "@vueuse/core";

const { isCollapse, staticRoutes, menuWidth } = toRefs(useSysStore());

const { setMenu } = useTagsViewHook();

const defaultOpeneds = ["/goods"]; //默认展开的菜单

const { width } = useWindowSize();//获取窗口宽度

isCollapse.value = width.value < 1200;//宽度小于1200 自动折叠菜单

watch(width, (newVal, oldVal) => {
  isCollapse.value = newVal < 1200;
});
</script>

<style scoped lang="scss">
.left {
  width: v-bind(menuWidth);
  height: calc(100vh - 48px);
  background: #20222a;
  position: fixed;
  top: 48px;
  left: 0;
  z-index: 99;
  transition: 0.3s;
  box-sizing: border-box;

  .el-menu {
    border: none;
  }
}
</style>
