import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from '../components/Login.vue'; // 确保这个路径正确无误
import DashboardComponent from '@/components/DashBoard.vue'; // 确保这个路径正确无误
import AdminDashBoard from '@/components/AdminDashBoard.vue';

// 路由定义...
const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginComponent
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent
  },
  // 你可以添加更多的路由规则
  {
    path: '/adminDashboard',
    name: 'AdminDashboard',
    component: AdminDashBoard
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 打印来源页路由信息 (仅用于调试目的)
  console.log('Navigating from:', from.name);

  // 获取本地存储中的 token 用于判断用户是否登录
  const isUserLoggedIn = localStorage.getItem('userToken');
  const userRole = localStorage.getItem('userRole');

  // 判断用户目的路由是否为'Login'以及用户登录状态
  if (to.name !== 'Login' && !isUserLoggedIn) {
    // 用户未登录且尝试访问除了'Login'之外的路由
    next({ name: 'Login' });
  } else if (to.name === 'Login' && isUserLoggedIn) {
    // 用户已登录且尝试访问'Login'路由
    // 判断用户角色，如果是admin，跳转到管理员页面
    if(userRole === 'admin') {
      next({ name: 'AdminDashboard' });  // 确保此处的'AdminDashboard'路由名称与你应用中的名称对应
    } else {
      next({ name: 'Dashboard' });  // 确保此处的'Dashboard'路由名称与你应用中的名称对应
    }
  } else {
    // 其他情况，放行
    next();
  }
});
export default router;