/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-22 17:22:07
 * @LastEditTime: 2020-12-09 01:10:27
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
    dictType?: string; // 当控件为字典控件时的字典类型
    defaultValue?: any; // 控件的默认值 
}

export enum EcomponentType {
    Input='Input',
    Password='Password',
    Number='Number',
    Select='select',
    Checkbox='checkbox',
    Radio='radio'
}

 