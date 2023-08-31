import request from '@/service'
import type { getDepartmentListTypes } from '@/types/department'
export function getDepartmentList(data: getDepartmentListTypes) {
  return request.post({ url: '/department/list', data })
}
