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
        <el-col :span="6">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="searchForm.name" placeholder="请输入用户名" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="部门领导" prop="leader">
            <el-input v-model="searchForm.leader" placeholder="请输入真实名" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="注册时间" prop="createAt">
            <el-date-picker
              v-model="searchForm.createAt"
              type="daterange"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
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
import { reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'
const formLine = ref<InstanceType<typeof ElForm>>()
let searchForm = reactive({
  name: '', //用户名
  leader: '', //真实姓名
  createAt: ''
})
const emit = defineEmits(['searchHandler', 'resetHandler'])
const isRefresh = ref<boolean>(false)
//重置表单
const resetForm = (formLine: any) => {
  if (!formLine) return
  isRefresh.value = true
  formLine.resetFields()
  emit('resetHandler')
}
//重置动画
const refresh = () => {
  isRefresh.value = false
}
//查询操作
const searchHandler = () => {
  emit('searchHandler', searchForm)
}
</script>
<style scoped lang="less">
.user-search {
  background-color: #fff;
  padding: 20px;
  height: 100px;
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
