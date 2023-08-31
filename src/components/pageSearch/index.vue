<template>
  <div class="user-search" v-if="isQuery">
    <el-form
      label-position="right"
      label-width="80px"
      :model="searchForm"
      size="large"
      ref="formLine"
    >
      <el-row :gutter="200">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="6">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                ></el-input>
              </template>
              <template v-if="item.type === 'select'">
                <el-select v-model="searchForm[item.prop]" placeholder="请选择" style="width: 100%">
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  :start-placeholder="item.startName"
                  :end-placeholder="item.endName"
                  value-format="YYYY-MM-DD"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
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
import { usePermissions } from '@/hooks/usePermissions'
interface Iprops {
  searchConfig: {
    formItems: any[]
    pageName: string
  }
}
const formLine = ref<InstanceType<typeof ElForm>>()
const emit = defineEmits(['searchHandler', 'resetHandler'])
const prop = defineProps<Iprops>()
const isQuery = usePermissions(`${prop.searchConfig.pageName}:query`)
//对传进来的prop进行遍历,进行对象属性的赋值
const initialForm: any = {}
for (const initial of prop.searchConfig.formItems) {
  initialForm[initial.prop] = ''
}
let searchForm = reactive(initialForm)
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
