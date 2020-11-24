/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-22 01:39:26
 * @LastEditTime: 2020-11-25 00:18:25
 * @LastEditors: 侯兴章
 * @Description: 字典列表
 */

import { defineComponent, onMounted, reactive, ref } from 'vue';
import { ApiDict } from '../server/api';
import CompSearchForm, { IFormItems, EcomponentType } from '@/components/public/compSearchForm';
import CompTable, { Icolumns, ItableConfig } from '@/components/public/compTable';
import { mapperDictType } from '../server/model';
export default defineComponent({
    name: 'dictIndex',
    components: {
        CompSearchForm,
        CompTable
    },
    setup() {

        // 查询表单参数配置
        const formItems: IFormItems[] = [
            {
                label: '字典名称',
                model: 'dictName',
                rules: [{
                    required: true,
                    message: '请输名称'
                }]
            },
            {
                label: '字典类型',
                model: 'dictType',
                rules: [{
                    required: true,
                    message: '请输字典类型'
                }]
            }
        ]

        // 表格列表的配置
        const columns: Array<Icolumns> = [{
            title: 'ID',
            dataIndex: 'dictId',
            key: 'dictId'
        }, {
            title: '字典类型名称',
            dataIndex: 'dictName',
            key: 'dictName'
        }, {
            title: '字典类型',
            dataIndex: 'dictType',
            key: 'dictType',
            ellipsis: true,
        }]

        // 表格的配置项
        const dataTableConfig: ItableConfig = {
            api: ApiDict.getDictTypeList,
            columns,
            rowKey: 'dictId',
            mapper: mapperDictType // 清洗数据的映射配置
        }

        // 定义表格的 ref, 请注意给表格添加 ref="reftable" 属性， getData是由表格提供查询数据的方法
        const refTable = ref({ getData: Function });
        // 过滤表单的查询事件
        const searchFormClick = (params: any): void => {
            refTable.value.getData(params); // 由于是ref对象，所以要使用refTable.value.getData进行调用

        };
        onMounted(() => {
            // 页面加载完成
        });
        return { refTable, searchFormClick, formItems, dataTableConfig, columns };
    }
});