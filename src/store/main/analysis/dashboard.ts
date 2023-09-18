import { defineStore } from 'pinia'
import {
  getAmountList,
  getGoodsCategoryCount,
  getGoodsFavorCount,
  getGoodsSalesCount,
  getGoodsSalesTopTen,
  getAddressGoodsSales
} from '@/service/main/analysis/dashboard'
import type { dashboardDataTypes } from '@/types/dashboard'
const useDashBoard = defineStore('dashBoard', {
  state: (): dashboardDataTypes => ({
    amountList: [],
    goodsCategoryList: [],
    goodsSalesList: [],
    goodsFavorList: [],
    goodsSakesTopTen: [],
    goodsAddressSales: []
  }),
  actions: {
    //获取商品数据统计数量
    async getAmountListHandler() {
      const res = await getAmountList()
      try {
        if (res.data.length > 0) {
          this.amountList = res.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    //获取每个分类商品的个数
    async getGoodsCategoryList() {
      const res = await getGoodsCategoryCount()
      try {
        if (res.data.length > 0) {
          this.goodsCategoryList = res.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    //获取分类商品的销量
    async getGoodsSalesList() {
      const res = await getGoodsSalesCount()
      try {
        if (res.data.length > 0) {
          this.goodsSalesList = res.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    //获取每个分类商品的收藏
    async getGoodsFavorList() {
      const res = await getGoodsFavorCount()
      try {
        if (res.data.length > 0) {
          this.goodsFavorList = res.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    //获取销量前10的商品数量
    async getGoodsSakesTopTen() {
      const res = await getGoodsSalesTopTen()
      try {
        if (res.data.length > 0) {
          this.goodsSakesTopTen = res.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    //获取不同城市的销量数据
    async getGoodsAddressSales() {
      const res = await getAddressGoodsSales()
      try {
        if (res.data.length > 0) {
          this.goodsAddressSales = res.data
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
})
export default useDashBoard
