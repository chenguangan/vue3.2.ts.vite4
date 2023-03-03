<style lang="scss" scoped>
.c1 {
  padding: 10px;
  background: #fff;
  // margin-bottom: 10px;
}
.c2 {
  padding: 10px;
}
.c3 {
  margin-bottom: 10px;
}
.c4 {
  margin-top: 10px;
  flex-direction: row-reverse;
}

html.dark {
  .c1{
    background: #222;
  }
}
</style>

<template>
  <!-- 条件筛选栏 -->
  <div class="c1" v-if="slotSearch">
    <slot name="search"></slot>
  </div>

  <div class="c2">
    <!-- 操作栏 -->
    <div class="c3" v-if="slotAction">
      <slot name="action"></slot>
    </div>


    <!-- 表格 -->
    <el-table
      :data="data.list"
      style="width: 100%"
      stripe
      :max-height="getTableHeight"
      @selection-change="selectChecked"
    >
      <slot name="table"></slot>
    </el-table>

    <!-- 分页栏 -->
    <div class="flex c4">
      <el-pagination
        layout="total, sizes,prev, pager, next"
        :total="data.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSlots, defineProps, computed, defineEmits } from "vue";

const emit = defineEmits(["getChecked"]);

const props = defineProps({
  data: {
    type: Object,
    default: () => {
      return {
        total:0,//总数据条数
        list:[],//单页 数据列表
      };
    },
  },
});

//判断插槽是否使用
const slotSearch = !!useSlots().search;
const slotAction = !!useSlots().action;

//计算表格高度
const getTableHeight = computed(() => {
  let h = "calc(100vh - 271px)";

  //根据插槽 是否使用来获取高度
  if (slotSearch && !slotAction) h = "calc(100vh - 240px)";
  if (!slotSearch && slotAction) h = "calc(100vh - 220px)";
  if (!slotSearch && !slotAction) h = "calc(100vh - 180px)";

  return h;
});

//获取勾选的数据
function selectChecked(data: any) {
  emit("getChecked", data);
}
</script>
