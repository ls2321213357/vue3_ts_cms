import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoRequest, getUserMenuTree } from '@/service/login'
import type { AccountLoginTypes } from '@/types/login'
import { localCache } from '@/utils/cache'
import { LOGIN_MENU, LOGIN_TOKEN, LOGIN_USERINFO } from '@/assets/global/constants'
import router from '@/router'
import { mapMenuListToPermissionList } from '@/utils/map-menus'
interface LoginState {
  token: string
  userInfo: any
  menu: any
  permissionList: string[]
}
const userLoginStore = defineStore('login', {
  state: (): LoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: localCache.getCache(LOGIN_USERINFO) ?? {},
    menu: localCache.getCache(LOGIN_MENU) ?? [],
    permissionList: localCache.getCache('permissionList') ?? []
  }),
  actions: {
    //登录操作
    async loginAccountHandler(accountObj: AccountLoginTypes) {
      try {
        //获取token
        const result = await accountLoginRequest(accountObj)
        const id = result.data.id
        localCache.setCache(LOGIN_TOKEN, result.data.token)
        this.token = result.data.token
        //获取用户信息
        const userInfoResult = await getUserInfoRequest(id)
        localCache.setCache(LOGIN_USERINFO, userInfoResult.data)
        this.userInfo = userInfoResult.data
        //获取用户菜单
        const menuResult = await getUserMenuTree(id)
        localCache.setCache(LOGIN_MENU, menuResult.data)
        this.menu = menuResult.data
        //获取登录用户的所有按钮权限
        this.permissionList = mapMenuListToPermissionList(menuResult.data)
        localCache.setCache('permissionList', this.permissionList)
        router.push('/main')
      } catch (error) {
        console.log(error)
      }
    },
    //退出登录操作
    logout() {
      localCache.clearCache()
      router.push('/login')
    }
  }
})
export default userLoginStore
