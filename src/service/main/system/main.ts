//根据页面进行增删改查
import request from '@/service'
/**
 *
 * @param data 查询条件
 * @returns 用户列表
 */
export function searchList(pageName: string, data: any) {
  return request.post({ url: `/${pageName}/list`, data })
}
/**
 *
 * @param data 新建的用户信息
 * @returns
 */
export function createItem(pageName: string, data: any) {
  return request.post({ url: `/${pageName}`, data })
}
/**
 * 删除用户
 * @param id 用户id
 * @returns
 */
export function deleteItem(pageName: string, id: number) {
  return request.delete({ url: `/${pageName}/${id}` })
}
/**
 * 修改用户
 * @param data 用户信息
 * @returns
 */
export function editItem(pageName: string, data: any) {
  return request.patch({ url: `/${pageName}/${data.id}`, data })
}
