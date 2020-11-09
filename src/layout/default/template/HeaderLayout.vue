<!--
 * @Author: 侯兴章
 * @Date: 2020-11-03 01:56:30
 * @LastEditTime: 2020-11-10 01:19:44
 * @LastEditors: 侯兴章
 * @Description:
-->
<template>
  <div class="container">
    <span class="fl">
      <menu-unfold-outlined v-if="collapsed" class="trigger" @click="clickCollapsed" />
      <menu-fold-outlined v-else class="trigger" @click="clickCollapsed" />
    </span>
    <h4 class="title pl15 fl">广东省麻省理工业4.0——智能制造系统</h4>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons-vue';
export default defineComponent({
  name: 'HeaderLayout',
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined
  },
  setup(props, context) {
    const collapsed = ref(false);
    function clickCollapsed(): void {
      collapsed.value = !collapsed.value;
      context.emit('collapsed-hander', collapsed.value);
    }
    return { collapsed, clickCollapsed };
  }
});
</script>

<style lang="scss">
@import '../var.scss';
@import '../antd.scss';
@import '../style.scss';
.mes-default-layout {
  .header {
    padding: 0 20px;
    text-align: left;
    height: $base-bar-heigth;
    line-height: $base-bar-heigth;
    background-color: $transition-color-1;
    box-shadow: 0px 13px 40px 0px rgba(0, 0, 0, 0.2);
    font-size: 18px;
    .title {
      color: $transition-color-3;
      cursor: default;
    }
  }
  .container {
    display: block;
    .trigger {
      color: #666;
      transition: color 0.2s;
    }
    &:hover {
      .trigger {
        color: #999;
        &:hover {
          color: $info-color;
        }
      }
    }
  }
}
</style>
