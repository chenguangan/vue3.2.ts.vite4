import { createRouter, createWebHashHistory } from 'vue-router';
import staticRoutes from './staticRoutes';
import defaultRoutes from './defaultRoutes';

const router = createRouter({
  history: createWebHashHistory(),
  routes:[
    ...staticRoutes,
    ...defaultRoutes,
  ]
});

router.beforeEach((to, from, next) => {
  let userInfo = localStorage.getItem('user');
  if (to.path === "/login") {
    next();
  } else {
    if (userInfo) {
      next();
    } else {
      next({
        path: '/login'
      });
    }
  }
});
export default router;

