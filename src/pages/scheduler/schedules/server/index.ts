/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-16 22:54:42
 * @LastEditTime: 2020-12-03 21:00:47
 * @LastEditors: 侯兴章
 * @Description:
 */

import http from '@/common/http/index.ts';
import { BaseResponseModel, BaseRequestModel } from '@/service/baseModel';
import { IDTOdict, mapperDict, mapperDictType } from './model';
import { ApiJob } from './api'
import {IModelJob} from "@/pages/scheduler/job/server/model";

// 保存字典
export const ServSaveJob = async (params: IModelJob) => {
  const request: BaseRequestModel<IDTOdict> = {
    params
  }
  return http.post(ApiJob.saveJob, request);
}
