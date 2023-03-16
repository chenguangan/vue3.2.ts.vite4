<template>
  <an-head />
  <div
    class="index-page"
    :class="{
      false: sysStore.init.isCollapse,
    }"
  >
    <an-menu :routes="routes" />

    <div class="c1">
      <tagsMenu />
      <el-scrollbar class="b1">
        <div class="b2">
          <div class="b3">
            <router-view v-slot="{ Component, route }">
         
                <keep-alive :include="['home','GoodsEdit','Icon']">
                  <component :is="Component" :key="route.fullPath" />
                </keep-alive>

            </router-view>
            <el-backtop
              :right="50"
              :bottom="100"
              z-index="999999"
              target=".c1 .el-scrollbar__wrap"
            />
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import anHead from "./head.vue";
import anMenu from "./menu.vue";
import tagsMenu from "./components/tagsMenu.vue";
import { useRouter, useRoute } from "vue-router";
import { ref, watch, watchEffect } from "vue";
import { useTagsViewHook } from "@/composition/useTagViewApi";
import { useSysStore } from "@/store/sys";

// const { setMenu } = useTagsViewHook();
const route = useRoute();
const sysStore = useSysStore();
const routes = sysStore.init.staticRoutes;

// // 初始化页面刷新保证当前路由tabview存在
// let stop = watchEffect(() => {
//   let parentPath = route.path.slice(0, route.path.lastIndexOf("/"));
//   dynamicRouteTags(route.path, parentPath);
// });
// setTimeout(() => {
//   // 监听只执行一次，但获取不到当前路由，需要下一个事件轮询中取消监听
//   stop();
// }, 0);
</script>

<style scoped lang="scss">
.index-page {
  z-index: 9;
  height: calc(100vh - 48px);
  // background: #f6f6f6;
  position: fixed;
  right: 0;
  top: 48px;
  overflow: auto;
  width: calc(100% - 200px);
  transition: 0.3s;
  &.false {
    width: calc(100% - 64px);
  }
  .c1 {
    .b1 {
      background: #eee;
      height: calc(100vh - 75px);
    }
    .b2 {
      padding: 10px;
    }
    .b3 {
      background: #fcfcfc;
      padding: 10px;
      border-radius: 5px;
    }
  }
}

html.dark {
  .c1 {
    .b1 {
      background: #000;
    }
    .b3 {
      background: #222;
    }
  }
}

.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
