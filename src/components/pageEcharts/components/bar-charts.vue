<template>
  <base-charts :option="option"></base-charts>
</template>
<script setup lang="ts">
import baseCharts from './base-charts.vue'
import { computed } from 'vue'
import type { EChartsOption } from 'echarts'
type Iprops = {
  dataX: string[]
  dataY: number[]
}
const props = defineProps<Iprops>()
const option = computed<EChartsOption>(() => {
  return {
    xAxis: {
      type: 'category',
      data: props.dataX
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: props.dataY,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  }
})
</script>
