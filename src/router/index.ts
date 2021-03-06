/*
 * @Author: 侯兴章
 * @Date: 2020-10-13 00:04:42
 * @LastEditTime: 2020-12-12 15:53:42
 * @LastEditors: 侯兴章
 * @Description: 
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { AppRouteRecordRaw } from './types';
import DefalutLayout from '@/layout/Index.vue';
import LoginLayout from '@/layout/Login.vue';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/', // 主框架根路由
    name: 'Root',
    component: DefalutLayout,
    redirect: '/dashbord',
    meta: {
      title: '首页',
    },
    children: [
      {
        path: '/dashbord',
        name: 'dashbord',
        component: () => import('@/pages/dashbord/views/Index.vue')
      },
    ]

  },
  {
    path: '/login',
    name: 'Login',
    component: LoginLayout
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
