<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-20 00:41:41
 * @LastEditTime: 2020-12-09 01:23:12
 * @LastEditors: 侯兴章
 * @Description: 常用查询表单的封装， v-model:parame 为数据双向绑定 父级定义一个 ref let formParams = ref({});
-->

<template>
  <a-form layout="inline" @submit="searchHandler" class="search-form">
    <a-form-item v-bind="validateInfos[item.model]" v-for="(item, index) in items" :key="index" :label="item.label">
      <CompDictionaries v-model:value="formRef[item.model]" :defaultValue="item.defaultValue" :type="item.type" v-if="['select', 'radio', 'checkbox'].includes(item.type)" :dictType="item.dictType" />
      <a-input :defaultValue="item.defaultValue" v-model:value="formRef[item.model]" :placeholder="item.placeholder" v-else />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="searchHandler">搜索</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { IFormItems } from './types';
import { defineComponent, reactive, toRefs, unref } from 'vue';
import { useForm } from '@ant-design-vue/use';
import type { PropType } from 'vue';

interface IfromItem {
  [key: string]: string | number | Array<IfromItem>;
}

export default defineComponent({
  name: 'CompSearchForm',
  emits: ['update:params', 'submit'],
  props: {
    params: [Object, String, Number],
    items: {
      type: Array as PropType<IFormItems[]>,
      default: () => []
    },
    value: Object
  },
  setup(props, context) {
    console.log('5555', props.params);

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
          console.log('props.params', props.params);
          // context.emit('update:modelValue', unref(formRef)); // 数据双向绑定
          context.emit('update:params', unref(formRef)); // 数据双向绑定
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
