/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-22 01:39:26
 * @LastEditTime: 2020-11-25 00:18:25
 * @LastEditors: 侯兴章
 * @Description: 字典列表
 */

import {defineComponent, onMounted, provide, reactive, ref, unref} from 'vue';
import { ApiScheduler } from '../server/api';
import CompSearchForm, { IFormItems, EcomponentType } from '@/components/public/compSearchForm';
import CompTable, { Icolumns, ItableProps } from '@/components/public/compTable';
import { mapperDictType } from '../server/model';

import CompAdd from './Add.vue';
import {TabItem} from "@/store/modules/appTypes";
import {appStore} from "@/store/modules/appStore"; // 导入ADD新增页面组件
export default defineComponent({
    name: 'roleIndex',
    components: {
        CompSearchForm,
        CompTable,
        CompAdd
    },
    setup() {

        const compAddVisible = ref(false);
        provide('addVisible', compAddVisible); // 向组件传递 参数
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


      // 新增调度任务实例
      const addHandler = (row: any) => {
        const menu: TabItem = {
          id: 'dictId',
          path: '/scheduler/schedules/Add',
          name: '22'
        }
        appStore.commitAddTab(menu); // 打开tab
      }

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
            dataIndex: 'jobTypeLabel',
            key: 'jobTypeLabel',
            ellipsis: true,
        }, {
          title: '任务类型',
          dataIndex: 'requestType',
          key: 'requestType',

        }, {
          title: '是否为单例',
          dataIndex: 'singleInstanceLabel',
          key: 'singleInstanceLabel',

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
            api: ApiScheduler.getJobList,
            columns,
            rowKey: 'jobId',
            mapper: mapperDictType // 清洗数据的映射配置
        }

        // 定义表格的 ref, 请注意给表格添加 ref="reftable" 属性， getData是由表格提供查询数据的方法
        const refTable = ref({ getData: Function });
        // 过滤表单的查询事件
        const searchFormClick = (params: any): void => {
            refTable.value.getData(params); // 由于是ref对象，所以要使用refTable.value.getData进行调用

        };

        // 添加字典弹框
        const add = (): void => {
          compAddVisible.value = true;
          console.log('selectedRowKeys', unref(selectedRowKeys));
        }

        onMounted(() => {
            // 页面加载完成
        });


      let selectedRowKeys = ref(['']);




        return { add,refTable, searchFormClick, formItems, dataTableConfig, columns,compAddVisible,addHandler };
    }
});
