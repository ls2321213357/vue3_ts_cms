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
      :otherInfo="otherInfo"
      ref="pageDig"
      @create-success="createSuccessHandler"
      @edit-success="editSuccessHandler"
    >
      <template #menuList>
        <el-tree
          ref="treeRef"
          :data="menuList"
          show-checkbox
          node-key="id"
          :props="defaultProps"
          @check="checkNodeHandler"
        />
      </template>
    </page-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'
import pageSearch from '@/components/pageSearch/index.vue'
import pageContent from '@/components/pageContent/index.vue'
import pageDialog from '@/components/pageDialog/index.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import dialogConfig from './config/dialog.config'
import { useContentHandler } from '@/hooks/useContentHandler'
import systemStore from '@/store/main/system/index'
import { getMenuListToIDArray } from '@/utils/format'
import { storeToRefs } from 'pinia'
import type { ElTree } from 'element-plus'
const useSystem = systemStore()
const dialogConfigProp = reactive(dialogConfig)
//el-tree的操作,编辑时进行赋值
const treeRef = ref<InstanceType<typeof ElTree>>()
const editCallBack = (itemData: any) => {
  //获得的id数组
  nextTick(() => {
    treeRef.value?.setCheckedKeys(getMenuListToIDArray(itemData.menuList))
  })
}
const newCallBack = () => {
  nextTick(() => {
    treeRef.value?.setCheckedKeys(getMenuListToIDArray([]))
  })
}
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
} = useContentHandler(newCallBack, editCallBack)
const defaultProps = reactive({
  children: 'children',
  label: 'name'
})
useSystem.getEntireMenusList()
const { menuList } = storeToRefs(useSystem)
//其他的多出来的配置项
const otherInfo = ref({})
//点击el-tree收集的数据
const checkNodeHandler = (data1: any, data2: any) => {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = { menuList }
}
</script>
<style scoped lang="less">
.container {
  height: 100%;
  border-radius: 8px;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
