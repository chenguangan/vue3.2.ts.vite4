<!--
  功能：标签菜单
  时间：2023年03月01日 14:28:46
-->
<template>
  <el-scrollbar>
    <div class="tags-menu flex">
      <div
        class="v1 flex"
        :class="{
          true: $route.path === v.path,
        }"
        v-for="(v, i) in tags.routers"
        :kye="i"
        @click="goTagRouter(v, i)"
      >
        {{ v.lang ? $t(v.lang) : v.name }}
        <div class="i" @click.stop="deleteTag(v, $route.path)">
          <i class="custom-icon custom-icon-guanbi1"></i>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { useTagsViewHook } from "@/composition/useTagViewApi";
import { useRouter, useRoute } from "vue-router";
const { tags, deleteTag, setMenu } = useTagsViewHook();

const router = useRouter();
const route = useRoute();

//切换tags跳转页面
function goTagRouter(data: any, index: number) {
  router.push(data.path);
}

//设置刚进入页面的默认路由
setTimeout(() => {
  setMenu(route.path);
});
</script>

<style scoped lang="scss">
.el-scrollbar{
  position: relative;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12), 0 0 2px rgba(0, 0, 0, 0.04);
  z-index: 9;
}
.tags-menu {
  font-size: 13px;
  background: #fff;
  padding: 2px;
  color: #555;

  flex-wrap: nowrap;
  .v1 {
    flex-shrink: 0;
    line-height: 20px;
    padding: 0 8px 0 10px;
    border: 1px solid #ddd;
    margin-right: 3px;
    cursor: pointer;
    width: auto;
    &.true {
      background: var(--el-color-primary);
      color: #fff;
      border-color: var(--el-color-primary);
      .custom-icon {
        color: #fff;
      }
    }
    .custom-icon {
      font-size: 12px;
      color: #ccc;
    }
    .i {
      transform: scale(0.7);
      margin-left: 2px;
      transition: all 0.1s;
      position: relative;
      &:hover {
        transform: scale(0.8);
        top: 1px;
        .custom-icon {
          color: #000;
          font-weight: bold;
        }
      }
    }
  }
}

html.dark {
  .tags-menu {
    background: #222;
    color: #999;
    .v1 {
      border-color: #555;
      &.true {
        border-color: var(--el-color-primary);
      }
      .i {
        &:hover {
          .custom-icon {
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
