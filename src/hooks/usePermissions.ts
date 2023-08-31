import userLoginStore from '@/store/login'
export function usePermissions(permission: string) {
  const loginStore = userLoginStore()
  const { permissionList } = loginStore
  return Boolean(permissionList.find((item) => item.includes(permission)))
}
