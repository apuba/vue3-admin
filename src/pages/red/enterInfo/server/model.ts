/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-17 00:46:00
 * @LastEditTime: 2020-11-29 23:40:49
 * @LastEditors: 侯兴章
 * @Description:
 */

 //用于查询
export interface IDTOEnterInfo {
  qyEnterId?: number | String;
  corpName?: string;
  corpFullName?: string;
  statusLabel?: string;
  authName?: string;
  location?: string;
  corpScale?: string;
  corpIndustry?: string;
  creationDate?: string;
}

export const mapperEnterInfo = ['qyEnterId','corpName', 'corpFullName', 'statusLabel','authName', 'location','corpScale','corpIndustry','creationDate'];

export const mapperFlow = ['flowId','amount', 'remark', 'flowType','rateAmount', 'creationDate','flowTypeLabel','sub'];
