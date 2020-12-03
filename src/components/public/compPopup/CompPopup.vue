<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-12-01 20:38:51
 * @LastEditTime: 2020-12-03 21:50:48
 * @LastEditors: 侯兴章
 * @Description:
-->

<template>
  <a-drawer :title="state.title" :placement="placement" :closable="false" :width="state.width" v-model:visible="isVisible" :after-visible-change="afterVisibleChange">
    <slot></slot>
  </a-drawer>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { COMPONENT_SETTING } from '@/config';
export default defineComponent({
  name: 'CompPopup',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: String,
    width: {
      type: [Number, String],
      default: '50%'
    }
  },
  emits: ['update:visible'],
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
  setup(props, content) {
    const state = reactive({
      title: props.title,
      width: props.width
    });

    const placement = COMPONENT_SETTING.drawerPlacement;
    const afterVisibleChange = (val: boolean) => {
      console.log(val);
    };
    return { afterVisibleChange, placement, state };
  }
});
</script>

<style scoped>
</style>
