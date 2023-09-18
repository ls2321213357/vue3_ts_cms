<template>
  <base-charts :option="option"></base-charts>
</template>
<script setup lang="ts">
import baseCharts from './base-charts.vue'
import type { EChartsOption } from 'echarts'
import type { SeriesDataType } from '../types/echartsTyps'
import { computed } from 'vue'
type Iprops = {
  data: SeriesDataType[]
}
const props = defineProps<Iprops>()
const option = computed<EChartsOption>(() => {
  return {
    title: {
      text: '分类商品的销量',
      left: 'top'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical', //垂直
      left: 'right',
      top: 'center'
    },
    series: [
      {
        name: '商品销量',
        type: 'pie',
        radius: [30, 90],
        center: ['50%', '50%'],
        roseType: 'radius',
        itemStyle: {
          borderRadius: 5
        },
        label: {
          show: false
        },
        data: props.data
      }
    ]
  }
})
</script>
