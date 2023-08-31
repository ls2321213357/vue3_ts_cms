<template>
  <div class="container">
    <page-search
      :search-config="searchConfig"
      @search-handler="pageSearchHandler"
      @reset-handler="pageResetHandler"
    ></page-search>
    <page-content
      :content-config="contentConfig"
      ref="pageCtx"
      @edit-click="editClickHandler"
      @create-click="createClickHandler"
    >
    </page-content>
    <page-dialog
      :dialog-config="dialogConfigProp"
      :role-list="roleList"
      :department-list="departmentList"
      ref="pageDig"
      @create-success="createSuccessHandler"
      @edit-success="editSuccessHandler"
    >
    </page-dialog>
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
import roleStore from '@/store/main/system/role'
import departmentStore from '@/store/main/system/department'
import { storeToRefs } from 'pinia'
const dialogConfigProp = reactive(dialogConfig)
//请求角色列表
const role = roleStore()
role.getRoleList()
const { roleList } = storeToRefs(role)
//获取部门列表
const department = departmentStore()
department.getDepartmentList()
const { departmentList } = storeToRefs(department)
//请求部门列表
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
