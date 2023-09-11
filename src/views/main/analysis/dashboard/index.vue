<template>
  <div class="dashboard">
    <!-- 顶部数字展示 -->
    <div class="top">
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in dashboard.amountList" :key="item.amount">
          <div class="top-one">
            <coundCard :item="item" />
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="main">
      <el-row :gutter="10">
        <el-col :span="12"> 这线图 </el-col>
        <el-col :span="12"> 柱状与 </el-col>
      </el-row>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import coundCard from '@/views/main/analysis/dashboard/components/coundCard.vue'
import useDashBoard from '@/store/main/analysis/dashboard'
const dashboard = useDashBoard()
onMounted(() => {
  dashboard.getAmountListHandler()
})
</script>
<style scoped lang="less"></style>
