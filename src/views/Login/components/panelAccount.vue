<template>
  <div>
    <el-form :model="accountObj" ref="accountForm" :rules="accountRules" label-width="60">
      <el-form-item label="账号" prop="name">
        <el-input v-model.trim="accountObj.name" clearable />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" show-password v-model.trim="accountObj.password" clearable />
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
let props = defineProps(['isKeepPwd'])
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
//这个是导入类型
import type { FormRules, ElForm } from 'element-plus'
import userLoginStore from '@/store/login'
import type { AccountLoginTypes } from '@/types/login'
import { localCache } from '@/utils/cache'
import router from '@/router'
const accountForm = ref<InstanceType<typeof ElForm>>()
const accountObj = reactive<AccountLoginTypes>({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? ''
})
//从pinia导入后需要声明一下才能够继续使用
const userLogin = userLoginStore()
const accountRules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { pattern: /^[a-z0-9]{6,10}$/, message: '必须是6-10位数字或字母', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^[a-z0-9]{6,10}$/, message: '必须是6位10数字或字母', trigger: 'blur' }
  ]
})
const loginHandler = () => {
  accountForm.value?.validate((valid) => {
    if (valid) {
      userLogin.loginAccountHandler(accountObj).then(() => {
        if (props.isKeepPwd) {
          localCache.setCache('name', accountObj.name)
          localCache.setCache('password', accountObj.password)
        } else {
          if (localCache.getCache('name')) {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
        }
        router.push('/main')
      })
    } else {
      ElMessage({ message: '请检查是否正确输入账号和密码', type: 'warning' })
    }
  })
}
//使用这个能够将方法暴露出去 否则外界拿不到
defineExpose({
  loginHandler
})
</script>
<style scoped lang="less"></style>
