<template>
  <div class="login-panel" @keyup.enter="loginHandler">
    <h1 class="title">后台管理系统</h1>
    <div class="tabs">
      <el-tabs v-model="activeName" type="border-card" stretch>
        <el-tab-pane name="account">
          <template #label>
            <div class="label">
              <el-icon><User /></el-icon>
              <span class="text">帐号登录</span>
            </div>
          </template>
          <panel-account ref="accountRef" :isKeepPwd="isKeepPwd"></panel-account>
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon><Cellphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <panel-phone></panel-phone>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="control-account">
      <el-checkbox v-model="isKeepPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="login-btn" size="large" type="primary" @click="loginHandler"
      >立即登录</el-button
    >
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import PanelAccount from './panelAccount.vue'
import PanelPhone from './panelPhone.vue'
import { localCache } from '@/utils/cache'
let isKeepPwd = ref<boolean>(Boolean(localCache.getCache('isKeepPwd') == 1 ? true : false))
watch(isKeepPwd, (newVal) => {
  localCache.setCache('isKeepPwd', newVal === true ? '1' : '0')
})
const activeName = ref('account')
//typeof PanelAccount相当于返回一个构造器  InstanceType<构造器> 返回为构造器返回值的实例 所以ref组件时就使用这种写法
const accountRef = ref<InstanceType<typeof PanelAccount>>()
const loginHandler = () => {
  if (activeName.value === 'account') {
    accountRef.value?.loginHandler()
  } else {
    console.log('手机号登录')
  }
}
</script>
<style scoped lang="less">
.login-panel {
  width: 330px;
  margin-bottom: 150px;
  .title {
    text-align: center;
    margin-bottom: 15px;
  }
  .label {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .text {
    margin-left: 8px;
  }
  .control-account {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .login-btn {
    width: 100%;
    margin-top: 20px;
  }
}
</style>
