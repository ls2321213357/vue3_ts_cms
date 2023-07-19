import { getDepartmentList } from '@/service/main/system/department'
import { defineStore } from 'pinia'
interface departmentStoreTypes {
  departmentList: any[]
}
const departmentStore = defineStore('department', {
  state: (): departmentStoreTypes => ({
    departmentList: []
  }),
  actions: {
    //获取部门列表
    async getDepartmentInfoList() {
      const res = await getDepartmentList()
      if (!res.data) {
        return Promise.reject(new Error('请求部门列表失败'))
      }
      this.departmentList = res.data.list
    }
  }
})
export default departmentStore
