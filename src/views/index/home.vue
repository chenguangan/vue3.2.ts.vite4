<template>
<div>
  <div class="c1">
    <router-link to="/test">{{$t('page.t1')}}</router-link>
  </div>
  <div class="flex">
    <el-button @click="num++">{{$t('page.t2')}}++</el-button>
    <h1>{{$t('page.t3')}}：{{ num }}</h1>
  </div>
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

<style scoped lang="scss">
.c1{
  height: 10vh;
}
html.dark{
  .c1 a{color: #fff;}
}
</style>
