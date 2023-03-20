<template>
  <!-- 左边 -->
  <div
    class="left"
    :class="{
      flase: sysStore.init.isCollapse,
    }"
  >
    <el-menu
      class="c1"
      :collapse="sysStore.init.isCollapse"
      :collapse-transition="false"
      router
      active-text-color="var(--el-color-primary)"
      background-color="#20222a"
      :default-active="$route.path"
      @select="setMenu"
      text-color="#fff"
      :default-openeds="['/goods']"
    >
      <subMenu :item="routes"/>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { useSysStore } from "@/store/sys";
import { useTagsViewHook } from "@/composition/useTagViewApi";
import subMenu from "./components/sub-menu.vue";
const sysStore = useSysStore();
const { setMenu } = useTagsViewHook();
const routes = sysStore.init.staticRoutes;
</script>

<style scoped lang="scss">
.left {
  width: 200px;
  height: calc(100vh - 48px);
  background: #20222a;
  position: fixed;
  top: 48px;
  left: 0;
  z-index: 99;
  transition: 0.3s;
  box-sizing: border-box;

  &.flase {
    width: auto;
  }
}
</style>
