/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-17 00:46:00
 * @LastEditTime: 2020-11-29 23:40:49
 * @LastEditors: 侯兴章
 * @Description:
 */

 //用于查询
export interface IDTOMember {
  memberId?: number | String;
  name?: number;
  gender?: string;
  corpName?: string;
  genderLabel?: string;
  inviteesName?: string;
  undertaker?: string;
  creationDate?: string;
}

export const mapperMember = ['memberId','name', 'gender', 'corpName','genderLabel', 'undertaker','creationDate','inviteesName'];
