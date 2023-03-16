<!--
  功能：图片
  时间：2023年03月16日 15:22:48
-->
<template>
  <div class="flex">
    <!-- 图片列表 多张 -->
    <draggable
      v-if="props.max > 1"
      class="list-group flex"
      tag="transition-group"
      :component-data="{
        tag: 'div',
        type: 'transition-group',
        name: !drag ? 'flip-list' : null,
      }"
      v-model="props.modelValue"
      v-bind="dragOptions"
      @start="drag = true"
      @end="drag = false"
      item-key="v"
    >
      <template #item="{ element, index }">
        <div class="c8 flex">
          <el-image
            style="width: 100%; height: 100%"
            :src="element"
            :preview-src-list="props.modelValue"
            :initial-index="index"
            fit="contain"
          ></el-image>
          <div class="c10 flex">
            <i class="custom-icon custom-icon-trash" @click="delFun(index)"></i>
            <i
              class="custom-icon custom-icon-tihuan"
              @click="emit('pickImg', index)"
            ></i>
          </div>
        </div>
      </template>
    </draggable>

    <!-- 图片列表 单张 -->
    <div class="c8 flex" v-if="props.max === 1 && props.modelValue[0]">
      <el-image
        style="width: 100%; height: 100%"
        :src="props.modelValue[0]"
        fit="contain"
        :preview-src-list="props.modelValue"
      ></el-image>
      <div class="c10 flex">
        <i
          class="custom-icon custom-icon-trash"
          @click="props.modelValue.splice(0, 1)"
        ></i>
        <i class="custom-icon custom-icon-tihuan" @click="emit('pickImg')"></i>
      </div>
    </div>

    <!-- 选择图片 -->
    <div
      class="b2"
      @click="emit('pickImg')"
      v-if="props.modelValue.length < props.max"
    >
      <i class="custom-icon custom-icon-jia_sekuai"></i>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import draggable from "vuedraggable"; //拖拽组件配置信息

const emit = defineEmits(["pickImg", "update:modelValue"]);
const props = defineProps({
  //图片数组
  modelValue: {
    type: Array,
    required: true,
    default: () => {
      [];
    },
  },
  //最大选择数量
  max: {
    type: Number,
    default: 1,
  },
});

const img = ref(props.modelValue);
function delFun(index: number) {
  img.value.splice(index, 1);
  emit("update:modelValue", img.value);
}

const drag = ref(false);
const dragOptions = {
  animation: 200,
  group: "description",
  disabled: false,
  ghostClass: "ghost",
};
</script>

<style scoped lang="scss">
.b2 {
  height: 120px;
  width: 120px;
  line-height: 120px;
  text-align: center;
  border: 1px dashed #ccc;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    border-color: var(--el-color-primary);
  }
}
.c8 {
  margin-right: 10px;
  width: 120px;
  height: 120px;
  position: relative;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px dashed #d9d9d9;
}

.c8:hover {
  border-color: var(--el-color-primary);
}

.c8:hover .c10 {
  opacity: 1;
}

.c8 img {
  width: 100%;
  height: 100%;
  display: block;
}

.c9 {
  display: flex;
  justify-content: center;
  align-items: center;
}

.c10 {
  position: absolute;
  right: 0;
  bottom: 0;
  cursor: pointer;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  opacity: 0;
  transition: 0.3s;
  text-align: center;
  color: #fff;
  line-height: 30%;
  height: 30%;
  i {
    width: 50%;
    font-size: 21px;
    text-align: center;
    &:hover {
      color: var(--el-color-primary);
    }
  }
  i.custom-icon-trash {
    font-size: 19px;
  }
}
</style>
