/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-17 00:46:00
 * @LastEditTime: 2020-11-29 23:40:49
 * @LastEditors: 侯兴章
 * @Description:
 */

 //用于查询
export interface IDTOdict {
  jobId?: number | String;
  jobName?: string;
  description?: string;
  requestUrl?: string;
  requestType?: string;
  outputFileType?: string;
  system?: string;
  module?: string;
  jobTypeLabel?: string;
  singleInstanceLabel?: string;
  jobType?: string;
  creationDate?: string;
  createName?: string;
}

//
export interface IModelJob{
  jobId?: number | String;
  jobName?: string;
  description?: string;
  requestUrl?: string;
  requestType?: string;
  outputFileType?: string;
  system?: string;
  module?: string;
  jobType?: string;
  scheduleExpectStartDate?: string;
  scheduleExpectEndDate?: string;
  cornexpress?: string;
}

export const mapperDict = ['jobId','jobName', 'description', 'requestUrl','requestType', 'outputFileType','system','jobTypeLabel','singleInstanceLabel',
  'module','jobType','creationDate','createName'];

export const mapperDictType = ['jobId','jobName', 'description', 'requestUrl','requestType', 'outputFileType','system','singleInstanceLabel','jobTypeLabel',
  'module','jobType','creationDate','createName'];
