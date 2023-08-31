import type { breadCrumbsTypes } from '@/types/login'

/**
 * 根据路径去匹配需要显示的菜单
 * @param path 需要匹配的路径
 * @param userMenus 菜单
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const menuChild of menu.children) {
      if (menuChild.url === path) {
        return menuChild.id + ''
      }
    }
  }
  return undefined
}
/**
 * 根据路径去匹配需要显示的面包屑
 * @param path 需要匹配的路径
 * @param userMenus 菜单
 */
export function mapPathToCrumb(path: string, userMenus: any[]) {
  let breadCrumbs: breadCrumbsTypes[] = []
  for (const menu of userMenus) {
    for (const menuChild of menu.children) {
      if (menuChild.url === path) {
        breadCrumbs.push({ name: menu.name, nameChild: menuChild.name, path: menuChild.url })
        return breadCrumbs
      }
    }
  }
}
/**
 * 将获取的菜单映射成按钮的权限
 * @param menu  获取的菜单
 * @returns 权限的按钮
 */
export function mapMenuListToPermissionList(menu: any[]) {
  const permissionList: string[] = []
  //执行递归
  function recurseGetPermission(menu: any[]) {
    for (const item of menu) {
      if (item.type === 3) {
        permissionList.push(item.permission)
      } else {
        recurseGetPermission(item.children ?? [])
      }
    }
  }
  recurseGetPermission(menu)
  return permissionList
}
