<template>
  <div class="panel-phone">
    <el-form :model="phoneObj" ref="accountForm" status-icon :rules="phoneRules" label-width="70">
      <el-form-item label="手机号" prop="name">
        <el-input v-model.trim="phoneObj.name" clearable />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="phone-pwd">
          <el-input class="phone-input" v-model.trim="phoneObj.code" clearable />
          <el-button class="btn" type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
const accountForm = ref<FormInstance>()
const phoneObj = reactive({
  name: '',
  code: ''
})
const phoneRules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^[1][3,4,5,7,8][0-9]{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
})
</script>
<style scoped lang="less">
.panel-phone {
  width: 100%;
  height: 100%;
  .phone-pwd {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .phone-input {
      width: 50%;
    }
    .btn {
      width: 40%;
    }
  }
}
</style>
