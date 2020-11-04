<!--
 * @Author: 侯兴章
 * @Date: 2020-10-13 00:13:21
 * @LastEditTime: 2020-10-31 17:24:34
 * @LastEditors: 侯兴章
 * @Description:
-->
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld
  }
});
</script>
