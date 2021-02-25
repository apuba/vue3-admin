/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-22 01:39:26
 * @LastEditTime: 2020-11-25 00:18:25
 * @LastEditors: 侯兴章
 * @Description: 字典列表
 */

import {defineComponent, onMounted, provide, reactive, ref, unref} from 'vue';
import { ApiMember } from '../server/api';
import CompSearchForm, { IFormItems, EcomponentType } from '@/components/public/compSearchForm';
import CompTable, { Icolumns, ItableProps } from '@/components/public/compTable';
import { mapperMember } from '../server/model';

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
            label: '会员昵称',
            model: 'name',
            rules: [{
              required: false,
              message: '会员昵称'
            }]
          }
        ]

        // 表格列表的配置
        const columns: Array<Icolumns> = [{
            title: 'ID',
            dataIndex: 'memberId',
            key: 'memberId'
        }, {
          title: '昵称',
          dataIndex: 'name',
          key: 'name',

        }, {
          title: '邀请人',
          dataIndex: 'inviteesName',
          key: 'inviteesName',

        }, {
            title: '性别',
            dataIndex: 'genderLabel',
            key: 'genderLabel',
        },{
          title: '企业名称',
          dataIndex: 'corpName',
          key: 'corpName',
        }, {
          title: '创建时间',
          dataIndex: 'creationDate',
          key: 'creationDate',
        }]

        // 表格的配置项
        const dataTableConfig: ItableProps = {
            api: ApiMember.findMember,
            columns,
            rowKey: 'memberId',
            mapper: mapperMember // 清洗数据的映射配置
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
