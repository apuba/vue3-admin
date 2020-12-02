/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-22 01:39:26
 * @LastEditTime: 2020-12-03 01:58:11
 * @LastEditors: 侯兴章
 * @Description: 字典列表
 */

import { defineComponent, onMounted, provide, reactive, ref, toRefs, unref } from 'vue';
import { ApiDict } from '../server/api';
import CompSearchForm, { IFormItems, EcomponentType } from '@/components/public/compSearchForm';
import CompTable, { Icolumns, ItableProps } from '@/components/public/compTable';
import { mapperDictType } from '../server/model';

import CompAdd from './Add.vue'; // 导入ADD新增页面组件
export default defineComponent({
    name: 'dictIndex',
    components: {
        CompSearchForm,
        CompTable,
        CompAdd
    },
    provide: {
        user: 'John Doe'
    },
    setup() {

        let formParams = ref({});
        const compAddVisible = ref(false);
        provide('addVisible', compAddVisible); // 向组件传递 参数
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
            key: 'dictName',
            ellipsis: true,
        }, {
            title: '字典类型',
            dataIndex: 'dictType',
            key: 'dictType',

        }]

        // 表格的配置项
        const dataTableConfig: ItableProps = {
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

        const tableClick = (): void => {
            compAddVisible.value = true;
            // provide('addVisible', true); // 向组件传递 参数
            console.log('formParams', unref(formParams));  // 拿到searchForm的数据  ， 使用unref 转化为对象
        }


        onMounted(() => {
            // 页面加载完成
        });
        return {

            refTable,
            searchFormClick,
            formItems,
            dataTableConfig,
            columns,
            formParams,
            tableClick,

        };
    }
});