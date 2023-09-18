<template>
  <div class="base-echarts">
    <div class="echarts" ref="echartsRef"></div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
import chinaJson from '../data/china.json'
type Iprops = {
  option: EChartsOption
}
const props = defineProps<Iprops>()
const echartsRef = ref<HTMLElement>()
echarts.registerMap('china', chinaJson as any)
onMounted(() => {
  initChart()
})
const initChart = () => {
  const echartsInstance = echarts.init(echartsRef.value, 'light', { renderer: 'canvas' })
  echartsInstance.setOption(props.option)
}
</script>
<style scoped lang="less">
.echarts {
  height: 200px;
}
</style>
