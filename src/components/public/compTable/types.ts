/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-24 00:52:57
 * @LastEditTime: 2020-11-29 22:26:20
 * @LastEditors: 侯兴章
 * @Description: 
 */

// 数据表格列配置
export interface Icolumns {
    title: string; //列头显示文字
    dataIndex: string; // 列数据在数据项中对应的 key，支持 a.b.c 的嵌套写法
    width?: string | number; // 列宽度
    key?: string; //Vue 需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性
    ellipsis?: boolean; // 文本过长显示 省略号
    slots?: any; // 超过宽度将自动省略，暂不支持和排序筛选一起使用。设置为 true 时，表格布局将变成 tableLayout="fixed"
}

export interface ItableConfig {
    api: string; // 后台接口的地址
    columns: Array<Icolumns>; // 表格列表的配置
    rowKey?: string; // 绑定的主键,
    dataSource?: Array<any>; // 外部传数据
    autoLoading?: boolean; // 是否自动加载数据？组件加载完毕即请求数据 
    requestParams?: Object; // 请求参数
    mapper?: Array<any> | Object; // 映身文件
    size?: string; // 表格大小
    // isDataLoaded: boolean; // 数据请求是否完成？
    rowSelection: IrowSelection
}

export interface Ipagination {
    pageSize: number; // 分页大小
    current: number; // 当前页面
    total: number; // 总记录

}

// 表格可选择类型
enum selectionType {
    checkbox,
    radio
}

// 行选择配置
export interface IrowSelection {
    onChange: Function;
    onSelect: Function;
    onSelectAll: Function;
    type: selectionType;
    columnWidth: string | number;
    columnTitle: string | number;

}