<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-20 00:41:41
 * @LastEditTime: 2020-11-24 22:46:40
 * @LastEditors: 侯兴章
 * @Description: 常用查询表单的封装，未实现v-model的双向绑定
-->

<template>
  <a-form layout="inline" @submit="searchHandler" class="search-form">
    <a-form-item v-bind="validateInfos[item.model]" v-for="(item, index) in items" :key="index" :label="item.label">
      <a-input v-model:value="formRef[item.model]" :placeholder="item.placeholder" />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="searchHandler">搜索</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { IFormItems, EcomponentType } from './types';
import { defineComponent, reactive } from 'vue';
import { useForm } from '@ant-design-vue/use';
import type { PropType } from 'vue';

interface IfromItem {
  [key: string]: string | number | Array<IfromItem>;
}

export default defineComponent({
  name: 'CompSearchForm',
  props: {
    items: {
      type: Array as PropType<IFormItems[]>,
      default: () => []
    },
    value: Object
  },
  setup(props, context) {
    const fromItem: IfromItem = {};
    const fromRules: IfromItem = {};

    props.items.forEach(item => {
      fromItem[item.model] = item.value || '';
      item.rules && (fromRules[item.model] = item.rules);
    });

    const formRef = reactive(fromItem);
    const rulesRef = reactive(fromRules);
    const { resetFields, validate, validateInfos } = useForm(formRef, rulesRef);
    function searchHandler(e: MouseEvent) {
      e.preventDefault();
      validate()
        .then(() => {
          context.emit('submit', formRef);
          // context.emit('update:value', unref(formRef)); // 数据双向绑定
        })
        .catch(err => {
          console.log('error', err);
        });
    }

    return { resetFields, validate, validateInfos, searchHandler, formRef, rulesRef };
  }
});
</script>

<style scoped>
</style>
