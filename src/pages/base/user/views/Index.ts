/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-22 01:39:26
 * @LastEditTime: 2021-02-24 00:08:10
 * @LastEditors: 侯兴章
 * @Description: 字典列表
 */

import { defineComponent, onMounted, reactive, ref } from 'vue';
import { ApiUser } from '../server/api';
import CompSearchForm, { IFormItems, EcomponentType } from '@/components/public/compSearchForm';
import CompTable, { Icolumns, ItableProps } from '@/components/public/compTable';
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
        label: '用户名称',
        model: 'varUserName',
        rules: [{
          required: false,
          message: '请输名称'
        }]
      },
      {
        label: '手机号码',
        model: 'varPhoneNumber',
        rules: [{
          required: false,
          message: '请输入手机号码'
        }]
      }
    ]

    // 表格列表的配置
    const columns: Array<Icolumns> = [{
      title: 'ID',
      dataIndex: 'userId',
      key: 'userId'
    }, {
      title: '用户名称',
      dataIndex: 'userName',

    }, {
      title: '真实姓名',
      dataIndex: 'userFullName',
      ellipsis: true,
    }, {
      title: '手机号码',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',

    }, {
      title: '所属组织',
      dataIndex: 'orgName',
      key: 'orgName',

    }, {
      title: '是否为管理员',
      dataIndex: 'isAdmin',
      key: 'isAdmin',

    }, {
      title: '账号类型',
      dataIndex: 'userTypeLabel',
      key: 'userTypeLabel',

    }, {
      title: '状态',
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
    const dataTableConfig: ItableProps = {
      api: ApiUser.getUserList,
      columns,
      rowKey: 'userId',
      // mapper: mapperDictType // 清洗数据的映射配置      ### 可选项
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
