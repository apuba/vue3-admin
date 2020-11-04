<template>
  <div>
    <h1>登录页面</h1>
    <p>
      <a-button type="primary" @click="clickHander">测试 store</a-button>
    </p>
    <p>{{ title}}</p>
  </div>
</template>

<script>
import { ref, reactive, toRef, computed, onMounted } from 'vue';
import { appStore } from '@/store/modules/appStore';
export default {
  name: 'Login',
  setup () {
    const title = ref(appStore.title);
    function clickHander () {
      appStore.commitTitleState(`标题已经被更新：时间戳${new Date().getTime()}`);
      title.value = appStore.title;
    }

    onMounted(() => {
      setTimeout(() => {
        title.value = '标题刚才加载成功了';
      }, 1555);
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
