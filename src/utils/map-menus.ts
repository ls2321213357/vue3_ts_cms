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
