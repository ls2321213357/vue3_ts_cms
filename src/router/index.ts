import { LOGIN_TOKEN } from '@/assets/global/constants'
import { localCache } from '@/utils/cache'
import { createRouter, createWebHashHistory } from 'vue-router'
let modules = import.meta.glob('../views/main/**/**/index.vue')
delete modules['../views/main/index.vue']
const routerList = Object.entries(modules).map(([path]) => {
  //保留一下path因为后续需要修改
  const componentPath = path
  path = path.replace('../views/main/', '').replace('/index.vue', '')
  return {
    path,
    component: modules[componentPath]
  }
})
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/Login/index.vue')
    },
    {
      path: '/main',
      component: () => import('@/views/main/index.vue'),
      children: [...routerList]
    },
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/views/NotFound/index.vue')
    }
  ]
})
router.beforeEach((to, from) => {
  let token = localCache.getCache(LOGIN_TOKEN)
  if (from.path === '/login' && token) {
    localCache.setCache('defaultRoute', `/main/${routerList[1].path}`)
  }
  //通过这种方法可以匹配一个路由下的所有子路由
  if (to.matched.some((record) => record.path === '/main') && !token) {
    return '/login'
  }
  //默认匹配到第一个页面
  if (to.path === '/main') {
    return `/main/${routerList[1].path}`
  }
})
export default router
