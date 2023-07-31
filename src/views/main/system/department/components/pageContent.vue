<template>
  <div class="container">
    <div class="ctx-header">
      <h2>部门列表</h2>
      <el-button type="primary" @click="createUserItem">新建部门</el-button>
    </div>
    <div class="ctx-table">
      <el-table ref="multipleTableRef" :data="departmentList" style="width: 100%" border>
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" width="50" align="center" />
        <el-table-column property="name" label="部门名称" align="center" />
        <el-table-column property="leader" label="部门领导" align="center" />
        <el-table-column property="parentId" label="部门编号" align="center" />
        <el-table-column label="创建时间" align="center">
          <template #default="scope">{{ formatUTC(scope.row.createAt) }}</template>
        </el-table-column>
        <el-table-column label="更新时间" align="center">
          <template #default="scope">{{ formatUTC(scope.row.updateAt) }}</template>
        </el-table-column>
        <el-table-column label="操作" width="180" class="btn" align="center">
          <template #default="scope">
            <el-button link :icon="Edit" type="primary" @click="editItemHandler(scope.row)"
              >编辑</el-button
            >
            <el-button link :icon="Delete" type="danger" @click="deleteItemHandler(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="ctx-page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        v-model:page-size="searchObj.size"
        :current-page.sync="searchObj.offset + 1"
        :page-sizes="[10, 15, 20, 25]"
        layout="total, sizes, prev, pager, next"
        :total="departmentSum"
      >
      </el-pagination>
    </div>
    <el-dialog
      :title="isNewUser ? '新建用户' : '编辑用户'"
      v-model="isShowDialog"
      width="20%"
      center
    >
      <div>
        <el-form ref="createForm" :model="departmentObj" label-width="80px">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="departmentObj.name"></el-input>
          </el-form-item>
          <el-form-item label="部门领导" prop="leader">
            <el-input v-model="departmentObj.leader"></el-input>
          </el-form-item>
          <el-form-item label="上级部门" prop="parentId">
            <el-input v-model="departmentObj.parentId"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog(createForm)">取 消</el-button>
        <el-button type="primary" @click="fetchSearchInfoHandler(createForm)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, toRef } from 'vue'
import { storeToRefs } from 'pinia'
import departmentStore from '@/store/main/system/department'
import { formatUTC, getObjectCommon } from '@/utils/format'
import { Delete, Edit } from '@element-plus/icons-vue'
import type {
  getDepartmentListTypes,
  createDepartmentTypes,
  searchDepartmentTypes
} from '@/types/department'
import type { ElForm } from 'element-plus'
const createForm = ref<InstanceType<typeof ElForm>>()
const departmentInfo = departmentStore()
let isShowDialog = ref<boolean>(false)
//判断是新建用户还是编辑用户
const isNewUser = ref<boolean>(true)
const searchObj: getDepartmentListTypes = reactive({
  offset: 0,
  size: 10
})
const fetchSearchHandler = (searchQueryObj: searchDepartmentTypes = {}) => {
  //获取部门列表
  departmentInfo.getDepartmentInfoList({ ...searchObj, ...searchQueryObj })
}
//获取部门列表
fetchSearchHandler()
const { departmentList, departmentSum } = storeToRefs(departmentInfo)
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
  departmentInfo.deleteDepartmentInfoItem(id).then(() => {
    fetchSearchHandler()
  })
}
//部门信息
let departmentObj: createDepartmentTypes = reactive({
  name: '',
  parentId: 1,
  leader: '',
  id: 0
})
//编辑操作
const editItemHandler = (item: any) => {
  isNewUser.value = false
  isShowDialog.value = true
  departmentObj = toRef(getObjectCommon(item, departmentObj)).value
}
//新建操作
const createUserItem = () => {
  isNewUser.value = true
  isShowDialog.value = true
}
//取消弹窗
const cancelDialog = (createForm: any) => {
  isShowDialog.value = false
  if (!createForm) return
  createForm.resetFields()
}
//创建和编辑
const fetchSearchInfoHandler = async (createForm: any) => {
  isNewUser.value
    ? departmentInfo.createDepartmentItem(departmentObj).then(() => {
        createForm.resetFields()
        isShowDialog.value = false
        fetchSearchHandler()
      })
    : departmentInfo.editDepartmentItem(departmentObj).then(() => {
        createForm.resetFields()
        isShowDialog.value = false
        fetchSearchHandler()
      })
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
