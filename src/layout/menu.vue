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
    >
      <template v-for="(routeItem, routeIndex) in routes">
        <!-- 没有子路由的一级路由 -->
        <el-menu-item
          :key="routeIndex"
          v-if="routeItem.children.length <= 0"
          :index="routeItem.path"
        >
          <i
            :class="['custom-icon', routeItem.meta.icon || 'custom-icon-Star2']"
          ></i>
          <template #title>
            <template v-if="routeItem.lang">
              {{ $t(routeItem.lang) }}
            </template>
            <template v-else>
              {{ routeItem.name }}
            </template>
          </template>
        </el-menu-item>

        <!-- 有子路由的 二级路由 -->
        <el-sub-menu
          class="submenu-title"
          :key="routeIndex"
          v-if="routeItem.children.length > 0"
          :index="routeItem.path"
        >
          <template #title>
            <i
              :class="[
                'custom-icon',
                routeItem.meta.icon || 'custom-icon-Star2',
              ]"
            ></i>
            <span>{{ routeItem.name }}</span>
          </template>
          <el-menu-item
            :index="val.path"
            v-for="(val, index) in routeItem.children"
            :key="index"
            >{{ val.name }}</el-menu-item
          >
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useSysStore } from "@/store/sys";
import { useRoute } from "vue-router";
import { useTagsViewHook } from "@/composition/useTagViewApi";

//接受父组件参数
const props = defineProps({
  routes: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

const sysStore = useSysStore();
const route = useRoute();

const { setMenu } = useTagsViewHook();

let currentActiveRoute = ref("");

// watch(route, (newVal, oldVal) => {
//   console.log(newVal);
//   if (newVal.meta.activePath) {
//     currentActiveRoute.value = newVal.meta.activePath;
//   } else {
//     currentActiveRoute.value = newVal.path;
//   }
// });

function menuSelect(index: string,indexPath:any,item:any,routeResult:any) {
  console.log(index,indexPath,item,routeResult);
  // tagsViewStore.tags.push({

  // })
}
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

  .custom-icon {
    margin: 0 10px 0 2px;
    position: relative;
    font-size: 18px;
    top: -1px;
  }

  .c1 {
    border: none;
    .el-menu-item.is-active {
      background: #000;
    }
  }
}
</style>
