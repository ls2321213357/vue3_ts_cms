import {
  searchList,
  deleteItem,
  editItem,
  createItem,
  getEntireMenus
} from '@/service/main/system/main'
import { defineStore } from 'pinia'
import { messageTip } from '@/utils/format'
const systemStore = defineStore('system', {
  state: () => ({
    dataList: [],
    dataSum: 0,
    menuList: []
  }),
  actions: {
    //获取列表
    async getInfoList(pageName: string, data: any) {
      const dataInfo = { ...data, offset: data.offset - 1, size: data.size }
      const res = await searchList(pageName, dataInfo)
      if (!res.data) {
        messageTip('服务器错误', 'error')
        return Promise.reject(new Error('系统出错'))
      } else {
        if (res.data.list.length === 0) {
          messageTip('暂无数据', 'warning')
        } else {
          messageTip('获取成功', 'success')
        }
      }
      this.dataList = res.data.list
      this.dataSum = res.data.totalCount
    },
    //增加
    async createInfoItem(pageName: string, createObj: any) {
      const res = await createItem(pageName, createObj)
      if (!res.data) {
        messageTip('创建失败', 'error')
        return Promise.reject(new Error('系统出错'))
      }
    },
    //删除
    async deleteInfoItem(pageName: string, id: number) {
      const res = await deleteItem(pageName, id)
      if (!res.data) {
        messageTip('删除失败', 'error')
        return Promise.reject(new Error('系统出错'))
      } else {
        messageTip(res.data, 'success')
      }
    },
    //修改
    async editInfoItem(pageName: string, id: number, editObj: any) {
      const res = await editItem(pageName, id, editObj)
      if (!res.data) {
        messageTip('修改失败', 'error')
        return Promise.reject(new Error('系统出错'))
      } else {
        messageTip(res.data, 'success')
      }
    },
    //获取菜单列表
    async getEntireMenusList() {
      const res = await getEntireMenus()
      if (!res.data) {
        messageTip('服务器错误', 'error')
        return Promise.reject(new Error('系统出错'))
      } else {
        if (res.data.list.length === 0) {
          messageTip('暂无数据', 'warning')
        }
      }
      this.menuList = res.data.list
    }
  }
})
export default systemStore
