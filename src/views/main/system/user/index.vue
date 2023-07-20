<template>
  <div class="user">
    <userSearch @search-handler="userSearchHandler" @reset-handler="userResetHandler"></userSearch>
    <userContent ref="userCtx"></userContent>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import userSearch from '@/views/main/system/user/components/userSearch.vue'
import userContent from '@/views/main/system/user/components/userContent.vue'
import type { userQueryTypes } from '@/types/user'
const userCtx = ref<InstanceType<typeof userContent>>()
//查询操作
const userSearchHandler = (searchObj: userQueryTypes) => {
  userCtx.value?.fetchSearchHandler(searchObj)
}
//重置操作
const userResetHandler = () => {
  userCtx.value?.fetchSearchHandler()
}
</script>
<style scoped lang="less">
.user {
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
}
</style>
