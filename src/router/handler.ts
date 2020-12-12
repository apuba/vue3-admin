/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-12 22:44:49
 * @LastEditTime: 2020-12-12 16:25:05
 * @LastEditors: 侯兴章
 * @Description: 
 */

import type { NavigationGuardNext, RouteLocationNormalized, Router, RouteRecordRaw } from 'vue-router';
import http from '@/common/http/index.ts';
import { appStore } from '@/store/modules/appStore';
import type { Menu, AppRouteRecordRaw } from '@/router/types.d';
import { NESTED_MENU } from '@/config';

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function addDynamicRoutes(menuList: Menu[] = [], routes: Array<RouteRecordRaw> = []) {
    menuList.forEach((item, index) => {
        if (item.path) {
            let path: string = item.path.replace(/^\//, '');
            let pathArray: Array<string> = path.split('/');
            const pathLen: number = pathArray.length; // 路径的长度
            //TODO: 目前不支持多级嵌套路由，故把多级嵌套的路由转为以 _ 链接的路由
            const routerPath = '/' + pathArray.join('_');
            let name = pathArray[pathLen - 1];
            name = name.substr(0, 1).toUpperCase() + name.substr(1); // 文件名首写转大写            
            pathArray[pathLen - 1] = name;
            if (!pathArray.includes('views') && pathLen > 1) {
                pathArray.splice(pathLen - 1, 0, 'views'); // 插入views目录名
            }
            let vuePath = pathArray.join('/') + '.vue'; // 实现的VUE文件路径
            // console.log(vuePath)
            // 创建当前路由
            let route: RouteRecordRaw = {
                path: NESTED_MENU ? item.path : routerPath,
                name: item.name,
                meta: {
                    router: NESTED_MENU ? item.path : routerPath,
                    title: item.name
                },
                component: () => import(`@/pages/${vuePath}`)
            }
            routes.push(route)
        }

        if (item.children) {
            // 还有下级子路由
            addDynamicRoutes(item.children, routes);
        }
    })
    return routes
}

// 处理静态组件绑定路由
function handleStaticComponent(router: Router, dynamicRoutes: Array<RouteRecordRaw> = []): Array<RouteRecordRaw> {
    let allRouter = [...router.options.routes];
    let r = allRouter[0].children;
    allRouter[0].children = r ? [...r, ...dynamicRoutes] : dynamicRoutes
    return allRouter;
}


/* 动态添加路由与菜单 */
export const addDynamicMenuAndRoutes = async (router: Router, to: RouteLocationNormalized, next: NavigationGuardNext): Promise<Router> => {
    let menuList = appStore.getMenuData;
    if (!menuList.length) {
        menuList = await appStore.getMenuAction();
    }
    console.log('menuList-', menuList)
    let dynamicRoutes = addDynamicRoutes(menuList);
    console.log('动态路由加载...')
    console.log(dynamicRoutes)
    console.log('动态路由加载完成.')
    // 处理路由，追动态的路由返回所有路由
    const allRouter: Array<RouteRecordRaw> = handleStaticComponent(router, dynamicRoutes);
    console.log('所有路由', allRouter)
    allRouter.forEach(item => {
        router.addRoute(item)
    })
    // appStore.commitRouter(router); // 保存当前路由，用于刷新页面还原
    appStore.commitLoadMenu(true); // 更新是否添加菜单标识，避免重复请求添加
    next(to.path)

    return router
}