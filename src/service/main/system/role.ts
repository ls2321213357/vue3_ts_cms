import request from '@/service'
import type { getRoleListTypes } from '@/types/role'
/**
 * 获取角色列表
 * @param data
 * @returns
 */
export function getRoleInfoList(data: getRoleListTypes) {
  return request.post({ url: '/role/list', data })
}
