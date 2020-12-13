/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-15 01:40:41
 * @LastEditTime: 2020-12-13 15:36:25
 * @LastEditors: 侯兴章
 * @Description: 
 */


import http from '@/common/http/index.ts';
import { arrayToTreeHelper, MapToTree } from '@/common/helper/arrayToTreeHelper';
import { EapiMenus } from './api';
import { IMenuModel, IRequestMenuModel, ITreeNodes } from './model';
import { BaseRequestModel } from '@/service/baseModel';

// 获取菜单 
export const ServiceGetMenus = async (params: IRequestMenuModel = {}): Promise<Array<IMenuModel>> => {
    const request: BaseRequestModel<IRequestMenuModel> = {
        params
    }

    // const mapper = [{key: 'menuId', title: 'menuName', pId: 'menuParentId'}]
    const res = await http.post(EapiMenus.getMenuList, request);

    const mapperToTree: MapToTree = {
        id: 'menuId',
        pId: 'menuParentId'
    }
    const data = arrayToTreeHelper<IMenuModel>(res.data, mapperToTree); // 获取树型数据
    return data
}
