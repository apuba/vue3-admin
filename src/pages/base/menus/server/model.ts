/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-12-13 13:30:11
 * @LastEditTime: 2021-03-28 15:05:55
 * @LastEditors: 侯兴章
 * @Description: 
 */

// 查询菜单参数
export interface IRequestMenuModel {
    menuId?: string | number;
    menuParentId?: string | number;
    menuCode?: string; // 菜单编码
    menuName?: string; // 菜单名
}

// 返回的菜单
export interface IMenuModel extends IRequestMenuModel {
    orderCode?: number; // 排序 
    icon?: string; // 图标或图片地址
    color?: string; // 菜单字体颜色
    htmlUrl: string; // 路由地址
    fromType?: string; // 菜单类型
    enabled?: string;
    isShow?: string;
    menuParentName?: string; // 上级菜单名
    menyType?: number;
    startDateActive?: string;
    endDateActive?: string;
    buttonArr?: Array<IButtonProps>
}


// 树的基础结构
export interface ITreeNodes {
    key: string | number;
    title: string;
    children: Array<ITreeNodes>;
    disabled?: boolean;
    selectabled?: Array<string | number>
}

export interface IButtonProps {
    resourceName: string; // 按钮名
    resourceCode: string; // 按钮权限编码
    resIcon?: string; // 按钮图标
    buttonUrl?: string; // 权限API地址
    orderNo?: number; // 排序
    resourceType: string; // 按钮类型
}

class ButtonProps {
    resourceName: string = ''; // 按钮名
    resourceCode: string = ''; // 按钮权限编码
    resIcon?: string; // 按钮图标
    buttonUrl?: string; // 权限API地址
    orderNo?: number; // 排序
    resourceType: string = ''; // 按钮类型

    constructor() {

    }
}