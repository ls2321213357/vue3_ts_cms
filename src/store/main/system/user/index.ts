import { defineStore } from 'pinia'
import { searchUserList, createUserItem } from '@/service/main/system/user'
import type { searchUserListTypes, crateUserTypes } from '@/types/login'
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
    async getUserInfoList(searchObj: searchUserListTypes) {
      const res = await searchUserList(searchObj)
      if (!res.data) {
        return Promise.reject(new Error('系统出错'))
      }
      this.userInfoSum = res.data.totalCount
      this.userInfoList = res.data.list
    },
    //创建用户
    async createUserItem(createUserObj: crateUserTypes) {
      const res = await createUserItem(createUserObj)
      if (!res.data) {
        return Promise.reject(new Error('系统出错'))
      }
    }
  }
})
export default userInfoStore
