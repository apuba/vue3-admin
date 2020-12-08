<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-12-08 21:30:58
 * @LastEditTime: 2020-12-08 22:49:52
 * @LastEditors: 侯兴章
 * @Description:
-->

<template>
  <div class="panel mb10">
    <h4>数据表格控件</h4>
    <CompTable ref="refTable" :config="dataTableConfig" v-model:selectedRowKeys="selectedRowKeys">
      <template v-slot:buttons>
        <a-button type="primary" size="small" @click="addDictHandler">添加</a-button>
      </template>
    </CompTable>
  </div>
</template>

<script lang="ts">
import { IFormItems } from '@/components/public/compSearchForm';
import { Icolumns, ItableProps } from '@/components/public/compTable';
import { EselectionType } from '@/components/public/compTable/types';

import { ApiDict } from '@/pages/base/dict/server/api';
import { mapperDictType } from '@/pages/base/dict/server/model';
import { defineComponent, onMounted, provide, ref, unref } from 'vue';
import { Modal } from 'ant-design-vue';

export default defineComponent({
  name: 'DemoCompTable',
  setup() {
    const formParams = ref({}); // 查询表单对象，数据双向绑定
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
    ];

    // 表格列表的配置
    const columns: Array<Icolumns> = [{
      title: 'ID',
      dataIndex: 'dictId',
      key: 'dictId'
    }, {
      title: '字典类型',
      dataIndex: 'dictType',
      key: 'dictType'

    }, {
      title: '字典类型名称',
      dataIndex: 'dictName',
      key: 'dictName',
      ellipsis: true
    }, {
      title: '字典状态',
      dataIndex: 'dictLabelStatus',
      key: 'dictLabelStatus'

    }];

    // 表格的配置项
    const dataTableConfig: ItableProps = {
      api: ApiDict.getDictTypeList,
      columns,
      rowKey: 'dictId',
      rowSelection: {
        type: EselectionType.checkbox
      },
      mapper: mapperDictType // 清洗数据的映射配置
    };

    // 定义表格的 ref, 请注意给表格添加 ref="reftable" 属性， getData是由表格提供查询数据的方法
    const refTable = ref({ getData: Function });
    // 过滤表单的查询事件
    const searchFormClick = (params: any): void => {
      unref(refTable).getData(params); //
    };

    const selectedRowKeys = ref(['']); // 当前表格选择的Kyes 数据双向绑定

    const addDictHandler = () => {
      Modal.info({
        title: 'This is a notification message',
        content: '随便点什么吧。',
        onOk() { }
      });
    };
    onMounted(() => {
      console.log('DcomTable');
    });
    return { formParams, searchFormClick, dataTableConfig, selectedRowKeys, addDictHandler };
  }
});
</script>

<style scoped>
</style>
