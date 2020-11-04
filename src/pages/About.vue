<!--
 * @Author: 侯兴章
 * @Date: 2020-10-13 00:13:21
 * @LastEditTime: 2020-11-02 23:34:51
 * @LastEditors: 侯兴章
 * @Description:
-->
<template>
  <div class="about">
    <h1>{{ state.title }}</h1>
    <div>
      万万没想到啊。这样了
    </div>
    <a-button type="primary" @click="clickHander">引入antd成功</a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { mapState } from 'vuex';

export default defineComponent({
  name: 'About',
  setup() {
    const txt = ['原来的标题', '切换后的标题'];
    let toogle = false;
    const state = reactive({
      title: txt[0]
    });
    function clickHander() {
      toogle = !toogle;
      state.title = txt[toogle ? 1 : 0];
    }
    return { state, clickHander };
  }
});
</script>

<style scoped>
</style>
