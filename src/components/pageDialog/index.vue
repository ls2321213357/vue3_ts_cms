<template>
  <div>
    <el-dialog
      :title="(prop.dialogConfig.isNewUser ? `新建` : '修改') + prop.dialogConfig.name"
      v-model="prop.dialogConfig.isShowDialog"
      width="20%"
      center
    >
      <div>
        <el-form ref="createForm" :model="dialogObj" label-width="80px">
          <template v-for="item in prop.dialogConfig.formList" :key="item.label">
            <template v-if="item.type === 'input'">
              <el-form-item :label="item.label" :prop="item.prop">
                <el-input v-model="dialogObj[item.prop]"></el-input>
              </el-form-item>
            </template>
            <template v-if="item.type === 'tree'">
              <div>
                
              </div>
            </template>
          </template>
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
    name: string
    isNewUser: boolean
    isShowDialog: boolean
    pageName: string
    formList: any[]
  }
}
const createForm = ref<InstanceType<typeof ElForm>>()
//判断是新建用户还是编辑用户
const systemInfo = systemStore()
const prop = defineProps<Iprop>()
const emit = defineEmits(['createSuccess', 'editSuccess'])
//部门信息
let dialogObj: any = {}
for (const item of prop.dialogConfig.formList) {
  if (item.prop === 'parentId') {
    dialogObj[item.prop] = 0
  }
  dialogObj[item.prop] = ''
}
//表单id
let id = ref<number>(0)
//编辑操作
const editItemHandler = (item: any) => {
  prop.dialogConfig.isNewUser = false
  prop.dialogConfig.isShowDialog = true
  dialogObj = toRef(getObjectCommon(item, dialogObj)).value
  id.value = item.id
}
//新建操作
const createUserItem = () => {
  dialogObj = reactive({
    name: '',
    parentId: '',
    leader: ''
  })
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
    ? systemInfo.createInfoItem(prop.dialogConfig.pageName, dialogObj).then(() => {
        createForm.resetFields()
        prop.dialogConfig.isShowDialog = false
        emit('createSuccess')
      })
    : systemInfo.editInfoItem(prop.dialogConfig.pageName, id.value, dialogObj).then(() => {
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
