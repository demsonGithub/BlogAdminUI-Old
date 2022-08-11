import Layout from '@/layout'
import { h, resolveComponent } from 'vue'

//#region Tips
// 三级路由时，父级没有组件采用以下方式
// component: { render: () => h(resolveComponent('router-view')) },
//#endregion
// 公共路由
export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error/404.vue'),
    hidden: true
  },
  // 首页
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: 'Dashboard',
          icon: 'dashboard',
          affix: true,
          noCache: true
        }
      }
    ]
  }
]

// 权限路由
export const asyncRoutes = [
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: '/example/table',
        name: 'Table',
        component: () => import('@/views/example/table'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: '/example/input',
        name: 'Input',
        component: () => import('@/views/example/input'),
        meta: { title: 'Input', icon: 'input' }
        // meta: { title: 'Input', icon: 'input', roles: ['admin'] }
      }
    ]
  }
]
