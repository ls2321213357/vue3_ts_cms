import { defineStore } from 'pinia'
import {
  searchUserList,
  createUserItem,
  editUserInfo,
  deleteUserItem
} from '@/service/main/system/user'
import type { userSearchTypes, crateUserTypes } from '@/types/user'
import { messageTip } from '@/utils/format'
interface userInfoTypes {
  userInfoList: any[]
  userInfoSum: number
}
const userInfoStore = defineStore('user', {
  state: (): userInfoTypes => ({
    userInfoList: [],
    userInfoSum: 0
  }),
  actions: {
    //查询用户列表
    async getUserInfoList(searchObj: userSearchTypes) {
      const res = await searchUserList(searchObj)
      if (!res.data) {
        messageTip('服务器错误', 'error')
        return Promise.reject(new Error('系统出错'))
      } else {
        if (res.data.list.length === 0) {
          messageTip('暂无数据', 'warning')
        } else {
          messageTip('获取用户列表成功', 'success')
        }
      }
      this.userInfoSum = res.data.totalCount
      this.userInfoList = res.data.list
    },
    //创建用户
    async createUserItem(createUserObj: crateUserTypes) {
      const res = await createUserItem(createUserObj)
      if (!res.data) {
        messageTip('创建失败', 'error')
        return Promise.reject(new Error('系统出错'))
      } else {
        messageTip(res.data, 'success')
      }
    },
    //删除用户
    async deleteUserItem(id: number) {
      const res = await deleteUserItem(id)
      if (!res.data) {
        messageTip('删除失败', 'error')
        return Promise.reject(new Error('系统出错'))
      } else {
        messageTip(res.data, 'success')
      }
    },
    //修改用户信息
    async editUserItem(editUserObj: any) {
      const res = await editUserInfo(editUserObj)
      if (!res.data) {
        messageTip('修改失败', 'error')
        return Promise.reject(new Error('系统出错'))
      } else {
        messageTip(res.data, 'success')
      }
    }
  }
})
export default userInfoStore
