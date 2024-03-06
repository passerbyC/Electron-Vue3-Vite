import { createRouter, createWebHashHistory } from 'vue-router'
import { ElMessage } from "element-plus";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/user/login.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/index.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})
// 监听路由变化
let expirationTime = 86400000
router.beforeEach((to, from, next) => {
  let isAuthenticated = localStorage.getItem('user');
  const overTime = localStorage.getItem('time')
  let date = new Date().getTime()
  if (isAuthenticated && to.meta.requiresAuth) {
    if (date - overTime > expirationTime) {
      ElMessage.error("登录过期，请重新登录")
      localStorage.removeItem('user')
      next('/login');
    }
    next();
  } else if (!isAuthenticated && to.meta.requiresAuth) {
    next('/login');
  } else {
    next();
  }
});
export default router
