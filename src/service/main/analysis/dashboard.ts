import request from '@/service'
/**
 *
 * @returns 获取商品数据统计的数量
 */
export function getAmountList() {
  return request.get({ url: '/goods/amount/list' })
}
/**
 *
 * @returns 获取每个分类商品的个数
 */
export function getGoodsCategoryCount() {
  return request.get({ url: '/goods/category/count' })
}
//获取分类商品的销量
export function getGoodsSalesCount() {
  return request.get({ url: '/goods/category/sale' })
}
//获取每个分类商品的收藏
export function getGoodsFavorCount() {
  return request.get({ url: '/goods/category/favor' })
}
//获取销量前10的商品数量
export function getGoodsSalesTopTen() {
  return request.get({ url: '/goods/sale/top10' })
}
//获取不同城市的销量数据
export function getAddressGoodsSales() {
  return request.get({ url: '/goods/address/sale' })
}
