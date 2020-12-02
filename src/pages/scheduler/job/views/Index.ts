/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-22 01:39:26
 * @LastEditTime: 2020-11-25 00:18:25
 * @LastEditors: 侯兴章
 * @Description: 字典列表
 */

import { defineComponent, onMounted, reactive, ref } from 'vue';
import { ApiJob } from '../server/api';
import CompSearchForm, { IFormItems, EcomponentType } from '@/components/public/compSearchForm';
import CompTable, { Icolumns, ItableProps } from '@/components/public/compTable';
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
                label: '实例名称',
                model: 'jobName',
                rules: [{
                    required: false,
                    message: '请输名称'
                }]
            }
        ]

        // 表格列表的配置
        const columns: Array<Icolumns> = [{
            title: 'ID',
            dataIndex: 'jobId',
            key: 'jobId'
        }, {
          title: '实例名称',
          dataIndex: 'jobName',
          key: 'jobName',

        }, {
          title: '请求地址',
          dataIndex: 'requestUrl',
          key: 'requestUrl',

        }, {
            title: '请求类型',
            dataIndex: 'requestType',
            key: 'requestType',
            ellipsis: true,
        }, {
          title: '任务类型',
          dataIndex: 'jobType',
          key: 'jobType',

        }, {
          title: '是否为单例',
          dataIndex: 'singleInstance',
          key: 'singleInstance',

        },{
          title: '创建人',
          dataIndex: 'createName',
          key: 'createName',

        },{
          title: '创建时间',
          dataIndex: 'creationDate',
          key: 'creationDate',

        }]

        // 表格的配置项
        const dataTableConfig: ItableProps = {
            api: ApiJob.getJobList,
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
