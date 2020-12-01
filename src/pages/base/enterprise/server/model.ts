/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-17 00:46:00
 * @LastEditTime: 2020-11-29 23:40:49
 * @LastEditors: 侯兴章
 * @Description:
 */

 //用于查询
export interface IDTOdict {
  createName?: string;
  enterName?: string;
  enterCode?: string;
  legalPerson?: string;
  telPhone?: string;
  address?: string;
  email?: string;
  creationDate?: string;
  statusLabel?: string;
}

//
export interface IModelDictType{
  createName?: string;
  enterName?: string;
  enterCode?: string;
  legalPerson?: string;
  telPhone?: string;
  address?: string;
  email?: string;
  creationDate?: string;
  statusLabel?: string;
}

export const mapperDict = ['enterId','enterName', 'enterCode', 'entryTime', 'legalPerson','telPhone','mobilePhone','address','statusLabel','createName','creationDate'];

export const mapperDictType = ['enterId','enterName', 'enterCode', 'entryTime', 'legalPerson','telPhone','mobilePhone','address','statusLabel','createName','creationDate'];
