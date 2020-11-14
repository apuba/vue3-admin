/*  
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-14 16:08:55
 * @LastEditTime: 2020-11-15 01:11:20
 * @LastEditors: 侯兴章
 * @Description: 用于应用里数据模型与实际接口的数据模型不一致的映射处理
 */
import type { Menu } from '@/router/types.d';
import { mappingHelper } from '@/common/helper';
import { modelMenu } from './config';

/**
 * @description:  清洗映射菜单数据
 * @param {Array} originData
 * @return {*}
 */
export const mappingMenu = (originData: Array<any>): Menu[] => {
    return mappingHelper<Menu>(originData, modelMenu)
}

