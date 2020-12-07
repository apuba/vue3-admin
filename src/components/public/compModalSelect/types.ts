/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-12-04 23:49:18
 * @LastEditTime: 2020-12-05 00:10:29
 * @LastEditors: 侯兴章
 * @Description: 
 */

// 绑定的键值对,主键  {key:'表的主键,返回到ngVal',name:'显示的文本,返回到ngText'}
export interface ItableKey {
    key: String;  // 表的主键 返回到 returnValue
    name: String; // 返回的 到 returnName
}

// 请求基础配置
export interface IQuery {
    url: String; //  后端api接口地址
    params: String; // 请求参数
    method?: String; // 请求方式,post? get
    headers?: Object; // 
}
/* 
// 显示列绑定值   [{field:'列绑定的数据字段名',text:'列绑定显示的文本',type:'单元格显示类型(txt,date)',isFilterCondition:'boolean 是否为查询条件'}]
export interface IColumns {
    field: String; // 列绑定的数据字段名
    text: String; // 列绑定显示的文本
    type?: EcolType; // 单元格显示类型(txt,date)
    isFilterCondition?: Boolean; //是否为查询条件
} */

// 单元格类型
export enum EcolType {
    text,
    date,
    select,
    checkBox,
    radio,
    switch,
    photo
}