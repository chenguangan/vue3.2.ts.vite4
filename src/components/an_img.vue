<!--
  功能：选择图片组件
  时间：2023年03月06日 17:38:14
-->
<template>
  <el-dialog
    v-model="props.show"
    title="选择图片"
    width="1200px"
    draggable
    :before-close="close"
  >
    <div class="an-img">
      <div @click="ok('123')" class="flex v1">
        <el-image class="v2"
        v-for="(v,i) in 52" :key="i"
        :src="'http://qiniu.other.88an.top/other/verify5.jpg?imageView2/0/format/webp/q/75'"
        fit="contain"
      ></el-image>
      </div>
    </div>
    <template #footer>
        <el-button @click="ok">取消</el-button>
        <el-button type="primary" @click="ok"> 确定 </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from "vue";
const emit = defineEmits(["update:show","getImg"]);
const props = defineProps({
  //是否显示
  show: {
    type: Boolean,
    default: false,
  },
  //选择图片携带的参数
  data:{
    type:Object,
    default:()=>{
      return {}
    }
  }
});

const close = () => {
  emit("update:show", false);
};

function ok(data?:any) {
  emit("update:show", false);
  if(data){
    emit("getImg", 'http://qiniu.other.88an.top/other/verify5.jpg');
  }
}
</script>
<style scoped lang="scss">

.an-img{
  .v1{flex-wrap: wrap;}
  .v2{
    border: 1px solid #f1f1f1;
    width: 80px; height: 80px;
    border-radius: 5px;margin-right: 10px;margin-bottom: 10px;
    cursor: pointer;
    &:hover {
      border-color: var(--el-color-primary);
    }

    &:nth-child(13n){
      margin-right: 0;
    }
  }
}
</style>
