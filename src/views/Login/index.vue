<template>
  <div class="login">
    <loginPanel></loginPanel>
  </div>
</template>
<script setup lang="ts">
import loginPanel from './components/loginPanel.vue'
</script>
<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(../../assets/img/login-bg.svg);
}
</style>
