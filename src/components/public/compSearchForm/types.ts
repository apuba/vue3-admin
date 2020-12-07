/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-22 17:22:07
 * @LastEditTime: 2020-11-23 23:53:13
 * @LastEditors: 侯兴章
 * @Description: 
 */

export interface IFormItems {
    label: string; // 表单显示的文本
    model: string; // 数据绑定的对象
    value?: string; // 绑定的字段值
    placeholder?: string; // 提示文本
    type?: EcomponentType;  // 控件类型
    rules?: Array<any>; // 校验规则
}

export enum EcomponentType {
    Input='Input',
    Password='Password',
    Number='Number',
    Select='Select',
    Checkbox='Checkbox',
    Radio='Radio'
}

 