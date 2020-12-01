/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-22 01:39:26
 * @LastEditTime: 2020-11-25 00:18:25
 * @LastEditors: 侯兴章
 * @Description: 字典列表
 */

import { defineComponent, onMounted, reactive, ref } from 'vue';
import { ApiRole } from '../server/api';
import CompSearchForm, { IFormItems, EcomponentType } from '@/components/public/compSearchForm';
import CompTable, { Icolumns, ItableConfig } from '@/components/public/compTable';
import { mapperDictType } from '../server/model';
export default defineComponent({
    name: 'roleIndex',
    components: {
        CompSearchForm,
        CompTable
    },
    setup() {

        // 查询表单参数配置
        const formItems: IFormItems[] = [
            {
                label: '角色名称',
                model: 'roleName',
                rules: [{
                    required: false,
                    message: '请输名称'
                }]
            },
            {
                label: '组织名称',
                model: 'orgName',
                rules: [{
                    required: false,
                    message: '请输入组织名称'
                }]
            }
        ]

        // 表格列表的配置
        const columns: Array<Icolumns> = [{
            title: 'ID',
            dataIndex: 'roleId',
            key: 'roleId'
        }, {
          title: '角色名称',
          dataIndex: 'roleName',
          key: 'roleName',

        }, {
            title: '企业编码',
            dataIndex: 'roleCode',
            key: 'roleCode',
            ellipsis: true,
        }, {
          title: '组织名称',
          dataIndex: 'orgName',
          key: 'orgName',

        },{
          title: '创建时间',
          dataIndex: 'creationDate',
          key: 'creationDate',

        }]

        // 表格的配置项
        const dataTableConfig: ItableConfig = {
            api: ApiRole.getRoleList,
            columns,
            rowKey: 'roleId',
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
