<!--
 * @Author: 侯兴章
 * @Date: 2020-10-13 00:13:21
 * @LastEditTime: 2020-11-12 21:26:46
 * @LastEditors: 侯兴章
 * @Description:
-->
<template>
    <div>
        defalut 模板里的 login 页面 AA
        <p>
          <a-button type="primary" @click="loginHandler">我要轻轻的登录</a-button>
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import storage from '@/common/storage';
import router from '@/router';

export default defineComponent({
  setup () {
    function loginHandler() {
      storage().set('token', 'test1234567890');
      router.push('/dashbord');
    }
    return { loginHandler };
  }
});
</script>

<style scoped>

</style>
