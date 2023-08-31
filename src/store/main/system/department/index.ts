import { defineStore } from 'pinia'
import { getDepartmentList } from '@/service/main/system/department'
import type { getDepartmentListTypes, departmentStoreTypes } from '@/types/department'
import { messageTip } from '@/utils/format'
const departmentStore = defineStore('department', {
  state: (): departmentStoreTypes => ({
    departmentList: []
  }),
  actions: {
    async getDepartmentList(data: getDepartmentListTypes = {}) {
      try {
        const res = await getDepartmentList(data)
        if (!res.data) {
          messageTip('服务器错误', 'error')
        } else {
          if (res.data.list.length === 0) {
            messageTip('暂无数据', 'warning')
          } else {
            messageTip('获取角色列表成功', 'success')
            this.departmentList = res.data.list
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
})
export default departmentStore
