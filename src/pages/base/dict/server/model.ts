/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-17 00:46:00
 * @LastEditTime: 2020-11-24 00:26:33
 * @LastEditors: 侯兴章
 * @Description: 
 */

export interface DTOdict {
    dictSort?: string;
    dictLabel?: string;
    dictValue?: string;
    dictType?: string;
    status?: string;
}


// 字典类型
export interface ModelDictList {
    dictName: string;
    dictId: number;
    dictType: string;
    status: string;
}

// DEMO 数据映射配置，示例为：取出'dictSort', 'dictLabel', 'dictValue', 'dictValue'的值 ，并把后端 createdBy的值映射给status
export const mapperDict = ['dictSort', 'dictLabel', 'dictValue', { status: 'createdBy' }];

export const mapperDictType = ['dictName', 'dictId', 'dictType', 'status'];

export interface ListDict {
    data: Array<DTOdict>
}
