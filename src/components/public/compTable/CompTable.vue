<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-24 20:26:11
 * @LastEditTime: 2020-11-25 00:24:43
 * @LastEditors: 侯兴章
 * @Description:
-->
<template>
  <a-table :columns="config.columns" :data-source="dataSource.data" :row-key="config.rowKey" :size="state.size" :loading="!state.isDataLoaded"></a-table>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, reactive } from 'vue';
import { ItableConfig } from './types';
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
    const dataSource = reactive({
      data: props.config.dataSource
    });

    const state = reactive({
      autoLoading: props.config.autoLoading === undefined ? true : props.config.autoLoading,
      size: props.config.size || 'small',
      isDataLoaded: true // 数据请求是否完成？
    });

    /**
     * @description: 请求数据
     * @param {*} params
     * @return {*}
     */
    function getData(params?: object) {
      state.isDataLoaded = false;
      const request: BaseRequestModel = {
        params: props.config.requestParams
      };

      if (params) {
        request.params = {
          ...request.params,
          ...params
        };
      }

      http.post(props.config.api, request, props.config.mapper).then(res => {
        dataSource.data = res.data;
        state.isDataLoaded = true; // 数据请求完成标识
        console.log(res);
      });
    }
    onMounted(() => {
      state.autoLoading && getData();
    });
    return { getData, dataSource, state };
  }
});
</script>

<style scoped>
</style>
