/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-05 00:44:20
 * @LastEditTime: 2020-11-14 17:26:00
 * @LastEditors: 侯兴章
 * @Description: 
 */

import type { RouteRecordRaw } from 'vue-router';
 
export interface RouteMeta {
  // 标题
  title: string;
  // 是否忽略权限
  ignoreAuth?: boolean;

  // roles?: RoleEnum[];
  // 是否缓存
  ignoreKeepAlive?: boolean;
  // 是否固定在tab上
  affix?: boolean;
  // 
  icon?: string;
  // Jump address
  frameSrc?: string;
  // 外部跳转地址
  externalLink?: string;
  // 当前页面的过滤效果（动画）
  transitionName?: string;
  // 是否已动态添加路由
  hideBreadcrumb?: boolean;
  // 禁用重定向
  disabledRedirect?: boolean;
  // close loading
  afterCloseLoading?: boolean;
  inTab?: boolean;
}

// Omit 可以忽略传入的一些属性
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  meta: RouteMeta;
  component?: any;
  components?: any;
  children?: AppRouteRecordRaw[];
  props?: any;
}

export interface Menu {
  name: string; // 菜单显示名称
  icon?: string;
  path: string; // 菜单对应路由
  id: number | string;
  pId?: number | string;
  disabled?: boolean;
  children?: Menu[];
  orderNo?: number;
  // roles?: RoleEnum[];
  meta?: Partial<RouteMeta>; //  Partial 传入的类型变为可选
}
export interface MenuModule {
  orderNo?: number;
  menu: Menu;
}

export interface AppRouteModule {
  layout: AppRouteRecordRaw;
  routes: AppRouteRecordRaw[];
}
