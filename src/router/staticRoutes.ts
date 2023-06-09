import wrapper from "@/layout/wrapper.vue";
import home from "@/views/index/home.vue";
import configPage from "@/views/index/config.vue";
import goodsEdit from "@/views/goods/edit.vue";
import goodsList from "@/views/goods/list.vue";
import goodsType from "@/views/goods/type.vue";
import iconfont from "@/views/other/icon.vue";

/**
 *
 * 路由配置规则：
 *
 * {
 *  path:'',路径
 *  name:'',路由名称，生成menu时menu name
 *  meta:{},额外信息，icon为menu中的icon
 *  lang:'',多语言配置
 *  children: [], 子路由，menu中的子menu 没有时可为空数组
 * }
 *
 */

const staticRoutes: any = [
  {
    path: "/",
    name: "首页",
    lang: "menu.t1",
    component: home,
    children: [],
    meta: {
      icon: "custom-icon-Home",
    },
  },
  {
    path: "/goods",
    name: "商品",
    lang: "menu.t2",
    component: wrapper,
    meta: {
      icon: "custom-icon-Bag1",
    },
    children: [
      {
        path: "/goods/list",
        name: "商品管理",
        lang: "menu.t8",
        component: wrapper,
        children: [
          {
            path: "/goods/list",
            name: "商品列表",
            lang: "menu.t3",
            children: [],
            component: goodsList,
          },
          {
            path: "/goods/edit",
            name: "添加商品",
            lang: "menu.t5",
            children: [],
            component: goodsEdit,
          },
        ],
      },
      {
        path: "/goods/type",
        name: "商品类型",
        lang: "menu.t4",
        children: [],
        component: goodsType,
      },
    ],
  },
  {
    path: "/config",
    name: "系统配置",
    lang: "menu.t6",
    component: configPage,
    children: [],
    meta: {
      icon: "custom-icon-shezhi",
    },
  },
  {
    path: "/icon",
    name: "图标",
    lang: "menu.t7",
    component: iconfont,
    children: [],
    meta: {
      icon: "custom-icon-Folder1",
    },
  },
];
export default staticRoutes;
