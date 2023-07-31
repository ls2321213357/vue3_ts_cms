<template>
  <div class="container">
    <div class="ctx-header">
      <h2>{{ contentConfig.title ?? '内容列表' }}</h2>
      <el-button type="primary" @click="createItemHandler">{{
        contentConfig.btnTitle ?? '新建'
      }}</el-button>
    </div>
    <div class="ctx-table">
      <el-table ref="multipleTableRef" :data="dataList" style="width: 100%" border>
        <template v-for="item in contentConfig.dataList" :key="item.label">
          <template v-if="item.type === 'timer'">
            <el-table-column :label="item.label" align="center">
              <template #default="scope">{{ formatUTC(scope.row[item.prop]) }}</template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'custom'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope"></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column label="操作" width="180" class="btn" align="center">
              <template #default="scope">
                <el-button link :icon="Edit" type="primary" @click="editItemHandler(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  link
                  :icon="Delete"
                  type="danger"
                  @click="deleteItemHandler(scope.row.id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column
              :label="item.label"
              :type="item.type"
              :width="item.width"
              align="center"
              :property="item.prop"
            />
          </template>
        </template>
      </el-table>
    </div>
    <div class="ctx-page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        v-model:page-size="searchObj.size"
        :current-page.sync="searchObj.offset + 1"
        :page-sizes="[10, 15, 20, 25]"
        layout="->,total, sizes, prev, pager, next"
        :total="dataSum"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { storeToRefs } from 'pinia'
import systemStore from '@/store/main/system'
import { formatUTC } from '@/utils/format'
import { Delete, Edit } from '@element-plus/icons-vue'

interface Iporps {
  contentConfig: {
    title?: string
    btnTitle?: string
    pageName: string
    dataList: any[]
  }
}
const prop = defineProps<Iporps>()
const emit = defineEmits(['editClick', 'createClick'])
const systemInfo = systemStore()
const searchObj = reactive({
  offset: 0,
  size: 10
})
const fetchSearchHandler = (searchQueryObj = {}) => {
  //获取部门列表
  systemInfo.getInfoList(prop.contentConfig.pageName, { ...searchObj, ...searchQueryObj })
}
//获取部门列表
fetchSearchHandler()
const { dataList, dataSum } = storeToRefs(systemInfo)
//更改一页展示几条数据
const handleSizeChange = (val: number) => {
  searchObj.size = val
  fetchSearchHandler()
}
//更改当前页
const handleCurrentChange = (val: number) => {
  searchObj.offset = val - 1
  fetchSearchHandler()
}
//删除操作
const deleteItemHandler = (id: number) => {
  systemInfo.deleteInfoItem(prop.contentConfig.pageName, id).then(() => {
    fetchSearchHandler()
  })
}
//修改操作
const editItemHandler = (itemData: any) => {
  emit('editClick', itemData)
}
const createItemHandler = () => {
  emit('createClick')
}
//向外暴露的方法
defineExpose({ fetchSearchHandler })
</script>
<style scoped lang="less">
.container {
  background-color: #fff;
  padding: 20px;
  margin-top: 20px;
  .ctx-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .ctx-table {
    height: calc(100vh - 410px);
    .btn {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .ctx-page {
    margin-top: 20px;
  }
  .dialog-footer {
    margin-top: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-dialog {
    .el-form {
      .el-input,
      .el-select {
        width: 80%;
      }
    }
  }
}
</style>