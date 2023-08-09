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
      :dialogConfig="dialogConfigProp"
      ref="pageDig"
      @create-success="createSuccessHandler"
      @edit-success="editSuccessHandler"
    ></page-dialog>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import pageSearch from '@/components/pageSearch/index.vue'
import pageContent from '@/components/pageContent/index.vue'
import pageDialog from '@/components/pageDialog/index.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import dialogConfig from './config/dialog.config'
import { useContentHandler } from '@/hooks/useContentHandler'
const dialogConfigProp = reactive(dialogConfig)
//引入hooks
const {
  pageCtx,
  pageDig,
  pageResetHandler,
  pageSearchHandler,
  editClickHandler,
  editSuccessHandler,
  createClickHandler,
  createSuccessHandler
} = useContentHandler()
</script>
<style scoped lang="less">
.container {
  height: 100%;
  border-radius: 8px;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
