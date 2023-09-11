<template>
  <div class="base-echarts">
    <div class="echarts" ref="echartsRef">
      
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const echartsRef = ref<HTMLElement>()
</script>
<style scoped lang="less"></style>
