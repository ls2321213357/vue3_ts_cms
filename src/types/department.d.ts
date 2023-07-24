export interface getDepartmentListTypes {
  offset: number
  size: number
  searchQuery?: searchDepartmentTypes
}
export interface searchDepartmentTypes {
  name?: string
  leader?: string
  createTime?: string[]
}
export interface departmentStoreTypes {
  departmentList: any[]
  departmentSum: number
}

export interface editDepartmentTypes {
  id: number
  leader?: string
  parentId?: number
}

export interface createDepartmentTypes {
  name: string
  parentId: number
  leader: string
}
