<template>
  <div style="height: 10vh">
    <router-link to="/test">跳转内部页面</router-link>
  </div>
  <div class="flex">
    <el-button @click="num++">点击++</el-button>
    <h1>切换页面，数字加的状态保持：{{ num }}</h1>
  </div>
</template>

<script lang="ts">
export default {
  name: "home",
};
</script>

<script setup lang="ts">
import { ref } from "vue";
const num = ref(0);
</script>

<style scoped>
h1 {
  margin-left: 10px;
}
</style>
