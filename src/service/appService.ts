/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-16 22:54:42
 * @LastEditTime: 2020-11-19 00:03:14
 * @LastEditors: 侯兴章
 * @Description:  基础的API 服务，各业务层的服务请在业务模块里编写。
 */

import http from '@/common/http/index.ts';
import { BaseResponseModel, BasicRequestModel } from './baseModel';
import { DTOlogin, UserInfoModel } from '@/service/appModel';

import { arrayToTreeHelper, MapToTree } from '@/common/helper/arrayToTreeHelper';
import { mappingHelper } from '@/common/helper/mappingHelper';
import { mapUserInfo } from '@/mapping/config'; // UserInfoModel 与后端实际返回的报文数据映射
import { Menu } from '@/router/types';


// 登录服务
export const ServiceLogin = async (params: DTOlogin): Promise<UserInfoModel> => {
   /*  const request: BasicRequestModel<DTOlogin> = {
        params
    } */
    const res = await http.post('/systemServer/baseLogin/login', params);
    // mapUserInfo 为 UserInfoModel 与后端实际返回的报文数据映射

    const data = mappingHelper<UserInfoModel>([res.data], mapUserInfo); // 过滤清洗数据
    return data[0];
}

// 获取菜单 
export const ServiceGetMenus = async (): Promise<Array<Menu>> => {
    const res = await http.post('/systemServer/sysMenuController/findMenu', {});
    const treeMap: MapToTree = {
        id: 'menuId',
        pId: 'menuParentId'
    }
    const data: Menu[] = arrayToTreeHelper(res.data, treeMap); // 获取树型数据
    return data
}

