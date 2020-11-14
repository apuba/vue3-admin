/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-08 22:52:22
 * @LastEditTime: 2020-11-14 00:42:50
 * @LastEditors: 侯兴章
 * @Description: 
 */
import type { AppRouteRecordRaw, RouteMeta } from '@router/types.d';

type routeName = string | null | undefined;
export interface TabItem {
    id: string | number,
    path: string;
    name?: routeName;
    meta?: RouteMeta;
}