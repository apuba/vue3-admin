/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-17 00:46:00
 * @LastEditTime: 2020-11-29 23:40:49
 * @LastEditors: 侯兴章
 * @Description:
 */

 //用于查询
export interface IDTOdict {
  roleId?: number;
  roleName?: string;
  roleCode?: string;
  orgName?: string;
  creationDate?: string;
}

//
export interface IModelDictType{
  roleId?: number;
  roleName?: string;
  roleCode?: string;
  orgName?: string;
  creationDate?: string;
}

export const mapperDict = ['roleId','roleName', 'roleCode', 'orgName','creationDate'];

export const mapperDictType = ['roleId','roleName', 'roleCode', 'orgName','creationDate'];
