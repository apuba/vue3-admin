/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-22 01:39:26
 * @LastEditTime: 2020-11-25 00:18:25
 * @LastEditors: 侯兴章
 * @Description: 字典列表
 */

import {defineComponent, onMounted, provide, reactive, ref, unref} from 'vue';
import { ApiOrder } from '../server/api';
import CompSearchForm, { IFormItems, EcomponentType } from '@/components/public/compSearchForm';
import CompTable, { Icolumns, ItableProps } from '@/components/public/compTable';
import { mapperOrder } from '../server/model';

export default defineComponent({
    name: 'roleIndex',
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
            },
          {
            label: '订单编码',
            model: 'orderCode',
            rules: [{
              required: false,
              message: '订单编码'
            }]
          }
        ]

        // 表格列表的配置
        const columns: Array<Icolumns> = [{
            title: 'ID',
            dataIndex: 'orderId',
            key: 'orderId'
        }, {
          title: '订单编码',
          dataIndex: 'orderCode',
          key: 'orderCode',

        }, {
          title: '企业名称',
          dataIndex: 'corpName',
          key: 'corpName',

        }, {
            title: '应付金额',
            dataIndex: 'actualAmt',
            key: 'actualAmt',
        }, {
          title: '实付金额',
          dataIndex: 'receivableAmt',
          key: 'receivableAmt',

        }, {
          title: '会员名称',
          dataIndex: 'name',
          key: 'name',

        },{
          title: '订单类型',
          dataIndex: 'typeLabel',
          key: 'typeLabel',

        },{
          title: '支付状态',
          dataIndex: 'statusLabel',
          key: 'statusLabel',

        },{
          title: '创建时间',
          dataIndex: 'creationDate',
          key: 'creationDate',
        }]

        // 表格的配置项
        const dataTableConfig: ItableProps = {
            api: ApiOrder.findOrder,
            columns,
            rowKey: 'qyEnterId',
            mapper: mapperOrder // 清洗数据的映射配置
        }

        // 定义表格的 ref, 请注意给表格添加 ref="reftable" 属性， getData是由表格提供查询数据的方法
        const refTable = ref({ getData: Function });
        // 过滤表单的查询事件
        const searchFormClick = (params: any): void => {
            refTable.value.getData(params); // 由于是ref对象，所以要使用refTable.value.getData进行调用

        };
      return { refTable, searchFormClick, formItems, dataTableConfig, columns,compAddVisible };
    }
});
