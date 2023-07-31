<template>
  <div>
    <el-dialog
      :title="prop.dialogConfig.isNewUser ? '新建用户' : '编辑用户'"
      v-model="prop.dialogConfig.isShowDialog"
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
import { ref, reactive, toRef } from 'vue'
import type { ElForm } from 'element-plus'
import { getObjectCommon } from '@/utils/format'
import systemStore from '@/store/main/system'
interface Iprop {
  dialogConfig: {
    isNewUser: boolean
    isShowDialog: boolean
    pageName: string
  }
}
const createForm = ref<InstanceType<typeof ElForm>>()
//判断是新建用户还是编辑用户
const systemInfo = systemStore()
const prop = defineProps<Iprop>()
const emit = defineEmits(['createSuccess', 'editSuccess'])
//部门信息
let departmentObj = reactive({
  name: '',
  parentId: 1,
  leader: '',
  id: 0
})
//编辑操作
const editItemHandler = (item: any) => {
  prop.dialogConfig.isNewUser = false
  prop.dialogConfig.isShowDialog = true
  departmentObj = toRef(getObjectCommon(item, departmentObj)).value
}
//新建操作
const createUserItem = () => {
  prop.dialogConfig.isNewUser = true
  prop.dialogConfig.isShowDialog = true
}
//取消弹窗
const cancelDialog = (createForm: any) => {
  prop.dialogConfig.isShowDialog = false
  if (!createForm) return
  createForm.resetFields()
}
//创建和编辑
const fetchSearchInfoHandler = async (createForm: any) => {
  prop.dialogConfig.isNewUser
    ? systemInfo.createInfoItem(prop.dialogConfig.pageName, departmentObj).then(() => {
        createForm.resetFields()
        prop.dialogConfig.isShowDialog = false
        emit('createSuccess')
      })
    : systemInfo.editInfoItem(prop.dialogConfig.pageName, departmentObj).then(() => {
        createForm.resetFields()
        prop.dialogConfig.isShowDialog = false
        emit('editSuccess')
      })
}
defineExpose({
  editItemHandler,
  createUserItem
})
</script>
<style scoped lang="less"></style>
