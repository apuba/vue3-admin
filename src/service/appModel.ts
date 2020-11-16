/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-17 00:46:00
 * @LastEditTime: 2020-11-17 02:26:33
 * @LastEditors: 侯兴章
 * @Description: 
 */


/* 用户登录对象 */
export interface DTOlogin {
    userName: string;
    password: string;
    authCode?: string | number;
}

// 用户信息模型
export interface UserInfoModel {
    id: string | number;
    name: string;
    photo: string;
    roles?: Array<string | number>;
    email?: string;
    token: string;
    jobName?: string;
}


