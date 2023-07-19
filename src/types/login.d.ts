export interface AccountLoginTypes {
  name: string
  password: string
}
//面包屑
export interface breadCrumbsTypes {
  name: string
  nameChild: string
  path: string
}
//查询用户列表
export interface searchUserListTypes {
  offset: number
  size: number
  name?: string
  cellphone?: number
}
export interface crateUserTypes {
  name: string
  realname: string
  password: string
  cellphone: number
  departmentId: number
  roleId: number
}
