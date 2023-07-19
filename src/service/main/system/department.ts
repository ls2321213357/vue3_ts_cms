import request from '@/service'
//获取部门列表
export function getDepartmentList() {
  return request.post({ url: '/department/list' })
}
