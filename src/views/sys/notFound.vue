<template>
  <div style="padding-bottom: 30px">
    <el-empty description="你访问的页面不存在">
      <el-button @click="router.push('/')">返回首页</el-button>
    </el-empty>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>
