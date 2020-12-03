/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-12-03 21:59:06
 * @LastEditTime: 2020-12-03 22:17:41
 * @LastEditors: 侯兴章
 * @Description: 注册全局组件
 */
import type { App } from 'vue';
import CompPopup from './compPopup'; // 全局注册弹窗组件
import CompSearchForm from './compSearchForm'; // 表格查询表单
import CompTable from './compTable'; // 表格组件 


export const setupComp = (app: App<Element>) => {
    app.component('CompPopup', CompPopup);
    app.component('CompSearchForm', CompSearchForm);
    app.component('CompTable', CompTable);
}

