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
  return request.post({ url: '/user', data })
}

export function deleteUserItem(id:number){
  return request
}
