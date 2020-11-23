/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-14 16:14:42
 * @LastEditTime: 2020-11-17 02:41:12
 * @LastEditors: 侯兴章
 * @Description:  映身表配置 key为系统内部模型名，value为实现api返回的字段名
 */
import type { Menu } from '@/router/types.d';
import { UserInfoModel } from '@/service/appModel';


// 菜单模型映射 Key为当前应用使用的字段 value对应为后端返回的字段
export const modelMenu: Menu = {
    name: 'menuName',
    icon: 'icon',
    id: 'menuId',
    path: 'htmlUrl'
}

// 登陆信息
export const mapUserInfo: UserInfoModel = {
    id: 'id',
    name: 'userName',
    photo: 'img',
    token: 'token',
    jobName: 'jobName'
}