/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-22 01:57:52
 * @LastEditTime: 2020-11-24 00:23:21
 * @LastEditors: 侯兴章
 * @Description: 字典相关的后端服务API
 */

export enum ApiDict {
    getDictList = '/systemServer/sysDictDataController/findSysDictData', // 查询字典
    saveDict = 'systemServer/sysDictTypeController/saveSysDictType', // 保存、更新字典
    delDict = 'systemServer/sysDictDataController/delSysDictData', // 字典删除
    delDictType = 'systemServer/sysDictTypeController/delSysDictType', // 字典类型删除
    getDictTypeList = 'systemServer/sysDictTypeController/findSysDictType' // 查询字典类型列表
} 