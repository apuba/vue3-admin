/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-22 01:39:26
 * @LastEditTime: 2020-11-25 00:18:25
 * @LastEditors: 侯兴章
 * @Description: 字典列表
 */

import { defineComponent, onMounted, reactive, ref } from 'vue';
import { ApiEnterprise } from '../server/api';
import CompSearchForm, { IFormItems, EcomponentType } from '@/components/public/compSearchForm';
import CompTable, { Icolumns, ItableConfig } from '@/components/public/compTable';
import { mapperDictType } from '../server/model';
export default defineComponent({
    name: 'enterIndex',
    components: {
        CompSearchForm,
        CompTable
    },
    setup() {

        // 查询表单参数配置
        const formItems: IFormItems[] = [
            {
                label: '企业名称',
                model: 'enterName',
                rules: [{
                    required: false,
                    message: '请输名称'
                }]
            },
            {
                label: '手机号码',
                model: 'telPhone',
                rules: [{
                    required: false,
                    message: '请输入手机号码'
                }]
            }
        ]

        // 表格列表的配置
        const columns: Array<Icolumns> = [{
            title: 'ID',
            dataIndex: 'enterId',
            key: 'enterId'
        }, {
          title: '企业名称',
          dataIndex: 'enterName',
          key: 'enterName',

        }, {
            title: '企业编码',
            dataIndex: 'enterCode',
            key: 'enterCode',
            ellipsis: true,
        }, {
          title: '入驻时间',
          dataIndex: 'entryTime',
          key: 'entryTime',

        }, {
          title: '法人',
          dataIndex: 'legalPerson',
          key: 'legalPerson',

        }, {
          title: '手机号码',
          dataIndex: 'telPhone',
          key: 'telPhone',

        }, {
          title: '固话',
          dataIndex: 'mobilePhone',
          key: 'mobilePhone',

        }, {
          title: '地址',
          dataIndex: 'address',
          key: 'address',

        }, {
          title: '企业状态',
          dataIndex: 'statusLabel',
          key: 'statusLabel',

        }, {
          title: '创建人',
          dataIndex: 'createName',
          key: 'createName',

        }, {
          title: '创建时间',
          dataIndex: 'creationDate',
          key: 'creationDate',

        }]

        // 表格的配置项
        const dataTableConfig: ItableConfig = {
            api: ApiEnterprise.getEnterList,
            columns,
            rowKey: 'enterId',
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
