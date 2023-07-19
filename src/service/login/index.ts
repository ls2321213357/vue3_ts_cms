import request from '..'
import type { AccountLoginTypes } from '@/types/login'
/**
 *
 * @param accountObj 账号和密码
 * @returns 用户的id name token信息
 */
export function accountLoginRequest(accountObj: AccountLoginTypes) {
  return request.post({ url: '/login', data: accountObj })
}
/**
 *
 * @param id
 * @returns 获取用户信息
 */
export function getUserInfoRequest(id: number) {
  return request.get({ url: `/users/${id}` })
}
/**
 *
 * @param id
 * @returns 获取用户菜单
 */
export function getUserMenuTree(id: number) {
  return request.get({ url: `/role/${id}/menu` })
}
