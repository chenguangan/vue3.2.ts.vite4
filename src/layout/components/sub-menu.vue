<!--
  功能：递归菜单
  时间：2023年03月20日 15:41:23
-->
<template>
  <template v-for="(routeItem, routeIndex) in item">
    <!-- 没有子路由的一级路由 -->
    <el-menu-item
      :key="routeIndex"
      v-if="routeItem.children.length <= 0"
      :index="routeItem.path"
    >
      <i
        v-if="routeItem?.meta?.icon"
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
          v-if="routeItem?.meta?.icon"
          :class="['custom-icon', routeItem.meta.icon || 'custom-icon-Star2']"
        ></i>
        <span v-if="routeItem.lang">{{ $t(routeItem.lang) }}</span>
        <span v-else>{{ routeItem.name }}</span>
      </template>

      <!-- 递归二级路由-->
      <SubMenu :item="routeItem.children" />
    </el-sub-menu>
  </template>
</template>

<script lang="ts">
export default {
  nane: "SubMenu",
};
</script>

<script lang="ts" setup>
defineProps({
  item: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
</script>

<style scoped lang="scss">
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
</style>
