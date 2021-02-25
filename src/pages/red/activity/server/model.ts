/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-17 00:46:00
 * @LastEditTime: 2020-11-29 23:40:49
 * @LastEditors: 侯兴章
 * @Description:
 */

 //用于查询
export interface IDTOActivity {
  activityId?: number | String;
  enterId?: number;
  sub?: string;
  subtitle?: string;
  totalAmount?: string;
  activityStatus?: string;
  welcomeMsg?: string;
  newAmountLow?: string;
  newAmountHigh?: string;
  invitationAmountLow?: string;
  invitationAmountHigh?: string;
  invitationNumber?: string;
  activityExplain?: string;
  externalData?: string;
  activityEffectiveFlag?: string;
  newFlag?: string;
  initRedCount?: string;
  initMemberCount?: string;
  clickNumber?: string;
  surplusAmount?: string;
  statusLabel?: string;
  corpName?: string;
  creationDate?: string;
}

export const mapperActivity = ['activityId','enterId', 'sub', 'subtitle','totalAmount', 'activityStatus','welcomeMsg','newAmountLow'
  ,'newAmountHigh', 'invitationAmountLow', 'invitationAmountHigh','invitationNumber', 'activityExplain','externalData','activityEffectiveFlag'
  ,'newFlag', 'initRedCount', 'initMemberCount','clickNumber', 'surplusAmount','statusLabel','corpName','creationDate'];
