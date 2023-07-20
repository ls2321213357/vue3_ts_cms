//查询用户列表
export interface userSearchTypes {
  offset: number
  size: number
  userQuery?: userQueryTypes
}
export interface userQueryTypes {
  userName?: string //用户名
  realityName?: string //真实姓名
  cellphone?: string
  enable?: number
  createTime?: string[]
}
export interface crateUserTypes {
  name: string
  realname: string
  password: string
  cellphone: string
  departmentId: number
  roleId: number
}
