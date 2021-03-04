/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-17 00:46:00
 * @LastEditTime: 2020-11-29 23:40:49
 * @LastEditors: 侯兴章
 * @Description:
 */

 //用于查询
export interface IDTOReport {
  corpName?: String;
  corpFullName?: String;
  balance?: String;
  countActivity?: string;
  countMember?: string;
  useAmt?: string;
}

export const mapperReport = ['corpName','corpFullName', 'balance', 'countActivity','countMember', 'useAmt'];
