<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-12-01 20:38:51
 * @LastEditTime: 2020-12-08 06:36:05
 * @LastEditors: 侯兴章
 * @Description:
-->

<template>
  <div class="popup">
    <a-drawer
      v-if="popupType === 'drawer'"
      :title="state.title"
      :placement="state.compConfig.drawerPlacement"
      :closable="false"
      :width="state.width"
      v-model:visible="isVisible"
      :after-visible-change="afterVisibleChange"
    >
      <slot></slot>
    </a-drawer>
    <a-modal
      :width="state.width"
      :footer="state.showFooter ? a : null"
      v-if="popupType === 'modal'"
      v-model:visible="isVisible"
      :confirmLoading="isLoading"
      :title="state.title"
      ok-text="确认"
      cancel-text="取消"
      @ok="clickHandler"
      @cancel="
        isVisible = false;
        cancelHandler
      "
    >
      <slot></slot>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs } from 'vue';
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
    },
    popupType: {
      type: String,
      default: COMPONENT_SETTING.popupType
    },
    showFooter: {
      type: Boolean,
      default: false
    },
    confirmLoading: { // 确认按钮的loading
      type: Boolean,
      default: false
    }
  },
  emits: ['update:visible', 'submit', 'cancel'],
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
  setup(props, context) {
    /* const state = reactive({
      title: props.title,
      width: props.width,
      compConfig: COMPONENT_SETTING,
      popupType: props.popupType
    }); */
    const state = reactive({
      ...props,
      compConfig: COMPONENT_SETTING
    });

    // console.log(state);

    const afterVisibleChange = (val: boolean) => {
      console.log(val);
    };

    // 确认按钮
    const clickHandler = () => {
      context.emit('submit');
    };
    const cancelHandler = () => {
      context.emit('cancel');
    };

    const isLoading = computed(() => props.confirmLoading);
    return { clickHandler, afterVisibleChange, state, cancelHandler, isLoading };
  }
});
</script>

<style scoped>
</style>
