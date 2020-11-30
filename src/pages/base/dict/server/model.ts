/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-17 00:46:00
 * @LastEditTime: 2020-11-29 23:40:49
 * @LastEditors: 侯兴章
 * @Description: 
 */

 // 字典-用于查询
export interface IDTOdict {
    dictSort?: string;
    dictLabel?: string;
    dictValue?: string;
    dictType?: string;
    status?: string;
}


// 字典类型-
export interface IModelDictType{
    dictName: string;
    dictId?: number | string;
    dictType: string;
    status: string;
}

// DEMO 数据映射配置，示例为：取出'dictSort', 'dictLabel', 'dictValue', 'dictValue'的值 ，并把后端 createdBy的值映射给status
export const mapperDict = ['dictSort', 'dictLabel', 'dictValue', { status: 'createdBy' }];

export const mapperDictType = ['dictName', 'dictId', 'dictType', 'status'];
 