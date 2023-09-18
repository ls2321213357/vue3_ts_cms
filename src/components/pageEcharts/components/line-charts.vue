<template>
  <base-charts :option="option"></base-charts>
</template>
<script setup lang="ts">
import baseCharts from './base-charts.vue'
import { computed } from 'vue'
import type { EChartsOption } from 'echarts'
type Iprops = {
  dataY: string[]
  dataX: number[]
}
const props = defineProps<Iprops>()
const option = computed<EChartsOption>(() => {
  return {
    title: {
      text: '商品收藏数量'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data: props.dataY
    },
    series: [
      {
        name: '2011',
        type: 'bar',
        data: props.dataX
      }
    ]
  }
})
</script>
