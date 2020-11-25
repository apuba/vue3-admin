<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-24 20:26:11
 * @LastEditTime: 2020-11-26 00:54:40
 * @LastEditors: 侯兴章
 * @Description:
-->
<template>
  <a-table
    @change="changePagination"
    :pagination="state.pagination"
    :columns="config.columns"
    :data-source="state.data"
    :row-key="config.rowKey"
    :size="state.size"
    :loading="!state.isDataLoaded"
  ></a-table>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, reactive } from 'vue';
import { ItableConfig, Ipagination } from './types';
import http from '@/common/http/index.ts';
import { BaseRequestModel } from '@/service/baseModel';

export default defineComponent({
  name: 'CompTable',
  props: {
    config: {
      type: Object as PropType<ItableConfig>,
      required: true
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
      pagination
    });

    /**
     * @description: 请求数据
     * @param {*} params
     * @return {*}
     */
    function getData(params?: object, currentPage?: number) {
      state.isDataLoaded = false;
      const request: BaseRequestModel = {
        params: props.config.requestParams,
        pageIndex: currentPage || state.pagination.current, // 当前页
        pageRows: state.pagination.pageSize

      };

      if (params) {
        request.params = {
          ...request.params,
          ...params
        };
      }

      http.post(props.config.api, request, props.config.mapper).then(res => {
        state.data = res.data;
        state.pagination.total = res.total;
        state.isDataLoaded = true; // 数据请求完成标识
        console.log(res);
      });
    }
    function changePagination(pagination: Ipagination, filters: any) {
      state.pagination.current = pagination.current;
      getData(undefined, pagination.current);
    }

    onMounted(() => {
      state.autoLoading && getData();
    });
    return { getData, state, changePagination };
  }
});
</script>

<style scoped>
</style>
