<template>
  <div class="container">
    <page-search
      @search-handler="pageSearchHandler"
      @reset-handler="pageResetHandler"
    ></page-search>
    <page-content ref="pageCtx"></page-content>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import pageSearch from '@/views/main/system/department/components/pageSearch.vue'
import pageContent from '@/views/main/system/department/components/pageContent.vue'
const pageCtx = ref<InstanceType<typeof pageContent>>()
//查询操作
const pageSearchHandler = (searchObj: any) => {
  pageCtx.value?.fetchSearchHandler(searchObj)
}
//重置操作
const pageResetHandler = () => {
  pageCtx.value?.fetchSearchHandler()
}
</script>
<style scoped lang="less">
.container {
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
}
</style>
