import wrapper from '@/layout/wrapper.vue';
import home from '@/views/index/home.vue';
import goodsEdit from '@/views/goods/edit.vue';
import goods from '@/views/goods/list.vue';
import iconfont from '@/views/other/icon.vue';
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


const staticRoutes:any = [
  {
    path: '/',
    name: '首页',
    lang:'menu.t1',
    component: home,
    children: [],
    meta: {
      icon: 'custom-icon-Home'
    }
  },

  {
    path: '/goods',
    name: '商品管理',
    component: wrapper,
    meta: {
      icon: 'custom-icon-Bag1'
    },
    children: [
      {
        path: '/goods/list', 
        name: '商品列表',
        component: goods,
        meta: {
          icon: 'custom-icon-trash'
        },
      },
      {
        path: '/goods/edit',
        name: '添加商品',
        component: goodsEdit,
        meta: {
          icon: 'custom-icon-zhangdan'
        }
      },
    ]
  },
  {
    path: '/icon',
    name: '图标',
    component: iconfont,
    children: [],
    meta: {
      icon: 'custom-icon-Folder1'
    }
  },
];
export default staticRoutes; 