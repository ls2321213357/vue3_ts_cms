import { getDepartmentList } from '@/service/main/system/department'
import { defineStore } from 'pinia'
import type { departmentStoreTypes, getDepartListTypes } from '@/types/department'
import { messageTip } from '@/utils/format'
const departmentStore = defineStore('department', {
  state: (): departmentStoreTypes => ({
    departmentList: []
  }),
  actions: {
    //获取部门列表
    async getDepartmentInfoList(data: getDepartListTypes = {}) {
      const res = await getDepartmentList(data)
      if (!res.data) {
        messageTip('服务器错误', 'error')
        return Promise.reject(new Error('系统出错'))
      } else {
        if (res.data.list.length === 0) {
          messageTip('暂无数据', 'warning')
        } else {
          messageTip('获取角色列表成功', 'success')
        }
      }
      this.departmentList = res.data.list
    }
  }
})
export default departmentStore
