<template>
  <div class="edit-page">
    <slot />

    <div
      class="footer flex"
      :class="{
        false: sysStore.init.isCollapse,
      }"
    >
      <el-button type="primary" @click="emit('subForm')">确定</el-button>
      <el-button>取消</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSysStore } from "@/store/sys";
const sysStore = useSysStore();
const emit = defineEmits(["subForm"]);
</script>

<style lang="scss" scoped>
.edit-page {
  padding-bottom: 50px;
}
.footer {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  width: 100%;
  padding: 10px 20px;
  position: fixed;
  left: 200px;
  bottom: 0px;
  justify-content: flex-start;
  background: #fff;
  z-index: 2000;
  &.false {
    left: 64px;
  }
  .el-button {
    width: 100px;
  }
}
html.dark{
    .footer{
        background: #000;
    }
}
</style>
