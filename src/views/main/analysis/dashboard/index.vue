<template>
  <div class="dashboard">
    <!-- 顶部数字展示 -->
    <div class="top">
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in dashboard.amountList" :key="item.amount"
          ><div class="top-one">
            {{ item.number1 }}, {{ item.number2 }},{{ item.title }},
            {{ item.tips }}
          </div></el-col
        >
      </el-row>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import useDashBoard from '@/store/main/analysis/dashboard'
const dashboard = useDashBoard()
onMounted(() => {
  dashboard.getAmountListHandler()
})
</script>
<style scoped lang="less">
.top {
  width: 100%;
  .el-row {
    .top-one,
    .top-two,
    .top-three,
    .top-four {
      width: 300px;
      height: 200px;
      background-color: rgb(76, 214, 31);
    }
  }
}
</style>
