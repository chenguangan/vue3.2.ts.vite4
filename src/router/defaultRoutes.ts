import test from "@/views/sys/test.vue";
import notFound from "@/views/sys/notFound.vue";
const defaultRoutes: any = [
  {
    path: "/test",
    name: "内部页面",
    component: test,
    meta: {
      activePath: "/", // 打开非Menu页面选择当前激活menu
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: notFound,
  },
  {
    path: "/login",
    name: "登录",
    component: () => import('@/views/sys/login.vue'),
  },
  {
    path: "/pass",
    name: "修改密码",
    component: () => import('@/views/sys/pass.vue'),
  },
];

export default defaultRoutes;
