<template>
  <div>
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="(crumb, index) in breadCrumbList" :key="index">
        <el-breadcrumb-item :to="crumb.path">{{ crumb.name }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ crumb.nameChild }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import userLoginStore from '@/store/login'
import { mapPathToCrumb } from '@/utils/map-menus'
import { useRoute } from 'vue-router'
const route = useRoute()
const userLogin = userLoginStore()
const breadCrumbList = computed(() => {
  return mapPathToCrumb(route.path, userLogin.menu)
})
</script>
