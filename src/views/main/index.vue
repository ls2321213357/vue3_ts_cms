<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="!isFold ? '60px' : '210px'">
        <main-menu :isCollapse="isFold" />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <main-header @changeShow="handleFoldChange" />
        </el-header>
        <el-main>
          <div class="main-router" v-loading="loading">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, toRef } from 'vue'
import MainMenu from '@/components/MainMenu/index.vue'
import MainHeader from '@/components/MainHeader/index.vue'
import request from '@/service'
// 处理main-header中折叠的变化
const isFold = ref(true)
const loading = toRef(request.isLoading)
const handleFoldChange = (flag: boolean) => {
  isFold.value = flag
}
</script>

<style lang="less" scoped>
.main {
  height: 100%;

  .main-content {
    height: 100%;

    .el-aside {
      overflow-x: hidden;
      overflow-y: auto;
      line-height: 200px;
      text-align: left;
      cursor: pointer;
      background-color: #001529;
      scrollbar-width: none; /* firefox */
      -ms-overflow-style: none; /* IE 10+ */

      transition: width 0.3s ease;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .el-main {
      background-color: #f0f2f5;
    }
  }
}
</style>
