<template>
  <div class="container">
    <page-content
      :contentConfig="contentConfig"
      ref="pageCtx"
      @edit-click="editClickHandler"
      @create-click="createClickHandler"
    >
      <template #leader="scope"> {{ scope.row.leader }} </template>
      <template #name="scope"> {{ scope.row.name }} </template>
    </page-content>
  </div>
</template>
<script setup lang="ts">
import contentConfig from './config/content.config'
import { useContentHandler } from '@/hooks/useContentHandler'
const { pageCtx, editClickHandler, createClickHandler } = useContentHandler()
</script>
<style scoped lang="less">
.container {
  height: 100%;
  border-radius: 8px;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
