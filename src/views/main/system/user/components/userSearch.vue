<template>
  <div class="user-search">
    <el-form
      label-position="right"
      label-width="80px"
      :model="searchForm"
      size="large"
      ref="formLine"
    >
      <el-row :gutter="200">
        <el-col :span="8">
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="searchForm.userName" placeholder="请输入用户名" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realityName">
            <el-input v-model="searchForm.realityName" placeholder="请输入真实名" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号" prop="iphone">
            <el-input v-model="searchForm.iphone" placeholder="请输入手机号" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="state">
            <el-select v-model="searchForm.state" placeholder="请选择" style="width: 100%">
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="注册时间" prop="createTime">
            <el-date-picker
              v-model="searchForm.createTime"
              type="daterange"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              :default-value="[new Date(2023, 7, 18), new Date(2023, 7, 25)]"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <div class="btn">
              <el-button @click="resetForm(formLine)"
                ><el-icon @animationend="refresh"
                  ><Refresh :class="isRefresh ? 'refresh' : ''" /></el-icon
                >重置</el-button
              >
              <el-button type="primary" @click="searchHandler"
                ><el-icon><Search /></el-icon>查询</el-button
              >
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import type { ElForm } from 'element-plus'
import userInfoStore from '@/store/main/system/user'
const userInfo = userInfoStore()
const formLine = ref<InstanceType<typeof ElForm>>()
let searchForm = reactive({
  userName: '', //用户名
  realityName: '', //真实姓名
  iphone: '',
  state: 1,
  createTime: ''
})

const isRefresh = ref<boolean>(false)
//重置表单
const resetForm = (formLine: any) => {
  if (!formLine) return
  isRefresh.value = true
  formLine.resetFields()
}
//重置动画
const refresh = () => {
  isRefresh.value = false
}
const searchHandler = async () => {

}

</script>
<style scoped lang="less">
.user-search {
  background-color: #fff;
  padding: 20px;
  .btn {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    .refresh {
      animation: refresh 1s 1;
    }
    @keyframes refresh {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(-360deg);
      }
    }
  }
}
</style>
