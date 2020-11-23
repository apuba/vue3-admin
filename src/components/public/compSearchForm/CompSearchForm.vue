<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-20 00:41:41
 * @LastEditTime: 2020-11-24 00:07:04
 * @LastEditors: 侯兴章
 * @Description:
-->

<template>
  <a-form layout="inline" @submit="handleSubmit" class="search-form">
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
  setup(props) {
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
          console.log(formRef);
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
