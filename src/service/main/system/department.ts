import request from '@/service'
import type {
  getDepartmentListTypes,
  editDepartmentTypes,
  createDepartmentTypes
} from '@/types/department'
//获取部门列表
export function getDepartmentList(data: getDepartmentListTypes) {
  return request.post({ url: '/department/list', data })
}
//删除部门
export function deleteDepartmentItem(id: number) {
  return request.delete({ url: `/department/${id}` })
}
//更新部门
export function editDepartmentItem(data: editDepartmentTypes) {
  return request.patch({ url: `/department/${data.id}`, data })
}
//增加部门
export function createDepartmentItem(data: createDepartmentTypes) {
  return request.post({ url: '/department', data })
}
