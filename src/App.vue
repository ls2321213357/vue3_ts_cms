<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts">
interface Ikun {
  name: string
}
const ikun: Ikun = {
  name: '小黑子'
}
</script>
<style scoped>
/* 可以通过这种方式来让app直接撑满全屏 */
.app {
  height: 100vh;
}
</style>
