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
          <template v-for="item in dialogConfig.formList" :key="item.label">
            <template v-if="item.type === 'input'">
              <el-form-item :label="item.label" :prop="item.prop">
                <el-input v-model="dialogObj[item.prop]"></el-input>
              </el-form-item>
            </template>
            <template v-if="item.type === 'select'">
              <el-form-item :label="item.label" :prop="item.prop">
                <el-select v-model="dialogObj[item.prop]" placeholder="请选择">
                  <el-option
                    v-for="itemChild in prop[item.data]"
                    :key="itemChild.id"
                    :label="itemChild.name"
                    :value="itemChild.id"
                  />
                </el-select>
              </el-form-item>
              <!-- <slot :name="item.slotName"></slot> -->
            </template>
          </template>
          <template v-if="dialogConfig.slotName === 'tree'">
            <div class="tree">
              <slot name="menuList"></slot>
            </div>
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
    slotName?: string
    formList: any[]
  }
  roleList?: any[]
  departmentList?: any[]
  otherInfo?: any
}
const createForm = ref<InstanceType<typeof ElForm>>()
//判断是新建用户还是编辑用户
const systemInfo = systemStore()
const prop = defineProps<Iprop>()
const emit = defineEmits(['createSuccess', 'editSuccess'])
//部门信息
let dialogObj: any = reactive({})
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
  //如果有角色权限的就进行拼接,没有的话就和以前一样
  let dataObj = prop.otherInfo ? { ...prop.otherInfo, ...dialogObj } : { ...dialogObj }
  //新建操作与编辑操作
  prop.dialogConfig.isNewUser
    ? systemInfo.createInfoItem(prop.dialogConfig.pageName, dataObj).then(() => {
        createForm.resetFields()
        prop.dialogConfig.isShowDialog = false
        emit('createSuccess')
      })
    : systemInfo.editInfoItem(prop.dialogConfig.pageName, id.value, dataObj).then(() => {
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
<style scoped lang="less">
.tree {
  width: 60%;
  position: relative;
  left: 72px;
  top: 0px;
}
</style>
