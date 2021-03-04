/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-22 01:39:26
 * @LastEditTime: 2020-11-25 00:18:25
 * @LastEditors: 侯兴章
 * @Description: 字典列表
 */

import {defineComponent, onMounted, provide, reactive, ref, unref} from 'vue';
import { ApiEnterInfo } from '../server/api';
import CompSearchForm, { IFormItems, EcomponentType } from '@/components/public/compSearchForm';
import CompTable, { Icolumns, ItableProps } from '@/components/public/compTable';
import { mapperEnterInfo,mapperFlow } from '../server/model';

export default defineComponent({
    name: 'enterIndex',
    components: {
        CompSearchForm,
        CompTable
    },
    setup() {
        const compAddVisible = ref(false);
        // 查询表单参数配置
        const formItems: IFormItems[] = [
            {
                label: '企业名称',
                model: 'corpName',
                rules: [{
                    required: false,
                    message: '请输名称'
                }]
            }
        ]

        // 表格列表的配置
        const columns: Array<Icolumns> = [{
            title: 'ID',
            dataIndex: 'qyEnterId',
            key: 'qyEnterId'
        }, {
          title: '企业名称',
          dataIndex: 'corpName',
          key: 'corpName',

        }, {
          title: '企业全称',
          dataIndex: 'corpFullName',
          key: 'corpFullName',

        }, {
            title: '企业状态',
            dataIndex: 'statusLabel',
            key: 'statusLabel',
        }, {
          title: '管理员',
          dataIndex: 'authName',
          key: 'authName',

        }, {
          title: '企业地址',
          dataIndex: 'location',
          key: 'location',

        },{
          title: '企业规模',
          dataIndex: 'corpScale',
          key: 'corpScale',

        },{
          title: '行业',
          dataIndex: 'corpIndustry',
          key: 'corpIndustry',

        },{
          title: '创建时间',
          dataIndex: 'creationDate',
          key: 'creationDate',
        }]

        // 表格的配置项
        const dataTableConfig: ItableProps = {
            api: ApiEnterInfo.findEnter,
            columns,
            rowKey: 'qyEnterId',
            mapper: mapperEnterInfo // 清洗数据的映射配置
        }

        // 表格列表的配置
        const flowColumns: Array<Icolumns> = [{
          title: 'ID',
          dataIndex: 'flowId',
          key: 'flowId'
        },{
          title: '类型',
          dataIndex: 'flowTypeLabel',
          key: 'flowTypeLabel'
        },{
          title: '金额',
          dataIndex: 'amount',
          key: 'amount'
        },{
          title: '抽佣',
          dataIndex: 'rateAmount',
          key: 'rateAmount'
        },{
          title: '备注',
          dataIndex: 'remark',
          key: 'remark'
        },{
          title: '活动',
          dataIndex: 'sub',
          key: 'sub'
        },{
          title: '时间',
          dataIndex: 'creationDate',
          key: 'creationDate'
        }]

        //流水记录弹框配置项
        const flowTableConfig: ItableProps = {
          api: ApiEnterInfo.findEnterReport,
          columns: flowColumns,
          rowKey: 'flowId',
          mapper: mapperFlow // 清洗数据的映射配置
        }

        // 定义表格的 ref, 请注意给表格添加 ref="reftable" 属性， getData是由表格提供查询数据的方法
        const refTable = ref({ getData: Function });
        // 过滤表单的查询事件
        const searchFormClick = (params: any): void => {
            refTable.value.getData(params); // 由于是ref对象，所以要使用refTable.value.getData进行调用

        };

      const modalDataTableConfig: ItableProps = reactive(flowTableConfig)
      // 已选择弹窗返回的数据
      let modalRowKeys = ref([]);
      const showModal = ref(false); // 显示模型弹窗
      // 打开选择弹窗
      const openModalHandler = (row: any) => {
        showModal.value = true;
        console.log(dataTableConfig);
        if(row.record) {
          console.log(row);
          modalDataTableConfig.requestParams = {
            dictName:row.record.dictName
          }; // 传递查询参数
        }


        console.log(unref(modalRowKeys)); // 打印获双向绑定后的已选择弹窗的参数
      }
      return { refTable, searchFormClick, formItems, dataTableConfig, columns,compAddVisible,openModalHandler,showModal,flowTableConfig };
    }
});
