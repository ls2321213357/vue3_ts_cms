import { defineStore } from 'pinia'
import { getAmountList } from '@/service/main/analysis/dashboard'
import type { dashboardDataTypes } from '@/types/dashboard'
const useDashBoard = defineStore('dashBoard', {
  state: (): dashboardDataTypes => ({
    amountList: []
  }),
  actions: {
    async getAmountListHandler() {
      const res = await getAmountList()
      try {
        if (res.data.length > 0) {
          this.amountList = res.data
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
})
export default useDashBoard
