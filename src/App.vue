<template>
  <el-config-provider :locale="locale">
    <router-view v-if="$route.path === '/login'"></router-view>
    <layout v-else></layout>
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import layout from "@/layout/index.vue";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import en from "element-plus/dist/locale/en.mjs";
import { useSysStore } from "@/store/sys";

const sysStore = useSysStore();
const locale = computed(() => (sysStore.language === "zh-CN" ? zhCn : en));
</script>

<style lang="scss">
@import "@/assets/iconfont/iconfont.css";
@import "@/assets/public.css";

html.dark {
  body {
    background: #000;
  }
}
</style>
