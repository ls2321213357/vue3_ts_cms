import request from '@/service'
export function getAmountList() {
  return request.get({ url: '/goods/amount/list' })
}
