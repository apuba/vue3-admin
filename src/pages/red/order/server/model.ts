/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-17 00:46:00
 * @LastEditTime: 2020-11-29 23:40:49
 * @LastEditors: 侯兴章
 * @Description:
 */

 //用于查询
export interface IDTOOrder {
  orderId?: number | String;
  enterId?: number;
  memberId?: number;
  orderCode?: string;
  payStatus?: string;
  receivableAmt?: string;
  actualAmt?: string;
  creationDate?: string;
  activityId?: string;
  name?: string;
  typeLabel?: string;
  statusLabel?: string;
  corpName?: string;
}

export const mapperOrder = ['orderId','enterId', 'memberId', 'orderCode','payStatus', 'receivableAmt','actualAmt','creationDate','activityId',
  'name','typeLabel','statusLabel','corpName'];
