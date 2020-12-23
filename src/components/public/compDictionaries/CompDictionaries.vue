<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-12-06 00:43:43
 * @LastEditTime: 2020-12-16 16:45:05
 * @LastEditors: 侯兴章
 * @Description: 字典控件，有三种类型 select \ checkbox \ radio
-->

<template>

  <a-select v-model:value="selectVal" @change="selectChangeHandler" v-if="type === Edicitionary.Select" :options="options" :style="style"></a-select>
  <a-radio-group :defaultValue="defaultValue" :name="name" v-if="type === Edicitionary.Radio" :options="options" v-model:value="selectVal" @change="radioChangeHandler" />
  <a-checkbox-group :defaultValue="defaultValue" v-if="type === Edicitionary.Checkbox" v-model:value="selectVal" :name="name" :options="options" @change="checkBoxChangeHandler" />
</template>

<script lang="ts">
import { defineComponent, onActivated, onMounted, reactive, ref, toRefs, unref, watch } from 'vue';
import { Edicitionary } from './types';
import { IModelDict, IDictOptions } from '@/service/appModel';
import { appStore } from '@/store/modules/appStore';
import { mapperHelper } from '@/common/helper';

export default defineComponent({
  name: 'CompDictionaries',
  props: {
    value: {
      type: [String, Number, Array],
      default: ''
    },
    type: {
      type: String, // 字典控件的类型
      default: Edicitionary.Select
    },
    width: {
      type: [String, Number],
      default: '120px'
    },
    dictType: String, // 绑定字典类型的值
    name: {
      type: String,
      default: ''
    },
    defaultValue: [String, Number, Array]
  },
  emits: ['update:value'],

  setup(props, context) {
    const options: Array<IDictOptions> = [];
    // const selectVal = props.value as string | number | Array<string | number>; // 当前 选择的值

    const selectVal = ref(props.value || props.defaultValue); // 当前 选择的值
    const style = typeof props.width === 'string' ? `width: ${props.width}` : `width: ${props.width}px`;
    const name: string = props.name ? props.name : props.type + new Date().getTime(); // 控件名
    const state = reactive({ ...props, options, selectVal, style, name });
    const getData = () => {
      const data: Array<IModelDict> = unref(appStore.getDictList); // 获取缓存的字典
      const mapper: IDictOptions = { // 字段映射
        value: 'dictValue',
        label: 'dictLabel'
      };
      state.options = mapperHelper<IDictOptions>(data.filter(item => item.dictType === state.dictType), mapper);
    };

    watch(() => props.value, (nval) => {
      selectVal.value = nval;
    });

    // select 事件
    const selectChangeHandler = (val: string | number | Array<string | number>): void => {
      console.log(val);
      context.emit('update:value', val);
    };

    // checkBox 事件
    const checkBoxChangeHandler = (val: Array<string | number>): void => {
      console.log(val);
      context.emit('update:value', val);
    };

    // radio 事件
    const radioChangeHandler = (e: Event): void => {
      console.log((e.target as HTMLInputElement).value);
      context.emit('update:value', (e.target as HTMLInputElement).value);
    };

    onMounted(() => {
      getData();
    });
    return { ...toRefs(state), Edicitionary, checkBoxChangeHandler, radioChangeHandler, selectChangeHandler };
  }
});
</script>

<style scoped>
</style>
