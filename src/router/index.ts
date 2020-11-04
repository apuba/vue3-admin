/*
 * @Author: 侯兴章
 * @Date: 2020-10-13 00:04:42
 * @LastEditTime: 2020-11-01 16:21:21
 * @LastEditors: 侯兴章
 * @Description: 
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { AppRouteRecordRaw } from './types';
import DefalutLayout from '@/layout/Index.vue'

import Home from '../pages/Home.vue'

const routes: Array<RouteRecordRaw> = [

  {
    path: '/',
    name: 'Root',
    component: DefalutLayout,
    redirect: '/Home',
    meta: {
      title: '首页',
    },
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () => import('../pages/Login.vue')
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../pages/About.vue')
      },
    ],
  },
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home,
  //   meta: {
  //     title: '首页'
  //   }
  // },
  
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



export default router
