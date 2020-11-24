/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-16 22:54:42
 * @LastEditTime: 2020-11-24 00:26:47
 * @LastEditors: 侯兴章
 * @Description:   
 */

import http from '@/common/http/index.ts';
import { BaseResponseModel, BaseRequestModel } from '@/service/baseModel';
import { DTOdict, mapperDict, mapperDictType } from './model';
import { ApiDict } from './api'

// 获取字典  此方式为表格请求数据，已弃用，仅供参考
export const ServiceGetDictList = async (params: DTOdict) => {
    const request: BaseRequestModel<DTOdict> = {
        params
    }
    const res = await http.post(ApiDict.getDictTypeList, request, mapperDictType);
    // const list = mapperHelper<DTOdict>(res.data, MapperDict); // 数据映射清洗
    // const res = { msg: res.msg, code: res.code, data: list };
    console.log('res', res)
    return res
}
