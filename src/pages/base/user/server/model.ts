/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-17 00:46:00
 * @LastEditTime: 2020-11-29 23:40:49
 * @LastEditors: 侯兴章
 * @Description:
 */

 // 字典-用于查询
export interface IDTOdict {
  userName?: string;
  phoneNumber?: string;
}


// 字典类型-
export interface IModelDictType{
  userName: string;
  phoneNumber?: number | string;
  userTypeLabel: string;
  userFullName: string;
  startDate: string;
  orgName: string;
  statusLabel: string;
}

export const mapperDict = ['userId','userName', 'phoneNumber', 'userTypeLabel', 'userFullName','startDate','orgName','statusLabel','isAdmin','createName','creationDate', { status: 'createdBy' }];

export const mapperDictType = ['userId','phoneNumber', 'userTypeLabel', 'userFullName','startDate','orgName','statusLabel','isAdmin','createName','creationDate'];
