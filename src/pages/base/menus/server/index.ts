/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-15 01:40:41
 * @LastEditTime: 2021-03-28 15:48:27
 * @LastEditors: 侯兴章
 * @Description: 
 */


import http from '@/common/http/index';
import { arrayToTreeHelper, MapToTree } from '@/common/helper/arrayToTreeHelper';
import { EapiMenus } from './api';
import { IMenuModel, IRequestMenuModel, ITreeNodes } from './model';
import { BaseRequestModel } from '@/service/baseModel';

// 获取菜单 
export const ServiceGetMenus = async (params: IRequestMenuModel = {}): Promise<Array<IMenuModel>> => {
    const request: BaseRequestModel<IRequestMenuModel> = {
        params
    }
    const mapper = ['enabled', 'htmlUrl', 'icon', 'menuCode', 'menuName', 'menuParentId', 'levelId', 'menuId', 'orderCode']
    const res = await http.post(EapiMenus.getMenuList, request, mapper);
    const mapperToTree: MapToTree = {
        id: 'menuId',
        pId: 'menuParentId'
    }
    const data = arrayToTreeHelper<IMenuModel>(res.data, mapperToTree); // 获取树型数据
    return data
}


// 删除菜单
export const ServDeleteMenu = (menuId: number) => http.post(EapiMenus.delMenu, { params: { menuId } });

// 新增、更新菜单
export const ServSaveAndUpdateMenu = (params: IMenuModel) => http.post(EapiMenus.saveMenu, { params });

export const ServeGetMenuButtons = (menuId: number) => http.post(EapiMenus.getMenuButton, { params: { menuId } })