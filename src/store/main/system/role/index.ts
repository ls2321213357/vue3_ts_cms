import { defineStore } from 'pinia'
import { getRoleInfoList } from '@/service/main/system/role'
import type { getRoleListTypes, roleStoreTypes } from '@/types/role'
import { messageTip } from '@/utils/format'
const roleStore = defineStore('role', {
  state: (): roleStoreTypes => ({
    roleList: []
  }),
  actions: {
    async getRoleList(data: getRoleListTypes = {}) {
      try {
        const res = await getRoleInfoList(data)
        if (!res.data) {
          messageTip('服务器错误', 'error')
        } else {
          if (res.data.list.length === 0) {
            messageTip('暂无数据', 'warning')
          } else {
            messageTip('获取角色列表成功', 'success')
            this.roleList = res.data.list
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
})
export default roleStore
