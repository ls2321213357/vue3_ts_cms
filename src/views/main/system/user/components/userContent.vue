<template>
  <div class="container">
    <div class="ctx-header">
      <h2>用户列表</h2>
      <el-button type="primary" @click="createUserItem">新建用户</el-button>
    </div>
    <div class="ctx-table">
      <el-table ref="multipleTableRef" :data="userInfoList" style="width: 100%" border>
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" width="50" align="center" />
        <el-table-column property="name" label="用户名" align="center" />
        <el-table-column property="realname" label="真实名" align="center" />
        <el-table-column property="cellphone" label="手机号码" align="center" />
        <el-table-column property="cellphone" label="状态" align="center" width="120">
          <template #default="scope" align="center">
            <el-button :type="scope.row.enable === 1 ? 'success' : 'danger'"
              >{{ scope.row.enable === 1 ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template #default="scope">{{ formatUTC(scope.row.createAt) }}</template>
        </el-table-column>
        <el-table-column label="更新时间" align="center">
          <template #default="scope">{{ formatUTC(scope.row.updateAt) }}</template>
        </el-table-column>
        <el-table-column label="操作" width="180" class="btn" align="center">
          <template #default="scope">
            <el-button link :icon="Edit" type="primary" @click="editUserItem(scope.row)"
              >编辑</el-button
            >
            <el-button link :icon="Delete" type="danger" @click="deleteUserItem(scope.row.id)"
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
        layout="total, sizes, prev, pager, next,->"
        :total="userInfoSum"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { storeToRefs } from 'pinia'
import userInfoStore from '@/store/main/system/user'
import departmentStore from '@/store/main/system/department'
import { formatUTC } from '@/utils/format'
import { Delete, Edit } from '@element-plus/icons-vue'
const searchObj = reactive({
  offset: 0,
  size: 10
})
const userInfo = userInfoStore()
//获取用户信息列表
userInfo.getUserInfoList(searchObj)
const { userInfoList, userInfoSum } = storeToRefs(userInfo)

//更改一页展示几条数据
const handleSizeChange = (val: number) => {
  searchObj.size = val
  userInfo.getUserInfoList(searchObj)
}
//更改当前页
const handleCurrentChange = (val: number) => {
  searchObj.offset = val - 1
  userInfo.getUserInfoList(searchObj)
}
//编辑操作
const editUserItem = (item: any) => {
  console.log(item)
}
//删除操作
const deleteUserItem = (id: number) => {
  console.log(id)
}
//新建用户
//获取部门列表
const departmentInfo = departmentStore()
departmentInfo.getDepartmentInfoList()
const createUserObj = reactive({
  name: 'james',
  realname: '詹姆斯',
  password: '123456',
  cellphone: 13322223338,
  departmentId: 1,
  roleId: 1
})
const { departmentList } = storeToRefs(departmentInfo)
const createUserItem = () => {}
</script>
<style scoped lang="less">
.container {
  height: calc(100vh - 320px);
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
    .btn {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .ctx-page {
    margin-top: 20px;
  }
}
</style>
