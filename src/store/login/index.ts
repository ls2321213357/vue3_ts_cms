import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoRequest, getUserMenuTree } from '@/service/login'
import type { AccountLoginTypes } from '@/types/login'
import { localCache } from '@/utils/cache'
import { LOGIN_MENU, LOGIN_TOKEN, LOGIN_USERINFO } from '@/assets/global/constants'
import router from '@/router'
interface LoginState {
  token: string
  userInfo: any
  menu: any
}
const userLoginStore = defineStore('login', {
  state: (): LoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: localCache.getCache(LOGIN_USERINFO) ?? {},
    menu: localCache.getCache(LOGIN_MENU) ?? []
  }),
  actions: {
    //登录操作
    async loginAccountHandler(accountObj: AccountLoginTypes) {
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
      //获取用户的菜单
      router.push('/main')
    },
    //退出登录操作
    logout() {
      localCache.clearCache()
      router.push('/login')
    }
  }
})
export default userLoginStore
