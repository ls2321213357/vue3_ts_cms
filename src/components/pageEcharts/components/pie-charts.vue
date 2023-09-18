<template>
  <base-charts :option="option"></base-charts>
</template>
<script setup lang="ts">
import baseCharts from './base-charts.vue'
import type { EChartsOption } from 'echarts'
type Iprops = {
  data: any[]
}
const props = defineProps<Iprops>()
const option: EChartsOption = {
  title: {
    text: '各商品分类数量统计'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'right'
  },
  series: [
    {
      type: 'pie',
      radius: '50%',
      data: props.data,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
</script>
