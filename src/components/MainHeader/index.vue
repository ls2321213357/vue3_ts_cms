<template>
  <div class="main-header">
    <div class="icon" @click="isCollapse">
      <el-icon size="25">
        <!-- 动态组件 -->
        <component :is="isShow ? 'Fold' : 'Expand'"></component>
      </el-icon>
    </div>
    <div class="content">
      <HeaderCrumb ></HeaderCrumb>
      <HeaderInfo></HeaderInfo>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import HeaderInfo from '@/components/MainHeader/components/HeaderInfo.vue'
import HeaderCrumb from '@/components/MainHeader/components/HeaderCrumb.vue'
//使用自定义事件
const emit = defineEmits(['changeShow'])
const isShow = ref<boolean>(true)
const isCollapse = () => {
  isShow.value = !isShow.value
  emit('changeShow', isShow.value)
}
</script>
<style scoped lang="less">
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  height: 100%;
}
.icon {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  padding: 0 18px;
}
</style>
