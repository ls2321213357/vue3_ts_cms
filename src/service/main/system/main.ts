//根据页面进行增删改查
import request from '@/service'
/**
 *
 * @param data 查询条件
 * @returns 列表
 */
export function searchList(pageName: string, data: any) {
  return request.post({ url: `/${pageName}/list`, data })
}
/**
 *
 * @param data 新建信息
 * @returns
 */
export function createItem(pageName: string, data: any) {
  return request.post({ url: `/${pageName}`, data })
}
/**
 * 删除
 * @param id id
 * @returns
 */
export function deleteItem(pageName: string, id: number) {
  return request.delete({ url: `/${pageName}/${id}` })
}
/**
 * 修改
 * @param data 信息
 * @returns
 */
export function editItem(pageName: string, id: number, data: any) {
  return request.patch({ url: `/${pageName}/${id}`, data })
}

export function getEntireMenus() {
  return request.post({ url: '/menu/list' })
}
