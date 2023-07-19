<template>
  <div class="aside">
    <div class="aside-logo">
      <img src="../../../public/favicon.ico" alt="" />
      <span v-show="isCollapse">后台管理系统</span>
    </div>
    <div class="menu">
      <el-menu
        :default-active="defaultVal"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
        :collapse="!isCollapse"
      >
        <template v-for="item in menuList" :key="item.id">
          <el-sub-menu :index="String(item.id)">
            <template #title>
              <el-icon>
                <component
                  :is="item.icon ? item.icon.slice(8, item.icon.length) : 'location'"
                ></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item :index="String(subItem.id)" @click="recordActive(subItem)">{{
                subItem.name
              }}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import userLoginStore from '@/store/login'
import { localCache } from '@/utils/cache'
import { useRouter, useRoute } from 'vue-router'
import { mapPathToMenu } from '@/utils/map-menus'
const router = useRouter()
const route = useRoute()
//默认菜单选中的id
let defaultVal = ref<string | undefined>('')
//用户中的方法
const userLogin = userLoginStore()
const menuList = userLogin.menu
//如果存在本地存储就读取本地的
defaultVal.value = mapPathToMenu(localCache.getCache('defaultRoute') ?? route.path, menuList)
const recordActive = (subItem: any) => {
  //记录上一次打开的页面
  let timer = null
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    localCache.setCache('defaultVal', subItem.id + '')
    localCache.setCache('defaultRoute', subItem.url)
  }, 1000)
  //进行页面跳转
  router.push(subItem.url)
}
onMounted(() => {
  let defaultRoute = localCache.getCache('defaultRoute')
  if (defaultRoute) router.push(defaultRoute)
})
defineProps({
  isCollapse: {
    type: Boolean,
    default: true
  }
})
</script>
<style scoped lang="less">
.aside {
  height: 100%;
  background-color: #001529;
  .aside-logo {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    position: relative;
    img {
      width: auto;
      height: 100%;
      margin: 0 10px;
    }
    span {
      width: 100px;
      color: #fff;
    }
  }
}
.el-menu {
  border-right: none;
  user-select: none;
  background-color: #001529 !important;
}
.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }
  .el-menu-item:hover {
    color: #fff;
  }
  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
