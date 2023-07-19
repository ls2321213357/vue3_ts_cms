<template>
  <div class="info">
    <div class="controls">
      <span>
        <span class="dot"></span>
        <el-icon><ChatDotSquare /></el-icon>
      </span>
      <span @click="toDoRefresh" @animationend="reset">
        <el-icon><RefreshLeft :class="isRefresh ? 'refresh' : ''" /></el-icon>
      </span>
      <span
        ><el-icon><Search /></el-icon>
      </span>
    </div>
    <div class="userInfo">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar :size="35" src="xxx"></el-avatar>
          <span class="username">
            {{ userInfo.name }}
          </span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import userLoginStore from '@/store/login'
const router = useRouter()
const userLoginInfo = userLoginStore()
const userInfo = reactive({ ...userLoginInfo.userInfo })
const isRefresh = ref<boolean>(false)
//清除登录缓存
const logout = () => {
  userLoginInfo.logout()
}
//刷新按钮
const toDoRefresh = () => {
  isRefresh.value = true
}
const reset = () => {
  isRefresh.value = false
}
</script>
<style scoped lang="less">
.info {
  display: flex;
  justify-content: space-around;
  align-items: center;
  .controls {
    display: inline-flex;
    margin-right: 20px;
    .refresh {
      animation: refresh 1s 1;
    }
    @keyframes refresh {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(-360deg);
      }
    }
    span {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 35px;

      &:hover {
        background: #f2f2f2;
      }
      i {
        font-size: 20px;
      }
      .dot {
        position: absolute;
        top: 5px;
        right: 5px;
        z-index: 10;
        width: 6px;
        height: 6px;
        background-color: red;
        border-radius: 100%;
      }
    }
  }
  .userInfo {
    cursor: pointer;
    .el-dropdown-link {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      span {
        color: #000;
      }
      &:focus {
        outline: none;
      }
    }
  }
}
</style>
