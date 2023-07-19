import request from '@/service'
import type { searchUserListTypes, crateUserTypes } from '@/types/login'
/**
 *
 * @param data 查询条件
 * @returns 用户列表
 */
export function searchUserList(data: searchUserListTypes) {
  return request.post({ url: '/users/list', data })
}
/**
 *
 * @param data 新建的用户信息
 * @returns
 */
export function createUserItem(data: crateUserTypes) {
  return request.post({ url: '/users', data })
}
/**
 * 删除用户
 * @param id 用户id
 * @returns
 */
export function deleteUserItem(id: number) {
  return request.patch({ url: `/users/${id}` })
}
/**
 * 修改用户
 * @param data 用户信息
 * @returns
 */
export function editUserInfo(data: any) {
  return request.patch({ url: `/users/${data.id}`, data })
}
