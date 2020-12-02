<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-24 20:26:11
 * @LastEditTime: 2020-12-01 23:19:54
 * @LastEditors: 侯兴章
 * @Description:
-->
<template>
  <div>
    <div class="tableBar">
      <a-button-group>
        <a-button type="primary" size="small">添加</a-button>
        <a-button type="primary" size="small">修改</a-button>
        <a-button type="primary" size="small">删除</a-button>
        <a-button type="primary" size="small">导出</a-button>
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
    ></a-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, reactive, toRefs } from 'vue';
import { ItableProps, Ipagination, ItoolBar } from './types';
import http from '@/common/http/index.ts';
import { BaseRequestModel } from '@/service/baseModel';

export default defineComponent({
  name: 'CompTable',
  props: {
    config: {
      type: Object as PropType<ItableProps>,
      required: true
    },
    toolBar: {
      type: Object as PropType<ItoolBar>
    }
  },
  setup(props) {
    const pagination: Ipagination = {
      pageSize: 20,
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

      request.params = JSON.stringify(request.params);

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
    onMounted(() => {
      state.autoLoading && getData();
    });
    return { getData, state, changePagination };
  }
});
</script>

<style scoped>
</style>
