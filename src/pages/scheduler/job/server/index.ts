/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-16 22:54:42
 * @LastEditTime: 2020-11-30 01:26:11
 * @LastEditors: 侯兴章
 * @Description:
 */

import http from '@/common/http/index.ts';
import { BaseResponseModel, BaseRequestModel } from '@/service/baseModel';
import { IDTOdict, mapperDict, mapperDictType } from './model';
import { ApiJob } from './api'

// 获取字典  此方式为表格请求数据，已弃用，仅供参考
export const ServiceGetDictList = async (params: IDTOdict) => {
    const request: BaseRequestModel<IDTOdict> = {
        params
    }
    const res = await http.post(ApiJob.getRoleList, request, mapperDictType);
    return res
}
