import request from '@/service'
import type { getDepartListTypes } from '@/types/department'
//获取部门列表
export function getDepartmentList(data: getDepartListTypes) {
  return request.post({ url: '/department/list', data })
}
