/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-12-13 13:30:11
 * @LastEditTime: 2020-12-13 15:25:16
 * @LastEditors: 侯兴章
 * @Description: 
 */

// 查询菜单参数
export interface IRequestMenuModel {
    menuId?: string | number,
    menuParentId?: string | number,
    menuCode?: string, // 菜单编码
    menuName?: string, // 菜单名
}

// 返回的菜单
export interface IMenuModel extends IRequestMenuModel {
    orderCode: number, // 排序 
    imageLink?: string, // 图标或图片地址
    color?: string, // 菜单字体颜色
    htmlUrl: string, // 路由地址
    fromType?: string // 菜单类型   
}


// 树的基础结构
export interface ITreeNodes {
    key: string | number,
    title: string,
    children: Array<ITreeNodes>,
    disabled?: boolean,
    selectabled?: Array<string | number>
}
 