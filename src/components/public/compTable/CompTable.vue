<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-24 20:26:11
 * @LastEditTime: 2021-02-25 23:46:52
 * @LastEditors: 侯兴章
 * @Description:
-->
<template>
  <div>
    <div class="tableBar p5" v-if="showButtons">
      <a-button-group>
        <slot name="buttons"></slot>
        <!-- <a-button type="primary" size="small">导出</a-button> -->
      </a-button-group>
    </div>
    <a-table
      @change="changePagination"
      :pagination="state.pagination"
      :columns="config.columns"
      :data-source="state.data"
      :row-key="config.rowKey"
      :size="state.size"
      :loading="!state.isDataLoaded"
      :row-selection="rowSelection"
    >
      <template #operation="{text, record, index}">
        <slot name="operation" :record="record" :text="text" :index="index"></slot>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, reactive, toRefs, unref, watch } from 'vue';
import { ItableProps, Ipagination, ItoolBar, IrowSelection, EselectionType } from './types';
import http from '@/common/http/index.ts';
import { BaseRequestModel } from '@/service/baseModel';

export default defineComponent({
  name: 'CompTable',
  emits: ['update:selectedRowKeys', 'update:selectedRowNames'],
  props: {
    selectedRowKeys: { // 已选择的行的主键
      type: Array
    },
    config: {
      type: Object as PropType<ItableProps>, // 表格的配置
      required: true
    },
    showButtons: { // 是否显示功能按钮
      type: Boolean,
      default: true
    },
    toolBar: { // 是否显示常规功能按钮栏
      type: Object as PropType<ItoolBar>
    }
  },
  setup(props, context) {
    const pagination: Ipagination = {
      pageSize: 10,
      current: 1,
      total: 0
    };

    const state = reactive({
      data: props.config.dataSource,
      autoLoading: props.config.autoLoading === undefined ? true : props.config.autoLoading,
      size: props.config.size || 'small',
      isDataLoaded: true, // 数据请求是否完成？
      pagination,
      params: undefined // 请求的参数
    });

    // 行选择操作
    let rowSelection: IrowSelection = reactive({
      type: EselectionType.checkbox,
      selectedRowKeys: [],
      onChange: Function
    });

    const onSelectChange = (selectedRowKeys: Array<number | string>) => {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      rowSelection.selectedRowKeys = selectedRowKeys;
      context.emit('update:selectedRowKeys', selectedRowKeys); // 数据双向绑定
    };

    rowSelection.onChange = onSelectChange;
    if (props.config.rowSelection) {
      // rowSelection = props.config.rowSelection as IrowSelection;
      rowSelection = reactive({
        ...rowSelection,
        ...props.config.rowSelection
      });
    }

    /**
     * @description: 请求数据
     * @param {*} params
     * @return {*}
     */
    const getData = (params?: object, currentPage = 1) => {
      state.pagination.current = currentPage === 1 ? 1 : currentPage;

      state.isDataLoaded = false;
      const request: BaseRequestModel = {
        params: state.params || props.config.requestParams || {},
        pageIndex: state.pagination.current, // 当前页
        pageRows: state.pagination.pageSize

      };

      if (params) {
        // 根据实际项目进行转换
        request.params = {
          ...request.params,
          ...params
        };
      }
      state.params = { ...request.params }; // 存储查询参数

      // request.params = JSON.stringify(request.params);
      // debugger;
      http.post(props.config.api, request, props.config.mapper).then(res => {
        state.data = res.data;
        state.pagination.total = res.total;
        state.isDataLoaded = true; // 数据请求完成标识
        // console.log(res);
      });
    };
    // 分页事件
    const changePagination = (pagination: Ipagination, filters: any) => {
      state.pagination.current = pagination.current;
      getData(undefined, pagination.current);
    };

    /* 重新加载数据 */
    const reloadData = () => {
      getData(undefined, 1);
    };

    watch(() => props.config.requestParams, (nval, oval) => {
      // debugger;
      if (nval && typeof (nval) === 'object' && JSON.stringify(nval) !== JSON.stringify(oval)) {
        getData(nval, pagination.current);
      }
    });

    onMounted(() => {
      state.autoLoading && getData();
    });
    return { getData, state, changePagination, reloadData, rowSelection };
  }
});
</script>

<style scoped>
</style>
