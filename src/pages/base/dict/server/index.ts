/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-16 22:54:42
 * @LastEditTime: 2020-12-03 22:24:50
 * @LastEditors: 侯兴章
 * @Description:   
 */

import http from '@/common/http/index.ts';
import { BaseResponseModel, BaseRequestModel } from '@/service/baseModel';
import { IDTOdict, mapperDict, mapperDictType, IModelDictType } from './model';
import { ApiDict } from './api'

// 获取字典  此方式为表格请求数据，已弃用，仅供参考
/* export const ServiceGetDictList = async (params: IDTOdict) => {
    const request: BaseRequestModel<IDTOdict> = {
        params
    }
    const res = await http.post(ApiDict.getDictTypeList, request, mapperDictType);
    // const list = mapperHelper<DTOdict>(res.data, MapperDict); // 数据映射清洗
    // const res = { msg: res.msg, code: res.code, data: list };
    console.log('res', res)
    return res
} */

// 保存字典
export const ServSaveDict = async (params: IModelDictType) => {
    const request: BaseRequestModel<IDTOdict> = {
        params
    }
    return http.post(ApiDict.saveDict, request);
}