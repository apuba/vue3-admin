<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-12-04 23:17:37
 * @LastEditTime: 2021-03-04 11:39:57
 * @LastEditors: 3603317@qq.com
 * @Description: 模态选择弹窗
-->
<template>
  <CompPopup v-model:visible="isVisible" :title="state.title" :width="state.width" :showFooter="true" popupType="modal" @submit="clickHandler">
    <CompTable v-if="isVisible" :config="state.config" ref="refcompModalSelectTable" :showButtons="false" v-model:selectedRowKeys="chooseRowKeys" />
  </CompPopup>
</template>

<script lang="ts">

import { ItableProps, Ipagination } from '../compTable/types';
import { defineComponent, PropType, reactive, ref, unref } from 'vue';
export default defineComponent({
  name: 'CompModalSelect',
  emits: ['update:visible', 'update:selectedRowKeys', 'update:selectedRowNames'],
  computed: {
    isVisible: {
      get(): boolean {
        return this.visible;
      },
      set(value: boolean) {
        this.$emit('update:visible', value);
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    selectedRowKeys: {
      type: Array
    },
    config: {
      type: Object as PropType<ItableProps>,
      required: true
    },
    title: String, // 弹窗标题
    tableKey: Object, // 绑定的键值对,主键  {key:'表的主键,返回到ngVal',name:'显示的文本,返回到ngText'}
    width: {
      type: [String, Number],
      default: '50%'
    },
    rows: Object, // 父级窗口用于接收当前返回的选定的行
    types: String, // 选择为单选或是多选
    commitCallback: Function, // 确定回调
    clearCallback: Function, // 清除数据回调
    cancelCallback: Function, // 取消按钮回调
    loadSuccessCallback: Function // 指令数据加载完成
  },
  setup(props, context) {
    const state = reactive(props);
    const chooseRowKeys = ref([]); // 当前表格选择的Kyes 数据双向绑定
    //  点击事件
    const clickHandler = () => {
      // 把选中的数据回传给

      context.emit('update:visible', false); // 隐藏弹窗
      context.emit('update:selectedRowKeys', unref(chooseRowKeys)); // 获取数据双向绑定
    };

    return { state, clickHandler, chooseRowKeys };
  }
});
</script>

<style scoped>
</style>
