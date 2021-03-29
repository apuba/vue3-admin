/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-12-13 13:26:48
 * @LastEditTime: 2021-03-28 15:40:41
 * @LastEditors: 侯兴章
 * @Description: 
 */

export enum EapiMenus {
    getMenuList = 'systemServer/sysMenuController/findMenu',
    delMenu = 'systemServer/sysMenuController/deleteSysMenu',
    saveMenu = 'systemServer/sysMenuController/saveSysMenu',
    getMenuButton = 'systemServer/sysMenuController/findButton', // 查询查单下的按钮
}