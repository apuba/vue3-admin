/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-15 01:40:41
 * @LastEditTime: 2020-11-15 02:12:24
 * @LastEditors: 侯兴章
 * @Description: 
 */

import { Menu } from '@/router/types.d';
import http from '@/common/http/index.ts';
import { arrayToTreeHelper, Iconfig } from '@/common/helper/arrayToTreeHelper';

export const getMenusServer = async (): Promise<Array<any>> => {
    const res = await http.post('/systemServer/sysMenuController/findMenu', { params: {} });
    const treeMap: Iconfig = {
        id: 'menuId',
        pId: 'menuParentId'
    }
    const data: any[] = arrayToTreeHelper(res.data, treeMap);
    return data
}