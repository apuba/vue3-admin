<!--
 * @Author: 侯兴章
 * @Date: 2020-11-05 00:44:20
 * @LastEditTime: 2020-11-06 03:16:05
 * @LastEditors: 侯兴章
 * @Description: 
-->
<template>
  <div>
    <h1>登录页面</h1>
    <p>
      <a-button type="primary" @click="clickHander">测试 store</a-button>
    </p>
    <p>{{ title }}</p>
  </div>
</template>

<script>
import { ref, reactive, toRef, computed, onMounted } from 'vue';
import { appStore } from '@/store/modules/appStore';

import http, { AxiosRequest } from '@/common/http/index.ts';
export default {
  name: 'Login',
  setup () {
    const title = ref(appStore.title);
    console.log(process.env)
    function clickHander () {
      appStore.commitTitleState(`标题已经被更新：时间戳${new Date().getTime()}`);
      title.value = appStore.title;
    }

    onMounted(() => {
      http.post({ url: '/mock' }).then(res => {
        console.log(res)
        title.value = `你好：${res.data.name}, 一会标题将会自动变更`;
      })
    });

    return {
      title,
      clickHander
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
