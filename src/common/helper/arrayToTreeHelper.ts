/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-15 00:28:55
 * @LastEditTime: 2020-11-17 01:00:03
 * @LastEditors: 侯兴章
 * @Description:  数组转换为树形结构
 */

const defaultConfig: MapToTree = {
    id: 'id',
    pId: 'pId',
    children: 'children'
}

// 转化在关键字段
export interface MapToTree {
    id: string;
    pId: string;
    children?: string;
}

/**
 * @description: 把扁平数组转为嵌套类型的树形数据
 * @param {Array} originData  需要转的数组
 * @param {Iconfig} map 基础配置
 * @return {*}
 */
export const arrayToTreeHelper = <T>(originData: Array<any>, configMap: MapToTree = defaultConfig): Array<T> => {
    configMap = { ...defaultConfig, ...configMap }
    let result: Array<T | any> = [];
    if (!Array.isArray(originData)) {
        return result
    }
    originData.forEach(function (item) {
        configMap.children && delete item[configMap.children];
    });

    let map: any = {};
    originData.forEach(function (item) {
        map[item[configMap.id]] = item;
    });
    originData.forEach(function (item) {
        var parent = map[item[configMap.pId]];
        if (parent && configMap.children) {
            (parent[configMap.children] || (parent[configMap.children] = [])).push(item);
        } else {
            result.push(item);
        }
    });
    return result;
};