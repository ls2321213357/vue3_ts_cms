<template>
  <div class="dashboard">
    <!-- 顶部数字展示 -->
    <div class="top">
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in amountList" :key="item.amount">
          <div class="top-one">
            <cound-card :item="item" />
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 中间部分图表 -->
    <div class="main">
      <el-row :gutter="10">
        <el-col :span="8">
          <chart-card>
            <pie-charts :data="propGoodsCategoryList"></pie-charts>
          </chart-card>
        </el-col>
        <el-col :span="8">
          <chart-card>
            <map-echarts :mapData="propGoodsAddressSales"></map-echarts>
          </chart-card>
        </el-col>
        <el-col :span="8">
          <chart-card>
            <role-charts :data="propGoodsSalesList"></role-charts>
          </chart-card>
        </el-col>
      </el-row>
    </div>
    <!-- 底部图表 -->
    <div class="footer">
      <el-row :gutter="10">
        <el-col :span="12">
          <chart-card>
            <line-charts :dataY="propGoodsFavorListY" :dataX="propGoodsFavorListX"></line-charts>
          </chart-card>
        </el-col>
        <el-col :span="12">
          <chart-card>
            <bar-charts :dataX="propGoodsTopListX" :dataY="propGoodsTopListY"></bar-charts>
          </chart-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue'
import coundCard from './components/coundCard.vue'
import chartCard from './components/chartCard.vue'
import useDashBoard from '@/store/main/analysis/dashboard'
import pieCharts from '@/components/pageEcharts/components/pie-charts.vue'
import roleCharts from '@/components/pageEcharts/components/role-charts.vue'
import lineCharts from '@/components/pageEcharts/components/line-charts.vue'
import barCharts from '@/components/pageEcharts/components/bar-charts.vue'
import mapEcharts from '@/components/pageEcharts/components/map-echart.vue'
import { storeToRefs } from 'pinia'
const dashboard = useDashBoard()
onMounted(() => {
  dashboard.getAmountListHandler()
  dashboard.getGoodsCategoryList()
  dashboard.getGoodsSalesList()
  dashboard.getGoodsFavorList()
  dashboard.getGoodsSakesTopTen()
  dashboard.getGoodsAddressSales()
})

const {
  amountList,
  goodsCategoryList,
  goodsSalesList,
  goodsFavorList,
  goodsSakesTopTen,
  goodsAddressSales
} = storeToRefs(dashboard)
//进行数据处理
//饼图
const propGoodsCategoryList = computed(() => {
  return goodsCategoryList.value.map(({ name, goodsCount }) => {
    return {
      name: name,
      value: goodsCount
    }
  })
})
//rose图
const propGoodsSalesList = computed(() => {
  return goodsSalesList.value.map(({ name, goodsCount }) => {
    return {
      name: name,
      value: goodsCount
    }
  })
})
//柱状图
const propGoodsFavorListY = computed(() => {
  return goodsFavorList.value.map(({ name }) => name)
})
const propGoodsFavorListX = computed(() => {
  return goodsFavorList.value.map(({ goodsFavor }) => goodsFavor)
})
//柱状图2
const propGoodsTopListX = computed(() => {
  return goodsSakesTopTen.value.map(({ name }) => name.slice(0, 4))
})
const propGoodsTopListY = computed(() => {
  return goodsSakesTopTen.value.map(({ saleCount }) => saleCount)
})
//中国地图
const propGoodsAddressSales = computed(() => {
  return goodsAddressSales.value.map(({ address, count }) => {
    return {
      name: address,
      value: count
    }
  })
})
</script>
<style scoped lang="less">
.dashboard {
  .main,
  .footer {
    margin-top: 20px;
  }
}
</style>
