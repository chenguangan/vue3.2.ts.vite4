<template>
  <an-head />
  <div
    class="content-box"
    :class="{
      false: sysStore.isCollapse,
    }"
  >
    <an-menu />

    <div class="c1">
      <tags-menu />
      <el-scrollbar class="b1">
        <div class="b2">
          <div class="b3">
            <router-view v-slot="{ Component, route }">
              <transition name="fade-transform" mode="out-in">
                <keep-alive :include="['home','GoodsEdit','Icon']">
                  <component :is="Component" :key="route.fullPath" />
                </keep-alive>
              </transition>
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
import tagsMenu from "./components/tags-menu.vue";
import { useSysStore } from "@/store/sys";
const sysStore = useSysStore();
</script>

<style scoped lang="scss">
.content-box {
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
      background: var(--el-bg-color);
      padding: 10px;
      border-radius: 5px;
    }
  }
}

html.dark {
  .c1 {
    .b1 {
      background: #333;
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
