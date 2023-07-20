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
        layout="total, sizes, prev, pager, next"
        :total="userInfoSum"
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
        <el-form ref="createForm" :model="createUserObj" :rules="createRules" label-width="80px">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="createUserObj.name"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="createUserObj.realname"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="createUserObj.password"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="cellphone">
            <el-input v-model="createUserObj.cellphone"></el-input>
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId">
            <el-select v-model="createUserObj.roleId" placeholder="请选择">
              <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门" prop="departmentId">
            <el-select v-model="createUserObj.departmentId" placeholder="请选择">
              <el-option
                v-for="item in departmentList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog(createForm)">取 消</el-button>
        <el-button type="primary" @click="fetchUserHandler(createForm)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import userInfoStore from '@/store/main/system/user'
import departmentStore from '@/store/main/system/department'
import roleStore from '@/store/main/system/role'
import { formatUTC } from '@/utils/format'
import { Delete, Edit } from '@element-plus/icons-vue'
import type { userSearchTypes, userQueryTypes } from '@/types/user'
import type { ElForm } from 'element-plus'
const createForm = ref<InstanceType<typeof ElForm>>()
const createRules = reactive({
  realname: [{ required: true, message: '请输入真实名字', trigger: 'blur' }]
})
let isShowDialog = ref<boolean>(false)
const searchObj: userSearchTypes = reactive({
  offset: 0,
  size: 10
})
//判断是新建用户还是编辑用户
const isNewUser = ref<boolean>(true)
const userInfo = userInfoStore()
//获取用户信息列表
userInfo.getUserInfoList(searchObj)
const { userInfoList, userInfoSum } = storeToRefs(userInfo)
const fetchSearchHandler = (searchQueryObj: userQueryTypes = {}) => {
  userInfo.getUserInfoList({ ...searchObj, ...searchQueryObj })
}
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
const deleteUserItem = (id: number) => {
  userInfo.deleteUserItem(id).then(() => {
    fetchSearchHandler()
  })
}
//新建用户
const departmentInfo = departmentStore()
const roleInfo = roleStore()
let createUserObj = reactive({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  departmentId: 1,
  roleId: 1
})
//编辑操作
const editUserItem = (item: any) => {
  isNewUser.value = false
  isShowDialog.value = true
  createUserObj = item
  getDepartAndRole()
}
const cancelDialog = (createForm: any) => {
  isShowDialog.value = false
  if (!createForm) return
  createForm.resetFields()
}
const getDepartAndRole = () => {
  //获取部门列表
  departmentInfo.getDepartmentInfoList()
  //获取角色列表
  roleInfo.getRoleList()
}
const createUserItem = () => {
  isNewUser.value = true
  getDepartAndRole()
  isShowDialog.value = true
}
const { departmentList } = storeToRefs(departmentInfo)
const { roleList } = storeToRefs(roleInfo)
const fetchUserHandler = async (createForm: any) => {
  await createForm.validate((valid: any) => {
    if (valid) {
      isNewUser.value
        ? userInfo.createUserItem(createUserObj).then(() => {
            createForm.resetFields()
            createForm.clearValidate()
            isShowDialog.value = false
            fetchSearchHandler()
          })
        : userInfo.editUserItem(createUserObj).then(() => {
            createForm.resetFields()
            createForm.clearValidate()
            isShowDialog.value = false
            fetchSearchHandler()
          })
    }
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
