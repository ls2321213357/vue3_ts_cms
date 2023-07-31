<template>
  <div class="container">
    <page-search
      :searchConfig="searchConfig"
      @search-handler="pageSearchHandler"
      @reset-handler="pageResetHandler"
    ></page-search>
    <page-content
      :contentConfig="contentConfig"
      ref="pageCtx"
      @edit-click="editClickHandler"
      @create-click="createClickHandler"
    >
      <template #leader="scope"> {{ scope.row.leader }} </template>
      <template #name="scope"> {{ scope.row.name }} </template>
    </page-content>
    <page-dialog
      :dialogConfig="dialogConfig"
      ref="pageDig"
      @create-success="createSuccessHandler"
      @edit-success="editSuccessHandler"
    ></page-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import pageSearch from '@/components/pageSearch/index.vue'
import pageContent from '@/components/pageContent/index.vue'
import pageDialog from '@/components/pageDialog/index.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
const pageCtx = ref<InstanceType<typeof pageContent>>()
const pageDig = ref<InstanceType<typeof pageDialog>>()
//查询操作
const pageSearchHandler = (searchObj: any) => {
  pageCtx.value?.fetchSearchHandler(searchObj)
}
//重置操作
const pageResetHandler = () => {
  pageCtx.value?.fetchSearchHandler()
}
//弹窗
const dialogConfig = reactive({
  isNewUser: true,
  isShowDialog: false,
  pageName: 'department'
})
const editClickHandler = (itemData: any) => {
  pageDig.value?.editItemHandler(itemData)
}
const createClickHandler = () => {
  pageDig.value?.createUserItem()
}
const createSuccessHandler = () => {
  pageCtx.value?.fetchSearchHandler()
}
const editSuccessHandler = () => {
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
