import {
  getDepartmentList,
  deleteDepartmentItem,
  editDepartmentItem,
  createDepartmentItem
} from '@/service/main/system/department'
import { defineStore } from 'pinia'
import type {
  departmentStoreTypes,
  getDepartmentListTypes,
  createDepartmentTypes
} from '@/types/department'
import { messageTip } from '@/utils/format'
const departmentStore = defineStore('department', {
  state: (): departmentStoreTypes => ({
    departmentList: [],
    departmentSum: 0
  }),
  actions: {
    //获取部门列表
    async getDepartmentInfoList(data: getDepartmentListTypes) {
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
      this.departmentSum = res.data.totalCount
    },
    //增加部门
    async createDepartmentItem(createObj: createDepartmentTypes) {
      const res = await createDepartmentItem(createObj)
      if (!res.data) {
        messageTip('创建失败', 'error')
        return Promise.reject(new Error('系统出错'))
      } else {
        messageTip(res.data, 'success')
      }
    },
    //删除部门
    async deleteDepartmentInfoItem(id: number) {
      const res = await deleteDepartmentItem(id)
      if (!res.data) {
        messageTip('删除失败', 'error')
        return Promise.reject(new Error('系统出错'))
      } else {
        messageTip(res.data, 'success')
      }
    },
    //修改用户信息
    async editDepartmentItem(editObj: any) {
      const res = await editDepartmentItem(editObj)
      if (!res.data) {
        messageTip('修改失败', 'error')
        return Promise.reject(new Error('系统出错'))
      } else {
        messageTip(res.data, 'success')
      }
    }
  }
})
export default departmentStore
