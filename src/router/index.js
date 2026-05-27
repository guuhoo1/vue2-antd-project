import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { title: '登录', noLayout: true },
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { title: '仪表盘' },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue'),
    meta: { title: '系统设置' },
  },
  {
    path: '/user',
    redirect: '/user/list',
  },
  {
    path: '/user/list',
    name: 'UserList',
    component: () => import('../views/Dashboard.vue'),
    meta: { title: '用户列表' },
  },
  {
    path: '/user/permission',
    name: 'Permission',
    component: () => import('../views/Dashboard.vue'),
    meta: { title: '权限管理' },
  },
  {
    path: '/user/role',
    name: 'Role',
    component: () => import('../views/Dashboard.vue'),
    meta: { title: '角色管理' },
  },
  {
    path: '/content',
    redirect: '/content/article',
  },
  {
    path: '/content/article',
    name: 'Article',
    component: () => import('../views/Dashboard.vue'),
    meta: { title: '文章管理' },
  },
  {
    path: '/content/category',
    name: 'Category',
    component: () => import('../views/Dashboard.vue'),
    meta: { title: '分类管理' },
  },
  {
    path: '/product',
    redirect: '/product/list',
  },
  {
    path: '/product/list',
    name: 'ProductList',
    component: () => import('../views/Dashboard.vue'),
    meta: { title: '商品列表' },
  },
  {
    path: '/product/category',
    name: 'ProductCategory',
    component: () => import('../views/Dashboard.vue'),
    meta: { title: '商品分类' },
  },
  {
    path: '/analytics',
    redirect: '/analytics/overview',
  },
  {
    path: '/analytics/overview',
    name: 'AnalyticsOverview',
    component: () => import('../views/Dashboard.vue'),
    meta: { title: '分析概览' },
  },
  {
    path: '/analytics/reports',
    name: 'Reports',
    component: () => import('../views/Dashboard.vue'),
    meta: { title: '报表' },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path !== '/login' && !token) {
    next('/login')
  } else if (to.path === '/login' && token) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
