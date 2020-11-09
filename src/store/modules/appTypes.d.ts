import type { AppRouteRecordRaw, RouteMeta } from '@router/types.d';

type routeName = string | symbol | null | undefined;
export interface TabItem {
    id: string | number,
    path: string;
    name?: routeName;
    meta?: RouteMeta;
}